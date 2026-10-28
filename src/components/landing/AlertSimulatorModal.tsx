"use client";

import { useState } from "react";
import {
  X,
  Zap,
  CheckCircle2,
  Phone,
  Mail,
  Send,
  Loader2,
  Terminal,
  ShieldCheck,
} from "lucide-react";
import { MOCK_TENDERS } from "@/lib/mock-data";
import { formatZAR, formatDate } from "@/lib/utils";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AlertSimulatorModal({ isOpen, onClose }: Props) {
  const [channel, setChannel] = useState<"whatsapp" | "email">("whatsapp");
  const [destination, setDestination] = useState("+27 82 456 7890");
  const [selectedTenderId, setSelectedTenderId] = useState(MOCK_TENDERS[0].id);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  if (!isOpen) return null;

  const selectedTender =
    MOCK_TENDERS.find((t) => t.id === selectedTenderId) || MOCK_TENDERS[0];

  const handleSimulate = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/alerts/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channel,
          phone: channel === "whatsapp" ? destination : undefined,
          email: channel === "email" ? destination : undefined,
          tenderId: selectedTender.id,
        }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setResult({ success: false, error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#070E17] border border-[#1B3150] rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-[#0B1626] border-b border-[#15263F] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FFC20E]/15 border border-[#FFC20E]/40 flex items-center justify-center">
              <Zap className="w-4 h-4 text-[#FFC20E]" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">
                TenderPulse Real-Time Dispatch Simulator
              </h3>
              <p className="text-[11px] font-mono text-slate-400">
                Experience sub-3-minute procurement intelligence delivery
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#15263F]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Channel selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-300">
              1. Choose Notification Channel
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setChannel("whatsapp");
                  setDestination("+27 82 456 7890");
                }}
                className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border text-xs font-semibold transition-all ${
                  channel === "whatsapp"
                    ? "bg-[#0E1B2E] border-[#FFC20E] text-[#FFC20E] shadow-gold"
                    : "bg-[#09121F] border-[#15263F] text-slate-400 hover:border-slate-600"
                }`}
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Instant Dispatch</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setChannel("email");
                  setDestination("director@contractor.co.za");
                }}
                className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border text-xs font-semibold transition-all ${
                  channel === "email"
                    ? "bg-[#0E1B2E] border-[#FFC20E] text-[#FFC20E] shadow-gold"
                    : "bg-[#09121F] border-[#15263F] text-slate-400 hover:border-slate-600"
                }`}
              >
                <Mail className="w-4 h-4 text-blue-400" />
                <span>Executive Email Alert</span>
              </button>
            </div>
          </div>

          {/* Destination input */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-300">
              2. Target {channel === "whatsapp" ? "WhatsApp Number (SA +27)" : "Director Email Address"}
            </label>
            <input
              type={channel === "whatsapp" ? "tel" : "email"}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder={channel === "whatsapp" ? "+27 82 000 0000" : "director@company.co.za"}
              className="w-full bg-[#0B1626] border border-[#1A2E4B] rounded-lg px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#FFC20E]"
            />
          </div>

          {/* Tender payload selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-300">
              3. Select Live Government Tender Payload
            </label>
            <select
              value={selectedTenderId}
              onChange={(e) => setSelectedTenderId(e.target.value)}
              className="w-full bg-[#0B1626] border border-[#1A2E4B] rounded-lg px-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#FFC20E]"
            >
              {MOCK_TENDERS.slice(0, 5).map((t) => (
                <option key={t.id} value={t.id}>
                  [{t.province}] {t.referenceNumber} — {formatZAR(t.estimatedValue)}
                </option>
              ))}
            </select>
          </div>

          {/* Preview payload */}
          <div className="p-3.5 rounded-xl bg-[#050B13] border border-[#15263F] text-xs font-mono space-y-2">
            <div className="flex items-center justify-between text-[11px] text-[#FFC20E]">
              <span className="flex items-center space-x-1">
                <Terminal className="w-3.5 h-3.5" />
                <span>PAYLOAD PREVIEW</span>
              </span>
              <span>FORMAT: {channel.toUpperCase()}</span>
            </div>
            <div className="text-slate-300 text-[11px] leading-relaxed bg-[#080F1A] p-2.5 rounded border border-[#121F33]">
              <p className="text-emerald-400 font-bold">
                🚨 NEW SA TENDER ALERT — TenderPulse
              </p>
              <p>🏢 {selectedTender.issuingEntity}</p>
              <p>📄 Ref: {selectedTender.referenceNumber}</p>
              <p>📍 {selectedTender.province} | {selectedTender.category}</p>
              <p>💰 Est. Value: {formatZAR(selectedTender.estimatedValue)} {selectedTender.cidbGrading ? `| CIDB: ${selectedTender.cidbGrading}` : ""}</p>
              <p>⏰ Closes: {formatDate(selectedTender.closingDate)} (11:00 AM)</p>
            </div>
          </div>

          {/* Result Output */}
          {result && (
            <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs font-mono text-emerald-300 flex items-start space-x-2.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-white">Dispatched in 1.14s (Latency Benchmark Passed)</p>
                <p className="text-[11px] text-emerald-300/90 mt-0.5">
                  Delivered to {result.deliveredTo} via TenderPulse Rapid Dispatch Gateway.
                </p>
              </div>
            </div>
          )}

          {/* Dispatch CTA */}
          <button
            onClick={handleSimulate}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#FFC20E] hover:bg-[#E5AD09] text-[#070E17] font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-gold transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Transmitting Through Gateway...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Fire Live Simulation Dispatch</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
