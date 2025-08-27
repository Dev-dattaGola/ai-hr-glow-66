import { Bell, Settings, LogOut, Sparkles, LayoutDashboard, User, UserPlus, Home, Users, DollarSign, MessageSquare, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/EnhancedAuthContext';
import { useNavigate } from 'react-router-dom';

const HomeNavbar = ({ 
  isAuthenticated, 
  firstName = '', 
  onSignOut 
}: { 
  isAuthenticated: boolean;
  firstName?: string;
  onSignOut?: () => void;
}) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Use the new auth context if available, otherwise fall back to props
  const authenticated = user ? true : isAuthenticated;
  const userFirstName = user?.user_metadata?.first_name || firstName;

  const handleSignOut = async () => {
    if (user) {
      await signOut();
    } else if (onSignOut) {
      onSignOut();
    }
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHome = () => {
    navigate('/');
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
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Sparkles className="h-8 w-8 text-blue-600 mr-2" />
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                HR Suite
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Button 
                variant="ghost" 
                onClick={handleHome}
                className="hover:bg-blue-50 hover:text-blue-600"
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => scrollToSection('features')}
                className="hover:bg-blue-50 hover:text-blue-600"
              >
                <Users className="w-4 h-4 mr-2" />
                Features
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => scrollToSection('pricing')}
                className="hover:bg-blue-50 hover:text-blue-600"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Pricing
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => scrollToSection('testimonials')}
                className="hover:bg-blue-50 hover:text-blue-600"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Testimonials
              </Button>
              <Button 
                variant="ghost" 
                onClick={handleAbout}
                className="hover:bg-blue-50 hover:text-blue-600"
              >
                About
              </Button>
              <Button 
                variant="ghost" 
                onClick={handleBlog}
                className="hover:bg-blue-50 hover:text-blue-600"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Blog
              </Button>
              <Button 
                variant="ghost" 
                onClick={handleContact}
                className="hover:bg-blue-50 hover:text-blue-600"
              >
                Contact
              </Button>
              <Button 
                variant="ghost" 
                onClick={handleHelp}
                className="hover:bg-blue-50 hover:text-blue-600"
              >
                Help
              </Button>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {authenticated ? (
              <>
                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-red-500">
                    3
                  </Badge>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder-avatar.jpg" alt={userFirstName} />
                        <AvatarFallback className="bg-blue-600 text-white">
                          {userFirstName?.charAt(0)?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {userFirstName} {user?.user_metadata?.last_name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                        {user?.role && (
                          <Badge variant="secondary" className="w-fit mt-1">
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </Badge>
                        )}
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleDashboard} className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  onClick={handleLogin}
                  className="hover:bg-blue-50 hover:text-blue-600"
                >
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button 
                  onClick={handleLogin}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
