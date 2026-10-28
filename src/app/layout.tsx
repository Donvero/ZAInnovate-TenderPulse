import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TenderPulse — South African Government Tender Alert SaaS | ZAInnovate",
  description:
    "Real-time WhatsApp & Email alerts for South African SMMEs and contractors matching National Treasury eTenders, CIDB, Transnet, Eskom, and provincial bulletins in under 3 minutes.",
  keywords: [
    "eTenders South Africa",
    "CIDB tenders",
    "SA government tenders",
    "tender alerts WhatsApp",
    "Eastern Cape tenders",
    "Gauteng tenders",
    "B-BBEE Level 1 procurement",
    "SBD 4 SBD 6.1 compliance",
    "ZAInnovate Technologies",
  ],
  authors: [{ name: "ZAInnovate Technologies (Pty) Ltd" }],
  openGraph: {
    title: "TenderPulse — Never Miss A South African Government Tender Again",
    description:
      "Instant WhatsApp & Email alerts for National Treasury eTenders, CIDB bulletins, and provincial bids.",
    url: "https://tenderpulse.zainnovate.co.za",
    siteName: "TenderPulse",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#070E17] text-slate-100 antialiased selection:bg-[#FFC20E] selection:text-[#070E17]">
        {children}
      </body>
    </html>
  );
}
