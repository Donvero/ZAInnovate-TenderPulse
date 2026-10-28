"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Radar,
  Zap,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Search,
  Bell,
  Sparkles,
  Building,
  CheckCircle,
} from "lucide-react";
import AlertSimulatorModal from "./AlertSimulatorModal";

export default function Hero() {
  const [simulatorOpen, setSimulatorOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchVal.trim();
    window.location.href = query
      ? `/dashboard/tenders?query=${encodeURIComponent(query)}`
      : `/dashboard/tenders`;
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28 border-b border-[#15263F] bg-[#070E17]">
      {/* Background terminal grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0E1B2E15_1px,transparent_1px),linear-gradient(to_bottom,#0E1B2E15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Gold ambient glow top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FFC20E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0E1B2E] border border-[#FFC20E]/40 shadow-gold text-xs font-mono">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFC20E] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFC20E]" />
            </span>
            <span className="text-slate-300">
              NATIONAL TREASURY & CIDB DIRECT RADAR
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-[#FFC20E] font-bold">1,428 ACTIVE TENDERS</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Never Miss a South African Government Tender{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC20E] via-[#FFE45F] to-[#FFC20E]">
              Again.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans">
            TenderPulse monitors eTenders, CIDB, Transnet, Eskom, and all 9 provincial bulletins 24/7. Get instant WhatsApp & Email alerts matched to your CIDB grade and business profile in under 3 minutes.
          </p>

          {/* Quick Terminal Search Bar */}
          <div className="max-w-2xl mx-auto pt-2">
            <form
              onSubmit={handleSearch}
              className="p-1.5 rounded-2xl bg-[#0B1626] border border-[#1F385C] shadow-2xl flex flex-col sm:flex-row items-center gap-2"
            >
              <div className="relative flex-1 w-full flex items-center">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5" />
                <input
                  type="text"
                  placeholder="Try 'Construction 5GB', 'PPE Cape Town', or 'Gauteng IT'..."
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  className="w-full bg-transparent border-0 pl-11 pr-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#FFC20E] hover:bg-[#E5AD09] text-[#070E17] font-bold text-xs uppercase tracking-wider font-mono flex items-center justify-center space-x-1.5 shadow-gold transition-all flex-shrink-0"
              >
                <span>Search Tenders</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Filter Tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-3 text-[11px] font-mono text-slate-400">
              <span className="text-slate-500">Fast Filters:</span>
              <Link
                href="/dashboard/tenders?province=Eastern+Cape"
                className="px-2.5 py-1 rounded-md bg-[#0E1B2E] border border-[#1A2E4B] hover:border-[#FFC20E] hover:text-[#FFC20E] transition-colors"
              >
                Eastern Cape
              </Link>
              <Link
                href="/dashboard/tenders?province=Gauteng"
                className="px-2.5 py-1 rounded-md bg-[#0E1B2E] border border-[#1A2E4B] hover:border-[#FFC20E] hover:text-[#FFC20E] transition-colors"
              >
                Gauteng
              </Link>
              <Link
                href="/dashboard/tenders?category=construction"
                className="px-2.5 py-1 rounded-md bg-[#0E1B2E] border border-[#1A2E4B] hover:border-[#FFC20E] hover:text-[#FFC20E] transition-colors"
              >
                CIDB Construction
              </Link>
              <Link
                href="/dashboard/tenders?category=ppe-safety"
                className="px-2.5 py-1 rounded-md bg-[#0E1B2E] border border-[#1A2E4B] hover:border-[#FFC20E] hover:text-[#FFC20E] transition-colors"
              >
                PPE Supply
              </Link>
              <Link
                href="/dashboard/tenders?category=it-technology"
                className="px-2.5 py-1 rounded-md bg-[#0E1B2E] border border-[#1A2E4B] hover:border-[#FFC20E] hover:text-[#FFC20E] transition-colors"
              >
                IT & Cloud
              </Link>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#FFC20E] hover:bg-[#E5AD09] text-[#070E17] font-bold text-sm tracking-wide shadow-gold-lg flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5"
            >
              <span>Launch Live Terminal (R99/mo)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setSimulatorOpen(true)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#0E1B2E] hover:bg-[#15263F] text-white border border-[#1F385C] hover:border-[#FFC20E]/50 font-semibold text-sm flex items-center justify-center space-x-2 transition-all"
            >
              <Zap className="w-4 h-4 text-[#FFC20E]" />
              <span>Simulate WhatsApp Alert In 3s</span>
            </button>
          </div>
        </div>

        {/* Hero Interactive Terminal Graphic */}
        <div className="mt-14 max-w-5xl mx-auto rounded-2xl bg-[#0B1626] border border-[#1F385C] shadow-2xl overflow-hidden">
          {/* Terminal Title Bar */}
          <div className="bg-[#070E17] border-b border-[#15263F] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-xs font-mono text-slate-400 ml-2">
                tenderpulse-terminal ~ live-feed: etenders.gov.za + cidb.org.za
              </span>
            </div>
            <div className="flex items-center space-x-3 text-[11px] font-mono text-slate-400">
              <span className="flex items-center text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
                STREAM ACTIVE
              </span>
              <span>BUFFER: 0ms</span>
            </div>
          </div>

          {/* Terminal Content HUD */}
          <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left 2 Cols: Live Tender Stream */}
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-1">
                <span>INCOMING BID OPPORTUNITIES (REAL-TIME)</span>
                <span className="text-[#FFC20E]">EASTERN CAPE / GAUTENG FOCUS</span>
              </div>

              {/* Sample card 1 */}
              <div className="p-3.5 rounded-xl bg-[#0E1B2E] border border-[#FFC20E]/40 hover:border-[#FFC20E] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-[10px] font-mono">
                    <span className="px-1.5 py-0.5 rounded bg-[#FFC20E]/15 text-[#FFC20E] border border-[#FFC20E]/40 font-bold">
                      CIDB 5GB
                    </span>
                    <span className="text-slate-400">Eastern Cape Public Works</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-emerald-400">SCMU5-24/25-0089</span>
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-1">
                    Construction of New 12-Classroom Block at Qonce Senior Secondary
                  </h4>
                  <div className="text-[11px] font-mono text-slate-300">
                    Est. Value: <span className="text-[#FFC20E] font-bold">R14,850,000</span> | Closes: 28 Nov 2025
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <span className="inline-block px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono border border-amber-500/40 font-bold">
                    Compulsory Briefing 14 Nov
                  </span>
                </div>
              </div>

              {/* Sample card 2 */}
              <div className="p-3.5 rounded-xl bg-[#0E1B2E] border border-[#1A2E4B] hover:border-slate-500 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-[10px] font-mono">
                    <span className="px-1.5 py-0.5 rounded bg-blue-900/40 text-blue-300 border border-blue-700/50 font-bold">
                      IT & SOC
                    </span>
                    <span className="text-slate-400">Gauteng e-Government</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-300">GT/GDeGov/045/2025</span>
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-1">
                    Enterprise Cloud Hosting & 24/7 Managed Cybersecurity SOC
                  </h4>
                  <div className="text-[11px] font-mono text-slate-300">
                    Est. Value: <span className="text-[#FFC20E] font-bold">R28,500,000</span> | Closes: 21 Nov 2025
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <span className="inline-block px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 text-[10px] font-mono border border-rose-500/40 font-bold">
                    Closing in 4 Days
                  </span>
                </div>
              </div>
            </div>

            {/* Right 1 Col: WhatsApp Alert Mockup */}
            <div className="p-4 rounded-xl bg-[#070E17] border border-[#15263F] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#15263F]">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[10px] font-bold">
                      TP
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-white">TenderPulse WhatsApp</div>
                      <div className="text-[9px] text-emerald-400 font-mono">Instant Dispatch Gateway</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">10:42 AM</span>
                </div>

                <div className="mt-3 p-3 rounded-lg bg-[#0E1B2E] border border-[#1A2E4B] text-[10px] font-mono space-y-1.5 text-slate-300">
                  <p className="text-emerald-400 font-bold">
                    🚨 NEW TENDER MATCHED:
                  </p>
                  <p className="text-white font-semibold">
                    SCMU5-24/25-0089: School Construction
                  </p>
                  <p>📍 Eastern Cape | CIDB 5GB</p>
                  <p>💰 Est: R14.8M</p>
                  <p className="text-[#FFC20E]">⚠️ Compulsory Briefing: 14 Nov</p>
                  <div className="pt-1 text-[9px] text-blue-400 underline">
                    tap to download RFP + SBD checklist &rarr;
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#15263F] flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>DELIVERY SPEED:</span>
                <span className="text-emerald-400 font-bold">1m 48s from gazette</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-xl bg-[#0A1320] border border-[#15263F] text-center">
            <div className="text-2xl sm:text-3xl font-black text-[#FFC20E] font-mono">1,428+</div>
            <div className="text-xs text-slate-400 mt-1">Live SA Tenders Tracked</div>
          </div>
          <div className="p-4 rounded-xl bg-[#0A1320] border border-[#15263F] text-center">
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">&lt; 3 Mins</div>
            <div className="text-xs text-slate-400 mt-1">WhatsApp Alert Dispatch</div>
          </div>
          <div className="p-4 rounded-xl bg-[#0A1320] border border-[#15263F] text-center">
            <div className="text-2xl sm:text-3xl font-black text-[#FFC20E] font-mono">9 Provinces</div>
            <div className="text-xs text-slate-400 mt-1">National & Provincial Depth</div>
          </div>
          <div className="p-4 rounded-xl bg-[#0A1320] border border-[#15263F] text-center">
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">Level 1</div>
            <div className="text-xs text-slate-400 mt-1">B-BBEE Youth-Owned Enabler</div>
          </div>
        </div>
      </div>

      {/* Simulator Modal */}
      <AlertSimulatorModal
        isOpen={simulatorOpen}
        onClose={() => setSimulatorOpen(false)}
      />
    </section>
  );
}
