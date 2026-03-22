import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/Faqsection";
import CTASection from "@/components/Ctasection";


export default function Home() {
  return (
    <main>
      <HeroSection/>
      <HowItWorks/>
    
  <FeaturesSection/>
  <PricingSection/>
<FAQSection/>
      <CTASection/>
    </main>
  );
}
