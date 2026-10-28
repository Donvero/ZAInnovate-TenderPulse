"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Radar,
  ArrowRight,
  Clock,
  MapPin,
  Building,
  CheckCircle2,
  FileText,
  Bookmark,
  ExternalLink,
} from "lucide-react";
import { MOCK_TENDERS, TenderItem } from "@/lib/mock-data";
import { formatZAR, formatDate, getDaysRemaining } from "@/lib/utils";
import TenderDetailModal from "../dashboard/TenderDetailModal";

const CATEGORY_TABS = [
  { id: "all", label: "All Sectors" },
  { id: "construction", label: "Construction (CIDB)" },
  { id: "it-technology", label: "IT & Cloud" },
  { id: "ppe-safety", label: "PPE & Workwear" },
  { id: "transport", label: "Logistics & Fleet" },
  { id: "cleaning", label: "Cleaning & Hygiene" },
];

export default function LiveTendersPreview() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedTender, setSelectedTender] = useState<TenderItem | null>(null);

  const displayedTenders = MOCK_TENDERS.filter((item) => {
    if (activeTab === "all") return true;
    return item.categorySlug === activeTab;
  }).slice(0, 6);

  return (
    <section className="py-20 bg-[#070E17] border-b border-[#15263F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FFC20E]/15 border border-[#FFC20E]/40 text-xs font-mono text-[#FFC20E] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFC20E] animate-ping" />
              <span>LIVE PROCUREMENT RADAR</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Today&apos;s Featured Tender Opportunities
            </h2>
            <p className="text-sm text-slate-400 mt-2 font-mono">
              Live sample feed directly extracted from National Treasury eTenders and provincial gazettes
            </p>
          </div>

          <Link
            href="/dashboard/tenders"
            className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#FFC20E] hover:text-[#FFE45F] group"
          >
            <span>EXPLORE FULL DIRECTORY (1,428 TENDERS)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-[#0E1B2E] border border-[#FFC20E] text-[#FFC20E] shadow-gold font-bold"
                  : "bg-[#0B1626] border border-[#15263F] text-slate-400 hover:text-white hover:border-slate-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tenders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedTenders.map((tender) => {
            const countdown = getDaysRemaining(tender.closingDate);

            return (
              <div
                key={tender.id}
                className="p-5 rounded-2xl bg-[#09121F] border border-[#15263F] hover:border-[#FFC20E]/60 transition-all duration-200 flex flex-col justify-between group shadow-lg"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#0E1B2E] text-slate-300 border border-[#1F385C] truncate">
                      {tender.province}
                    </span>

                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded flex items-center space-x-1 ${
                        countdown.isUrgent
                          ? "bg-rose-950/60 text-rose-300 border border-rose-500/50"
                          : "bg-[#0E1B2E] text-slate-300 border border-[#1A2E4B]"
                      }`}
                    >
                      <Clock className="w-3 h-3" />
                      <span>{countdown.text}</span>
                    </span>
                  </div>

                  {/* Ref & Entity */}
                  <div className="text-[11px] font-mono text-[#FFC20E] font-semibold mb-1">
                    {tender.referenceNumber}
                  </div>
                  <div className="text-xs text-slate-400 line-clamp-1 mb-2">
                    {tender.issuingEntity}
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-white group-hover:text-[#FFC20E] transition-colors line-clamp-2 leading-snug mb-3">
                    {tender.title}
                  </h3>

                  {/* Badges: CIDB / Category / Briefing */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {tender.cidbGrading && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FFC20E]/15 text-[#FFC20E] border border-[#FFC20E]/30 font-bold">
                        CIDB: {tender.cidbGrading}
                      </span>
                    )}
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0E1B2E] text-slate-300 border border-[#1A2E4B]">
                      {tender.category}
                    </span>
                    {tender.isBriefingCompulsory && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/40 text-amber-300 border border-amber-500/40 font-semibold">
                        Compulsory Briefing
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom value & CTA */}
                <div className="pt-4 border-t border-[#15263F] flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Est. Opportunity</div>
                    <div className="text-sm font-black font-mono text-white">
                      {formatZAR(tender.estimatedValue)}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedTender(tender)}
                    className="px-3 py-1.5 rounded-lg bg-[#0E1B2E] hover:bg-[#FFC20E] text-slate-300 hover:text-[#070E17] border border-[#1F385C] hover:border-[#FFC20E] text-xs font-mono font-semibold transition-all"
                  >
                    Inspect RFP &rarr;
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#0E1B2E] via-[#0B1626] to-[#0E1B2E] border border-[#FFC20E]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-white font-bold text-sm">
              Looking for municipal tenders in your specific metro?
            </h4>
            <p className="text-xs text-slate-400">
              TenderPulse tracks City of Cape Town, eThekwini, Ekurhuleni, City of Joburg, Buffalo City, and Nelson Mandela Bay.
            </p>
          </div>
          <Link
            href="/dashboard/tenders"
            className="px-5 py-2.5 rounded-xl bg-[#FFC20E] hover:bg-[#E5AD09] text-[#070E17] font-bold text-xs uppercase font-mono tracking-wider flex items-center space-x-1.5 shadow-gold flex-shrink-0"
          >
            <span>Open Tender Terminal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Modal Dossier */}
      {selectedTender && (
        <TenderDetailModal
          tender={selectedTender}
          isOpen={!!selectedTender}
          onClose={() => setSelectedTender(null)}
        />
      )}
    </section>
  );
}
