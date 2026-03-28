"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/Faqsection";
import CTASection from "@/components/Ctasection";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

if (loading || user) {
  return (
    <main className="min-h-screen">
      <div className="h-[80vh] animate-pulse bg-[#181c22]" />
      <div className="h-[60vh] mt-6 animate-pulse bg-[#181c22]" />
      <div className="h-[60vh] mt-6 animate-pulse bg-[#181c22]" />
      <div className="h-[60vh] mt-6 animate-pulse bg-[#181c22]" />
    </main>
  );
}

  return (
    <main>
      <HeroSection />
      <HowItWorks />
      <FeaturesSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}