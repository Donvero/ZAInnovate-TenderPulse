// Scheduled Tender Scraper Cron Endpoint
// ZAInnovate Technologies (Pty) Ltd - TenderPulse

import { NextRequest, NextResponse } from "next/server";
import { syncScrapedTenders } from "@/lib/scraper";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET || "zainnovate-tender-scraper-cron-auth-token-38491";

    // Verify secret token
    const url = new URL(request.url);
    const tokenQuery = url.searchParams.get("key");

    const isAuthorized =
      authHeader === `Bearer ${cronSecret}` ||
      tokenQuery === cronSecret ||
      process.env.NODE_ENV === "development";

    if (!isAuthorized) {
      return NextResponse.json({ error: "Unauthorized cron execution" }, { status: 401 });
    }

    const startTime = Date.now();
    const syncResults = await syncScrapedTenders();
    const durationMs = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      durationMs,
      source: "National Treasury eTenders & CIDB Bulletin",
      recordsIngested: syncResults.added,
      alertsDispatched: syncResults.matchedAlerts,
      status: "Operational",
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
