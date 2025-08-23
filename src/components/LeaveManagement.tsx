
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Check, 
  X, 
  Clock, 
  Brain, 
  Zap, 
  Download,
  Search,
  Filter,
  AlertTriangle,
  Users,
  TrendingUp,
  FileText
} from "lucide-react";
import { format } from "date-fns";

export const LeaveManagement = () => {
  const [activeTab, setActiveTab] = useState("requests");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [applyLeaveOpen, setApplyLeaveOpen] = useState(false);
  const { toast } = useToast();

  const pendingRequests = [
    {
      id: 1,
      employee: "Sarah Johnson",
      employeeId: "EMP001",
      avatar: "SJ",
      type: "Sick Leave",
      dates: "Dec 10-12, 2024",
      days: 3,
      reason: "Medical appointment and recovery",
      status: "Pending",
      applied: "2 hours ago",
      urgency: "high"
    },
    {
      id: 2,
      employee: "Mike Chen",
      employeeId: "EMP002",
      avatar: "MC",
      type: "Vacation",
      dates: "Dec 20-30, 2024",
      days: 8,
      reason: "Family vacation",
      status: "Pending",
      applied: "1 day ago",
      urgency: "medium"
    },
    {
      id: 3,
      employee: "Jessica Smith",
      employeeId: "EMP003",
      avatar: "JS",
      type: "Personal Leave",
      dates: "Dec 15-16, 2024",
      days: 2,
      reason: "Personal emergency",
      status: "Pending",
      applied: "3 hours ago",
      urgency: "high"
    }
  ];

  const leaveStats = [
    { type: "Total Requests", count: 23, change: "+5", color: "blue", icon: FileText },
    { type: "Pending", count: 8, change: "+2", color: "orange", icon: Clock },
    { type: "Approved", count: 12, change: "+3", color: "green", icon: Check },
    { type: "Rejected", count: 3, change: "0", color: "red", icon: X }
  ];

  const leaveBalance = [
    { type: "Annual Leave", used: 8, total: 24, pending: 2 },
    { type: "Sick Leave", used: 3, total: 12, pending: 1 },
    { type: "Personal Leave", used: 2, total: 6, pending: 0 },
    { type: "Maternity/Paternity", used: 0, total: 90, pending: 0 }
  ];

  const handleApprove = (requestId: number) => {
    toast({
      title: "Leave Approved",
      description: "Leave request has been approved successfully.",
    });
  };

  const handleReject = (requestId: number) => {
    toast({
      title: "Leave Rejected",
      description: "Leave request has been rejected.",
      variant: "destructive",
    });
  };

  const handleApplyLeave = () => {
    toast({
      title: "Leave Applied",
      description: "Your leave request has been submitted for approval.",
    });
    setApplyLeaveOpen(false);
  };

  const handleCalendarSync = () => {
    toast({
      title: "Calendar Sync",
      description: "Syncing with Google Calendar...",
    });
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <CalendarIcon className="w-8 h-8 text-white" />
            </div>
            <span>Leave Management</span>
          </h1>
          <p className="text-gray-600 text-lg">Streamlined leave requests and policy management</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="hover:shadow-md transition-all duration-200">
            <Users className="w-4 h-4 mr-2" />
            Leave Balance
          </Button>
          <Button 
            variant="outline" 
            onClick={handleCalendarSync}
            className="hover:shadow-md transition-all duration-200"
          >
            <CalendarIcon className="w-4 h-4 mr-2" />
            Calendar Sync
          </Button>
          <Dialog open={applyLeaveOpen} onOpenChange={setApplyLeaveOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200">
                <Plus className="w-4 h-4 mr-2" />
                Apply Leave
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Apply for Leave</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Leave Type</Label>
                  <select className="w-full mt-1 p-2 border rounded-md">
                    <option>Annual Leave</option>
                    <option>Sick Leave</option>
                    <option>Personal Leave</option>
                    <option>Emergency Leave</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>From Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <CalendarIcon className="w-4 h-4 mr-2" />
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label>To Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <CalendarIcon className="w-4 h-4 mr-2" />
                          Pick a date
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div>
                  <Label>Reason</Label>
                  <Textarea placeholder="Please provide a reason for your leave request..." />
                </div>
                <Button onClick={handleApplyLeave} className="w-full">
                  Submit Leave Request
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Enhanced AI Recommendations */}
      <Card className="bg-gradient-to-r from-cyan-50 via-blue-50 to-indigo-50 border-cyan-200 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <CardTitle className="text-cyan-900">AI Leave Intelligence</CardTitle>
            </div>
            <Badge className="bg-cyan-100 text-cyan-800">Live Analytics</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start space-x-3 p-3 bg-white/60 rounded-lg">
              <Zap className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-cyan-900">Optimal Leave Days</p>
                <p className="text-sm text-cyan-700">Dec 23-27 requires only 3 working days for Mike's vacation</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-white/60 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-orange-900">Pattern Alert</p>
                <p className="text-sm text-orange-700">John Doe: Frequent Monday absences detected</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-white/60 rounded-lg">
              <TrendingUp className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-indigo-900">Peak Season Alert</p>
                <p className="text-sm text-indigo-700">Set team limits for holiday season</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Leave Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {leaveStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-all duration-200 group">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center space-x-3 mb-2">
                  <div className={`p-3 rounded-full ${
                    stat.color === 'green' ? 'bg-green-100' :
                    stat.color === 'orange' ? 'bg-orange-100' :
                    stat.color === 'red' ? 'bg-red-100' :
                    'bg-blue-100'
                  } group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className={`w-6 h-6 ${
                      stat.color === 'green' ? 'text-green-600' :
                      stat.color === 'orange' ? 'text-orange-600' :
                      stat.color === 'red' ? 'text-red-600' :
                      'text-blue-600'
                    }`} />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.count}</p>
                <p className="text-sm font-medium text-gray-600 mb-2">{stat.type}</p>
                <p className={`text-xs font-semibold ${
                  stat.color === 'green' ? 'text-green-600' :
                  stat.color === 'orange' ? 'text-orange-600' :
                  stat.color === 'red' ? 'text-red-600' :
                  'text-blue-600'
                }`}>
                  {stat.change} this week
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Enhanced Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
            <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-lg h-12">
              <TabsTrigger value="requests" className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <FileText className="w-4 h-4" />
                <span>Requests</span>
              </TabsTrigger>
              <TabsTrigger value="balance" className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <Users className="w-4 h-4" />
                <span>Balance</span>
              </TabsTrigger>
              <TabsTrigger value="calendar" className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <CalendarIcon className="w-4 h-4" />
                <span>Calendar</span>
              </TabsTrigger>
              <TabsTrigger value="policies" className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <Clock className="w-4 h-4" />
                <span>Policies</span>
              </TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent className="p-6">
            <TabsContent value="requests" className="mt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Pending Leave Requests</h3>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input placeholder="Search requests..." className="pl-10" />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
                
                {pendingRequests.map((request) => (
                  <Card key={request.id} className="border border-gray-200 hover:shadow-md transition-all duration-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                              {request.avatar}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 text-lg">{request.employee}</h3>
                              <p className="text-sm text-gray-500">{request.employeeId}</p>
                            </div>
                            <Badge className="bg-blue-100 text-blue-800 font-medium">{request.type}</Badge>
                            <Badge variant="outline" className={`border-orange-200 text-orange-700 ${
                              request.urgency === 'high' ? 'border-red-200 text-red-700 bg-red-50' : ''
                            }`}>
                              <Clock className="w-3 h-3 mr-1" />
                              {request.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="text-sm text-gray-600 font-medium">Dates</p>
                              <p className="font-semibold text-gray-900">{request.dates}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="text-sm text-gray-600 font-medium">Duration</p>
                              <p className="font-semibold text-gray-900">{request.days} days</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="text-sm text-gray-600 font-medium">Applied</p>
                              <p className="font-semibold text-gray-900">{request.applied}</p>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-600 font-medium mb-1">Reason</p>
                            <p className="text-gray-900">{request.reason}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-2 ml-6">
                          <Button 
                            size="sm" 
                            onClick={() => handleApprove(request.id)}
                            className="bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleReject(request.id)}
                            className="border-red-200 text-red-700 hover:bg-red-50 shadow-md hover:shadow-lg transition-all duration-200"
                          >
                            <X className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="balance" className="mt-0">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Leave Balance Overview</h3>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {leaveBalance.map((leave, index) => (
                    <Card key={index} className="hover:shadow-lg transition-all duration-200">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-gray-900">{leave.type}</h4>
                          <Badge variant="outline">{leave.used + leave.pending}/{leave.total} days</Badge>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Used</span>
                            <span className="font-medium">{leave.used} days</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${(leave.used / leave.total) * 100}%` }}
                            ></div>
                          </div>
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Pending</span>
                            <span className="font-medium text-orange-600">{leave.pending} days</span>
                          </div>
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Available</span>
                            <span className="font-medium text-green-600">{leave.total - leave.used - leave.pending} days</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="calendar" className="mt-0">
              <div className="text-center py-12">
                <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl mb-6">
                  <CalendarIcon className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Holiday Calendar Integration</h3>
                  <p className="text-gray-600 mb-6">Sync with Google Calendar to manage team holidays and leave schedules</p>
                  <div className="flex justify-center space-x-4">
                    <Button onClick={handleCalendarSync} className="bg-gradient-to-r from-blue-500 to-indigo-600">
                      <Plus className="w-4 h-4 mr-2" />
                      Sync with Google Calendar
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download iCal
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="policies" className="mt-0">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Leave Policies</h3>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Policy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <Card className="hover:shadow-lg transition-all duration-200">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-gray-900 text-lg">Annual Leave Policy</h4>
                          <p className="text-gray-600">24 days per year, can be carried forward up to 5 days</p>
                          <div className="flex space-x-4 text-sm text-gray-500">
                            <span>• Applies to: All employees</span>
                            <span>• Effective: Jan 1, 2024</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="hover:shadow-md">Edit</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:shadow-lg transition-all duration-200">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-gray-900 text-lg">Sick Leave Policy</h4>
                          <p className="text-gray-600">12 days per year, requires medical certificate for 3+ days</p>
                          <div className="flex space-x-4 text-sm text-gray-500">
                            <span>• Applies to: All employees</span>
                            <span>• Medical cert required: 3+ days</span>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="hover:shadow-md">Edit</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
};
