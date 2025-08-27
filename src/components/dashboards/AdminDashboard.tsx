
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, Users, FileText, TrendingUp, AlertCircle, CheckCircle,
  Clock, Calendar, Building2, Award
} from 'lucide-react';

interface AdminDashboardProps {
  setActiveModule: (module: string) => void;
}

export const AdminDashboard = ({ setActiveModule }: AdminDashboardProps) => {
  const adminStats = [
    { label: 'Monthly Payroll', value: '$245,670', icon: DollarSign, color: 'text-green-600', trend: '+12%' },
    { label: 'Pending Approvals', value: '23', icon: Clock, color: 'text-orange-600', trend: '-5%' },
    { label: 'Department Budget', value: '$1.2M', icon: Building2, color: 'text-blue-600', trend: '+8%' },
    { label: 'Performance Reviews', value: '156', icon: Award, color: 'text-purple-600', trend: '+15%' },
  ];

  const pendingApprovals = [
    { type: 'Leave Request', employee: 'John Smith', department: 'Engineering', priority: 'high' },
    { type: 'Expense Claim', employee: 'Sarah Wilson', department: 'Marketing', priority: 'medium' },
    { type: 'Overtime Request', employee: 'Mike Johnson', department: 'Sales', priority: 'low' },
    { type: 'Budget Request', employee: 'Lisa Brown', department: 'HR', priority: 'high' },
  ];

  const departmentMetrics = [
    { name: 'Engineering', employees: 45, budget: 65, performance: 92 },
    { name: 'Marketing', employees: 22, budget: 45, performance: 88 },
    { name: 'Sales', employees: 38, budget: 55, performance: 85 },
    { name: 'HR', employees: 12, budget: 25, performance: 95 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-orange-600">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Payroll management, approvals, and department oversight
          </p>
        </div>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          <Building2 className="w-5 h-5 mr-2" />
          Administrator
        </Badge>
      </div>

      {/* Admin Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStats.map((stat, index) => (
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

      {/* Pending Approvals & Department Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Approvals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Pending Approvals
            </CardTitle>
            <CardDescription>Items requiring your approval</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingApprovals.map((approval, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    approval.priority === 'high' ? 'bg-red-500' :
                    approval.priority === 'medium' ? 'bg-orange-500' : 'bg-green-500'
                  }`} />
                  <div>
                    <p className="text-sm font-medium">{approval.type}</p>
                    <p className="text-xs text-muted-foreground">
                      {approval.employee} - {approval.department}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <CheckCircle className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Department Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Department Overview
            </CardTitle>
            <CardDescription>Performance and budget utilization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {departmentMetrics.map((dept, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{dept.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {dept.employees} employees
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <div className="flex justify-between">
                      <span>Budget</span>
                      <span>{dept.budget}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full bg-blue-500"
                        style={{ width: `${dept.budget}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span>Performance</span>
                      <span>{dept.performance}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="h-1.5 rounded-full bg-green-500"
                        style={{ width: `${dept.performance}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveModule('payroll')}>
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center">
              <DollarSign className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <h3 className="font-semibold">Payroll</h3>
              <p className="text-sm text-muted-foreground">Manage salaries</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveModule('leave')}>
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <h3 className="font-semibold">Approvals</h3>
              <p className="text-sm text-muted-foreground">Review requests</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveModule('performance')}>
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center">
              <Award className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <h3 className="font-semibold">Performance</h3>
              <p className="text-sm text-muted-foreground">Review employees</p>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setActiveModule('analytics')}>
          <CardContent className="flex items-center justify-center p-6">
            <div className="text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <h3 className="font-semibold">Reports</h3>
              <p className="text-sm text-muted-foreground">View analytics</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
