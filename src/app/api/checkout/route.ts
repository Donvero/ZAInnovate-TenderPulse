// Paystack Checkout API
// ZAInnovate Technologies (Pty) Ltd - TenderPulse

import { NextRequest, NextResponse } from "next/server";
import { initializePaystackPayment, TENDERPULSE_PLANS } from "@/lib/paystack";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { planId = "PRO", email, interval = "MONTHLY", returnUrl } = body;

    const plan = (TENDERPULSE_PLANS as any)[planId];
    if (!plan) {
      return NextResponse.json({ success: false, error: "Invalid plan selected" }, { status: 400 });
    }

    const isAnnual = interval === "YEARLY";
    const amountInCents = isAnnual
      ? (plan.priceZAR * 10) * 100 // 2 months free
      : plan.priceZAR * 100;

    const callbackUrl = returnUrl || `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard/billing?payment_status=verified`;

    const paystackSession = await initializePaystackPayment({
      email: email || "director@contractor.co.za",
      amountInCents,
      planCode: plan.planCode,
      callbackUrl,
      metadata: {
        planId,
        interval,
        userId: "usr_zainnovate_001",
      },
    });

    return NextResponse.json({
      success: true,
      authorizationUrl: paystackSession.data.authorization_url,
      reference: paystackSession.data.reference,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
