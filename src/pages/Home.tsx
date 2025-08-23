
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { WelcomeHeader } from '@/components/home/WelcomeHeader';
import { AIInsightsBanner } from '@/components/home/AIInsightsBanner';
import { StatsGrid } from '@/components/home/StatsGrid';
import { ChartsSection } from '@/components/home/ChartsSection';
import { AnnouncementsSection } from '@/components/home/AnnouncementsSection';
import { HomeNavbar } from '@/components/home/HomeNavbar';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { LogIn, Sparkles, Users, TrendingUp, Shield } from 'lucide-react';

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
      // Set loading to false for non-authenticated users
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
      // Mock announcements for demo
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
        // Create default profile from user metadata
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
      // Use user metadata as fallback
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

  if (loading && user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If user is not logged in, show landing page
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Landing Page Header */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
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
              
              <Button onClick={handleLogin} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Transform Your <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">HR Management</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Experience the future of human resources with our AI-powered platform. 
              Streamline processes, enhance productivity, and make data-driven decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={handleAccessPortal} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                <Shield className="w-5 h-5 mr-2" />
                Access Portal
              </Button>
              <Button size="lg" variant="outline" onClick={handleLogin}>
                <LogIn className="w-5 h-5 mr-2" />
                Sign In
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-white/50 rounded-lg border border-blue-100">
              <div className="p-4 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Employee Management</h3>
              <p className="text-gray-600">Comprehensive employee profiles, attendance tracking, and performance monitoring</p>
            </div>

            <div className="text-center p-6 bg-white/50 rounded-lg border border-indigo-100">
              <div className="p-4 bg-indigo-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Analytics</h3>
              <p className="text-gray-600">Intelligent insights, predictive analytics, and automated reporting</p>
            </div>

            <div className="text-center p-6 bg-white/50 rounded-lg border border-purple-100">
              <div className="p-4 bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Compliant</h3>
              <p className="text-gray-600">Enterprise-grade security with full compliance management</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
            <p className="text-lg text-gray-600 mb-8">Join thousands of companies already using HR Suite</p>
            <Button size="lg" onClick={handleLogin} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              Start Your Journey
            </Button>
          </div>
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
