
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  MapPin, 
  Calendar, 
  TrendingUp,
  Brain,
  CheckCircle,
  AlertTriangle,
  Users,
  Activity
} from "lucide-react";
import { PunchInOut } from "./attendance/PunchInOut";
import { ManualEntryDialog } from "./attendance/ManualEntryDialog";
import { AttendanceLogsDialog } from "./attendance/AttendanceLogsDialog";
import { AIReportDialog } from "./attendance/AIReportDialog";

export const AttendanceTracking = () => {
  const todayStats = {
    present: 231,
    late: 33,
    absent: 16,
    onTime: 198
  };

  const recentPunches = [
    { name: "Sarah Johnson", time: "09:15 AM", type: "In", status: "Late", location: "Office - Floor 3" },
    { name: "Mike Chen", time: "09:02 AM", type: "In", status: "On Time", location: "Office - Floor 2" },
    { name: "Anna Smith", time: "06:30 PM", type: "Out", status: "Overtime", location: "Office - Floor 1" },
    { name: "David Wilson", time: "08:45 AM", type: "In", status: "On Time", location: "Remote - Home" },
  ];

  return (
    <div className="space-y-8">
      {/* Header with enhanced styling */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent flex items-center space-x-3">
            <Clock className="w-10 h-10 text-blue-600" />
            <span>Attendance Tracking</span>
          </h1>
          <p className="text-gray-600 mt-2 text-lg">Real-time attendance monitoring with AI-powered insights</p>
        </div>
        <div className="flex space-x-3">
          <ManualEntryDialog />
          <AttendanceLogsDialog />
          <AIReportDialog />
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-green-800 mb-1">{todayStats.present}</p>
            <p className="text-sm font-medium text-green-700 mb-2">Present Today</p>
            <Badge className="bg-green-100 text-green-800 border-green-200">94% Attendance</Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-blue-100 rounded-full">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-blue-800 mb-1">{todayStats.onTime}</p>
            <p className="text-sm font-medium text-blue-700 mb-2">On Time</p>
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">80% Punctuality</Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 border-orange-200 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-orange-100 rounded-full">
                <AlertTriangle className="w-8 h-8 text-orange-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-orange-800 mb-1">{todayStats.late}</p>
            <p className="text-sm font-medium text-orange-700 mb-2">Late Arrivals</p>
            <Badge className="bg-orange-100 text-orange-800 border-orange-200">13% Late</Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 via-rose-50 to-red-100 border-red-200 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-red-100 rounded-full">
                <Users className="w-8 h-8 text-red-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-red-800 mb-1">{todayStats.absent}</p>
            <p className="text-sm font-medium text-red-700 mb-2">Absent</p>
            <Badge className="bg-red-100 text-red-800 border-red-200">6% Absent</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Punch In/Out Section */}
      <PunchInOut />

      {/* AI Insights with enhanced design */}
      <Card className="bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-purple-900">
            <div className="p-2 bg-purple-100 rounded-full">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <span>AI Pattern Analysis & Fraud Detection</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-semibold text-red-800 mb-1">🚨 Fraud Detection Alert</p>
                  <p className="text-sm text-purple-800">
                    Unusual punch pattern detected for 2 employees - potential buddy punching identified through location and timing analysis
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-white rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-semibold text-orange-800 mb-1">📊 Trend Analysis</p>
                  <p className="text-sm text-purple-800">
                    Marketing team shows 15% increase in late arrivals this week - Monday mornings most affected
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-white rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-semibold text-blue-800 mb-1">⏰ Overtime Prediction</p>
                  <p className="text-sm text-purple-800">
                    Engineering team projected to exceed monthly overtime budget by 23% based on current patterns
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity & Department Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <span>Live Punch Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPunches.map((punch, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:from-blue-50 hover:to-indigo-50 transition-all duration-200">
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full ${
                      punch.type === 'In' ? 'bg-green-500' : 'bg-red-500'
                    } animate-pulse`}></div>
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">
                        {punch.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{punch.name}</p>
                      <p className="text-sm text-gray-600 flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{punch.location}</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{punch.time}</p>
                    <Badge className={
                      punch.status === 'On Time' ? 'bg-green-100 text-green-800' :
                      punch.status === 'Late' ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }>
                      {punch.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-600" />
              <span>Department Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { dept: "Engineering", present: 45, total: 50, percentage: 90, color: "from-blue-500 to-blue-600" },
                { dept: "Marketing", present: 28, total: 32, percentage: 88, color: "from-purple-500 to-purple-600" },
                { dept: "Sales", present: 35, total: 40, percentage: 88, color: "from-green-500 to-green-600" },
                { dept: "HR", present: 12, total: 15, percentage: 80, color: "from-orange-500 to-orange-600" },
              ].map((dept, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border hover:shadow-md transition-all duration-200">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-gray-900">{dept.dept}</span>
                    <Badge variant="outline" className="font-semibold">{dept.percentage}%</Badge>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Present: <strong>{dept.present}</strong></span>
                    <span>Total: <strong>{dept.total}</strong></span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`bg-gradient-to-r ${dept.color} h-3 rounded-full transition-all duration-500 ease-out`}
                      style={{ width: `${dept.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
