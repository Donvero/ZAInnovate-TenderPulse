// Paystack Webhook Handler
// ZAInnovate Technologies (Pty) Ltd - TenderPulse

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-paystack-signature");
    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    if (secretKey && !secretKey.startsWith("sk_test_xxx")) {
      const hash = crypto
        .createHmac("sha512", secretKey)
        .update(rawBody)
        .digest("hex");

      if (hash !== signature) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
      }
    }

    const payload = JSON.parse(rawBody);
    const { event, data } = payload;

    console.log(`[Paystack Webhook Event] ${event}`, data?.reference);

    switch (event) {
      case "charge.success": {
        const reference = data.reference;
        const amountZAR = data.amount / 100;
        const email = data.customer?.email;
        const channel = data.channel;
        const planCode = data.plan?.plan_code;

        // Determine plan tier
        let tier: "PRO" | "BUSINESS" = "PRO";
        if (planCode === process.env.PAYSTACK_BUSINESS_PLAN_CODE || amountZAR > 200) {
          tier = "BUSINESS";
        }

        try {
          // Find user by email
          const user = await prisma.user.findUnique({ where: { email } });
          if (user) {
            // Upsert subscription
            const sub = await prisma.subscription.upsert({
              where: { userId: user.id },
              update: {
                tier,
                status: "ACTIVE",
                paystackCustomerCode: data.customer?.customer_code,
                currentPeriodStart: new Date(),
                currentPeriodEnd: new Date(Date.now() + 30 * 86400000),
              },
              create: {
                userId: user.id,
                tier,
                status: "ACTIVE",
                paystackCustomerCode: data.customer?.customer_code,
                currentPeriodStart: new Date(),
                currentPeriodEnd: new Date(Date.now() + 30 * 86400000),
              },
            });

            // Log payment history
            await prisma.paymentHistory.create({
              data: {
                userId: user.id,
                subscriptionId: sub.id,
                paystackRef: reference,
                amount: amountZAR,
                currency: "ZAR",
                status: "success",
                channel,
                paidAt: new Date(data.paid_at || Date.now()),
              },
            });
          }
        } catch (dbErr) {
          console.error("Failed to update database on Paystack charge.success:", dbErr);
        }
        break;
      }

      case "subscription.disable": {
        const subscriptionCode = data.subscription_code;
        try {
          await prisma.subscription.updateMany({
            where: { paystackSubscriptionCode: subscriptionCode },
            data: { status: "CANCELED" },
          });
        } catch (err) {
          console.error("Failed to cancel subscription in DB:", err);
        }
        break;
      }

      default:
        // Ignore unhandled events
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("Paystack webhook processing error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
