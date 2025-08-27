
import { LandingHero } from "@/components/home/LandingHero";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { PricingSection } from "@/components/home/PricingSection";
import HomeNavbar from "@/components/home/HomeNavbar";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FooterSection } from "@/components/home/FooterSection";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <HomeNavbar />
      <div id="home">
        <LandingHero />
      </div>
      <div id="features">
        <FeaturesSection />
      </div>
      <div id="pricing">
        <PricingSection />
      </div>
      <div id="testimonials">
        <TestimonialsSection />
      </div>
      <FooterSection />
    </div>
  );
};

export default Home;
