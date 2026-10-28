"use client";

import { useState } from "react";
import {
  FileCheck2,
  ShieldCheck,
  Calculator,
  AlertTriangle,
  Download,
  CheckCircle2,
  Info,
} from "lucide-react";
import { calculatePPPFA, formatZAR } from "@/lib/utils";

const SBD_FORMS = [
  {
    code: "SBD 1",
    title: "Invitation to Bid & Terms of Submission",
    purpose: "Mandatory official bid acknowledgement signed by director or delegated authority.",
    risk: "Immediate administrative disqualification if missing or unsigned.",
    downloadName: "SBD_1_Invitation_To_Bid.pdf",
  },
  {
    code: "SBD 4",
    title: "Declaration of Interest & Past SCM Conduct",
    purpose: "Discloses any relationship or employment by an organ of state (Treasury Regulation 16A9).",
    risk: "Failure to declare family in state service can lead to blacklisting on CSD database.",
    downloadName: "SBD_4_Declaration_Of_Interest.pdf",
  },
  {
    code: "SBD 6.1",
    title: "Preference Points Claim Form (PPPFA)",
    purpose: "Form required to claim 20 points (for bids <= R50M) or 10 points (for bids > R50M) based on B-BBEE status.",
    risk: "If omitted, bid receives 0 preference points and is scored only on price.",
    downloadName: "SBD_6_1_Preference_Points.pdf",
  },
  {
    code: "CSD Report",
    title: "Central Supplier Database (MAAA Number)",
    purpose: "Proof of active tax compliance status (TCS PIN) and banking verification.",
    risk: "Tender cannot be awarded if Tax Compliance PIN is red/inactive at time of evaluation.",
    downloadName: "CSD_Registration_Guide.pdf",
  },
];

