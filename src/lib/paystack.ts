// Paystack Integration for South African Rand (ZAR) Payments
// ZAInnovate Technologies (Pty) Ltd - TenderPulse

export interface InitializePaystackParams {
  email: string;
  amountInCents: number; // e.g. 9900 for R99.00
  planCode?: string;     // e.g. PLN_pro_99
  callbackUrl?: string;
  metadata?: Record<string, unknown>;
}

export interface PaystackInitResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface PaystackVerifyResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    status: "success" | "abandoned" | "failed";
    reference: string;
    amount: number; // in cents
    currency: "ZAR";
    channel: string; // card, eft, etc.
    paid_at: string;
    customer: {
      id: number;
      customer_code: string;
      email: string;
    };
    plan_object?: {
      plan_code: string;
      name: string;
    };
    authorization?: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      channel: string;
      card_type: string;
      bank: string;
    };
  };
}

export const TENDERPULSE_PLANS = {
  FREE: {
    id: "FREE",
    name: "Explorer",
    priceZAR: 0,
    priceMonthly: "R0",
    description: "Essential access for early-stage SMMEs discovering government tenders.",
    features: [
      "Access to national tender directory",
      "Up to 3 full tender document views / month",
      "Weekly email digest of newly published tenders",
      "Standard tender category search",
      "Community support via email",
    ],
    limitations: [
      "No WhatsApp instant alerts",
      "No briefing session calendar sync",
      "No SBD document packs",
    ],
  },
  PRO: {
    id: "PRO",
    name: "Pro Contractor",
    priceZAR: 99,
    priceMonthly: "R99",
    priceYearly: "R990",
    popular: true,
    planCode: process.env.PAYSTACK_PRO_PLAN_CODE || "PLN_tenderpulse_pro_99",
    description: "For active SMMEs & contractors actively bidding and needing fast alerts.",
    features: [
      "⚡ Instant WhatsApp & Email alerts (< 5 mins from publication)",
      "Unlimited tender views & full specification downloads",
      "Target up to 2 Provinces (e.g. Eastern Cape & Western Cape)",
      "Target up to 4 Industry Categories (Construction, IT, etc.)",
      "CIDB grading filter (Grades 1 to 9)",
      "Compulsory briefing session SMS/WhatsApp reminders",
      "Complete SBD document checklist & guidance generator",
      "Save & track up to 25 tenders in active bid pipeline",
    ],
    limitations: [
      "Single user account",
      "Standard email & WhatsApp support",
    ],
  },
  BUSINESS: {
    id: "BUSINESS",
    name: "Enterprise Growth",
    priceZAR: 299,
    priceMonthly: "R299",
    priceYearly: "R2,990",
    planCode: process.env.PAYSTACK_BUSINESS_PLAN_CODE || "PLN_tenderpulse_biz_299",
    description: "For established contractors, JV consortiums, and national suppliers.",
    features: [
      "🚀 Priority WhatsApp & SMS instant alerts with direct PDF download",
      "All 9 South African Provinces unlocked",
      "Unlimited Categories & custom keyword regex triggers",
      "Competitor award intelligence & historical pricing benchmarks",
      "Multi-user team seats (up to 5 team members)",
      "Export tender data & BoQs to Excel / CSV",
      "Direct tender query drafting assistant (SCM clarification letters)",
      "Dedicated account manager & B-BBEE advisory support",
    ],
    limitations: [],
  },
};

const PAYSTACK_BASE_URL = "https://api.paystack.co";

export async function initializePaystackPayment({
  email,
  amountInCents,
  planCode,
  callbackUrl,
  metadata = {},
}: InitializePaystackParams): Promise<PaystackInitResponse> {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey || secretKey.startsWith("sk_test_xxx")) {
    // Return mock payment URL for local preview/development
    const mockReference = `tp_ref_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    return {
      status: true,
      message: "Authorization URL created (Demo Mode)",
      data: {
        authorization_url: `/dashboard/billing?payment_mock_success=true&ref=${mockReference}`,
        access_code: `mock_code_${mockReference}`,
        reference: mockReference,
      },
    };
  }

  const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      amount: amountInCents,
      currency: "ZAR",
      plan: planCode || undefined,
      callback_url: callbackUrl,
      metadata: {
        ...metadata,
        company: "ZAInnovate Technologies",
        app: "TenderPulse",
      },
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to initialize Paystack transaction");
  }

  return data;
}

export async function verifyPaystackPayment(reference: string): Promise<PaystackVerifyResponse> {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey || secretKey.startsWith("sk_test_xxx")) {
    return {
      status: true,
      message: "Verification successful (Mock Mode)",
      data: {
        id: 10001,
        domain: "test",
        status: "success",
        reference,
        amount: 9900,
        currency: "ZAR",
        channel: "card",
        paid_at: new Date().toISOString(),
        customer: {
          id: 501,
          customer_code: "CUS_mock_test123",
          email: "demo@zainnovate.co.za",
        },
      },
    };
  }

  const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to verify Paystack transaction");
  }

  return data;
}
