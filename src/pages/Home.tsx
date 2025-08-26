
import { useState, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { HomeNavbar } from "@/components/home/HomeNavbar";
import { LandingHero } from "@/components/home/LandingHero";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { PricingSection } from "@/components/home/PricingSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import AnnouncementsSection from "@/components/home/AnnouncementsSection";
import { FooterSection } from "@/components/home/FooterSection";
import { WelcomeHeader } from "@/components/home/WelcomeHeader";
import { StatsGrid } from "@/components/home/StatsGrid";
import { ChartsSection } from "@/components/home/ChartsSection";
import { AIInsightsBanner } from "@/components/home/AIInsightsBanner";

const Home = () => {
  const authContext = useContext(AuthContext);
  const [showWelcomeHeader, setShowWelcomeHeader] = useState(true);

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { user, signOut } = authContext;

  const handleLogin = () => {
    console.log("Navigate to login");
  };

  const handleAccessPortal = () => {
    console.log("Start free trial / access portal");
  };

  const handleGetStarted = () => {
    console.log("Get Started clicked from Pricing");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <HomeNavbar profile={null} onSignOut={signOut} />
      {user && showWelcomeHeader ? (
        <WelcomeHeader firstName={user?.user_metadata?.first_name} />
      ) : (
        <>
          <LandingHero onLogin={handleLogin} onAccessPortal={handleAccessPortal} />
          <AIInsightsBanner />
          <StatsGrid />
          <AnnouncementsSection />
          <ChartsSection />
          <FeaturesSection />
          <PricingSection onGetStarted={handleGetStarted} />
          <TestimonialsSection />
        </>
      )}
      <FooterSection />
    </div>
  );
};

export default Home;
