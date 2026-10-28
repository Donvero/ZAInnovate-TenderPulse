"use client";

import {
  Search,
  Filter,
  RotateCcw,
  MapPin,
  Tag,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import { SA_PROVINCES, SA_TENDER_CATEGORIES, CIDB_GRADINGS } from "@/lib/utils";

interface FilterState {
  query: string;
  province: string;
  category: string;
  cidb: string;
  status: string;
  sort: string;
}

interface TenderFilterProps {
  filters: FilterState;
  onChange: (newFilters: FilterState) => void;
  onReset: () => void;
  totalResults: number;
}

export default function TenderFilter({
  filters,
  onChange,
  onReset,
  totalResults,
}: TenderFilterProps) {
  const update = (key: keyof FilterState, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-[#09121F] border border-[#15263F] space-y-4">
      {/* Top row: search + sort + count */}
      <div className="flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by tender reference (e.g. SCMU5, SANRAL, CPT) or description..."
            value={filters.query}
            onChange={(e) => update("query", e.target.value)}
            className="w-full bg-[#0B1626] border border-[#1A2E4B] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#FFC20E] font-mono"
          />
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto">
          {/* Sort selector */}
          <select
            value={filters.sort}
            onChange={(e) => update("sort", e.target.value)}
            className="bg-[#0B1626] border border-[#1A2E4B] text-slate-300 rounded-xl px-3 py-2.5 text-xs font-mono focus:outline-none focus:border-[#FFC20E]"
          >
            <option value="deadline">Sort: Deadline (Nearest First)</option>
            <option value="value_desc">Sort: Budget (Highest First)</option>
            <option value="value_asc">Sort: Budget (Lowest First)</option>
          </select>

          <button
            onClick={onReset}
            className="px-3 py-2.5 rounded-xl bg-[#0E1B2E] border border-[#1A2E4B] hover:border-slate-500 text-slate-400 hover:text-white text-xs font-mono flex items-center space-x-1.5 transition-colors"
            title="Reset Filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Second row: dropdown filters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-[#121F33]">
        {/* Province */}
        <div>
          <label className="text-[10px] font-mono uppercase text-slate-400 mb-1 block">
            Target Province
          </label>
          <select
            value={filters.province}
            onChange={(e) => update("province", e.target.value)}
            className="w-full bg-[#0B1626] border border-[#1A2E4B] text-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-[#FFC20E]"
          >
            <option value="all">All 9 Provinces</option>
            {SA_PROVINCES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="text-[10px] font-mono uppercase text-slate-400 mb-1 block">
            Industry Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => update("category", e.target.value)}
            className="w-full bg-[#0B1626] border border-[#1A2E4B] text-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-[#FFC20E]"
          >
            <option value="all">All Sectors</option>
            {SA_TENDER_CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* CIDB Grading */}
        <div>
          <label className="text-[10px] font-mono uppercase text-slate-400 mb-1 block">
            CIDB Contractor Grade
          </label>
          <select
            value={filters.cidb}
            onChange={(e) => update("cidb", e.target.value)}
            className="w-full bg-[#0B1626] border border-[#1A2E4B] text-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-[#FFC20E]"
          >
            <option value="all">All CIDB / Any</option>
            <option value="1">Grade 1 (Up to R500k)</option>
            <option value="2">Grade 2 (Up to R1M)</option>
            <option value="3">Grade 3 (Up to R3M)</option>
            <option value="4">Grade 4 (Up to R6M)</option>
            <option value="5">Grade 5 (Up to R10M)</option>
            <option value="6">Grade 6 (Up to R20M)</option>
            <option value="7">Grade 7 (Up to R60M)</option>
            <option value="8">Grade 8 (Up to R200M)</option>
            <option value="9">Grade 9 (Unlimited)</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="text-[10px] font-mono uppercase text-slate-400 mb-1 block">
            Deadline Window
          </label>
          <select
            value={filters.status}
            onChange={(e) => update("status", e.target.value)}
            className="w-full bg-[#0B1626] border border-[#1A2E4B] text-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-mono focus:outline-none focus:border-[#FFC20E]"
          >
            <option value="ALL">All Active Notices</option>
            <option value="OPEN">Open (Standard Window)</option>
            <option value="CLOSING_SOON">Closing Soon (&lt; 5 Days)</option>
          </select>
        </div>
      </div>

      {/* Filter results count banner */}
      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
        <span>
          SHOWING: <strong className="text-white">{totalResults}</strong> ACTIVE TENDER DOSSIERS
        </span>
        <span className="text-[#FFC20E] hidden sm:inline">
          NATIONAL TREASURY ETENDERS SYNC ACTIVE
        </span>
      </div>
    </div>
  );
}
