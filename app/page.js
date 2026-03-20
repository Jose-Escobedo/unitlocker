import FavoriteSites from "@/components/FavoriteSites";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import NewsletterForm from "@/components/NewsletterForm";
import RecentWins from "@/components/RecentWins";
import MLBPicksSectionTeaser from "@/components/MLBPicksSectionTeaser";


export default function Home() {
  return (
    <main>
      <HeroSection/>
      <HowItWorks/>
    
  <RecentWins/>
    <FavoriteSites/>
     <MLBPicksSectionTeaser/>
      <NewsletterForm/>
    </main>
  );
}
