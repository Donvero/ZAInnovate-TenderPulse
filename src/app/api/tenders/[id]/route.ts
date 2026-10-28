// Single Tender Dossier API
// ZAInnovate Technologies (Pty) Ltd - TenderPulse

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { MOCK_TENDERS } from "@/lib/mock-data";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Check database
    try {
      const dbTender = await prisma.tender.findFirst({
        where: {
          OR: [{ id }, { referenceNumber: id }],
        },
        include: { category: true },
      });

      if (dbTender) {
        return NextResponse.json({
          success: true,
          tender: {
            id: dbTender.id,
            referenceNumber: dbTender.referenceNumber,
            title: dbTender.title,
            description: dbTender.description,
            category: dbTender.category.name,
            categorySlug: dbTender.category.slug,
            issuingEntity: dbTender.issuingEntity,
            department: dbTender.department,
            province: dbTender.province,
            cidbGrading: dbTender.cidbGrading,
            estimatedValue: dbTender.estimatedValue ? Number(dbTender.estimatedValue) : undefined,
            briefingSessionDate: dbTender.briefingSessionDate?.toISOString(),
            briefingSessionVenue: dbTender.briefingSessionVenue,
            isBriefingCompulsory: dbTender.isBriefingCompulsory,
            closingDate: dbTender.closingDate.toISOString(),
            status: dbTender.status,
            documentUrls: dbTender.documentUrls.map((name) => ({ name, url: "#", size: "2.8 MB" })),
            originalUrl: dbTender.originalUrl,
            contactPerson: dbTender.contactPerson,
            contactEmail: dbTender.contactEmail,
            contactPhone: dbTender.contactPhone,
            requiredSbd: ["SBD 1", "SBD 4", "SBD 6.1", "SBD 8", "SBD 9"],
          },
        });
      }
    } catch {
      // Fallback
    }

    const mockFound = MOCK_TENDERS.find(
      (t) => t.id === id || t.referenceNumber.toLowerCase() === id.toLowerCase()
    );

    if (mockFound) {
      return NextResponse.json({
        success: true,
        tender: mockFound,
      });
    }

    return NextResponse.json(
      { success: false, error: "Tender not found in national registry" },
      { status: 404 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
