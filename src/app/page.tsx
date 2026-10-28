import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/landing/Hero";
import ProblemSolution from "@/components/landing/ProblemSolution";
import LiveTendersPreview from "@/components/landing/LiveTendersPreview";
import Features from "@/components/landing/Features";
import PricingCards from "@/components/landing/PricingCards";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import CTASection from "@/components/landing/CTASection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#070E17] text-white flex flex-col justify-between">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ProblemSolution />
        <LiveTendersPreview />
        <Features />
        <PricingCards />
        <Testimonials />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
