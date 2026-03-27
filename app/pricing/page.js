import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/Faqsection";
import CTASection from "@/components/Ctasection";

export const metadata = {
  title: 'Pricing | UnitLocker',
  description: 'Start free forever. Upgrade to Pro for advanced analytics, performance breakdowns, and premium Discord access.',
};

export default function PricingPage() {
  return (
    <main className="pt-16">
      <PricingSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}