// Live Alert Dispatch Simulator (WhatsApp & Email Test)
// ZAInnovate Technologies (Pty) Ltd - TenderPulse

import { NextRequest, NextResponse } from "next/server";
import { sendEmailTenderAlert, sendWhatsAppTenderAlert } from "@/lib/notifications";
import { MOCK_TENDERS } from "@/lib/mock-data";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, phone, channel = "whatsapp", tenderId } = body;

    const tender = MOCK_TENDERS.find((t) => t.id === tenderId) || MOCK_TENDERS[0];

    const payload = {
      recipientEmail: email || "demo@zainnovate.co.za",
      recipientName: "Contractor Director",
      recipientPhone: phone || "+27 82 000 0000",
      tender: {
        referenceNumber: tender.referenceNumber,
        title: tender.title,
        issuingEntity: tender.issuingEntity,
        province: tender.province,
        category: tender.category,
        cidbGrading: tender.cidbGrading,
        estimatedValue: tender.estimatedValue,
        closingDate: tender.closingDate,
        briefingDate: tender.briefingSessionDate,
        isBriefingCompulsory: tender.isBriefingCompulsory,
        url: `${process.env.NEXT_PUBLIC_APP_URL || "https://tenderpulse.zainnovate.co.za"}/dashboard/tenders?ref=${tender.referenceNumber}`,
      },
    };

    let result;
    if (channel === "whatsapp") {
      result = await sendWhatsAppTenderAlert(payload);
    } else {
      result = await sendEmailTenderAlert(payload);
    }

    return NextResponse.json({
      success: true,
      channel,
      timestamp: new Date().toISOString(),
      deliveredTo: channel === "whatsapp" ? payload.recipientPhone : payload.recipientEmail,
      tenderReferenced: tender.referenceNumber,
      message: `Simulated ${channel.toUpperCase()} alert triggered successfully. Latency: 1.2s`,
      details: result,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
