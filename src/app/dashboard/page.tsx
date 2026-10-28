"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Radar,
  ArrowRight,
  Clock,
  MapPin,
  Building,
  ShieldCheck,
  AlertTriangle,
  Zap,
  BookmarkCheck,
  FileCheck2,
  TrendingUp,
} from "lucide-react";
import StatsBar from "@/components/dashboard/StatsBar";
import TenderCard from "@/components/dashboard/TenderCard";
import TenderDetailModal from "@/components/dashboard/TenderDetailModal";
import { MOCK_TENDERS, MOCK_USER_PROFILE, TenderItem } from "@/lib/mock-data";
import { formatZAR, formatDate } from "@/lib/utils";

export default function DashboardOverviewPage() {
  const [selectedTender, setSelectedTender] = useState<TenderItem | null>(null);

  // Filter tenders matching user profile (Eastern Cape, Gauteng, CIDB, IT, Construction)
  const matchingTenders = MOCK_TENDERS.filter(
    (t) => t.province === "Eastern Cape" || t.province === "Gauteng"
  ).slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Executive Contractor Welcome Banner */}
      <div className="p-6 rounded-2xl bg-[#09121F] border border-[#15263F] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#FFC20E]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>CONTRACTOR INTELLIGENCE HUD</span>
            <span className="text-slate-500">•</span>
            <span>PORTAL REFRESH: 42s AGO</span>
          </div>

          <h1 className="text-2xl font-black text-white tracking-tight">
            Imvula Civil & Infra (Pty) Ltd
          </h1>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono text-slate-400">
            <span className="text-emerald-400 flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CSD: {MOCK_USER_PROFILE.csdNumber}</span>
            </span>
            <span>•</span>
            <span className="text-white">B-BBEE Level 1 (135% Recognition)</span>
            <span>•</span>
            <span className="text-[#FFC20E] font-bold">CIDB 5GB / 6CE Registered</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 flex-shrink-0">
          <Link
            href="/dashboard/alerts"
            className="px-4 py-2 rounded-xl bg-[#0E1B2E] hover:bg-[#15263F] text-slate-200 border border-[#1F385C] text-xs font-mono flex items-center space-x-1.5 transition-colors"
          >
            <Zap className="w-3.5 h-3.5 text-[#FFC20E]" />
            <span>3 Active Alert Rules</span>
          </Link>

          <Link
            href="/dashboard/billing"
            className="px-4 py-2 rounded-xl bg-[#FFC20E] hover:bg-[#E5AD09] text-[#070E17] font-bold text-xs font-mono flex items-center space-x-1.5 shadow-gold transition-all"
          >
            <span>Pro Plan (R99/mo)</span>
          </Link>
        </div>
      </div>

      {/* Terminal Stats Bar */}
      <StatsBar
        totalTenders={1428}
        matchingCount={48}
        savedCount={4}
        pipelineValue={43250000}
        urgentCount={2}
      />

      {/* Urgent Briefing Attention Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/30 border border-amber-500/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start space-x-3">
          <div className="w-9 h-9 rounded-xl bg-amber-950/80 border border-amber-500/50 flex items-center justify-center flex-shrink-0 text-amber-400 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold uppercase text-amber-300">
                COMPULSORY BRIEFING IN 4 DAYS
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-200">
                SCMU5-24/25-0089
              </span>
            </div>
            <h4 className="text-sm font-bold text-white mt-0.5">
              Qonce Senior Secondary School Construction (R14.85M)
            </h4>
            <p className="text-xs text-slate-300 mt-0.5 font-mono">
              Venue: School Assembly Grounds, Qonce, Eastern Cape | 14 Nov 2025 at 10:00 AM
            </p>
          </div>
        </div>

        <button
          onClick={() => setSelectedTender(MOCK_TENDERS[0])}
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#070E17] text-xs font-mono font-bold uppercase tracking-wider flex-shrink-0 transition-colors"
        >
          View Briefing Pack &rarr;
        </button>
      </div>

      {/* Matching Tenders Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-[#FFC20E]" />
              <span>HIGH PRIORITY MATCHING BIDS (EASTERN CAPE & GAUTENG)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">
              Auto-matched to your CIDB 5GB grading and provincial footprint
            </p>
          </div>

          <Link
            href="/dashboard/tenders"
            className="text-xs font-mono font-bold text-[#FFC20E] hover:underline flex items-center space-x-1"
          >
            <span>View All 48 Matches &rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matchingTenders.map((tender) => (
            <TenderCard
              key={tender.id}
              tender={tender}
              onInspect={(t) => setSelectedTender(t)}
            />
          ))}
        </div>
      </div>

      {/* SBD & Compliance Action Card */}
      <div className="p-6 rounded-2xl bg-[#09121F] border border-[#15263F] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 font-bold">
            <FileCheck2 className="w-4 h-4" />
            <span>PRE-FLIGHT BID VERIFICATION</span>
          </div>
          <h4 className="text-base font-bold text-white">
            Ready To Submit An Envelope To The Tender Box?
          </h4>
          <p className="text-xs text-slate-400 max-w-xl">
            Run your submission through the TenderPulse SBD Checklist. Verify SBD 1, SBD 4, SBD 6.1 preference points claim, valid SARS Tax Pin, and CIDB active status before 11:00 AM closing.
          </p>
        </div>

        <Link
          href="/dashboard/compliance"
          className="px-5 py-2.5 rounded-xl bg-[#0E1B2E] hover:bg-[#FFC20E] text-slate-200 hover:text-[#070E17] border border-[#1F385C] hover:border-[#FFC20E] text-xs font-mono font-bold transition-all flex-shrink-0"
        >
          Open Compliance Vault &rarr;
        </Link>
      </div>

      {/* Modal */}
      {selectedTender && (
        <TenderDetailModal
          tender={selectedTender}
          isOpen={!!selectedTender}
          onClose={() => setSelectedTender(null)}
        />
      )}
    </div>
  );
}
