import { AlertTriangle, CheckCircle2, Clock, FileX2, FileCheck, ShieldAlert, Zap } from "lucide-react";

export default function ProblemSolution() {
  return (
    <section className="py-20 bg-[#050B13] border-b border-[#15263F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-xs font-mono text-red-400 mb-4">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>THE SOUTH AFRICAN SMME TENDER REALITY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Why 80% of Emerging Contractors Lose Out Before Even Submitting
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3">
            Government procurement in South Africa is worth over R900 Billion annually, yet local SMMEs are systematically locked out by portal downtime, missed briefing sessions, and administrative disqualifications.
          </p>
        </div>

        {/* 2-Column Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left: The Old Painful Way */}
          <div className="p-8 rounded-2xl bg-[#09121F] border border-red-950/80 relative space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#15263F]">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-950/60 border border-red-500/40 flex items-center justify-center text-red-400">
                  <FileX2 className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-white">The Old Fragmented Way</h3>
              </div>
              <span className="text-[11px] font-mono text-red-400 font-bold uppercase tracking-wider">
                High Failure Rate
              </span>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-[#070E17] border border-red-950/40">
                <Clock className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white mb-0.5">Missed Compulsory Briefing Sessions</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Tenders are gazetted on Monday with compulsory briefings on Thursday. By the time you notice, the session is over and your bid is automatically non-responsive.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-[#070E17] border border-red-950/40">
                <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white mb-0.5">eTenders Portal Downtime & Overload</h4>
                  <p className="text-slate-400 leading-relaxed">
                    National Treasury portals frequently encounter connection errors, slow search speeds, and broken PDF links right before critical submission deadlines.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-[#070E17] border border-red-950/40">
                <ShieldAlert className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white mb-0.5">SBD 4 & SBD 6.1 Disqualifications</h4>
                  <p className="text-slate-400 leading-relaxed">
                    Over 70% of contractor submissions are disqualified during stage-one administrative compliance due to missing SBD forms, expired CSD tax pins, or faulty CIDB declarations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: The TenderPulse Advantage */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#0E1B2E] to-[#0A1320] border border-[#FFC20E]/50 shadow-gold relative space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#1A2E4B]">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#FFC20E]/20 border border-[#FFC20E] flex items-center justify-center text-[#FFC20E]">
                  <Zap className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-white">The TenderPulse Frontier Advantage</h3>
              </div>
              <span className="text-[11px] font-mono text-[#FFC20E] font-bold uppercase tracking-wider">
                Instant Edge
              </span>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-[#070E17]/80 border border-[#FFC20E]/30">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white mb-0.5">Instant WhatsApp Alerts In Under 3 Minutes</h4>
                  <p className="text-slate-300 leading-relaxed">
                    Get pinged on WhatsApp the moment an eTenders or CIDB notice matches your province, keywords, and CIDB grading. Download the RFP with a single tap.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-[#070E17]/80 border border-[#FFC20E]/30">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white mb-0.5">Compulsory Briefing Countdown & Calendar Sync</h4>
                  <p className="text-slate-300 leading-relaxed">
                    Automated briefing reminders with venue coordinates and virtual meeting links 48 hours and 24 hours prior to the session.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-[#070E17]/80 border border-[#FFC20E]/30">
                <FileCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white mb-0.5">Automated SBD Compliance Checklist</h4>
                  <p className="text-slate-300 leading-relaxed">
                    Verify complete SBD 1, SBD 4, SBD 6.1, and CSD tax compliance status requirements before packaging your submission tender box envelope.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
