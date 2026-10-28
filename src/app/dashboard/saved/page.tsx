"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookmarkCheck,
  Clock,
  Building,
  CheckCircle2,
  Trash2,
  ExternalLink,
  Plus,
  ArrowRight,
  TrendingUp,
  FileText,
} from "lucide-react";
import { MOCK_TENDERS, TenderItem } from "@/lib/mock-data";
import { formatZAR, formatDate, getDaysRemaining } from "@/lib/utils";
import TenderDetailModal from "@/components/dashboard/TenderDetailModal";

interface PipelineItem {
  tender: TenderItem;
  stage: "INTERESTED" | "PREPARING_DOCS" | "SUBMITTED" | "WON";
  notes: string;
}

const INITIAL_PIPELINE: PipelineItem[] = [
  {
    tender: MOCK_TENDERS[0], // Eastern Cape Schools R14.8M
    stage: "PREPARING_DOCS",
    notes: "Compulsory briefing attended. Quantity surveyor completing Bill of Quantities (BoQ).",
  },
  {
    tender: MOCK_TENDERS[1], // Gauteng Cloud R28.5M
    stage: "PREPARING_DOCS",
    notes: "Joint venture agreement with cybersecurity specialist signed. Drafting technical proposal.",
  },
  {
    tender: MOCK_TENDERS[3], // Cape Town PPE R6.4M
    stage: "INTERESTED",
    notes: "SABS local content verification required for safety boots.",
  },
  {
    tender: MOCK_TENDERS[4], // KZN Health Cleaning R8.9M
    stage: "SUBMITTED",
    notes: "Envelope deposited in provincial tender box in Pietermaritzburg. Awaiting public opening.",
  },
];

