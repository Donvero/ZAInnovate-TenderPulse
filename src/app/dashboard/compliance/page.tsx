import SbdChecklist from "@/components/dashboard/SbdChecklist";

export default function CompliancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight font-sans">
          Compliance & Document Vault
        </h1>
        <p className="text-xs font-mono text-slate-400 mt-1">
          Standard Bidding Documents (SBD 1, SBD 4, SBD 6.1) and PPPFA 80/20 preference points calculator
        </p>
      </div>

      <SbdChecklist />
    </div>
  );
}