export default function SbdChecklist() {
  // PPPFA Calculator State
  const [bidPrice, setBidPrice] = useState("4500000");
  const [lowestPrice, setLowestPrice] = useState("4200000");
  const [system, setSystem] = useState<"80/20" | "90/10">("80/20");
  const [bbeeLevel, setBbeeLevel] = useState(1);

  const calcResult = calculatePPPFA({
    bidPrice: parseFloat(bidPrice) || 0,
    lowestPrice: parseFloat(lowestPrice) || 1,
    system,
    bbbEeLevel: bbeeLevel,
  });

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-[#09121F] border border-[#15263F] space-y-2">
        <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-mono font-bold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>PHASE 1 ADMINISTRATIVE COMPLIANCE VAULT</span>
        </div>
        <h2 className="text-xl font-bold text-white">
          Standard Bidding Documents (SBD) & PPPFA Intelligence
        </h2>
        <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
          In South African public procurement, bids are evaluated in stages: (1) Mandatory Administrative Compliance, (2) Functionality/Technical threshold (usually 70%), and (3) 80/20 or 90/10 Price and B-BBEE. Never get disqualified at stage 1.
        </p>
      </div>

      {/* SBD Document Directory */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center space-x-2">
          <FileCheck2 className="w-4 h-4 text-[#FFC20E]" />
          <span>MANDATORY SBD / MBD PACKS (DOWNLOAD TEMPLATES)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SBD_FORMS.map((form) => (
            <div
              key={form.code}
              className="p-5 rounded-xl bg-[#0B1626] border border-[#1A2E4B] hover:border-[#FFC20E]/40 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#FFC20E]/15 text-[#FFC20E] border border-[#FFC20E]/30">
                    {form.code}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>MANDATORY</span>
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mb-1">{form.title}</h4>
                <p className="text-xs text-slate-400 mb-2 leading-relaxed">{form.purpose}</p>

                <div className="p-2.5 rounded-lg bg-red-950/30 border border-red-500/30 text-[11px] font-mono text-red-300">
                  <span className="font-bold">Disqualification Risk: </span>
                  {form.risk}
                </div>
              </div>

              <div className="pt-3 border-t border-[#15263F] flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">{form.downloadName}</span>
                <button
                  onClick={() => alert(`Downloading official National Treasury template: ${form.downloadName}`)}
                  className="px-3 py-1.5 rounded-lg bg-[#0E1B2E] hover:bg-[#FFC20E] text-slate-300 hover:text-[#070E17] border border-[#1F385C] flex items-center space-x-1.5 transition-all font-semibold"
                >
                  <Download className="w-3 h-3" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PPPFA 80/20 & 90/10 Interactive Simulator */}
      <div className="p-6 rounded-2xl bg-[#0B1626] border border-[#FFC20E]/40 shadow-gold space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#15263F]">
          <div className="flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-[#FFC20E]" />
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              PPPFA PREFERENTIAL PROCUREMENT SCORING CALCULATOR
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            TREASURY PPPFA 2022 ACT
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-[10px] font-mono uppercase text-slate-400 mb-1 block">
              Evaluation System
            </label>
            <select
              value={system}
              onChange={(e) => setSystem(e.target.value as any)}
              className="w-full bg-[#070E17] border border-[#1A2E4B] rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#FFC20E]"
            >
              <option value="80/20">80/20 System (Tenders up to R50 Million)</option>
              <option value="90/10">90/10 System (Tenders over R50 Million)</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase text-slate-400 mb-1 block">
              Your Tender Bid Price (ZAR)
            </label>
            <input
              type="number"
              value={bidPrice}
              onChange={(e) => setBidPrice(e.target.value)}
              className="w-full bg-[#070E17] border border-[#1A2E4B] rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#FFC20E]"
            />
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase text-slate-400 mb-1 block">
              Expected Lowest Responsive Bid (ZAR)
            </label>
            <input
              type="number"
              value={lowestPrice}
              onChange={(e) => setLowestPrice(e.target.value)}
              className="w-full bg-[#070E17] border border-[#1A2E4B] rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#FFC20E]"
            />
          </div>

          <div>
            <label className="text-[10px] font-mono uppercase text-slate-400 mb-1 block">
              Your B-BBEE Contributor Level
            </label>
            <select
              value={bbeeLevel}
              onChange={(e) => setBbeeLevel(parseInt(e.target.value))}
              className="w-full bg-[#070E17] border border-[#1A2E4B] rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#FFC20E]"
            >
              <option value={1}>Level 1 (135% Recognition - 20/10 pts)</option>
              <option value={2}>Level 2 (125% Recognition - 18/9 pts)</option>
              <option value={3}>Level 3 (110% Recognition - 14/6 pts)</option>
              <option value={4}>Level 4 (100% Recognition - 12/5 pts)</option>
              <option value={5}>Level 5 (80% Recognition - 8/4 pts)</option>
              <option value={6}>Level 6 (60% Recognition - 6/3 pts)</option>
              <option value={7}>Level 7 (50% Recognition - 4/2 pts)</option>
              <option value={8}>Level 8 (10% Recognition - 2/1 pts)</option>
              <option value={9}>Non-Compliant (0 pts)</option>
            </select>
          </div>
        </div>

        {/* Calculation Result HUD */}
        <div className="p-4 rounded-xl bg-[#070E17] border border-[#1A2E4B] grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-[10px] font-mono uppercase text-slate-400">
              Price Score (Ps)
            </div>
            <div className="text-2xl font-black text-white font-mono mt-0.5">
              {calcResult.pricePoints} / {system === "80/20" ? "80" : "90"}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono uppercase text-slate-400">
              B-BBEE Preference Points
            </div>
            <div className="text-2xl font-black text-[#FFC20E] font-mono mt-0.5">
              {calcResult.bbeePoints} / {system === "80/20" ? "20" : "10"}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono uppercase text-slate-400">
              Final Composite Score
            </div>
            <div className="text-2xl font-black text-emerald-400 font-mono mt-0.5">
              {calcResult.totalPoints} / 100
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
