"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  Zap,
  ShieldCheck,
  CreditCard,
  Building,
  Sparkles,
  ArrowRight,
  Lock,
} from "lucide-react";
import { TENDERPULSE_PLANS } from "@/lib/paystack";

export default function PricingCards() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSubscribe = async (planId: "FREE" | "PRO" | "BUSINESS") => {
    if (planId === "FREE") {
      window.location.href = "/dashboard";
      return;
    }

    setLoadingPlan(planId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId,
          interval: isAnnual ? "YEARLY" : "MONTHLY",
        }),
      });

      const data = await res.json();
      if (data.authorizationUrl) {
        window.location.href = data.authorizationUrl;
      } else {
        window.location.href = "/dashboard/billing";
      }
    } catch {
      window.location.href = "/dashboard/billing";
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <section id="pricing" className="py-20 bg-[#070E17] border-b border-[#15263F] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#FFC20E]/15 border border-[#FFC20E]/40 text-xs font-mono text-[#FFC20E] mb-4">
            <CreditCard className="w-3.5 h-3.5" />
            <span>TRANSPARENT SOUTH AFRICAN RAND (ZAR) PRICING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            High-Impact Tender Intelligence For Less Than A Tank Of Fuel
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3">
            Win a single R500k municipal or provincial contract and your TenderPulse subscription pays for itself for decades. No lock-in contracts. Cancel anytime.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="mt-8 flex items-center justify-center space-x-3 text-xs font-mono">
            <span className={!isAnnual ? "text-white font-bold" : "text-slate-400"}>
              Monthly Billing
            </span>
            <button
              type="button"
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-[#15263F] transition-colors duration-200 ease-in-out focus:outline-none"
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-[#FFC20E] shadow transition duration-200 ease-in-out ${
                  isAnnual ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <span className={isAnnual ? "text-[#FFC20E] font-bold" : "text-slate-400"}>
              Annual Billing <span className="text-[10px] bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-800 ml-1">2 MONTHS FREE</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Card 1: Free Explorer */}
          <div className="p-8 rounded-2xl bg-[#09121F] border border-[#15263F] flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Explorer Tier
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0E1B2E] text-slate-400 border border-[#1A2E4B]">
                  Free Forever
                </span>
              </div>

              <div className="flex items-baseline space-x-1 mb-2">
                <span className="text-4xl font-black text-white font-mono">R0</span>
                <span className="text-xs font-mono text-slate-400">/month</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Essential directory access for early-stage SMMEs discovering government procurement.
              </p>

              <div className="mt-6 pt-6 border-t border-[#15263F] space-y-3">
                {TENDERPULSE_PLANS.FREE.features.map((f, i) => (
                  <div key={i} className="flex items-start space-x-2.5 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleSubscribe("FREE")}
              className="w-full py-3 rounded-xl bg-[#0E1B2E] hover:bg-[#15263F] text-white border border-[#1F385C] text-xs font-mono font-bold uppercase tracking-wider transition-colors"
            >
              Start Free Explorer
            </button>
          </div>

          {/* Card 2: Pro Contractor (Flagship R99) */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#0E1B2E] via-[#0B1626] to-[#0A1320] border-2 border-[#FFC20E] shadow-gold-lg relative flex flex-col justify-between space-y-6">
            {/* Top Recommended Tag */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#FFC20E] text-[#070E17] text-[10px] font-black font-mono uppercase tracking-wider shadow-md flex items-center space-x-1">
              <Sparkles className="w-3 h-3" />
              <span>MOST POPULAR CONTRACTOR TIER</span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-[#FFC20E] uppercase tracking-wider">
                  Pro Contractor
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FFC20E]/20 text-[#FFC20E] border border-[#FFC20E]/40">
                  REAL-TIME ALERTS
                </span>
              </div>

              <div className="flex items-baseline space-x-1 mb-2">
                <span className="text-5xl font-black text-white font-mono">
                  {isAnnual ? "R990" : "R99"}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  /{isAnnual ? "year (R82.50/mo)" : "month"}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                For active contractors bidding in specific provinces who require instant WhatsApp delivery and SBD pre-flight validation.
              </p>

              <div className="mt-6 pt-6 border-t border-[#1F385C] space-y-3">
                {TENDERPULSE_PLANS.PRO.features.map((f, i) => (
                  <div key={i} className="flex items-start space-x-2.5 text-xs text-white font-medium">
                    <Check className="w-4 h-4 text-[#FFC20E] flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleSubscribe("PRO")}
              disabled={loadingPlan === "PRO"}
              className="w-full py-3.5 rounded-xl bg-[#FFC20E] hover:bg-[#E5AD09] text-[#070E17] text-xs font-mono font-black uppercase tracking-wider shadow-gold transition-all flex items-center justify-center space-x-2"
            >
              <span>{loadingPlan === "PRO" ? "Connecting to Paystack..." : "Upgrade To Pro (R99/mo)"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 3: Business Enterprise (R299) */}
          <div className="p-8 rounded-2xl bg-[#09121F] border border-[#15263F] flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Enterprise Growth
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-400 border border-blue-800">
                  NATIONAL / JVs
                </span>
              </div>

              <div className="flex items-baseline space-x-1 mb-2">
                <span className="text-4xl font-black text-white font-mono">
                  {isAnnual ? "R2,990" : "R299"}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  /{isAnnual ? "year" : "month"}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                For national infrastructure consortiums, corporate suppliers, and multi-user tender departments.
              </p>

              <div className="mt-6 pt-6 border-t border-[#15263F] space-y-3">
                {TENDERPULSE_PLANS.BUSINESS.features.map((f, i) => (
                  <div key={i} className="flex items-start space-x-2.5 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleSubscribe("BUSINESS")}
              disabled={loadingPlan === "BUSINESS"}
              className="w-full py-3 rounded-xl bg-[#0E1B2E] hover:bg-[#15263F] text-white border border-[#1F385C] hover:border-white text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center justify-center space-x-2"
            >
              <span>{loadingPlan === "BUSINESS" ? "Connecting..." : "Select Enterprise (R299/mo)"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Security & Payment Badges */}
        <div className="mt-12 text-center space-y-3">
          <div className="inline-flex items-center space-x-4 text-xs font-mono text-slate-400">
            <span className="flex items-center space-x-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Secured by Paystack (256-bit SSL)</span>
            </span>
            <span>•</span>
            <span>Instant EFT (Capitec Pay, Ozow, FNB, Standard Bank)</span>
            <span>•</span>
            <span>Visa & Mastercard</span>
          </div>
        </div>
      </div>
    </section>
  );
}
