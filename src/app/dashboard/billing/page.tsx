"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  CreditCard,
  ShieldCheck,
  Check,
  Sparkles,
  ArrowRight,
  Download,
  AlertCircle,
  Lock,
  CheckCircle2,
  Receipt,
} from "lucide-react";
import { TENDERPULSE_PLANS } from "@/lib/paystack";
import { formatZAR, formatZARFull } from "@/lib/utils";

const MOCK_INVOICES = [
  {
    ref: "TP_INV_2025_0012",
    date: "28 Oct 2025",
    description: "TenderPulse Pro Contractor (Monthly)",
    amount: 99.0,
    channel: "Capitec Pay",
    status: "Paid",
  },
  {
    ref: "TP_INV_2025_0009",
    date: "28 Sep 2025",
    description: "TenderPulse Pro Contractor (Monthly)",
    amount: 99.0,
    channel: "Visa •••• 4022",
    status: "Paid",
  },
  {
    ref: "TP_INV_2025_0004",
    date: "28 Aug 2025",
    description: "TenderPulse Pro Contractor (Monthly)",
    amount: 99.0,
    channel: "Instant EFT (Ozow)",
    status: "Paid",
  },
];

export default function BillingPage() {
  const searchParams = useSearchParams();
  const paymentVerified = searchParams.get("payment_status") === "verified";

  const [currentTier, setCurrentTier] = useState<"FREE" | "PRO" | "BUSINESS">("PRO");
  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  const handleUpgrade = async (tier: "PRO" | "BUSINESS") => {
    setLoadingTier(tier);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: tier,
          interval: "MONTHLY",
        }),
      });

      const data = await res.json();
      if (data.authorizationUrl) {
        window.location.href = data.authorizationUrl;
      }
    } catch {
      alert("Demo checkout initialized.");
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight font-sans">
          Subscription & Paystack Billing
        </h1>
        <p className="text-xs font-mono text-slate-400 mt-1">
          Manage your TenderPulse contractor plan, payment methods, and tax invoices
        </p>
      </div>

      {/* Success Notification */}
      {paymentVerified && (
        <div className="p-4 rounded-xl bg-emerald-950/70 border border-emerald-500/60 text-emerald-300 text-xs font-mono flex items-center space-x-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div>
            <div className="font-bold text-white">Paystack Payment Confirmed!</div>
            <div>Your Pro Contractor subscription has been updated. Real-time radar alerts are active.</div>
          </div>
        </div>
      )}

      {/* Current Plan Overview Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0E1B2E] via-[#0B1626] to-[#0E1B2E] border border-[#FFC20E]/50 shadow-gold flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FFC20E] text-[#070E17]">
              CURRENT ACTIVE PLAN
            </span>
            <span className="text-xs font-mono text-emerald-400">ACTIVE & RENWALS ON</span>
          </div>

          <h2 className="text-2xl font-black text-white font-mono">
            Pro Contractor Tier (R99.00 / month)
          </h2>

          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            Includes instant WhatsApp & Email alerts, 2 Target Provinces (Eastern Cape & Gauteng), full SBD packs, and unlimited tender downloads.
          </p>

          <div className="text-[11px] font-mono text-slate-400 pt-1">
            Next billing date: <span className="text-white font-bold">28 November 2025</span> via Paystack (Capitec Pay / Card)
          </div>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col gap-2 flex-shrink-0">
          <button
            onClick={() => handleUpgrade("BUSINESS")}
            disabled={loadingTier === "BUSINESS"}
            className="px-5 py-2.5 rounded-xl bg-[#FFC20E] hover:bg-[#E5AD09] text-[#070E17] font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center space-x-1.5 shadow-gold transition-all"
          >
            <span>{loadingTier === "BUSINESS" ? "Connecting..." : "Upgrade to Business (R299)"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => alert("Your subscription is set to remain active until the end of the current billing cycle.")}
            className="px-4 py-2 rounded-xl bg-[#070E17] hover:bg-[#0E1B2E] text-slate-400 hover:text-white border border-[#1F385C] text-xs font-mono text-center transition-colors"
          >
            Pause or Cancel Plan
          </button>
        </div>
      </div>

      {/* Plans Comparison */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center space-x-2">
          <CreditCard className="w-4 h-4 text-[#FFC20E]" />
          <span>AVAILABLE TENDERPULSE TIERS</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Free */}
          <div className="p-5 rounded-2xl bg-[#09121F] border border-[#15263F] space-y-4 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase">Explorer</div>
              <div className="text-2xl font-black text-white font-mono mt-1">R0</div>
              <p className="text-xs text-slate-400 mt-1">Basic national tender directory access.</p>
              <div className="mt-4 pt-4 border-t border-[#15263F] space-y-2 text-xs text-slate-300">
                <div>✓ 3 tender document views/mo</div>
                <div>✓ Weekly email digest</div>
                <div>✗ No WhatsApp instant alerts</div>
              </div>
            </div>
            <button
              disabled
              className="w-full py-2 rounded-lg bg-[#0E1B2E] border border-[#1A2E4B] text-slate-500 text-xs font-mono"
            >
              Default Free Tier
            </button>
          </div>

          {/* Pro */}
          <div className="p-5 rounded-2xl bg-[#0E1B2E] border-2 border-[#FFC20E] shadow-gold space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#FFC20E] font-bold uppercase">Pro Contractor</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#FFC20E] text-[#070E17] font-bold">CURRENT</span>
              </div>
              <div className="text-3xl font-black text-white font-mono mt-1">R99<span className="text-xs text-slate-400 font-normal">/mo</span></div>
              <p className="text-xs text-slate-300 mt-1">For active bidding contractors.</p>
              <div className="mt-4 pt-4 border-t border-[#1F385C] space-y-2 text-xs text-white">
                <div>✓ Instant WhatsApp & Email alerts</div>
                <div>✓ Up to 2 Target Provinces</div>
                <div>✓ CIDB grading filter</div>
                <div>✓ Complete SBD compliance packs</div>
              </div>
            </div>
            <div className="w-full py-2 rounded-lg bg-[#FFC20E]/20 text-[#FFC20E] text-center text-xs font-mono font-bold">
              Active Subscription
            </div>
          </div>

          {/* Business */}
          <div className="p-5 rounded-2xl bg-[#09121F] border border-[#15263F] space-y-4 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase">Enterprise Growth</div>
              <div className="text-3xl font-black text-white font-mono mt-1">R299<span className="text-xs text-slate-400 font-normal">/mo</span></div>
              <p className="text-xs text-slate-400 mt-1">For national consortiums & JVs.</p>
              <div className="mt-4 pt-4 border-t border-[#15263F] space-y-2 text-xs text-slate-300">
                <div>✓ All 9 SA Provinces unlocked</div>
                <div>✓ Multi-user seats (up to 5 users)</div>
                <div>✓ Historical pricing intelligence</div>
                <div>✓ Dedicated account manager</div>
              </div>
            </div>
            <button
              onClick={() => handleUpgrade("BUSINESS")}
              className="w-full py-2 rounded-lg bg-[#FFC20E] hover:bg-[#E5AD09] text-[#070E17] font-bold text-xs font-mono uppercase"
            >
              Switch to Business (R299)
            </button>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center space-x-2">
          <Receipt className="w-4 h-4 text-[#FFC20E]" />
          <span>PAYSTACK PAYMENT HISTORY & TAX INVOICES</span>
        </h3>

        <div className="rounded-2xl bg-[#09121F] border border-[#15263F] overflow-hidden">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#070E17] border-b border-[#15263F] text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="p-4">Reference</th>
                <th className="p-4">Date</th>
                <th className="p-4">Plan Description</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#121F33] text-slate-300">
              {MOCK_INVOICES.map((inv) => (
                <tr key={inv.ref} className="hover:bg-[#0B1626] transition-colors">
                  <td className="p-4 font-semibold text-white">{inv.ref}</td>
                  <td className="p-4 text-slate-400">{inv.date}</td>
                  <td className="p-4 text-slate-200">{inv.description}</td>
                  <td className="p-4 text-slate-400">{inv.channel}</td>
                  <td className="p-4 font-bold text-[#FFC20E]">{formatZARFull(inv.amount)}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => alert(`Downloading VAT invoice receipt: ${inv.ref}.pdf`)}
                      className="p-1.5 rounded-lg bg-[#0E1B2E] border border-[#1F385C] hover:border-[#FFC20E] text-slate-300 hover:text-white inline-flex items-center space-x-1"
                      title="Download PDF Receipt"
                    >
                      <Download className="w-3 h-3" />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
