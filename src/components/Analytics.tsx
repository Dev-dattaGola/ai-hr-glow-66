import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Share, 
  Brain, 
  Users, 
  Clock, 
  DollarSign,
  Target,
  FileText,
  Calendar,
  TrendingDown,
  Eye,
  Zap,
  Mail
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { toast } from "sonner";

export const Analytics = () => {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [showAIForecast, setShowAIForecast] = useState(false);

  const attendanceData = [
    { month: 'Jan', present: 92, absent: 8 },
    { month: 'Feb', present: 88, absent: 12 },
    { month: 'Mar', present: 94, absent: 6 },
    { month: 'Apr', present: 90, absent: 10 },
    { month: 'May', present: 89, absent: 11 },
    { month: 'Jun', present: 93, absent: 7 },
  ];

  const departmentData = [
    { name: 'Engineering', value: 45, color: '#3B82F6' },
    { name: 'Marketing', value: 32, color: '#10B981' },
    { name: 'Sales', value: 28, color: '#F59E0B' },
    { name: 'HR', value: 15, color: '#8B5CF6' },
    { name: 'Finance', value: 12, color: '#EF4444' },
  ];

  const attritionData = [
    { month: 'Jan', attrition: 2.1, headcount: 150 },
    { month: 'Feb', attrition: 1.8, headcount: 152 },
    { month: 'Mar', attrition: 3.2, headcount: 148 },
    { month: 'Apr', attrition: 2.5, headcount: 151 },
    { month: 'May', attrition: 1.9, headcount: 154 },
    { month: 'Jun', attrition: 2.3, headcount: 156 },
  ];

  const costData = [
    { month: 'Jan', salary: 850000, benefits: 120000, training: 25000 },
    { month: 'Feb', salary: 880000, benefits: 125000, training: 30000 },
    { month: 'Mar', salary: 920000, benefits: 130000, training: 28000 },
    { month: 'Apr', salary: 950000, benefits: 135000, training: 32000 },
    { month: 'May', salary: 980000, benefits: 140000, training: 35000 },
    { month: 'Jun', salary: 1020000, benefits: 145000, training: 40000 },
  ];

  const kpiData = [
    { title: "Employee Satisfaction", value: "87%", trend: "+5%", icon: Users, color: "text-green-600" },
    { title: "Avg Working Hours", value: "8.2h", trend: "+0.3h", icon: Clock, color: "text-blue-600" },
    { title: "Cost per Employee", value: "$4,250", trend: "-2%", icon: DollarSign, color: "text-purple-600" },
    { title: "Goal Achievement", value: "94%", trend: "+8%", icon: Target, color: "text-orange-600" },
  ];

  const handleViewReport = (reportType: string) => {
    console.log(`Viewing report: ${reportType}`);
    setSelectedReport(reportType);
    toast.success(`Opening ${reportType} report`);
  };

  const handleAIForecast = () => {
    console.log('Generating AI forecast');
    setShowAIForecast(true);
    toast.success('AI forecast generated successfully!');
  };

  const handleExport = (format: string) => {
    console.log(`Exporting in ${format} format`);
    toast.success(`Report exported as ${format}`);
  };

  const handleShare = () => {
    console.log('Sharing report');
    toast.success('Report sharing link copied to clipboard');
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent flex items-center space-x-2">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            <span>Analytics & Reports</span>
          </h1>
          <p className="text-gray-600 mt-1">Real-time insights and predictive analytics</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleShare} className="hover:bg-blue-50">
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" onClick={() => handleExport('PDF')} className="hover:bg-green-50">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={() => handleExport('Excel')} className="hover:bg-emerald-50">
            <Download className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
          <Button 
            onClick={handleAIForecast}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
          >
            <Brain className="w-4 h-4 mr-2" />
            AI Forecast
          </Button>
        </div>
      </div>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-violet-900">
            <Brain className="w-5 h-5" />
            <span>AI-Powered Predictive Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border border-violet-100 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-violet-900 mb-2">Attrition Forecast</h4>
              <p className="text-sm text-violet-800">Expected 3.2% attrition next quarter based on current trends</p>
              <Badge className="mt-2 bg-orange-100 text-orange-800">Moderate Risk</Badge>
            </div>
            <div className="p-4 bg-white rounded-lg border border-violet-100 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-violet-900 mb-2">Cost Prediction</h4>
              <p className="text-sm text-violet-800">HR costs projected to increase by 12% in Q4 2024</p>
              <Badge className="mt-2 bg-blue-100 text-blue-800">Budget Impact</Badge>
            </div>
            <div className="p-4 bg-white rounded-lg border border-violet-100 hover:shadow-md transition-shadow">
              <h4 className="font-semibent text-violet-900 mb-2">Headcount Planning</h4>
              <p className="text-sm text-violet-800">Recommend hiring 8 employees in Engineering by Dec 2024</p>
              <Badge className="mt-2 bg-green-100 text-green-800">Growth Opportunity</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => handleViewReport(kpi.title)}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 ${kpi.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {kpi.trend}
                  </Badge>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</p>
                  <p className="text-sm text-gray-600">{kpi.title}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Enhanced Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attrition & Headcount Trends */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <TrendingDown className="w-5 h-5 text-red-500" />
              <span>Attrition & Headcount Trends</span>
            </CardTitle>
            <Button size="sm" variant="outline" onClick={() => handleViewReport('Attrition')}>
              <Eye className="w-3 h-3 mr-1" />
              View
            </Button>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={attritionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="attrition" stackId="1" stroke="#EF4444" fill="#FEE2E2" name="Attrition %" />
                <Area type="monotone" dataKey="headcount" stackId="2" stroke="#3B82F6" fill="#DBEAFE" name="Headcount" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* HR Cost Analysis */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-green-500" />
              <span>HR Cost Analysis</span>
            </CardTitle>
            <Button size="sm" variant="outline" onClick={() => handleViewReport('Cost Analysis')}>
              <Eye className="w-3 h-3 mr-1" />
              View
            </Button>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="salary" fill="#3B82F6" name="Salary" />
                <Bar dataKey="benefits" fill="#10B981" name="Benefits" />
                <Bar dataKey="training" fill="#F59E0B" name="Training" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Attendance Trends */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <span>Attendance Trends</span>
            </CardTitle>
            <Button size="sm" variant="outline" onClick={() => handleViewReport('Attendance')}>
              <Eye className="w-3 h-3 mr-1" />
              View
            </Button>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="present" fill="#10B981" name="Present %" />
                <Bar dataKey="absent" fill="#EF4444" name="Absent %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Distribution */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-purple-500" />
              <span>Department Distribution</span>
            </CardTitle>
            <Button size="sm" variant="outline" onClick={() => handleViewReport('Department Distribution')}>
              <Eye className="w-3 h-3 mr-1" />
              View
            </Button>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Reports Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Generated Reports</span>
          </CardTitle>
          <div className="flex space-x-2">
            <Button size="sm" onClick={() => handleExport('All Reports')} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
              <Download className="w-3 h-3 mr-1" />
              Export All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Monthly Attendance Report", date: "Dec 2024", type: "PDF", size: "2.4 MB", status: "Ready" },
              { title: "Payroll Summary", date: "Nov 2024", type: "Excel", size: "1.8 MB", status: "Ready" },
              { title: "Employee Performance", date: "Q4 2024", type: "PDF", size: "3.2 MB", status: "Processing" },
              { title: "Leave Analysis", date: "Dec 2024", type: "Excel", size: "950 KB", status: "Ready" },
              { title: "Department Costs", date: "Nov 2024", type: "PDF", size: "1.5 MB", status: "Ready" },
              { title: "Recruitment Metrics", date: "Q4 2024", type: "Excel", size: "1.2 MB", status: "Ready" },
            ].map((report, index) => (
              <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{report.title}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{report.type}</Badge>
                      <Badge variant={report.status === 'Ready' ? 'default' : 'secondary'}>
                        {report.status}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{report.date} • {report.size}</p>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleExport(report.title)}
                      disabled={report.status === 'Processing'}
                    >
                      <Download className="w-3 h-3 mr-2" />
                      Download
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={handleShare}
                    >
                      <Share className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Forecast Modal */}
      {showAIForecast && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-6 h-6 text-purple-600" />
                <span>AI Forecast & Predictions</span>
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowAIForecast(false)}>
                ×
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Next Quarter Predictions</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900">Headcount Growth</h4>
                      <p className="text-sm text-blue-700">Expected to reach 165 employees (+5.8%)</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-900">Cost Optimization</h4>
                      <p className="text-sm text-green-700">Potential savings of $35K through automation</p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <h4 className="font-medium text-orange-900">Attrition Alert</h4>
                      <p className="text-sm text-orange-700">Monitor 5 high-risk employees in Engineering</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Recommendations</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Zap className="w-4 h-4 text-yellow-500 mt-1" />
                      <div>
                        <p className="text-sm font-medium">Implement retention program</p>
                        <p className="text-xs text-gray-600">Focus on Engineering team members</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Target className="w-4 h-4 text-blue-500 mt-1" />
                      <div>
                        <p className="text-sm font-medium">Budget reallocation</p>
                        <p className="text-xs text-gray-600">Shift 15% budget from admin to training</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Users className="w-4 h-4 text-green-500 mt-1" />
                      <div>
                        <p className="text-sm font-medium">Hiring timeline</p>
                        <p className="text-xs text-gray-600">Start recruitment for 3 positions by Feb 2025</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowAIForecast(false)}>
                  Close
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500" onClick={() => handleExport('AI Forecast')}>
                  <Download className="w-4 h-4 mr-2" />
                  Export Forecast
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
