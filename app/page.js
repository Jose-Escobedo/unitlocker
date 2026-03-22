import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import NewsletterForm from "@/components/NewsletterForm";

import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/Faqsection";


export default function Home() {
  return (
    <main>
      <HeroSection/>
      <HowItWorks/>
    
  <FeaturesSection/>
  <PricingSection/>
<FAQSection/>
      <NewsletterForm/>
    </main>
  );
}
