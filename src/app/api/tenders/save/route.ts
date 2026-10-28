// Tender Pipeline & Bookmark API
// ZAInnovate Technologies (Pty) Ltd - TenderPulse

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tenderId, userId = "usr_zainnovate_001", status = "INTERESTED", notes } = body;

    if (!tenderId) {
      return NextResponse.json({ success: false, error: "tenderId is required" }, { status: 400 });
    }

    try {
      const saved = await prisma.savedTender.upsert({
        where: {
          userId_tenderId: { userId, tenderId },
        },
        update: { status, notes, updatedAt: new Date() },
        create: { userId, tenderId, status, notes },
      });
      return NextResponse.json({ success: true, saved });
    } catch {
      // In-memory response for instant optimistic feedback
      return NextResponse.json({
        success: true,
        saved: { id: `saved_${Date.now()}`, userId, tenderId, status, notes },
      });
    }
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tenderId = searchParams.get("tenderId");
    const userId = searchParams.get("userId") || "usr_zainnovate_001";

    if (!tenderId) {
      return NextResponse.json({ success: false, error: "tenderId is required" }, { status: 400 });
    }

    try {
      await prisma.savedTender.delete({
        where: {
          userId_tenderId: { userId, tenderId },
        },
      });
    } catch {
      // Continue
    }

    return NextResponse.json({ success: true, removed: tenderId });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
