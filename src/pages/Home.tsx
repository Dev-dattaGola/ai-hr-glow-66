
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Bell, 
  LogOut,
  Settings,
  BarChart3,
  Clock,
  CheckCircle,
  AlertTriangle,
  Star,
  Activity,
  PieChart,
  Brain,
  Sparkles
} from 'lucide-react';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Cell,
  Pie
} from 'recharts';

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
    const { data } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);
    
    if (data) {
      setAnnouncements(data);
    }
  };

  const fetchProfile = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    
    if (data) {
      setProfile(data);
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  // Mock data for charts
  const attendanceData = [
    { day: 'Mon', present: 234, absent: 13, late: 8 },
    { day: 'Tue', present: 241, absent: 6, late: 12 },
    { day: 'Wed', present: 239, absent: 8, late: 5 },
    { day: 'Thu', present: 245, absent: 2, late: 9 },
    { day: 'Fri', present: 231, absent: 16, late: 14 },
  ];

  const departmentData = [
    { name: 'Engineering', value: 45, color: '#3B82F6' },
    { name: 'Marketing', value: 32, color: '#10B981' },
    { name: 'Sales', value: 28, color: '#F59E0B' },
    { name: 'HR', value: 15, color: '#8B5CF6' },
    { name: 'Finance', value: 12, color: '#EF4444' },
  ];

  const stats = [
    { 
      title: "Total Employees", 
      value: "247", 
      change: "+12", 
      changeType: "increase",
      icon: Users, 
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    { 
      title: "Present Today", 
      value: "231", 
      change: "94%", 
      changeType: "neutral",
      icon: CheckCircle, 
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    { 
      title: "Pending Leaves", 
      value: "8", 
      change: "-3", 
      changeType: "decrease",
      icon: Calendar, 
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    { 
      title: "New Joiners", 
      value: "15", 
      change: "+5", 
      changeType: "increase",
      icon: TrendingUp, 
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
  ];

  const chartConfig = {
    present: { label: "Present", color: "#10B981" },
    absent: { label: "Absent", color: "#EF4444" },
    late: { label: "Late", color: "#F59E0B" },
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
      {/* Header */}
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
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Welcome back, {profile?.first_name}!
              </h2>
              <p className="text-gray-600 mt-2 flex items-center space-x-2">
                <Activity className="w-4 h-4" />
                <span>Here's your HR dashboard overview for today.</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <p className="text-xs text-gray-400">
                {new Date().toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        </div>

        {/* AI Insights Banner */}
        <Card className="mb-8 bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 border-indigo-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Brain className="w-6 h-6 text-indigo-600" />
                <CardTitle className="text-indigo-900">AI Insights Dashboard</CardTitle>
              </div>
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                View Full Analysis
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">87%</div>
                <div className="text-sm text-gray-600">Employee Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">15</div>
                <div className="text-sm text-gray-600">Automation Suggestions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">$12K</div>
                <div className="text-sm text-gray-600">Potential Monthly Savings</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                      <div className="flex items-center mt-2">
                        <span className={`text-sm font-medium ${
                          stat.changeType === 'increase' ? 'text-green-600' : 
                          stat.changeType === 'decrease' ? 'text-red-600' : 'text-blue-600'
                        }`}>
                          {stat.change}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">from last month</span>
                      </div>
                    </div>
                    <div className={`p-4 rounded-full ${stat.bgColor}`}>
                      <Icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Attendance Chart */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Weekly Attendance Overview</span>
              </CardTitle>
              <CardDescription>Employee attendance tracking for this week</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="present" fill="var(--color-present)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="absent" fill="var(--color-absent)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="late" fill="var(--color-late)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Department Distribution */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="w-5 h-5" />
                <span>Department Distribution</span>
              </CardTitle>
              <CardDescription>Employee distribution across departments</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <ChartTooltip />
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </RechartsPieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-2 mt-4">
                {departmentData.map((dept, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: dept.color }}
                    ></div>
                    <span className="text-xs text-gray-600">{dept.name}: {dept.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Announcements */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>Recent Announcements</span>
                </CardTitle>
                <CardDescription>Latest company updates and notifications</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div 
                  key={announcement.id} 
                  className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{announcement.title}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          announcement.priority === 'high' ? 'border-red-200 text-red-700 bg-red-50' :
                          announcement.priority === 'medium' ? 'border-orange-200 text-orange-700 bg-orange-50' :
                          'border-gray-200 text-gray-700 bg-gray-50'
                        }`}
                      >
                        {announcement.type}
                      </Badge>
                      {announcement.priority === 'high' && (
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{announcement.content}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(announcement.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Home;
