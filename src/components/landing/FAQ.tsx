"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQS = [
  {
    q: "Where does TenderPulse source its tender data?",
    a: "TenderPulse continuously queries and aggregates notices from National Treasury's eTender Portal (etenders.gov.za), the Construction Industry Development Board (CIDB i-Tender), Transnet, Eskom, SANRAL, ACSA, and all 9 provincial government gazettes and metropolitan municipalities.",
  },
  {
    q: "How fast are the WhatsApp alerts dispatched?",
    a: "Under 3 minutes. Our automated radar continuously scans public portals every 60 seconds. The moment an organ of state publishes a new RFP or addendum matching your alert criteria, our gateway formats a compact briefing and pushes it to your WhatsApp.",
  },
  {
    q: "How does the R99/month billing work with Paystack?",
    a: "Payments are processed in South African Rand (ZAR) via Paystack, South Africa's premier licensed payment gateway. We accept Visa, Mastercard, Capitec Pay, and Instant EFT (Ozow/SiD). Your subscription renews monthly and can be paused or cancelled with 1 click anytime.",
  },
  {
    q: "What is the SBD compliance checker?",
    a: "Over 70% of contractor bids in South Africa are disqualified during phase-one administrative compliance due to missing SBD forms (such as SBD 4 Declaration of Interest or SBD 6.1 B-BBEE points claim), expired CSD tax pins, or unsigned joint venture declarations. TenderPulse generates a mandatory pre-flight checklist for each specific tender.",
  },
  {
    q: "Can I filter by CIDB contractor grading (e.g. 1GB to 9CE)?",
    a: "Yes! Construction contractors can filter exclusively for their CIDB grading (e.g. 1CE, 3GB, 5ME, 7EE). You will never waste time reviewing 8GB tenders if your registration is currently 4GB.",
  },
  {
    q: "Who is behind TenderPulse?",
    a: "TenderPulse is engineered and maintained by ZAInnovate Technologies (Pty) Ltd — a 100% Black Youth-Owned, B-BBEE Level 1 technology company based in East London, Eastern Cape, South Africa.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-20 bg-[#070E17] border-b border-[#15263F]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0E1B2E] border border-[#1F385C] text-xs font-mono text-[#FFC20E] mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>CONTRACTOR FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Everything You Need To Know Before Subscribing
          </h2>
          <p className="text-sm text-slate-400 mt-2 font-mono">
            Clear, transparent answers for South African entrepreneurs & estimators
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-[#09121F] border border-[#15263F] overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between text-sm font-bold text-white hover:text-[#FFC20E] transition-colors"
                >
                  <span className="font-sans pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#FFC20E] flex-shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed font-sans border-t border-[#121F33]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
