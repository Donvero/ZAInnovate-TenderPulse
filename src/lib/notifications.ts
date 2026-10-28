// Notification Engine: Resend Email & WhatsApp Alerts
// ZAInnovate Technologies (Pty) Ltd - TenderPulse

import { Resend } from "resend";
import { formatZAR, formatDate } from "./utils";

const resend = new Resend(process.env.RESEND_API_KEY || "re_mock_development_key");

export interface TenderNotificationPayload {
  recipientEmail: string;
  recipientName?: string;
  recipientPhone?: string;
  tender: {
    referenceNumber: string;
    title: string;
    issuingEntity: string;
    province: string;
    category: string;
    cidbGrading?: string;
    estimatedValue?: number;
    closingDate: string | Date;
    briefingDate?: string | Date;
    isBriefingCompulsory?: boolean;
    url: string;
  };
}

export async function sendEmailTenderAlert(payload: TenderNotificationPayload) {
  const { recipientEmail, recipientName, tender } = payload;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "TenderPulse <alerts@zainnovate.co.za>";

  const emailHtml = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #080F1A; color: #FFFFFF; margin: 0; padding: 24px; }
        .card { background-color: #0E1B2E; border: 1px solid #1F385C; border-radius: 12px; max-width: 600px; margin: 0 auto; overflow: hidden; }
        .header { background: linear-gradient(135deg, #0E1B2E 0%, #15263F 100%); padding: 24px; border-bottom: 2px solid #FFC20E; }
        .logo-title { color: #FFFFFF; font-size: 22px; font-weight: 800; margin: 0; }
        .logo-badge { color: #FFC20E; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; margin-top: 4px; }
        .content { padding: 24px; }
        .greeting { font-size: 16px; color: #E2E8F0; margin-bottom: 16px; }
        .alert-badge { display: inline-block; background-color: rgba(255, 194, 14, 0.15); color: #FFC20E; border: 1px solid rgba(255, 194, 14, 0.4); padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; margin-bottom: 12px; }
        .tender-title { font-size: 18px; color: #FFFFFF; font-weight: 700; line-height: 1.4; margin-top: 0; margin-bottom: 16px; }
        .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        .meta-table td { padding: 8px 0; border-bottom: 1px solid #1A2E4B; font-size: 14px; }
        .meta-label { color: #94A3B8; width: 38%; }
        .meta-value { color: #F8FAFC; font-weight: 600; }
        .btn { display: inline-block; background-color: #FFC20E; color: #0E1B2E; font-weight: 700; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 15px; text-align: center; margin-top: 10px; }
        .footer { background-color: #0A1320; padding: 18px 24px; text-align: center; font-size: 12px; color: #64748B; border-top: 1px solid #1F385C; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <div class="logo-title">TenderPulse<span style="color:#FFC20E;">.</span></div>
          <div class="logo-badge">ZAInnovate Technologies • SA Tender Intelligence</div>
        </div>
        <div class="content">
          <div class="alert-badge">⚡ NEW MATCHING TENDER ALERT</div>
          <p class="greeting">Hello ${recipientName || "Contractor"},</p>
          <h2 class="tender-title">${tender.title}</h2>

          <table class="meta-table">
            <tr>
              <td class="meta-label">Reference Number:</td>
              <td class="meta-value" style="color:#FFC20E;">${tender.referenceNumber}</td>
            </tr>
            <tr>
              <td class="meta-label">Issuing Department:</td>
              <td class="meta-value">${tender.issuingEntity}</td>
            </tr>
            <tr>
              <td class="meta-label">Province:</td>
              <td class="meta-value">${tender.province}</td>
            </tr>
            <tr>
              <td class="meta-label">Category:</td>
              <td class="meta-value">${tender.category}</td>
            </tr>
            ${tender.cidbGrading ? `<tr><td class="meta-label">CIDB Grading:</td><td class="meta-value">${tender.cidbGrading}</td></tr>` : ""}
            ${tender.estimatedValue ? `<tr><td class="meta-label">Estimated Value:</td><td class="meta-value">${formatZAR(tender.estimatedValue)}</td></tr>` : ""}
            <tr>
              <td class="meta-label">Closing Date:</td>
              <td class="meta-value" style="color:#F87171;">${formatDate(tender.closingDate)} at 11:00 AM</td>
            </tr>
            ${tender.briefingDate ? `
            <tr>
              <td class="meta-label">Briefing Session:</td>
              <td class="meta-value">${formatDate(tender.briefingDate)} ${tender.isBriefingCompulsory ? "(COMPULSORY)" : "(Optional)"}</td>
            </tr>` : ""}
          </table>

          <div style="text-align: center; margin: 24px 0;">
            <a href="${tender.url}" class="btn">View Full Specs & Download RFP &rarr;</a>
          </div>

          <p style="font-size: 13px; color: #94A3B8; margin-top: 20px;">
            Tip: Ensure your CSD registration (MAAA number) and Tax Compliance Status PIN are active before bidding.
          </p>
        </div>
        <div class="footer">
          Sent by TenderPulse — ZAInnovate Technologies (Pty) Ltd.<br/>
          B-BBEE Level 1 Contributor • East London, Eastern Cape, South Africa.<br/>
          Manage your alert preferences in your dashboard.
        </div>
      </div>
    </body>
  </html>
  `;

  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.startsWith("re_mock")) {
    console.log(`[Mock Email Alert Sent] To: ${recipientEmail} | Tender: ${tender.referenceNumber} - ${tender.title}`);
    return { success: true, mock: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [recipientEmail],
      subject: `🚨 Tender Alert: ${tender.referenceNumber} - ${tender.title.slice(0, 60)}...`,
      html: emailHtml,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Failed to send alert email:", err);
    return { success: false, error: err };
  }
}

export async function sendWhatsAppTenderAlert(payload: TenderNotificationPayload) {
  const { recipientPhone, tender } = payload;
  if (!recipientPhone) return { success: false, reason: "No phone number provided" };

  const message = [
    `🚨 *NEW SA TENDER ALERT — TenderPulse*`,
    `🏢 *Department:* ${tender.issuingEntity}`,
    `📄 *Ref:* ${tender.referenceNumber}`,
    `📍 *Province:* ${tender.province}`,
    `🏷️ *Category:* ${tender.category}`,
    tender.cidbGrading ? `🏗️ *CIDB Grade:* ${tender.cidbGrading}` : null,
    tender.estimatedValue ? `💰 *Est. Value:* ${formatZAR(tender.estimatedValue)}` : null,
    `⏰ *Closing Date:* ${formatDate(tender.closingDate)} (11:00 AM)`,
    tender.isBriefingCompulsory ? `⚠️ *Compulsory Briefing:* ${formatDate(tender.briefingDate)}` : null,
    ``,
    `📌 *Title:* ${tender.title}`,
    ``,
    `🔗 *Download RFP & SBD Checklist:*`,
    `${tender.url}`,
    ``,
    `_Powered by ZAInnovate Technologies (Pty) Ltd_`,
  ].filter(Boolean).join("\n");

  console.log(`[WhatsApp Alert Queued] To: ${recipientPhone}\n${message}`);
  // In production, integrate with Twilio WhatsApp API or Africa's Talking SMS/WhatsApp API
  return { success: true, messageId: `wa_${Date.now()}` };
}
