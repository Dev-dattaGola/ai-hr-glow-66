
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Clock, 
  Calendar, 
  TrendingUp, 
  Bell,
  Eye,
  Brain,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
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
  Area,
  AreaChart,
  Pie
} from 'recharts';
import { useState } from 'react';

interface DashboardProps {
  setActiveModule?: (module: string) => void;
}

export const Dashboard = ({ setActiveModule }: DashboardProps) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('month');
  const [aiInsightsOpen, setAiInsightsOpen] = useState(false);

  // Mock data for charts
  const attendanceData = [
    { day: 'Mon', present: 234, absent: 13, late: 8 },
    { day: 'Tue', present: 241, absent: 6, late: 12 },
    { day: 'Wed', present: 239, absent: 8, late: 5 },
    { day: 'Thu', present: 245, absent: 2, late: 9 },
    { day: 'Fri', present: 231, absent: 16, late: 14 },
  ];

  const leaveData = [
    { month: 'Jan', casual: 45, sick: 32, annual: 28 },
    { month: 'Feb', casual: 52, sick: 28, annual: 35 },
    { month: 'Mar', casual: 48, sick: 35, annual: 42 },
    { month: 'Apr', casual: 41, sick: 29, annual: 38 },
    { month: 'May', casual: 55, sick: 42, annual: 31 },
    { month: 'Jun', casual: 49, sick: 38, annual: 45 },
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
      bgColor: "bg-blue-50",
      module: "employees"
    },
    { 
      title: "Present Today", 
      value: "231", 
      change: "94%", 
      changeType: "neutral",
      icon: CheckCircle, 
      color: "text-green-600",
      bgColor: "bg-green-50",
      module: "attendance"
    },
    { 
      title: "Pending Leaves", 
      value: "8", 
      change: "-3", 
      changeType: "decrease",
      icon: Calendar, 
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      module: "leave"
    },
    { 
      title: "New Joiners", 
      value: "15", 
      change: "+5", 
      changeType: "increase",
      icon: TrendingUp, 
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      module: "recruitment"
    },
  ];

  const aiInsights = [
    {
      type: "alert",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      title: "High Absenteeism Alert",
      message: "Engineering department shows 15% higher absenteeism this week",
      action: "View Attendance Details",
      module: "attendance"
    },
    {
      type: "suggestion",
      icon: Brain,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      title: "Training Recommendation",
      message: "5 employees eligible for leadership development program",
      action: "View Training Plans",
      module: "training"
    },
    {
      type: "insight",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
      title: "Payroll Optimization",
      message: "Overtime costs reduced by 12% this quarter",
      action: "View Payroll Analytics",
      module: "payroll"
    },
    {
      type: "task",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      title: "Performance Reviews Due",
      message: "18 performance reviews scheduled for this month",
      action: "Manage Performance",
      module: "performance"
    },
  ];

  const upcomingBirthdays = [
    { name: "Sarah Johnson", date: "Today", department: "Marketing", avatar: "SJ" },
    { name: "Mike Chen", date: "Tomorrow", department: "Engineering", avatar: "MC" },
    { name: "Anna Smith", date: "Dec 8", department: "HR", avatar: "AS" },
    { name: "David Wilson", date: "Dec 9", department: "Sales", avatar: "DW" },
  ];

  const recentAnnouncements = [
    { title: "Year-end Party", date: "2 hours ago", type: "Event", priority: "high" },
    { title: "New Health Policy", date: "1 day ago", type: "Policy", priority: "medium" },
    { title: "Office Maintenance", date: "3 days ago", type: "Notice", priority: "low" },
  ];

  const chartConfig = {
    present: {
      label: "Present",
      color: "#10B981",
    },
    absent: {
      label: "Absent", 
      color: "#EF4444",
    },
    late: {
      label: "Late",
      color: "#F59E0B",
    },
  };

  const handleStatClick = (module: string) => {
    if (setActiveModule) {
      setActiveModule(module);
    }
  };

  const handleAIInsightAction = (module: string) => {
    if (setActiveModule) {
      setActiveModule(module);
    }
  };

  const handleViewReports = () => {
    if (setActiveModule) {
      setActiveModule('analytics');
    }
  };

  const openAIInsightsDashboard = () => {
    setAiInsightsOpen(true);
    // Simulate AI dashboard opening
    console.log("Opening AI Insights Dashboard with full analytics");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            HR Dashboard
          </h1>
          <p className="text-gray-600 mt-2 flex items-center space-x-2">
            <Activity className="w-4 h-4" />
            <span>Welcome back! Here's your HR overview for today.</span>
          </p>
        </div>
        <div className="flex space-x-3">
          <Button 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg"
            onClick={handleViewReports}
          >
            <Eye className="w-4 h-4 mr-2" />
            View Reports
          </Button>
        </div>
      </div>

      {/* AI Insights Banner */}
      <Card className="bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-50 border-indigo-200 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="w-6 h-6 text-indigo-600" />
              <CardTitle className="text-indigo-900 text-xl">AI-Powered Insights</CardTitle>
            </div>
            <Button 
              size="sm" 
              className="bg-indigo-600 hover:bg-indigo-700"
              onClick={openAIInsightsDashboard}
            >
              {aiInsightsOpen ? "AI Dashboard Active" : "Open AI Insights Dashboard"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiInsights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border ${insight.bgColor} border-opacity-20 cursor-pointer hover:shadow-md transition-all`}
                  onClick={() => handleAIInsightAction(insight.module)}
                >
                  <div className="flex items-start space-x-3">
                    <Icon className={`w-5 h-5 ${insight.color} mt-1 flex-shrink-0`} />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{insight.title}</h4>
                      <p className="text-sm text-gray-800 mb-2">{insight.message}</p>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAIInsightAction(insight.module);
                        }}
                      >
                        {insight.action}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {aiInsightsOpen && (
            <div className="mt-4 p-4 bg-white rounded-lg border border-indigo-200">
              <h4 className="font-semibold text-indigo-900 mb-2">AI Dashboard Analytics</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">87%</div>
                  <div className="text-gray-600">Employee Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">15</div>
                  <div className="text-gray-600">Automation Suggestions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">$12K</div>
                  <div className="text-gray-600">Potential Savings</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats Grid - Now Clickable */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={index} 
              className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg cursor-pointer transform hover:scale-105"
              onClick={() => handleStatClick(stat.module)}
            >
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

      {/* Charts Section - Now Clickable */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Chart */}
        <Card 
          className="shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => handleStatClick('attendance')}
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Weekly Attendance Overview</span>
                </CardTitle>
                <CardDescription>Click to view detailed attendance tracking</CardDescription>
              </div>
              <div className="flex space-x-2">
                {['week', 'month', 'quarter'].map((range) => (
                  <Button
                    key={range}
                    size="sm"
                    variant={selectedTimeRange === range ? "default" : "outline"}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTimeRange(range);
                    }}
                    className="text-xs"
                  >
                    {range}
                  </Button>
                ))}
              </div>
            </div>
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

        {/* Leave Trends */}
        <Card 
          className="shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => handleStatClick('leave')}
        >
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Leave Trends</span>
            </CardTitle>
            <CardDescription>Click to manage leave requests and policies</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={leaveData}>
                <defs>
                  <linearGradient id="casual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="sick" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="annual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip />
                <Area type="monotone" dataKey="casual" stackId="1" stroke="#3B82F6" fill="url(#casual)" />
                <Area type="monotone" dataKey="sick" stackId="1" stroke="#EF4444" fill="url(#sick)" />
                <Area type="monotone" dataKey="annual" stackId="1" stroke="#10B981" fill="url(#annual)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section - Now Clickable */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Distribution */}
        <Card 
          className="shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => handleStatClick('employees')}
        >
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="w-5 h-5" />
              <span>Department Distribution</span>
            </CardTitle>
            <CardDescription>Click to manage employees by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <RechartsPieChart>
                <ChartTooltip />
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
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
                  <span className="text-xs text-gray-600">{dept.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Birthdays & Events */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Upcoming Birthdays</span>
              </div>
              <Badge variant="outline" className="text-xs">
                {upcomingBirthdays.length} this week
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingBirthdays.map((birthday, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-3 p-3 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border border-pink-100 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleStatClick('employees')}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {birthday.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">{birthday.name}</p>
                    <p className="text-xs text-gray-600">{birthday.department}</p>
                  </div>
                  <Badge variant="outline" className="border-pink-200 text-pink-700 text-xs">
                    {birthday.date}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Announcements */}
        <Card 
          className="shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => handleStatClick('letters')}
        >
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Recent Announcements</span>
            </CardTitle>
            <CardDescription>Click to manage company communications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAnnouncements.map((announcement, index) => (
                <div key={index} className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 text-sm">{announcement.title}</h4>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        announcement.priority === 'high' ? 'border-red-200 text-red-700' :
                        announcement.priority === 'medium' ? 'border-orange-200 text-orange-700' :
                        'border-gray-200 text-gray-700'
                      }`}
                    >
                      {announcement.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500">{announcement.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
