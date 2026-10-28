"use client";

import { useState } from "react";
import {
  Clock,
  MapPin,
  Building,
  Bookmark,
  Share2,
  FileText,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { TenderItem } from "@/lib/mock-data";
import { formatZAR, formatDate, getDaysRemaining } from "@/lib/utils";

interface TenderCardProps {
  tender: TenderItem;
  onInspect: (tender: TenderItem) => void;
  onSaveToggle?: (tenderId: string, newState: boolean) => void;
  isSaved?: boolean;
}

export default function TenderCard({
  tender,
  onInspect,
  onSaveToggle,
  isSaved = false,
}: TenderCardProps) {
  const [saved, setSaved] = useState(isSaved);
  const countdown = getDaysRemaining(tender.closingDate);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !saved;
    setSaved(next);
    if (onSaveToggle) {
      onSaveToggle(tender.id, next);
    }
  };

  return (
    <div
      onClick={() => onInspect(tender)}
      className="p-5 rounded-2xl bg-[#09121F] border border-[#15263F] hover:border-[#FFC20E]/70 transition-all duration-200 cursor-pointer flex flex-col justify-between group shadow-md"
    >
      <div>
        {/* Top Meta Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center space-x-1.5 overflow-hidden">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#0E1B2E] text-slate-300 border border-[#1F385C] truncate">
              {tender.province}
            </span>
            <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
              {tender.department}
            </span>
          </div>

          <div className="flex items-center space-x-2 flex-shrink-0">
            <span
              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded flex items-center space-x-1 ${
                countdown.isUrgent
                  ? "bg-rose-950/70 text-rose-300 border border-rose-500/50"
                  : "bg-[#0E1B2E] text-slate-300 border border-[#1A2E4B]"
              }`}
            >
              <Clock className="w-3 h-3" />
              <span>{countdown.text}</span>
            </span>

            <button
              type="button"
              onClick={handleToggle}
              className={`p-1.5 rounded-lg border transition-colors ${
                saved
                  ? "bg-[#FFC20E]/20 border-[#FFC20E] text-[#FFC20E]"
                  : "bg-[#0E1B2E] border-[#1A2E4B] text-slate-400 hover:text-white"
              }`}
              title={saved ? "Remove from pipeline" : "Save to bid pipeline"}
            >
              <Bookmark className={`w-3.5 h-3.5 ${saved ? "fill-[#FFC20E]" : ""}`} />
            </button>
          </div>
        </div>

        {/* Ref number & Issuing Entity */}
        <div className="text-[11px] font-mono text-[#FFC20E] font-semibold">
          {tender.referenceNumber}
        </div>
        <div className="text-xs text-slate-400 line-clamp-1 mb-2 font-mono">
          {tender.issuingEntity}
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-white group-hover:text-[#FFC20E] transition-colors line-clamp-2 leading-snug mb-3">
          {tender.title}
        </h3>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tender.cidbGrading && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FFC20E]/15 text-[#FFC20E] border border-[#FFC20E]/30 font-bold">
              CIDB: {tender.cidbGrading}
            </span>
          )}
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#0E1B2E] text-slate-300 border border-[#1A2E4B]">
            {tender.category}
          </span>
          {tender.isBriefingCompulsory && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/50 text-amber-300 border border-amber-500/40 flex items-center space-x-1">
              <AlertTriangle className="w-3 h-3 inline" />
              <span>Compulsory Briefing</span>
            </span>
          )}
        </div>
      </div>

      {/* Bottom Value & Actions */}
      <div className="pt-3.5 border-t border-[#15263F] flex items-center justify-between">
        <div>
          <div className="text-[9px] font-mono uppercase text-slate-400">Est. Opportunity</div>
          <div className="text-sm font-black font-mono text-white">
            {formatZAR(tender.estimatedValue)}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-mono font-bold text-[#FFC20E] group-hover:translate-x-1 transition-transform flex items-center space-x-1">
            <span>Inspect</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
