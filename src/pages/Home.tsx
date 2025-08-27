
import { LandingHero } from "@/components/home/LandingHero";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { PricingSection } from "@/components/home/PricingSection";
import HomeNavbar from "@/components/home/HomeNavbar";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FooterSection } from "@/components/home/FooterSection";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/auth');
  };

  const handleAccessPortal = () => {
    navigate('/auth');
  };

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <HomeNavbar />
      <div id="home">
        <LandingHero onLogin={handleLogin} onAccessPortal={handleAccessPortal} />
      </div>
      <div id="features">
        <FeaturesSection />
      </div>
      <div id="pricing">
        <PricingSection onGetStarted={handleGetStarted} />
      </div>
      <div id="testimonials">
        <TestimonialsSection />
      </div>
      <FooterSection />
    </div>
  );
};

export default Home;
