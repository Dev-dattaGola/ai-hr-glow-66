
import { Bell, Settings, LogOut, Sparkles, LayoutDashboard } from 'lucide-react';
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
}

export const HomeNavbar = ({ profile, onSignOut }: HomeNavbarProps) => {
  const navigate = useNavigate();

  const handleNotifications = () => {
    console.log('Opening notifications...');
  };

  const handleSettings = () => {
    console.log('Opening settings...');
  };

  const handleSignOut = () => {
    onSignOut();
    navigate('/auth');
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              HR Suite
            </h1>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-Powered
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
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
              <div className="hidden md:block text-sm">
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
          </div>
        </div>
      </div>
    </header>
  );
};
