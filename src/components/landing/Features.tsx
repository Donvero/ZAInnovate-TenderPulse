import {
  Radar,
  Zap,
  ShieldCheck,
  Calendar,
  FileCheck2,
  TrendingUp,
  Cpu,
  Database,
  Lock,
} from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Sub-3-Minute WhatsApp Radar",
    description:
      "Direct WebSocket and API webhooks ping your phone via WhatsApp within 180 seconds of an organ of state publishing a new bid specification.",
    badge: "LATENCY < 3 MINS",
  },
  {
    icon: ShieldCheck,
    title: "CIDB Grade & B-BBEE Profile Matcher",
    description:
      "Configure your exact CIDB contractor grading (1GB through 9CE) and B-BBEE contributor level so you only receive opportunities you are legally qualified to win.",
    badge: "ZERO NOISE",
  },
  {
    icon: Calendar,
    title: "Compulsory Briefing Calendar Sync",
    description:
      "Instant calendar invites with physical hall coordinates or Microsoft Teams links. Get 48-hour and 24-hour SMS alerts before register closes.",
    badge: "100% ATTENDANCE",
  },
  {
    icon: FileCheck2,
    title: "SBD Compliance Checklist Vault",
    description:
      "Pre-flight verification for SBD 1, SBD 4 declaration of interest, SBD 6.1 preference points claims, and valid SARS Tax Compliance Status pins.",
    badge: "ANTI-DISQUALIFICATION",
  },
  {
    icon: TrendingUp,
    title: "Active Bid Pipeline & Team Tracking",
    description:
      "Manage your active submissions from initial expression of interest to BoQ pricing, site visits, tender box delivery, and award announcement.",
    badge: "PIPELINE CRM",
  },
  {
    icon: Database,
    title: "All 9 Provinces + Parastatal Gateways",
    description:
      "Deep synchronization across Eastern Cape, Gauteng, Western Cape, KZN, Limpopo, Mpumalanga, Transnet, SANRAL, Eskom, and ACSA.",
    badge: "NATIONAL DEPTH",
  },
];

export default function Features() {
  return (
    <section className="py-20 bg-[#050B13] border-b border-[#15263F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0E1B2E] border border-[#FFC20E]/40 text-xs font-mono text-[#FFC20E] mb-4">
            <Cpu className="w-3.5 h-3.5 text-[#FFC20E]" />
            <span>INSTITUTIONAL PROCUREMENT ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Engineered For South African Contractors Who Bid To Win
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3">
            Every feature in TenderPulse was engineered to address specific points of failure in South Africa&apos;s public supply chain management system.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#09121F] border border-[#15263F] hover:border-[#FFC20E]/50 transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0E1B2E] border border-[#1F385C] group-hover:border-[#FFC20E] flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5 text-[#FFC20E]" />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#070E17] text-slate-400 border border-[#15263F]">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#FFC20E] transition-colors">
                    {feat.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#121F33] text-[11px] font-mono text-slate-500 flex items-center justify-between">
                  <span>TERMINAL PROTOCOL</span>
                  <span className="text-slate-400">ACTIVE</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
