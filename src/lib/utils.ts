import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// South African Currency Formatter
export function formatZAR(amount: number | string | null | undefined): string {
  if (amount === null || amount === undefined || amount === "") return "Undisclosed";
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(num)) return "Undisclosed";

  if (num >= 1_000_000) {
    return `R${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1_000) {
    return `R${(num / 1_000).toFixed(0)}k`;
  }

  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format(num);
}

export function formatZARFull(amount: number): string {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 2,
  }).format(amount);
}

// Standard SA Date Formatter (DD MMM YYYY)
export function formatDate(dateInput: string | Date | null | undefined): string {
  if (!dateInput) return "TBD";
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return "TBD";

  return new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatDateTime(dateInput: string | Date | null | undefined): string {
  if (!dateInput) return "TBD";
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return "TBD";

  return new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

// Countdown Calculator
export function getDaysRemaining(dateInput: string | Date): {
  days: number;
  text: string;
  isUrgent: boolean;
  isExpired: boolean;
} {
  const target = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  const now = new Date();
  const diffMs = target.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return { days: diffDays, text: "Closed", isUrgent: false, isExpired: true };
  }
  if (diffDays === 0) {
    return { days: 0, text: "Closing Today (11:00 AM)", isUrgent: true, isExpired: false };
  }
  if (diffDays === 1) {
    return { days: 1, text: "1 day left", isUrgent: true, isExpired: false };
  }
  if (diffDays <= 3) {
    return { days: diffDays, text: `${diffDays} days left`, isUrgent: true, isExpired: false };
  }
  return { days: diffDays, text: `${diffDays} days left`, isUrgent: false, isExpired: false };
}

// 9 South African Provinces
export const SA_PROVINCES = [
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Northern Cape",
  "Western Cape",
  "National (Countrywide)",
] as const;

export type SAProvince = (typeof SA_PROVINCES)[number];

// Standard SA Government Tender Categories
export const SA_TENDER_CATEGORIES = [
  { slug: "construction", name: "Construction & Infrastructure", icon: "HardHat", cidb: true },
  { slug: "it-technology", name: "IT & Technology", icon: "Laptop", cidb: false },
  { slug: "ppe-safety", name: "PPE & Workwear", icon: "ShieldAlert", cidb: false },
  { slug: "consulting", name: "Consulting & Professional Services", icon: "Briefcase", cidb: false },
  { slug: "catering", name: "Catering & Event Management", icon: "Utensils", cidb: false },
  { slug: "transport", name: "Transport & Fleet Logistics", icon: "Truck", cidb: false },
  { slug: "cleaning", name: "Cleaning & Waste Management", icon: "Sparkles", cidb: false },
  { slug: "security", name: "Security & Guarding Services", icon: "ShieldCheck", cidb: false },
  { slug: "stationery", name: "Stationery & Office Supplies", icon: "FileText", cidb: false },
  { slug: "furniture", name: "Furniture & Interior Fitout", icon: "Armchair", cidb: false },
  { slug: "medical", name: "Medical Equipment & Consumables", icon: "HeartPulse", cidb: false },
  { slug: "training", name: "Training & Skills Development", icon: "GraduationCap", cidb: false },
  { slug: "engineering", name: "Engineering & Technical Services", icon: "Wrench", cidb: true },
  { slug: "legal", name: "Legal & Compliance Advisory", icon: "Scale", cidb: false },
  { slug: "marketing", name: "Marketing, Media & Communications", icon: "Megaphone", cidb: false },
] as const;

// CIDB Grading Levels (Construction Industry Development Board)
export const CIDB_GRADINGS = [
  "1GB", "2GB", "3GB", "4GB", "5GB", "6GB", "7GB", "8GB", "9GB",
  "1CE", "2CE", "3CE", "4CE", "5CE", "6CE", "7CE", "8CE", "9CE",
  "1ME", "2ME", "3ME", "4ME", "5ME", "6ME", "7ME", "8ME", "9ME",
  "1EE", "2EE", "3EE", "4EE", "5EE", "6EE", "7EE", "8EE", "9EE",
  "General / Not Applicable"
];

// Calculate Preferential Procurement Points (80/20 or 90/10)
export function calculatePPPFA({
  bidPrice,
  lowestPrice,
  system = "80/20",
  bbbEeLevel = 1,
}: {
  bidPrice: number;
  lowestPrice: number;
  system?: "80/20" | "90/10";
  bbbEeLevel: number;
}) {
  const is80 = system === "80/20";
  const maxPricePoints = is80 ? 80 : 90;
  const maxBbeePoints = is80 ? 20 : 10;

  // Price points formula: Ps = 80/90 * (1 - (Pt - Pmin) / Pmin)
  const pricePoints = Math.max(0, maxPricePoints * (1 - (bidPrice - lowestPrice) / lowestPrice));

  // B-BBEE points matrix
  const bbeePointsTable80: Record<number, number> = {
    1: 20, 2: 18, 3: 14, 4: 12, 5: 8, 6: 6, 7: 4, 8: 2, 9: 0,
  };
  const bbeePointsTable90: Record<number, number> = {
    1: 10, 2: 9, 3: 6, 4: 5, 5: 4, 6: 3, 7: 2, 8: 1, 9: 0,
  };

  const bbeePoints = is80
    ? (bbeePointsTable80[bbbEeLevel] ?? 0)
    : (bbeePointsTable90[bbbEeLevel] ?? 0);

  return {
    pricePoints: parseFloat(pricePoints.toFixed(2)),
    bbeePoints,
    totalPoints: parseFloat((pricePoints + bbeePoints).toFixed(2)),
  };
}
