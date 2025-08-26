import { useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import HomeNavbar from "@/components/home/HomeNavbar";
import LandingHero from "@/components/home/LandingHero";
import FeaturesSection from "@/components/home/FeaturesSection";
import PricingSection from "@/components/home/PricingSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import AnnouncementsSection from "@/components/home/AnnouncementsSection";
import FooterSection from "@/components/home/FooterSection";
import WelcomeHeader from "@/components/home/WelcomeHeader";
import StatsGrid from "@/components/home/StatsGrid";
import ChartsSection from "@/components/home/ChartsSection";
import AIInsightsBanner from "@/components/home/AIInsightsBanner";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [showWelcomeHeader, setShowWelcomeHeader] = useState(true);

  return (
    <div className="bg-gray-50 min-h-screen">
      <HomeNavbar />
      {user && showWelcomeHeader ? (
        <WelcomeHeader onClose={() => setShowWelcomeHeader(false)} />
      ) : (
        <>
          <LandingHero />
          <AIInsightsBanner />
          <StatsGrid />
          <AnnouncementsSection />
          <ChartsSection />
          <FeaturesSection />
          <PricingSection />
          <TestimonialsSection />
        </>
      )}
      <FooterSection />
    </div>
  );
};

export default Home;
