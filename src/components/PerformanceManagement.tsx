
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Brain, 
  Users, 
  Target, 
  Award, 
  Plus, 
  Search,
  Star,
  Calendar,
  BookOpen,
  Send,
  FileText,
  BarChart3,
  Eye,
  CheckCircle,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  X
} from "lucide-react";
import { toast } from "sonner";

const PerformanceManagement = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [showReviewCycle, setShowReviewCycle] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showAISummary, setShowAISummary] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const employees = [
    { 
      id: 1, 
      name: "John Doe", 
      position: "Senior Developer", 
      department: "Engineering", 
      performance: 85, 
      kras: 4, 
      trend: "up",
      lastReview: "2024-01-15",
      nextReview: "2024-04-15"
    },
    { 
      id: 2, 
      name: "Sarah Wilson", 
      position: "Marketing Manager", 
      department: "Marketing", 
      performance: 92, 
      kras: 5, 
      trend: "up",
      lastReview: "2024-01-10",
      nextReview: "2024-04-10"
    },
    { 
      id: 3, 
      name: "Mike Johnson", 
      position: "Sales Executive", 
      department: "Sales", 
      performance: 78, 
      kras: 3, 
      trend: "down",
      lastReview: "2024-01-20",
      nextReview: "2024-04-20"
    },
  ];

  const reviewCycles = [
    { id: 1, name: "Q1 2024 Performance Review", status: "Active", participants: 45, deadline: "2024-03-31" },
    { id: 2, name: "Annual Review 2023", status: "Completed", participants: 50, deadline: "2023-12-31" },
    { id: 3, name: "Mid-Year Review 2024", status: "Planning", participants: 0, deadline: "2024-06-30" },
  ];

  const kpiMetrics = [
    { name: "Overall Performance", value: 85, target: 80, status: "exceeds" },
    { name: "Goal Achievement", value: 78, target: 85, status: "below" },
    { name: "Team Collaboration", value: 92, target: 80, status: "exceeds" },
    { name: "Innovation Index", value: 88, target: 75, status: "exceeds" },
  ];

  const handleReviewCycle = () => {
    console.log('Starting new review cycle');
    setShowReviewCycle(true);
  };

  const handleAddFeedback = () => {
    console.log('Adding feedback');
    setShowFeedback(true);
  };

  const handleAISummary = () => {
    console.log('Generating AI summary');
    setShowAISummary(true);
    toast.success('AI performance summary generated!');
  };

  const handleViewProgress = (employeeId: number) => {
    const employee = employees.find(e => e.id === employeeId);
    setSelectedEmployee(employee);
    toast.success(`Viewing progress for ${employee?.name}`);
  };

  const handleSubmitFeedback = () => {
    console.log('Submitting feedback:', feedbackText);
    toast.success('Feedback submitted successfully!');
    setShowFeedback(false);
    setFeedbackText("");
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent flex items-center space-x-2">
            <TrendingUp className="w-8 h-8 text-purple-600" />
            <span>Performance Management</span>
          </h1>
          <p className="text-gray-600 mt-1">360° Feedback, KRAs/KPIs Dashboard & AI-powered Performance Insights</p>
        </div>
        <div className="flex space-x-3">
          <Button onClick={handleReviewCycle} className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
            <Calendar className="w-4 h-4 mr-2" />
            Review Cycle
          </Button>
          <Button onClick={handleAddFeedback} variant="outline" className="hover:bg-purple-50">
            <Plus className="w-4 h-4 mr-2" />
            Add Feedback
          </Button>
          <Button onClick={handleAISummary} variant="outline" className="hover:bg-blue-50">
            <Brain className="w-4 h-4 mr-2" />
            AI Summary
          </Button>
        </div>
      </div>

      {/* KPI Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiMetrics.map((metric, index) => (
          <Card key={index} className={`${metric.status === 'exceeds' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{metric.name}</h3>
                {metric.status === 'exceeds' ? (
                  <ArrowUp className="w-5 h-5 text-green-600" />
                ) : (
                  <ArrowDown className="w-5 h-5 text-red-600" />
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{metric.value}%</span>
                  <span className="text-sm text-gray-600">Target: {metric.target}%</span>
                </div>
                <Progress value={metric.value} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Insights Panel */}
      <Card className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-900">
            <Brain className="w-5 h-5" />
            <span>AI Performance Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border border-blue-100 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-blue-900 mb-2">Top Performers</h4>
              <p className="text-sm text-blue-800">Sarah Wilson leads with 92% performance score. Consider for promotion.</p>
              <Badge className="mt-2 bg-green-100 text-green-800">Promotion Ready</Badge>
            </div>
            <div className="p-4 bg-white rounded-lg border border-blue-100 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-blue-900 mb-2">Training Needs</h4>
              <p className="text-sm text-blue-800">3 employees need leadership training to reach next level.</p>
              <Badge className="mt-2 bg-orange-100 text-orange-800">Training Required</Badge>
            </div>
            <div className="p-4 bg-white rounded-lg border border-blue-100 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-blue-900 mb-2">Performance Trends</h4>
              <p className="text-sm text-blue-800">Overall team performance up 12% this quarter.</p>
              <Badge className="mt-2 bg-blue-100 text-blue-800">Trending Up</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Employee Performance List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Employee Performance</span>
              </CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredEmployees.map((employee) => (
                  <Card key={employee.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {employee.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                          <p className="text-sm text-gray-600">{employee.position}</p>
                          <p className="text-xs text-gray-500">{employee.department}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="font-semibold text-lg">{employee.performance}%</p>
                          <p className="text-xs text-gray-500">Performance</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 ${i < employee.kras ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <p className="text-xs text-gray-500">KRAs</p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleViewProgress(employee.id)}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View Progress
                        </Button>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Last Review: {employee.lastReview}</span>
                        <span>Next Review: {employee.nextReview}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Review Cycles */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Review Cycles</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {reviewCycles.map((cycle) => (
                  <div key={cycle.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{cycle.name}</h4>
                      <Badge variant={cycle.status === 'Active' ? 'default' : cycle.status === 'Completed' ? 'secondary' : 'outline'}>
                        {cycle.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{cycle.participants} participants</p>
                    <p className="text-xs text-gray-500 mb-2">Deadline: {cycle.deadline}</p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        <FileText className="w-3 h-3 mr-1" />
                        Details
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        <BarChart3 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Review Cycle Modal */}
      {showReviewCycle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl bg-white shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-6 h-6 text-purple-600" />
                <span>Create Review Cycle</span>
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowReviewCycle(false)}>
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Review Cycle Name</Label>
                <Input placeholder="Q2 2024 Performance Review" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Start Date</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input type="date" />
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea placeholder="Describe the review cycle objectives..." />
              </div>
              <div className="flex space-x-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowReviewCycle(false)}>
                  Cancel
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500">
                  Create Review Cycle
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add Feedback Modal */}
      {showFeedback && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl bg-white shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-6 h-6 text-blue-600" />
                <span>360° Feedback</span>
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowFeedback(false)}>
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Select Employee</Label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Select an employee...</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Feedback Type</Label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Peer Feedback</option>
                  <option>Manager Feedback</option>
                  <option>Self Assessment</option>
                  <option>Subordinate Feedback</option>
                </select>
              </div>
              <div>
                <Label>Rating</Label>
                <div className="flex space-x-2">
                  {[1,2,3,4,5].map(rating => (
                    <Star key={rating} className="w-6 h-6 text-yellow-400 cursor-pointer hover:fill-current" />
                  ))}
                </div>
              </div>
              <div>
                <Label>Feedback Comments</Label>
                <Textarea 
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Provide detailed feedback..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowFeedback(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitFeedback} className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500">
                  Submit Feedback
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* AI Summary Modal */}
      {showAISummary && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-6 h-6 text-blue-600" />
                <span>AI Performance Summary</span>
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowAISummary(false)}>
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4 bg-green-50 border-green-200">
                  <h3 className="font-semibold text-green-900 mb-3">High Performers</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Sarah Wilson</span>
                      <span className="font-semibold">92%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>John Doe</span>
                      <span className="font-semibold">85%</span>
                    </div>
                  </div>
                  <Button size="sm" className="mt-3 bg-green-600 hover:bg-green-700">
                    <Award className="w-3 h-3 mr-1" />
                    Consider for Promotion
                  </Button>
                </Card>
                <Card className="p-4 bg-orange-50 border-orange-200">
                  <h3 className="font-semibold text-orange-900 mb-3">Needs Support</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Mike Johnson</span>
                      <span className="font-semibold">78%</span>
                    </div>
                  </div>
                  <Button size="sm" className="mt-3 bg-orange-600 hover:bg-orange-700">
                    <BookOpen className="w-3 h-3 mr-1" />
                    Assign Training
                  </Button>
                </Card>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-3">AI Recommendations</h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>• Implement peer mentoring program for skill development</li>
                  <li>• Schedule quarterly one-on-one sessions for career guidance</li>
                  <li>• Consider cross-functional projects to boost collaboration scores</li>
                  <li>• Introduce innovation challenges to increase creativity metrics</li>
                </ul>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowAISummary(false)}>
                  Close
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500">
                  <FileText className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PerformanceManagement;
