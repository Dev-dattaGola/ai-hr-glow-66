
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, UserPlus, Clock, Calendar, FileText, TrendingUp,
  CheckCircle, AlertCircle, Target, Briefcase
} from 'lucide-react';

interface HRDashboardProps {
  setActiveModule: (module: string) => void;
}

export const HRDashboard = ({ setActiveModule }: HRDashboardProps) => {
  const hrStats = [
    { label: 'Total Employees', value: '1,180', icon: Users, color: 'text-blue-600', trend: '+5.2%' },
    { label: 'New Hires (Month)', value: '24', icon: UserPlus, color: 'text-green-600', trend: '+12%' },
    { label: 'Attendance Rate', value: '94.8%', icon: CheckCircle, color: 'text-purple-600', trend: '+2.1%' },
    { label: 'Leave Requests', value: '18', icon: Calendar, color: 'text-orange-600', trend: '-8%' },
  ];

  const recentActivities = [
    { action: 'New employee onboarded', detail: 'John Smith - Engineering', time: '2 hours ago', type: 'hire' },
    { action: 'Leave request approved', detail: 'Sarah Wilson - 3 days', time: '4 hours ago', type: 'leave' },
    { action: 'Performance review completed', detail: 'Mike Johnson - Sales', time: '6 hours ago', type: 'review' },
    { action: 'Training session scheduled', detail: 'Leadership Workshop', time: '1 day ago', type: 'training' },
  ];

  const upcomingTasks = [
    { task: 'Interview - Frontend Developer', time: 'Today 2:00 PM', priority: 'high' },
    { task: 'Employee Feedback Session', time: 'Tomorrow 10:00 AM', priority: 'medium' },
    { task: 'Monthly HR Report Due', time: 'This Friday', priority: 'high' },
    { task: 'Team Building Event Planning', time: 'Next Week', priority: 'low' },
  ];

  const employeeMetrics = [
    { department: 'Engineering', total: 45, present: 42, onLeave: 2, remote: 1 },
    { department: 'Marketing', total: 22, present: 20, onLeave: 1, remote: 1 },
    { department: 'Sales', total: 38, present: 35, onLeave: 1, remote: 2 },
    { department: 'Operations', total: 28, present: 26, onLeave: 1, remote: 1 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-600">HR Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Employee management, attendance tracking, and HR operations
          </p>
        </div>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          <Users className="w-5 h-5 mr-2" />
          HR Manager
        </Badge>
      </div>

      {/* HR Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {hrStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className={`text-xs ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activities & Upcoming Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Activities
            </CardTitle>
            <CardDescription>Latest HR activities and updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                <div className={`w-3 h-3 rounded-full ${
                  activity.type === 'hire' ? 'bg-green-500' :
                  activity.type === 'leave' ? 'bg-blue-500' :
                  activity.type === 'review' ? 'bg-purple-500' : 'bg-orange-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.detail}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Upcoming Tasks
            </CardTitle>
            <CardDescription>Your scheduled HR tasks and deadlines</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    task.priority === 'high' ? 'bg-red-500' :
                    task.priority === 'medium' ? 'bg-orange-500' : 'bg-green-500'
                  }`} />
                  <div>
                    <p className="text-sm font-medium">{task.task}</p>
                    <p className="text-xs text-muted-foreground">{task.time}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <CheckCircle className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Employee Department Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Department Employee Status
          </CardTitle>
          <CardDescription>Current attendance and status by department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {employeeMetrics.map((dept, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{dept.department}</h3>
                  <Badge variant="outline">{dept.total}</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-600">Present:</span>
                    <span>{dept.present}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-600">Remote:</span>
                    <span>{dept.remote}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-orange-600">On Leave:</span>
                    <span>{dept.onLeave}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveModule('employees')}>
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <h3 className="font-semibold">Employees</h3>
              <p className="text-sm text-muted-foreground">Manage staff</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveModule('recruitment')}>
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center">
              <UserPlus className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <h3 className="font-semibold">Recruitment</h3>
              <p className="text-sm text-muted-foreground">Hire new talent</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveModule('attendance')}>
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <h3 className="font-semibold">Attendance</h3>
              <p className="text-sm text-muted-foreground">Track time</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveModule('training')}>
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center">
              <Briefcase className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <h3 className="font-semibold">Training</h3>
              <p className="text-sm text-muted-foreground">Develop skills</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