export default function SavedPipelinePage() {
  const [pipeline, setPipeline] = useState<PipelineItem[]>(INITIAL_PIPELINE);
  const [selectedStage, setSelectedStage] = useState<string>("ALL");
  const [selectedTender, setSelectedTender] = useState<TenderItem | null>(null);

  const filtered = pipeline.filter((item) => {
    if (selectedStage === "ALL") return true;
    return item.stage === selectedStage;
  });

  const totalValue = pipeline.reduce(
    (acc, curr) => acc + (curr.tender.estimatedValue || 0),
    0
  );

  const handleRemove = (id: string) => {
    setPipeline(pipeline.filter((p) => p.tender.id !== id));
  };

  const handleStageChange = (
    id: string,
    newStage: "INTERESTED" | "PREPARING_DOCS" | "SUBMITTED" | "WON"
  ) => {
    setPipeline(
      pipeline.map((p) => (p.tender.id === id ? { ...p, stage: newStage } : p))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-[#09121F] border border-[#15263F] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#FFC20E] mb-1">
            <BookmarkCheck className="w-4 h-4" />
            <span>CONTRACTOR ACTIVE PIPELINE CRM</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Saved & Active Bid Submissions
          </h1>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Track your proposals from expression of interest to tender box delivery
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#070E17] border border-[#1F385C] text-right">
          <div className="text-[10px] font-mono uppercase text-slate-400">Total Pipeline Value</div>
          <div className="text-xl font-black text-[#FFC20E] font-mono">
            {formatZAR(totalValue)}
          </div>
        </div>
      </div>

      {/* Stage Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-[#15263F] text-xs font-mono">
        <button
          onClick={() => setSelectedStage("ALL")}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            selectedStage === "ALL"
              ? "bg-[#0E1B2E] text-[#FFC20E] border border-[#FFC20E]/40 font-bold"
              : "text-slate-400 hover:text-white"
          }`}
        >
          All Stages ({pipeline.length})
        </button>
        <button
          onClick={() => setSelectedStage("INTERESTED")}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            selectedStage === "INTERESTED"
              ? "bg-[#0E1B2E] text-[#FFC20E] border border-[#FFC20E]/40 font-bold"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Interested ({pipeline.filter((p) => p.stage === "INTERESTED").length})
        </button>
        <button
          onClick={() => setSelectedStage("PREPARING_DOCS")}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            selectedStage === "PREPARING_DOCS"
              ? "bg-[#0E1B2E] text-[#FFC20E] border border-[#FFC20E]/40 font-bold"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Preparing BoQ / RFP ({pipeline.filter((p) => p.stage === "PREPARING_DOCS").length})
        </button>
        <button
          onClick={() => setSelectedStage("SUBMITTED")}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            selectedStage === "SUBMITTED"
              ? "bg-[#0E1B2E] text-[#FFC20E] border border-[#FFC20E]/40 font-bold"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Submitted in Tender Box ({pipeline.filter((p) => p.stage === "SUBMITTED").length})
        </button>
      </div>

      {/* Pipeline List */}
      <div className="space-y-4">
        {filtered.map((item) => {
          const countdown = getDaysRemaining(item.tender.closingDate);

          return (
            <div
              key={item.tender.id}
              className="p-5 rounded-2xl bg-[#09121F] border border-[#15263F] hover:border-[#1F385C] transition-all space-y-4"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#121F33]">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-[10px] font-mono">
                    <span className="text-[#FFC20E] font-bold">
                      {item.tender.referenceNumber}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-300">{item.tender.issuingEntity}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-400">{item.tender.province}</span>
                  </div>

                  <h3 className="text-base font-bold text-white">
                    {item.tender.title}
                  </h3>
                </div>

                <div className="flex items-center space-x-3 flex-shrink-0">
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded flex items-center space-x-1 ${
                      countdown.isUrgent
                        ? "bg-rose-950/60 text-rose-300 border border-rose-500/50"
                        : "bg-[#0E1B2E] text-slate-300 border border-[#1A2E4B]"
                    }`}
                  >
                    <Clock className="w-3 h-3" />
                    <span>{countdown.text}</span>
                  </span>

                  <span className="text-sm font-black font-mono text-[#FFC20E]">
                    {formatZAR(item.tender.estimatedValue)}
                  </span>
                </div>
              </div>

              {/* Stage selector & Notes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                <div>
                  <label className="text-[10px] uppercase text-slate-400 mb-1 block">
                    Pipeline Status
                  </label>
                  <select
                    value={item.stage}
                    onChange={(e) =>
                      handleStageChange(item.tender.id, e.target.value as any)
                    }
                    className="w-full bg-[#0B1626] border border-[#1A2E4B] text-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-[#FFC20E]"
                  >
                    <option value="INTERESTED">Interested (Reviewing Spec)</option>
                    <option value="PREPARING_DOCS">Preparing BoQ & Proposal</option>
                    <option value="SUBMITTED">Submitted in Tender Box</option>
                    <option value="WON">Contract Awarded (Won!)</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="text-[10px] uppercase text-slate-400 mb-1 block">
                    Estimating Notes / SBD Status
                  </label>
                  <div className="p-2 rounded-lg bg-[#070E17] border border-[#15263F] text-slate-300 text-xs">
                    {item.notes}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-between text-xs font-mono">
                <button
                  onClick={() => handleRemove(item.tender.id)}
                  className="text-slate-500 hover:text-red-400 flex items-center space-x-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove from pipeline</span>
                </button>

                <div className="flex items-center space-x-2">
                  <Link
                    href="/dashboard/compliance"
                    className="px-3 py-1.5 rounded-lg bg-[#0E1B2E] text-slate-300 hover:text-white border border-[#1F385C] flex items-center space-x-1"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>SBD Checklist</span>
                  </Link>

                  <button
                    onClick={() => setSelectedTender(item.tender)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#FFC20E] text-[#070E17] font-bold hover:bg-[#E5AD09] flex items-center space-x-1 shadow-gold"
                  >
                    <span>Inspect RFP Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selectedTender && (
        <TenderDetailModal
          tender={selectedTender}
          isOpen={!!selectedTender}
          onClose={() => setSelectedTender(null)}
        />
      )}
    </div>
  );
}
