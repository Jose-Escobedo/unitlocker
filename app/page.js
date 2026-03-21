import FavoriteSites from "@/components/FavoriteSites";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import NewsletterForm from "@/components/NewsletterForm";
import MLBPicksSectionTeaser from "@/components/MLBPicksSectionTeaser";
import FeaturesSection from "@/components/FeaturesSection";


export default function Home() {
  return (
    <main>
      <HeroSection/>
      <HowItWorks/>
    
  <FeaturesSection/>
    <FavoriteSites/>
     <MLBPicksSectionTeaser/>
      <NewsletterForm/>
    </main>
  );
}
