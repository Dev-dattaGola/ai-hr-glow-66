
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { WelcomeHeader } from '@/components/home/WelcomeHeader';
import { AIInsightsBanner } from '@/components/home/AIInsightsBanner';
import { StatsGrid } from '@/components/home/StatsGrid';
import { ChartsSection } from '@/components/home/ChartsSection';
import { AnnouncementsSection } from '@/components/home/AnnouncementsSection';
import { HomeNavbar } from '@/components/home/HomeNavbar';

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

  useEffect(() => {
    if (user) {
      fetchAnnouncements();
      fetchProfile();
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
