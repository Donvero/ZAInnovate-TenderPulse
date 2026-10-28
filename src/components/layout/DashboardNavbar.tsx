"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Bell,
  Zap,
  Menu,
  X,
  ExternalLink,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";
import AlertSimulatorModal from "../landing/AlertSimulatorModal";

export default function DashboardNavbar() {
  const [simulatorOpen, setSimulatorOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/dashboard/tenders?query=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      <header className="h-16 bg-[#070E17]/80 backdrop-blur-md border-b border-[#15263F] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40">
        {/* Left: Search input */}
        <div className="flex items-center space-x-3 flex-1 max-w-lg">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tender ref (e.g. SCMU5, SANRAL, GT/GDOH) or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0B1626] border border-[#1A2E4B] rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#FFC20E] focus:ring-1 focus:ring-[#FFC20E] transition-all font-mono"
            />
          </form>
        </div>

        {/* Right actions */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Real-time alert simulation button */}
          <button
            onClick={() => setSimulatorOpen(true)}
            className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#FFC20E]/15 hover:bg-[#FFC20E]/25 text-[#FFC20E] border border-[#FFC20E]/40 text-xs font-mono font-bold transition-all shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 fill-[#FFC20E]" />
            <span>Test Live Alert</span>
          </button>

          {/* Quick province indicator */}
          <div className="hidden md:flex items-center space-x-1 px-2.5 py-1 rounded bg-[#0E1B2E] border border-[#1B3150] text-[11px] font-mono text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>HQ: Eastern Cape</span>
          </div>

          {/* Notification bell */}
          <Link
            href="/dashboard/alerts"
            className="relative p-2 rounded-lg bg-[#0B1626] border border-[#1A2E4B] text-slate-300 hover:text-[#FFC20E] hover:border-[#FFC20E]/40 transition-colors"
            title="Active Matches"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FFC20E] text-[#070E17] text-[9px] font-black font-mono rounded-full flex items-center justify-center">
              3
            </span>
          </Link>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A1320] border-b border-[#1B3150] px-4 py-4 space-y-2 text-xs font-mono">
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 hover:text-[#FFC20E]"
          >
            HUD Overview
          </Link>
          <Link
            href="/dashboard/tenders"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 hover:text-[#FFC20E]"
          >
            Tender Browser (1,428 Active)
          </Link>
          <Link
            href="/dashboard/saved"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 hover:text-[#FFC20E]"
          >
            My Saved Pipeline (4 Tenders)
          </Link>
          <Link
            href="/dashboard/alerts"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 hover:text-[#FFC20E]"
          >
            Alert Dispatch Engine
          </Link>
          <Link
            href="/dashboard/compliance"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 hover:text-[#FFC20E]"
          >
            SBD Document Vault
          </Link>
          <Link
            href="/dashboard/billing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 hover:text-[#FFC20E]"
          >
            Billing (Pro R99/mo)
          </Link>
        </div>
      )}

      {/* Simulator Modal */}
      <AlertSimulatorModal
        isOpen={simulatorOpen}
        onClose={() => setSimulatorOpen(false)}
      />
    </>
  );
}
