import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import NewsletterForm from "@/components/NewsletterForm";
import MLBPicksSectionTeaser from "@/components/MLBPicksSectionTeaser";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";


export default function Home() {
  return (
    <main>
      <HeroSection/>
      <HowItWorks/>
    
  <FeaturesSection/>
  <PricingSection/>
     <MLBPicksSectionTeaser/>
      <NewsletterForm/>
    </main>
  );
}
