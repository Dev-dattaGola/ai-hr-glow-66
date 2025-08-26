
import { Bell, Settings, LogOut, Sparkles, LayoutDashboard, User, UserPlus, Home, Users, DollarSign, MessageSquare, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  department: string;
  role: string;
  avatar_url: string;
}

interface HomeNavbarProps {
  profile: Profile | null;
  onSignOut: () => void;
  isAuthenticated?: boolean;
}

export const HomeNavbar = ({ profile, onSignOut, isAuthenticated = false }: HomeNavbarProps) => {
  const navigate = useNavigate();

  const handleNotifications = () => {
    console.log('Opening notifications...');
  };

  const handleSettings = () => {
    console.log('Opening settings...');
  };

  const handleSignOut = () => {
    onSignOut();
    navigate('/');
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  const handleLogin = () => {
    navigate('/auth');
  };

  const handleSignup = () => {
    navigate('/auth');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAbout = () => {
    navigate('/about');
  };

  const handleContact = () => {
    navigate('/contact');
  };

  const handleHelp = () => {
    navigate('/help');
  };

  const handleBlog = () => {
    navigate('/blog');
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/cdd359c8-6f37-4349-a589-639c51d7f17d.png" 
              alt="HR Suite Logo" 
              className="h-10 w-auto cursor-pointer"
              onClick={handleHome}
            />
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-Powered
            </Badge>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={handleHome}>
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button variant="ghost" size="sm" onClick={() => scrollToSection('features')}>
              <Users className="w-4 h-4 mr-2" />
              Features
            </Button>
            <Button variant="ghost" size="sm" onClick={() => scrollToSection('pricing')}>
              <DollarSign className="w-4 h-4 mr-2" />
              Pricing
            </Button>
            <Button variant="ghost" size="sm" onClick={() => scrollToSection('testimonials')}>
              <MessageSquare className="w-4 h-4 mr-2" />
              Testimonials
            </Button>
            <Button variant="ghost" size="sm" onClick={handleAbout}>
              About
            </Button>
            <Button variant="ghost" size="sm" onClick={handleBlog}>
              <BookOpen className="w-4 h-4 mr-2" />
              Blog
            </Button>
            <Button variant="ghost" size="sm" onClick={handleContact}>
              Contact
            </Button>
            <Button variant="ghost" size="sm" onClick={handleHelp}>
              Help
            </Button>
          </nav>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="sm" onClick={handleDashboard}>
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
                <Button variant="ghost" size="sm" onClick={handleNotifications}>
                  <Bell className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={handleSettings}>
                  <Settings className="w-4 h-4" />
                </Button>
                
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile?.avatar_url} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm">
                      {profile?.first_name?.[0]}{profile?.last_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden lg:block text-sm">
                    <p className="font-medium text-gray-900">
                      {profile?.first_name} {profile?.last_name}
                    </p>
                    <p className="text-gray-500 text-xs">{profile?.department}</p>
                  </div>
                </div>
                
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={handleLogin}>
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button variant="default" size="sm" onClick={handleSignup}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
