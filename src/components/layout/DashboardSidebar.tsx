"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Radar,
  LayoutDashboard,
  Search,
  BookmarkCheck,
  BellRing,
  FileCheck2,
  CreditCard,
  ShieldCheck,
  ChevronRight,
  LogOut,
  Sparkles,
} from "lucide-react";

const NAV_ITEMS = [
  {
    name: "Terminal HUD",
    href: "/dashboard",
    icon: LayoutDashboard,
    badge: "LIVE",
  },
  {
    name: "National Tenders",
    href: "/dashboard/tenders",
    icon: Search,
    count: "1,428",
  },
  {
    name: "Saved & Pipeline",
    href: "/dashboard/saved",
    icon: BookmarkCheck,
    count: "4",
  },
  {
    name: "Radar Alerts",
    href: "/dashboard/alerts",
    icon: BellRing,
    badge: "SUB-3M",
  },
  {
    name: "SBD Compliance",
    href: "/dashboard/compliance",
    icon: FileCheck2,
  },
  {
    name: "Billing & Plans",
    href: "/dashboard/billing",
    icon: CreditCard,
    badge: "R99/mo",
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 bg-[#070E17] border-r border-[#15263F] flex flex-col justify-between hidden lg:flex h-screen sticky top-0">
      <div>
        {/* Brand header */}
        <div className="h-16 px-5 border-b border-[#15263F] flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0E1B2E] border border-[#FFC20E]/50 flex items-center justify-center">
              <Radar className="w-4 h-4 text-[#FFC20E] animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black text-white font-sans tracking-tight">
                Tender<span className="text-[#FFC20E]">Pulse</span>
              </span>
              <span className="text-[9px] font-mono text-slate-400">ZAInnovate Terminal</span>
            </div>
          </Link>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="System Operational" />
        </div>

        {/* Navigation list */}
        <div className="px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-wider text-slate-400">
            Intelligence Command
          </div>

          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? "bg-[#0E1B2E] text-[#FFC20E] border border-[#FFC20E]/40 shadow-sm"
                    : "text-slate-300 hover:bg-[#0B1626] hover:text-white"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-[#FFC20E]" : "text-slate-400"
                    }`}
                  />
                  <span>{item.name}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      isActive
                        ? "bg-[#FFC20E] text-[#070E17]"
                        : "bg-[#15263F] text-slate-300"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {item.count && (
                  <span className="text-[10px] font-mono text-slate-400 bg-[#0F1E33] px-1.5 py-0.5 rounded border border-[#1A2E4B]">
                    {item.count}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Quick Upgrade / Plan Banner */}
        <div className="mx-3 mt-4 p-3 rounded-xl bg-gradient-to-b from-[#0E1B2E] to-[#0A1320] border border-[#FFC20E]/30 relative overflow-hidden">
          <div className="flex items-center space-x-2 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#FFC20E]" />
            <span className="text-xs font-bold text-white">Pro Contractor Tier</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
            Real-time WhatsApp alerts active for Eastern Cape & Gauteng tenders.
          </p>
          <Link
            href="/dashboard/billing"
            className="w-full flex items-center justify-center space-x-1 py-1.5 text-[11px] font-bold text-[#070E17] bg-[#FFC20E] hover:bg-[#E5AD09] rounded-md transition-colors"
          >
            <span>Manage Plan (R99/mo)</span>
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* User profile bottom dock */}
      <div className="p-3 border-t border-[#15263F] bg-[#050B13]">
        <div className="p-2.5 rounded-lg bg-[#0E1B2E] border border-[#1A2E4B] flex items-center justify-between">
          <div className="flex items-center space-x-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-md bg-[#FFC20E] text-[#070E17] font-black text-xs flex items-center justify-center flex-shrink-0">
              IC
            </div>
            <div className="truncate">
              <div className="text-xs font-semibold text-white truncate">
                Imvula Civil & Infra
              </div>
              <div className="text-[10px] font-mono text-emerald-400 flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400 inline" />
                <span>CSD: MAAA0492104</span>
              </div>
            </div>
          </div>
          <Link href="/api/auth/signout" className="text-slate-400 hover:text-white p-1" title="Sign Out">
            <LogOut className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
