"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Filter,
  Sliders,
  RotateCcw,
  Clock,
  MapPin,
  Building,
  Bookmark,
  Share2,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import TenderFilter from "@/components/dashboard/TenderFilter";
import TenderCard from "@/components/dashboard/TenderCard";
import TenderDetailModal from "@/components/dashboard/TenderDetailModal";
import { MOCK_TENDERS, TenderItem } from "@/lib/mock-data";

export default function TendersBrowserPage() {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    query: searchParams.get("query") || "",
    province: searchParams.get("province") || "all",
    category: searchParams.get("category") || "all",
    cidb: searchParams.get("cidb") || "all",
    status: searchParams.get("status") || "ALL",
    sort: "deadline",
  });

  const [tenders, setTenders] = useState<TenderItem[]>(MOCK_TENDERS);
  const [loading, setLoading] = useState(false);
  const [selectedTender, setSelectedTender] = useState<TenderItem | null>(null);

  // Apply filters locally or via API
  useEffect(() => {
    let filtered = [...MOCK_TENDERS];

    if (filters.query) {
      const q = filters.query.toLowerCase();
      filtered = filtered.filter((t) => {
        const text = `${t.title} ${t.referenceNumber} ${t.issuingEntity} ${t.description}`.toLowerCase();
        return text.includes(q);
      });
    }

    if (filters.province && filters.province !== "all") {
      filtered = filtered.filter(
        (t) => t.province === filters.province || t.province === "National (Countrywide)"
      );
    }

    if (filters.category && filters.category !== "all") {
      filtered = filtered.filter(
        (t) =>
          t.categorySlug.toLowerCase() === filters.category.toLowerCase() ||
          t.category.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    if (filters.cidb && filters.cidb !== "all") {
      filtered = filtered.filter(
        (t) => t.cidbGrading && t.cidbGrading.includes(filters.cidb)
      );
    }

    if (filters.status && filters.status !== "ALL") {
      filtered = filtered.filter((t) => t.status === filters.status);
    }

    if (filters.sort === "deadline") {
      filtered.sort(
        (a, b) => new Date(a.closingDate).getTime() - new Date(b.closingDate).getTime()
      );
    } else if (filters.sort === "value_desc") {
      filtered.sort((a, b) => (b.estimatedValue || 0) - (a.estimatedValue || 0));
    } else if (filters.sort === "value_asc") {
      filtered.sort((a, b) => (a.estimatedValue || 0) - (b.estimatedValue || 0));
    }

    setTenders(filtered);
  }, [filters]);

  const handleReset = () => {
    setFilters({
      query: "",
      province: "all",
      category: "all",
      cidb: "all",
      status: "ALL",
      sort: "deadline",
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight font-sans">
            National Tender Browser
          </h1>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Aggregated across National Treasury eTenders, CIDB bulletins, Transnet, Eskom & 9 Provinces
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300">STATUS: CRAWLER ONLINE</span>
        </div>
      </div>

      {/* Filter Component */}
      <TenderFilter
        filters={filters}
        onChange={setFilters}
        onReset={handleReset}
        totalResults={tenders.length}
      />

      {/* Tenders Grid */}
      {tenders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tenders.map((tender) => (
            <TenderCard
              key={tender.id}
              tender={tender}
              onInspect={(t) => setSelectedTender(t)}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-[#09121F] border border-[#15263F] space-y-3">
          <p className="text-sm font-mono text-slate-400">
            No government tenders matched your current filter combinations.
          </p>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-[#0E1B2E] text-[#FFC20E] border border-[#FFC20E]/40 text-xs font-mono font-bold"
          >
            Clear Filters & View All
          </button>
        </div>
      )}

      {/* Detail Dossier Modal */}
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
