
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, Calendar, DollarSign, User, FileText, TrendingUp,
  CheckCircle, AlertCircle, Bell, Award, Target, Briefcase
} from 'lucide-react';

interface EmployeeDashboardProps {
  setActiveModule: (module: string) => void;
}

export const EmployeeDashboard = ({ setActiveModule }: EmployeeDashboardProps) => {
  const employeeStats = [
    { label: 'Hours This Month', value: '168.5', icon: Clock, color: 'text-blue-600', target: '176' },
    { label: 'Leave Balance', value: '12', icon: Calendar, color: 'text-green-600', unit: 'days' },
    { label: 'Last Payslip', value: '$4,250', icon: DollarSign, color: 'text-purple-600', period: 'March 2024' },
    { label: 'Performance Score', value: '4.2', icon: Award, color: 'text-orange-600', max: '5.0' },
  ];

  const recentActivities = [
    { action: 'Clocked in', time: 'Today 9:00 AM', type: 'attendance' },
    { action: 'Leave request approved', time: 'Yesterday', type: 'leave' },
    { action: 'Training completed', time: '2 days ago', type: 'training' },
    { action: 'Payslip generated', time: '3 days ago', type: 'payroll' },
  ];

  const upcomingEvents = [
    { event: 'Team Meeting', time: 'Today 2:00 PM', type: 'meeting' },
    { event: 'Training Session', time: 'Tomorrow 10:00 AM', type: 'training' },
    { event: 'Performance Review', time: 'Friday 3:00 PM', type: 'review' },
    { event: 'Company Event', time: 'Next Monday', type: 'event' },
  ];

  const goals = [
    { title: 'Complete React Training', progress: 75, deadline: '2 weeks' },
    { title: 'Project Milestone', progress: 40, deadline: '1 month' },
    { title: 'Skill Assessment', progress: 90, deadline: '1 week' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-600">Welcome Back, John!</h1>
          <p className="text-muted-foreground mt-2">
            Here's what's happening with your work today
          </p>
        </div>
        <Badge variant="default" className="text-lg px-4 py-2">
          <User className="w-5 h-5 mr-2" />
          Employee
        </Badge>
      </div>

      {/* Employee Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {employeeStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stat.value}
                {stat.unit && <span className="text-sm font-normal ml-1">{stat.unit}</span>}
              </div>
              {stat.target && (
                <div className="text-xs text-muted-foreground">
                  Target: {stat.target}
                </div>
              )}
              {stat.max && (
                <div className="text-xs text-muted-foreground">
                  out of {stat.max}
                </div>
              )}
              {stat.period && (
                <div className="text-xs text-muted-foreground">
                  {stat.period}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks you might need today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              className="h-20 flex flex-col items-center gap-2" 
              variant="outline"
              onClick={() => setActiveModule('attendance')}
            >
              <Clock className="w-6 h-6" />
              <span className="text-sm">Clock In/Out</span>
            </Button>
            <Button 
              className="h-20 flex flex-col items-center gap-2" 
              variant="outline"
              onClick={() => setActiveModule('leave')}
            >
              <Calendar className="w-6 h-6" />
              <span className="text-sm">Request Leave</span>
            </Button>
            <Button 
              className="h-20 flex flex-col items-center gap-2" 
              variant="outline"
              onClick={() => setActiveModule('payroll')}
            >
              <DollarSign className="w-6 h-6" />
              <span className="text-sm">View Payslip</span>
            </Button>
            <Button 
              className="h-20 flex flex-col items-center gap-2" 
              variant="outline"
              onClick={() => setActiveModule('expenses')}
            >
              <FileText className="w-6 h-6" />
              <span className="text-sm">Submit Expense</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities & Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Activities
            </CardTitle>
            <CardDescription>Your recent actions and updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                <div className={`w-3 h-3 rounded-full ${
                  activity.type === 'attendance' ? 'bg-blue-500' :
                  activity.type === 'leave' ? 'bg-green-500' :
                  activity.type === 'training' ? 'bg-purple-500' : 'bg-orange-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Upcoming Events
            </CardTitle>
            <CardDescription>Your schedule and important dates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    event.type === 'meeting' ? 'bg-blue-500' :
                    event.type === 'training' ? 'bg-purple-500' :
                    event.type === 'review' ? 'bg-orange-500' : 'bg-green-500'
                  }`} />
                  <div>
                    <p className="text-sm font-medium">{event.event}</p>
                    <p className="text-xs text-muted-foreground">{event.time}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  View
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Goals & Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Goals & Progress
          </CardTitle>
          <CardDescription>Track your personal and professional development</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {goals.map((goal, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">{goal.title}</h3>
                <span className="text-xs text-muted-foreground">
                  Due in {goal.deadline}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Progress value={goal.progress} className="flex-1" />
                <span className="text-sm font-medium">{goal.progress}%</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Personal Info & Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveModule('profile')}>
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center">
              <User className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <h3 className="font-semibold">My Profile</h3>
              <p className="text-sm text-muted-foreground">Update personal information</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveModule('training')}>
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center">
              <Briefcase className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <h3 className="font-semibold">Learning</h3>
              <p className="text-sm text-muted-foreground">Access training materials</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
