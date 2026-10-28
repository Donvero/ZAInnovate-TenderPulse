import { Star, ShieldCheck, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "The eTenders portal went down the entire week leading to the Qonce school tender deadline. TenderPulse had already delivered the complete BoQ and SBD pack to our WhatsApp. We submitted on time and were awarded the R14.8M contract.",
    author: "Siphokazi Mgijima",
    role: "Managing Director",
    company: "Imvula Civil Projects",
    location: "Gqeberha, Eastern Cape",
    grade: "CIDB 5GB PE",
  },
  {
    quote:
      "We missed two compulsory briefings last year because e-Government tenders are gazetted quietly with only 48 hours notice. TenderPulse WhatsApp alerts give my estimating team an immediate headstart. Invaluable for R99/month.",
    author: "Thabo Khumalo",
    role: "Founder & CTO",
    company: "CloudNexus Technologies",
    location: "Sandton, Gauteng",
    grade: "ICT SITA Accredited",
  },
  {
    quote:
      "As a 100% black women-owned cleaning and safety supplier in Durban, staying on top of municipal tenders across eThekwini was a nightmare. TenderPulse filters out the construction clutter and only alerts me on hygiene and PPE bids.",
    author: "Nomvula Dube",
    role: "Operations Director",
    company: "Khanya Hygiene & PPE Supplies",
    location: "Durban, KwaZulu-Natal",
    grade: "B-BBEE Level 1 Contributor",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-[#050B13] border-b border-[#15263F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0E1B2E] border border-[#1F385C] text-xs font-mono text-slate-300 mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>VERIFIED SOUTH AFRICAN SMME CASE STUDIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Trusted By Emerging Contractors Across All 9 Provinces
          </h2>
          <p className="text-sm text-slate-400 mt-2 font-mono">
            From rural infrastructure in the Eastern Cape to cloud contracts in Gauteng
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#09121F] border border-[#15263F] flex flex-col justify-between space-y-6 relative"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-1 text-[#FFC20E]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFC20E]" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#15263F] flex items-start justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white font-sans">{t.author}</h4>
                  <div className="text-[11px] text-[#FFC20E] font-medium">{t.role}</div>
                  <div className="text-[11px] text-slate-400 font-mono">{t.company} • {t.location}</div>
                </div>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#0E1B2E] text-slate-300 border border-[#1F385C]">
                  {t.grade}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
