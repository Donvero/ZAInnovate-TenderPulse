import Link from "next/link";
import { Radar, ShieldCheck, MapPin, Mail, Phone, ExternalLink } from "lucide-react";
import { SA_PROVINCES } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="bg-[#050B13] border-t border-[#15263F] text-slate-400 text-sm">
      {/* Top Banner */}
      <div className="border-b border-[#121F33] py-8 bg-[#070E17]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-[#0E1B2E] border border-[#FFC20E]/50 flex items-center justify-center">
              <Radar className="w-5 h-5 text-[#FFC20E]" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">TenderPulse SA Procurement Terminal</h4>
              <p className="text-xs text-slate-400">
                A software product designed & engineered by{" "}
                <span className="text-[#FFC20E] font-semibold">ZAInnovate Technologies (Pty) Ltd</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3 py-1.5 rounded-md bg-[#0E1B2E] border border-[#1F385C] text-xs font-mono text-slate-300 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Black Youth-Owned Enterprise</span>
            </div>
            <div className="px-3 py-1.5 rounded-md bg-[#FFC20E]/10 border border-[#FFC20E]/40 text-xs font-mono text-[#FFC20E] font-semibold flex items-center space-x-1.5">
              <span>B-BBEE LEVEL 1 CONTRIBUTOR (135% RECOGNITION)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Col 1: About */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-black text-white">
              Tender<span className="text-[#FFC20E]">Pulse</span>
            </span>
          </div>
          <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
            TenderPulse is South Africa’s premier procurement intelligence engine. We monitor National Treasury eTenders, CIDB bulletins, Transnet, Eskom, and provincial departments around the clock, notifying emerging contractors and SMMEs within minutes of tender releases.
          </p>

          <div className="space-y-2 pt-2 text-xs font-mono text-slate-300">
            <div className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-[#FFC20E]" />
              <span>East London, Eastern Cape, South Africa</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-[#FFC20E]" />
              <span>procurement@zainnovate.co.za</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-3.5 h-3.5 text-[#FFC20E]" />
              <span>WhatsApp Terminal Desk: +27 (0)43 700 0000</span>
            </div>
          </div>
        </div>

        {/* Col 2: Provinces */}
        <div>
          <h5 className="text-white font-mono text-xs font-bold uppercase tracking-wider mb-4 text-[#FFC20E]">
            Tenders By Province
          </h5>
          <ul className="space-y-2 text-xs">
            {SA_PROVINCES.slice(0, 7).map((p) => (
              <li key={p}>
                <Link
                  href={`/dashboard/tenders?province=${encodeURIComponent(p)}`}
                  className="hover:text-[#FFC20E] transition-colors"
                >
                  {p} Tenders
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/dashboard/tenders"
                className="text-[#FFC20E] font-medium hover:underline inline-flex items-center"
              >
                View all 9 Provinces &rarr;
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Categories */}
        <div>
          <h5 className="text-white font-mono text-xs font-bold uppercase tracking-wider mb-4 text-[#FFC20E]">
            Top Sectors
          </h5>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/dashboard/tenders?category=construction" className="hover:text-[#FFC20E]">
                Construction & Infrastructure (CIDB)
              </Link>
            </li>
            <li>
              <Link href="/dashboard/tenders?category=it-technology" className="hover:text-[#FFC20E]">
                IT & Cloud Services
              </Link>
            </li>
            <li>
              <Link href="/dashboard/tenders?category=ppe-safety" className="hover:text-[#FFC20E]">
                PPE & Workwear Supply
              </Link>
            </li>
            <li>
              <Link href="/dashboard/tenders?category=security" className="hover:text-[#FFC20E]">
                Security Guarding & PSIRA
              </Link>
            </li>
            <li>
              <Link href="/dashboard/tenders?category=cleaning" className="hover:text-[#FFC20E]">
                Deep Cleaning & Hygiene
              </Link>
            </li>
            <li>
              <Link href="/dashboard/tenders?category=transport" className="hover:text-[#FFC20E]">
                Fleet & Logistics
              </Link>
            </li>
            <li>
              <Link href="/dashboard/tenders?category=consulting" className="hover:text-[#FFC20E]">
                Advisory & Consulting
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Compliance & Tools */}
        <div>
          <h5 className="text-white font-mono text-xs font-bold uppercase tracking-wider mb-4 text-[#FFC20E]">
            Contractor Tools
          </h5>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/dashboard/compliance" className="hover:text-[#FFC20E]">
                SBD 1, 4, 6.1 Form Pack
              </Link>
            </li>
            <li>
              <Link href="/dashboard/compliance#csd" className="hover:text-[#FFC20E]">
                CSD MAAA Verification Guide
              </Link>
            </li>
            <li>
              <Link href="/dashboard/compliance#cidb" className="hover:text-[#FFC20E]">
                CIDB Grade Thresholds (1-9)
              </Link>
            </li>
            <li>
              <Link href="/dashboard/compliance#pppfa" className="hover:text-[#FFC20E]">
                80/20 & 90/10 PPPFA Calculator
              </Link>
            </li>
            <li>
              <Link href="/dashboard/billing" className="hover:text-[#FFC20E]">
                Paystack Billing Portal (R99/mo)
              </Link>
            </li>
            <li>
              <a
                href="https://www.etenders.gov.za"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white inline-flex items-center space-x-1"
              >
                <span>National Treasury eTenders</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#121F33] py-6 bg-[#04080F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            &copy; {new Date().getFullYear()} ZAInnovate Technologies (Pty) Ltd. Reg No: 2023/128392/07. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-slate-400 cursor-pointer">POPIA Compliant</span>
            <span className="hover:text-slate-400 cursor-pointer">PAIA Manual</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Privacy Notice</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
