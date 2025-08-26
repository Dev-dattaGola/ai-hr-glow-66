
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
import { useNavigate } from "react-router-dom";

const Home = () => {
  const authContext = useContext(AuthContext);
  const [showWelcomeHeader, setShowWelcomeHeader] = useState(true);
  const navigate = useNavigate();

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { user, signOut } = authContext;

  const handleLogin = () => {
    navigate("/auth");
  };

  const handleAccessPortal = () => {
    navigate("/auth");
  };

  const handleGetStarted = () => {
    navigate("/auth");
  };

  // Create a mock profile object when user is authenticated to ensure navbar shows properly
  const mockProfile = user ? {
    id: user.id,
    first_name: user.user_metadata?.first_name || 'User',
    last_name: user.user_metadata?.last_name || '',
    email: user.email || '',
    department: 'General',
    role: 'User',
    avatar_url: user.user_metadata?.avatar_url || ''
  } : null;

  return (
    <div className="bg-gray-50 min-h-screen">
      <HomeNavbar 
        profile={mockProfile} 
        onSignOut={signOut} 
        isAuthenticated={!!user}
      />
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
