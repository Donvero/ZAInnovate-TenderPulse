"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Radar,
  ShieldCheck,
  ChevronRight,
  Menu,
  X,
  Zap,
  TrendingUp,
  FileCheck2,
  Building2,
} from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1B3150] bg-[#070E17]/90 backdrop-blur-md">
      {/* Top micro ticker */}
      <div className="bg-[#0B1626] border-b border-[#15263F] px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 overflow-hidden text-[11px] font-mono">
            <span className="flex items-center text-[#FFC20E] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#FFC20E] animate-ping inline-block mr-1.5" />
              LIVE RADAR
            </span>
            <span className="text-slate-400 hidden sm:inline">|</span>
            <span className="text-slate-300 truncate hidden sm:inline">
              1,428 Active Tenders Across All 9 SA Provinces
            </span>
            <span className="text-slate-400 hidden md:inline">|</span>
            <span className="text-slate-300 hidden md:inline">
              eTenders & CIDB Synchronized: 2 mins ago
            </span>
          </div>

          <div className="flex items-center space-x-3 text-[11px] font-mono">
            <span className="text-slate-400">ZAInnovate Technologies</span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FFC20E]/15 text-[#FFC20E] border border-[#FFC20E]/40">
              B-BBEE LEVEL 1
            </span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0E1B2E] via-[#15263F] to-[#0A1320] border border-[#FFC20E]/60 flex items-center justify-center shadow-gold group-hover:border-[#FFC20E] transition-all">
            <Radar className="w-5 h-5 text-[#FFC20E] animate-pulse" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-1.5">
              <span className="text-xl font-black tracking-tight text-white font-sans">
                Tender<span className="text-[#FFC20E]">Pulse</span>
              </span>
              <span className="text-[9px] font-mono uppercase px-1 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                v2.4 Pro
              </span>
            </div>
            <span className="text-[10px] text-slate-400 tracking-wider font-mono">
              SA CONTRACTOR INTELLIGENCE
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link
            href="/dashboard/tenders"
            className="text-slate-300 hover:text-[#FFC20E] transition-colors flex items-center space-x-1.5"
          >
            <TrendingUp className="w-4 h-4 text-[#FFC20E]" />
            <span>Tender Directory</span>
          </Link>

          <Link
            href="/dashboard/alerts"
            className="text-slate-300 hover:text-[#FFC20E] transition-colors flex items-center space-x-1.5"
          >
            <Zap className="w-4 h-4 text-[#FFC20E]" />
            <span>WhatsApp Alerts</span>
          </Link>

          <Link
            href="/dashboard/compliance"
            className="text-slate-300 hover:text-[#FFC20E] transition-colors flex items-center space-x-1.5"
          >
            <FileCheck2 className="w-4 h-4 text-emerald-400" />
            <span>SBD Checklist</span>
          </Link>

          <Link
            href="/#pricing"
            className="text-slate-300 hover:text-[#FFC20E] transition-colors"
          >
            Pricing <span className="text-xs text-[#FFC20E] font-mono font-bold">(R99/mo)</span>
          </Link>
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/dashboard"
            className="text-xs font-mono text-slate-300 hover:text-white px-3 py-2 rounded transition-colors"
          >
            Demo Terminal
          </Link>
          <Link
            href="/dashboard"
            className="relative group inline-flex items-center justify-center px-4 py-2 text-xs font-bold text-[#070E17] bg-[#FFC20E] hover:bg-[#E5AD09] rounded-lg shadow-gold transition-all duration-200 overflow-hidden"
          >
            <span className="flex items-center space-x-1.5 font-sans font-semibold">
              <span>Launch Terminal</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center space-x-2">
          <Link
            href="/dashboard"
            className="px-3 py-1.5 text-xs font-bold bg-[#FFC20E] text-[#070E17] rounded-md font-sans"
          >
            Terminal
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#1B3150] bg-[#0A1320] px-4 py-6 space-y-4">
          <Link
            href="/dashboard/tenders"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-[#FFC20E] text-base font-medium"
          >
            National Tender Directory
          </Link>
          <Link
            href="/dashboard/alerts"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-[#FFC20E] text-base font-medium"
          >
            WhatsApp & Email Alerts
          </Link>
          <Link
            href="/dashboard/compliance"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-[#FFC20E] text-base font-medium"
          >
            SBD & CIDB Compliance Vault
          </Link>
          <Link
            href="/#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-[#FFC20E] text-base font-medium"
          >
            Pricing (R99/mo)
          </Link>
          <div className="pt-4 border-t border-[#1B3150] flex flex-col space-y-2">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-[#FFC20E] text-[#070E17] font-bold text-sm"
            >
              Enter Live Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
