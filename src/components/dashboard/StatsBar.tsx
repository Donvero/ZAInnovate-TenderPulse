import {
  TrendingUp,
  Clock,
  BookmarkCheck,
  Building2,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { formatZAR } from "@/lib/utils";

interface StatsProps {
  totalTenders?: number;
  matchingCount?: number;
  savedCount?: number;
  pipelineValue?: number;
  urgentCount?: number;
}

export default function StatsBar({
  totalTenders = 1428,
  matchingCount = 48,
  savedCount = 4,
  pipelineValue = 43250000,
  urgentCount = 2,
}: StatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
      {/* Stat 1: Matching Bids */}
      <div className="p-4 rounded-xl bg-[#09121F] border border-[#15263F] relative overflow-hidden">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
          <span>MATCHING BIDS</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <div className="text-2xl font-black text-[#FFC20E] font-mono">
          {matchingCount}
        </div>
        <div className="text-[10px] font-mono text-slate-400 mt-1">
          Based on 5GB + EC/Gauteng
        </div>
      </div>

      {/* Stat 2: Pipeline Value */}
      <div className="p-4 rounded-xl bg-[#09121F] border border-[#15263F]">
        <div className="text-[11px] font-mono text-slate-400 mb-1">
          PIPELINE VALUE
        </div>
        <div className="text-2xl font-black text-white font-mono">
          {formatZAR(pipelineValue)}
        </div>
        <div className="text-[10px] font-mono text-emerald-400 mt-1 flex items-center space-x-1">
          <BookmarkCheck className="w-3 h-3 inline" />
          <span>{savedCount} active saved bids</span>
        </div>
      </div>

      {/* Stat 3: Urgent Deadlines */}
      <div className="p-4 rounded-xl bg-[#09121F] border border-rose-950/60">
        <div className="flex items-center justify-between text-[11px] font-mono text-rose-400 mb-1">
          <span>CLOSING THIS WEEK</span>
          <Clock className="w-3.5 h-3.5 text-rose-400" />
        </div>
        <div className="text-2xl font-black text-rose-400 font-mono">
          {urgentCount} Tenders
        </div>
        <div className="text-[10px] font-mono text-slate-400 mt-1">
          Next: 21 Nov 11:00 AM
        </div>
      </div>

      {/* Stat 4: CSD Verification */}
      <div className="p-4 rounded-xl bg-[#09121F] border border-[#15263F]">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
          <span>CSD STATUS</span>
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        </div>
        <div className="text-sm font-bold text-white font-mono flex items-center space-x-1.5 mt-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>TAX COMPLIANT</span>
        </div>
        <div className="text-[10px] font-mono text-slate-400 mt-1">
          MAAA0492104 • Level 1 B-BBEE
        </div>
      </div>
    </div>
  );
}
