import AlertConfig from "@/components/dashboard/AlertConfig";

const INITIAL_ALERTS = [
  {
    id: "alert_01",
    name: "Eastern Cape Infrastructure & Civil Works",
    keywords: ["construction", "civil", "road", "school", "refurbishment"],
    categories: ["Construction & Infrastructure", "Engineering & Technical Services"],
    provinces: ["Eastern Cape"],
    minEstimatedValue: 1000000,
    maxEstimatedValue: 50000000,
    cidbGradingRequired: "5GB",
    sendEmail: true,
    sendWhatsapp: true,
    frequency: "INSTANT",
    isActive: true,
    matchesCount: 14,
  },
  {
    id: "alert_02",
    name: "National Enterprise Cloud & Cybersecurity",
    keywords: ["cloud", "cybersecurity", "software", "license", "network"],
    categories: ["IT & Technology"],
    provinces: ["Gauteng", "National (Countrywide)", "Western Cape"],
    minEstimatedValue: 5000000,
    maxEstimatedValue: 100000000,
    cidbGradingRequired: null,
    sendEmail: true,
    sendWhatsapp: true,
    frequency: "INSTANT",
    isActive: true,
    matchesCount: 8,
  },
  {
    id: "alert_03",
    name: "Municipal PPE & Workwear Supplies",
    keywords: ["ppe", "overalls", "safety boots", "protective equipment"],
    categories: ["PPE & Workwear"],
    provinces: ["Eastern Cape", "Western Cape", "KwaZulu-Natal"],
    minEstimatedValue: 500000,
    maxEstimatedValue: 15000000,
    cidbGradingRequired: null,
    sendEmail: true,
    sendWhatsapp: false,
    frequency: "DAILY",
    isActive: true,
    matchesCount: 5,
  },
];

export default function AlertsSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight font-sans">
          Radar Alert Dispatch Engine
        </h1>
        <p className="text-xs font-mono text-slate-400 mt-1">
          Configure real-time automated tender push notifications for WhatsApp & Email
        </p>
      </div>

      <AlertConfig initialAlerts={INITIAL_ALERTS} />
    </div>
  );
}
