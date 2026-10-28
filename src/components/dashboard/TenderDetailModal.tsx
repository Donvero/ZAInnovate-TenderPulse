"use client";

import { useState } from "react";
import {
  X,
  FileText,
  Calendar,
  Clock,
  MapPin,
  Building,
  ShieldCheck,
  Download,
  Bookmark,
  Share2,
  CheckCircle2,
  ExternalLink,
  AlertTriangle,
} from "lucide-react";
import { TenderItem } from "@/lib/mock-data";
import { formatZAR, formatDate, formatDateTime, getDaysRemaining } from "@/lib/utils";

interface Props {
  tender: TenderItem;
  isOpen: boolean;
  onClose: () => void;
}

export default function TenderDetailModal({ tender, isOpen, onClose }: Props) {
  const [saved, setSaved] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  if (!isOpen) return null;

  const countdown = getDaysRemaining(tender.closingDate);

  const handleToggleSave = async () => {
    setSaveLoading(true);
    try {
      if (!saved) {
        await fetch("/api/tenders/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tenderId: tender.id }),
        });
        setSaved(true);
      } else {
        await fetch(`/api/tenders/save?tenderId=${tender.id}`, { method: "DELETE" });
        setSaved(false);
      }
    } catch {
      setSaved(!saved);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleShareWhatsApp = () => {
    const text = `*SA TENDER OPPORTUNITY* - TenderPulse\n*Ref:* ${tender.referenceNumber}\n*Dept:* ${tender.issuingEntity}\n*Title:* ${tender.title}\n*Est Value:* ${formatZAR(tender.estimatedValue)}\n*Closing Date:* ${formatDate(tender.closingDate)}\nCheck it out on TenderPulse: ${window.location.origin}/dashboard/tenders?ref=${tender.referenceNumber}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#070E17] border border-[#1F385C] rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Modal Top Bar */}
        <div className="bg-[#0B1626] border-b border-[#15263F] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#FFC20E]/15 text-[#FFC20E] border border-[#FFC20E]/40">
              OFFICIAL PROCUREMENT DOSSIER
            </span>
            <span className="text-slate-400 font-mono text-xs hidden sm:inline">
              REF: {tender.referenceNumber}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#15263F] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Header Block */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#0E1B2E] text-slate-300 border border-[#1A2E4B]">
                {tender.province}
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#0E1B2E] text-slate-300 border border-[#1A2E4B]">
                {tender.category}
              </span>
              {tender.cidbGrading && (
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#FFC20E]/15 text-[#FFC20E] border border-[#FFC20E]/30 font-bold">
                  CIDB: {tender.cidbGrading}
                </span>
              )}
              <span
                className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded ${
                  countdown.isUrgent
                    ? "bg-rose-950/60 text-rose-300 border border-rose-500/50"
                    : "bg-emerald-950/60 text-emerald-300 border border-emerald-500/50"
                }`}
              >
                {countdown.text}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {tender.title}
            </h2>
            <div className="text-xs text-slate-400 mt-1 font-mono">
              Issuing Authority: <span className="text-white font-medium">{tender.issuingEntity}</span> ({tender.department})
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#09121F] border border-[#15263F]">
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-400">Estimated Budget</div>
              <div className="text-base font-black text-[#FFC20E] font-mono mt-0.5">
                {formatZAR(tender.estimatedValue)}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-mono uppercase text-slate-400">Closing Deadline</div>
              <div className="text-xs font-bold text-white font-mono mt-0.5">
                {formatDate(tender.closingDate)}
              </div>
              <div className="text-[10px] font-mono text-slate-400">11:00 AM SHARP</div>
            </div>

            <div>
              <div className="text-[10px] font-mono uppercase text-slate-400">CIDB Required</div>
              <div className="text-xs font-bold text-[#FFC20E] font-mono mt-0.5">
                {tender.cidbGrading || "Not Applicable"}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-mono uppercase text-slate-400">Target Province</div>
              <div className="text-xs font-bold text-white font-mono mt-0.5">
                {tender.province}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Scope of Works / Specification Summary
            </h4>
            <div className="p-4 rounded-xl bg-[#0B1626] border border-[#15263F] text-xs text-slate-300 leading-relaxed">
              {tender.description}
            </div>
          </div>

          {/* Briefing Session Banner */}
          {tender.briefingSessionVenue && (
            <div
              className={`p-4 rounded-xl border flex items-start space-x-3 ${
                tender.isBriefingCompulsory
                  ? "bg-amber-950/30 border-amber-500/40"
                  : "bg-[#0E1B2E] border-[#1F385C]"
              }`}
            >
              <AlertTriangle
                className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                  tender.isBriefingCompulsory ? "text-amber-400" : "text-slate-400"
                }`}
              />
              <div className="text-xs space-y-1">
                <div className="font-bold text-white flex items-center space-x-2">
                  <span>
                    {tender.isBriefingCompulsory
                      ? "COMPULSORY BRIEFING SESSION REQUIRED"
                      : "Optional Clarification Briefing"}
                  </span>
                </div>
                <div className="text-slate-300">
                  <span className="font-semibold text-white">Date & Time: </span>
                  {tender.briefingSessionDate ? formatDateTime(tender.briefingSessionDate) : "Refer to document"}
                </div>
                <div className="text-slate-400">
                  <span className="font-semibold text-white">Venue: </span>
                  {tender.briefingSessionVenue}
                </div>
                {tender.isBriefingCompulsory && (
                  <p className="text-[11px] text-amber-300 font-mono mt-1">
                    *Attendance register must be signed on site. Failure to attend results in immediate disqualification.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Required Standard Bidding Documents (SBD) */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Mandatory SBD Compliance Checklist
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {tender.requiredSbd.map((sbd) => (
                <div
                  key={sbd}
                  className="p-2.5 rounded-lg bg-[#0E1B2E] border border-[#1A2E4B] flex items-center space-x-2 text-xs font-mono text-slate-200"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>{sbd}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Official Document Downloads */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Tender RFP & Specification Downloads
            </h4>
            <div className="space-y-2">
              {tender.documentUrls.map((doc, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#09121F] border border-[#15263F] flex items-center justify-between hover:border-[#FFC20E]/40 transition-colors"
                >
                  <div className="flex items-center space-x-2.5">
                    <FileText className="w-4 h-4 text-[#FFC20E]" />
                    <div>
                      <div className="text-xs font-mono font-medium text-white">{doc.name}</div>
                      <div className="text-[10px] font-mono text-slate-400">{doc.size} • Official National Treasury Archive</div>
                    </div>
                  </div>
                  <a
                    href={tender.originalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-[#0E1B2E] hover:bg-[#FFC20E] text-slate-300 hover:text-[#070E17] border border-[#1F385C] text-xs font-mono flex items-center space-x-1.5 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* SCM Contact Person */}
          <div className="p-3.5 rounded-xl bg-[#09121F] border border-[#15263F] text-xs font-mono space-y-1">
            <div className="text-[10px] uppercase text-slate-400">SCM Enquiries Officer:</div>
            <div className="text-white font-semibold">{tender.contactPerson}</div>
            <div className="text-slate-300">Email: {tender.contactEmail} | Tel: {tender.contactPhone}</div>
          </div>
        </div>

        {/* Modal Sticky Bottom Actions */}
        <div className="p-4 sm:px-6 bg-[#0B1626] border-t border-[#15263F] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleToggleSave}
              disabled={saveLoading}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center space-x-2 border transition-all ${
                saved
                  ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                  : "bg-[#0E1B2E] border-[#1F385C] text-slate-200 hover:border-[#FFC20E]"
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${saved ? "fill-emerald-400" : ""}`} />
              <span>{saved ? "Saved in Pipeline" : "Save to Bid Pipeline"}</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="px-3 py-2 rounded-xl bg-[#0E1B2E] border border-[#1F385C] hover:border-emerald-500 text-slate-300 hover:text-emerald-400 text-xs font-mono flex items-center space-x-1.5 transition-all"
              title="Share via WhatsApp"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
          </div>

          <a
            href={tender.originalUrl}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#FFC20E] hover:bg-[#E5AD09] text-[#070E17] font-bold text-xs font-mono flex items-center space-x-1.5 shadow-gold transition-all"
          >
            <span>Open on eTenders.gov.za</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
