
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, Shield, Settings, Database, Activity, AlertTriangle,
  UserCheck, Lock, Globe, Server, BarChart3, Clock
} from 'lucide-react';

interface MasterDashboardProps {
  setActiveModule: (module: string) => void;
}

export const MasterDashboard = ({ setActiveModule }: MasterDashboardProps) => {
  const systemStats = [
    { label: 'Total Users', value: '1,247', icon: Users, color: 'text-blue-600' },
    { label: 'Active Sessions', value: '89', icon: Activity, color: 'text-green-600' },
    { label: 'Failed Logins', value: '12', icon: AlertTriangle, color: 'text-red-600' },
    { label: 'System Uptime', value: '99.9%', icon: Server, color: 'text-purple-600' },
  ];

  const roleDistribution = [
    { role: 'Employees', count: 1180, percentage: 94.6, color: 'bg-blue-500' },
    { role: 'HR', count: 45, percentage: 3.6, color: 'bg-green-500' },
    { role: 'Admins', count: 20, percentage: 1.6, color: 'bg-orange-500' },
    { role: 'Masters', count: 2, percentage: 0.2, color: 'bg-red-500' },
  ];

  const recentActivities = [
    { action: 'New user registration', user: 'john.doe@company.com', time: '2 minutes ago', type: 'user' },
    { action: 'Role permission updated', user: 'HR Manager', time: '15 minutes ago', type: 'permission' },
    { action: 'System backup completed', user: 'System', time: '1 hour ago', type: 'system' },
    { action: 'Failed login attempt', user: 'unknown@domain.com', time: '2 hours ago', type: 'security' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-red-600">Master Control Center</h1>
          <p className="text-muted-foreground mt-2">
            Complete system administration and role management
          </p>
        </div>
        <Badge variant="destructive" className="text-lg px-4 py-2">
          <Shield className="w-5 h-5 mr-2" />
          Master Access
        </Badge>
      </div>

      {/* System Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Role Management & System Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Role Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              User Role Distribution
            </CardTitle>
            <CardDescription>Current user roles across the system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {roleDistribution.map((role, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{role.role}</span>
                  <span className="text-sm text-muted-foreground">
                    {role.count} ({role.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${role.color}`}
                    style={{ width: `${role.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* System Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              System Administration
            </CardTitle>
            <CardDescription>Core system management functions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => setActiveModule('role-management')}
            >
              <UserCheck className="w-4 h-4 mr-2" />
              Role & Permission Management
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => setActiveModule('security')}
            >
              <Lock className="w-4 h-4 mr-2" />
              Security Dashboard
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => setActiveModule('system-settings')}
            >
              <Database className="w-4 h-4 mr-2" />
              System Configuration
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => setActiveModule('audit-logs')}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Audit Logs & Reports
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent System Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent System Activities
          </CardTitle>
          <CardDescription>Latest system events and user activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'security' ? 'bg-red-500' :
                    activity.type === 'permission' ? 'bg-orange-500' :
                    activity.type === 'system' ? 'bg-blue-500' : 'bg-green-500'
                  }`} />
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.user}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveModule('employees')}>
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <h3 className="font-semibold">Manage Users</h3>
              <p className="text-sm text-muted-foreground">Add, edit, or remove users</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveModule('analytics')}>
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center">
              <BarChart3 className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <h3 className="font-semibold">System Analytics</h3>
              <p className="text-sm text-muted-foreground">View detailed reports</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveModule('settings')}>
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center">
              <Settings className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <h3 className="font-semibold">System Settings</h3>
              <p className="text-sm text-muted-foreground">Configure system preferences</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
