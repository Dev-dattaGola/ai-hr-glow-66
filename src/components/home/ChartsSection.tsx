
import { BarChart3, PieChart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Cell,
  Pie
} from 'recharts';

export const ChartsSection = () => {
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

  const chartConfig = {
    present: { label: "Present", color: "#10B981" },
    absent: { label: "Absent", color: "#EF4444" },
    late: { label: "Late", color: "#F59E0B" },
  };

  return (
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
  );
};
