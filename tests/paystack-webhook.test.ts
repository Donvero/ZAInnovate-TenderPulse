import { describe, it, expect } from "vitest";
import crypto from "crypto";

describe("Paystack Webhook & Security Architecture", () => {
  const secretKey = "sk_test_mock_zainnovate_secret_key_12345";

  function computePaystackSignature(payload: string, key: string): string {
    return crypto.createHmac("sha512", key).update(payload).digest("hex");
  }

  function verifyPaystackWebhook(rawBody: string, signature: string | null, key: string): { valid: boolean; error?: string } {
    if (!signature) {
      return { valid: false, error: "Missing x-paystack-signature header" };
    }
    const computed = computePaystackSignature(rawBody, key);
    if (computed !== signature) {
      return { valid: false, error: "Invalid signature" };
    }
    return { valid: true };
  }

  it("should compute authentic HMAC SHA512 signature matching Paystack spec", () => {
    const rawPayload = JSON.stringify({
      event: "charge.success",
      data: {
        reference: "ref_tp_123456",
        amount: 9900,
        currency: "ZAR",
        customer: { email: "contractor@imvula.co.za" },
      },
    });

    const signature = computePaystackSignature(rawPayload, secretKey);
    expect(signature).toHaveLength(128); // 512 bits / 4 = 128 hex characters
    expect(/^[a-f0-9]{128}$/.test(signature)).toBe(true);

    const verification = verifyPaystackWebhook(rawPayload, signature, secretKey);
    expect(verification.valid).toBe(true);
  });

  it("should reject tampered payload with forged signature", () => {
    const rawPayload = JSON.stringify({ event: "charge.success", amount: 9900 });
    const tamperedPayload = JSON.stringify({ event: "charge.success", amount: 29900 });

    const originalSignature = computePaystackSignature(rawPayload, secretKey);
    const verification = verifyPaystackWebhook(tamperedPayload, originalSignature, secretKey);

    expect(verification.valid).toBe(false);
    expect(verification.error).toBe("Invalid signature");
  });

  it("should correctly classify subscription tier from amount and plan code", () => {
    function resolvePlanTier(amountInCents: number, planCode?: string): "FREE" | "PRO" | "BUSINESS" {
      const amountZAR = amountInCents / 100;
      if (planCode === "PLN_tenderpulse_biz_299" || amountZAR >= 299) {
        return "BUSINESS";
      }
      if (planCode === "PLN_tenderpulse_pro_99" || amountZAR >= 99) {
        return "PRO";
      }
      return "FREE";
    }

    expect(resolvePlanTier(0)).toBe("FREE");
    expect(resolvePlanTier(9900, "PLN_tenderpulse_pro_99")).toBe("PRO");
    expect(resolvePlanTier(9900)).toBe("PRO");
    expect(resolvePlanTier(29900, "PLN_tenderpulse_biz_299")).toBe("BUSINESS");
    expect(resolvePlanTier(50000)).toBe("BUSINESS");
  });

  it("should compute exact ZAR amounts in cents without floating-point errors", () => {
    const proMonthlyPriceZAR = 99.00;
    const cents = Math.round(proMonthlyPriceZAR * 100);
    expect(cents).toBe(9900);

    const bizYearlyPriceZAR = 2990.00;
    const bizCents = Math.round(bizYearlyPriceZAR * 100);
    expect(bizCents).toBe(299000);
  });
});
