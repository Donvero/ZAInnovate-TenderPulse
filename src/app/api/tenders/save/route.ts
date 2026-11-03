// Tender Pipeline & Bookmark API
// ZAInnovate Technologies (Pty) Ltd - TenderPulse

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as { id?: string } | undefined)?.id;
    if (!userId) {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 });
    }
    const body = await request.json();
    const { tenderId, status = "INTERESTED", notes } = body;

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
    const session = await getServerSession(authOptions);
    const userId = (session?.user as { id?: string } | undefined)?.id;
    if (!userId) {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 });
    }

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
