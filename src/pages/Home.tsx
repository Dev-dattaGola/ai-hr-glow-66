
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { WelcomeHeader } from '@/components/home/WelcomeHeader';
import { AIInsightsBanner } from '@/components/home/AIInsightsBanner';
import { StatsGrid } from '@/components/home/StatsGrid';
import { ChartsSection } from '@/components/home/ChartsSection';
import { AnnouncementsSection } from '@/components/home/AnnouncementsSection';
import { HomeNavbar } from '@/components/home/HomeNavbar';
import { LandingHero } from '@/components/home/LandingHero';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { PricingSection } from '@/components/home/PricingSection';
import { FooterSection } from '@/components/home/FooterSection';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { LogIn, Sparkles } from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: string;
  priority: string;
  created_at: string;
}

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  department: string;
  role: string;
  avatar_url: string;
}

const Home = () => {
  const { user, signOut } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchAnnouncements();
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchAnnouncements = async () => {
    try {
      const { data } = await supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (data) {
        setAnnouncements(data);
      }
    } catch (error) {
      console.log('No announcements table available, using mock data');
      setAnnouncements([
        {
          id: '1',
          title: 'Welcome to HR Suite',
          content: 'Experience the power of AI-driven HR management.',
          type: 'General',
          priority: 'medium',
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          title: 'System Update',
          content: 'New features have been added to improve your experience.',
          type: 'Update',
          priority: 'high',
          created_at: new Date(Date.now() - 86400000).toISOString()
        }
      ]);
    }
  };

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (data) {
        setProfile(data);
      } else {
        setProfile({
          id: user.id,
          first_name: user.user_metadata?.first_name || 'User',
          last_name: user.user_metadata?.last_name || '',
          email: user.email || '',
          department: 'General',
          role: 'Employee',
          avatar_url: ''
        });
      }
    } catch (error) {
      console.log('No profiles table available, using user data');
      setProfile({
        id: user.id,
        first_name: user.user_metadata?.first_name || 'User',
        last_name: user.user_metadata?.last_name || '',
        email: user.email || '',
        department: 'General',
        role: 'Employee',
        avatar_url: ''
      });
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const handleLogin = () => {
    navigate('/auth');
  };

  const handleAccessPortal = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading && user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If user is not logged in, show enhanced landing page
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Landing Page Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  HR Suite
                </h1>
                <div className="hidden sm:flex items-center space-x-2 bg-blue-50 text-blue-700 border border-blue-200 px-2 py-1 rounded-full text-xs">
                  <Sparkles className="w-3 h-3" />
                  <span>AI-Powered</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button variant="ghost" onClick={scrollToFeatures}>
                  Features
                </Button>
                <Button variant="ghost" onClick={scrollToPricing}>
                  Pricing
                </Button>
                <Button onClick={handleLogin} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main>
          <LandingHero onLogin={handleLogin} onAccessPortal={handleAccessPortal} />
          <div id="features">
            <FeaturesSection />
          </div>
          <TestimonialsSection />
          <div id="pricing">
            <PricingSection onGetStarted={handleLogin} />
          </div>
          <FooterSection />
        </main>
      </div>
    );
  }

  // If user is logged in, show the dashboard-style home page
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <HomeNavbar profile={profile} onSignOut={handleSignOut} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WelcomeHeader firstName={profile?.first_name} />
        <AIInsightsBanner />
        <StatsGrid />
        <ChartsSection />
        <AnnouncementsSection announcements={announcements} />
      </main>
    </div>
  );
};

export default Home;
