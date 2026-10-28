"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Radar, ShieldCheck, Zap, Lock } from "lucide-react";

export default function CTASection() {
  const [email, setEmail] = useState("");

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      window.location.href = `/dashboard?email=${encodeURIComponent(email.trim())}`;
    } else {
      window.location.href = "/dashboard";
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#070E17] via-[#0E1B2E] to-[#050B13] relative overflow-hidden">
      {/* Gold ambient aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-[#FFC20E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#0B1626] border border-[#FFC20E]/40 text-xs font-mono text-[#FFC20E] mb-6 shadow-gold">
          <Zap className="w-3.5 h-3.5 fill-[#FFC20E]" />
          <span>START WINNING MORE GOVERNMENT CONTRACTS</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl mx-auto">
          Equip Your Business With Institutional Tender Intelligence Today
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mt-4 leading-relaxed">
          Join hundreds of emerging South African contractors, civil engineers, IT providers, and suppliers monitoring 1,428+ government tenders in real-time.
        </p>

        {/* Quick form */}
        <form
          onSubmit={handleStart}
          className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row items-center gap-2 p-1.5 rounded-2xl bg-[#09121F] border border-[#1F385C] shadow-2xl"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="director@yourcompany.co.za"
            className="w-full bg-transparent px-4 py-3 text-xs text-white placeholder-slate-400 focus:outline-none font-mono"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#FFC20E] hover:bg-[#E5AD09] text-[#070E17] font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center space-x-1.5 shadow-gold transition-all flex-shrink-0"
          >
            <span>Launch Radar</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Trust bullets */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Black Youth-Owned</span>
          </div>
          <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>B-BBEE Level 1 Contributor</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-[#FFC20E]" />
            <span>Sub-3-Min Alert Dispatch</span>
          </div>
        </div>
      </div>
    </section>
  );
}
