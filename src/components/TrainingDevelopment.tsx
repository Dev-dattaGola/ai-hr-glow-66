
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Brain, 
  Users, 
  Award, 
  Plus, 
  Search,
  PlayCircle,
  CheckCircle,
  Upload,
  Target,
  TrendingUp,
  Calendar,
  Clock,
  Star,
  X,
  FileText,
  Download,
  Send
} from "lucide-react";
import { toast } from "sonner";

const TrainingDevelopment = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [showAssignCourse, setShowAssignCourse] = useState(false);
  const [showSkillsMatch, setShowSkillsMatch] = useState(false);
  const [showUploadCert, setShowUploadCert] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const employees = [
    { 
      id: 1, 
      name: "John Doe", 
      position: "Senior Developer", 
      department: "Engineering",
      skillGaps: ["Leadership", "Public Speaking"],
      completedCourses: 8,
      inProgressCourses: 2,
      overallProgress: 75
    },
    { 
      id: 2, 
      name: "Sarah Wilson", 
      position: "Marketing Manager", 
      department: "Marketing",
      skillGaps: ["Data Analytics", "AI/ML Basics"],
      completedCourses: 12,
      inProgressCourses: 1,
      overallProgress: 88
    },
    { 
      id: 3, 
      name: "Mike Johnson", 
      position: "Sales Executive", 
      department: "Sales",
      skillGaps: ["Negotiation", "CRM Advanced"],
      completedCourses: 5,
      inProgressCourses: 3,
      overallProgress: 60
    },
  ];

  const courses = [
    {
      id: 1,
      title: "Advanced Leadership Skills",
      provider: "Coursera",
      duration: "6 weeks",
      level: "Advanced",
      rating: 4.8,
      enrolled: 15,
      category: "Leadership"
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      provider: "Udemy",
      duration: "4 weeks",
      level: "Intermediate",
      rating: 4.6,
      enrolled: 8,
      category: "Technical"
    },
    {
      id: 3,
      title: "Effective Communication",
      provider: "Custom LMS",
      duration: "2 weeks",
      level: "Beginner",
      rating: 4.9,
      enrolled: 22,
      category: "Soft Skills"
    },
  ];

  const skillGapAnalysis = [
    { skill: "Leadership", gap: "High", priority: "Critical", recommendedCourses: 3 },
    { skill: "Data Analytics", gap: "Medium", priority: "Important", recommendedCourses: 2 },
    { skill: "Public Speaking", gap: "Low", priority: "Nice to Have", recommendedCourses: 1 },
    { skill: "Project Management", gap: "High", priority: "Critical", recommendedCourses: 4 },
  ];

  const handleAssignCourse = () => {
    console.log('Assigning course');
    setShowAssignCourse(true);
  };

  const handleAISkillsMatch = () => {
    console.log('AI Skills Match');
    setShowSkillsMatch(true);
    toast.success('AI skill gap analysis completed!');
  };

  const handleTrackProgress = (employeeId: number) => {
    const employee = employees.find(e => e.id === employeeId);
    setSelectedEmployee(employee);
    toast.success(`Tracking progress for ${employee?.name}`);
  };

  const handleUploadCertificate = () => {
    console.log('Uploading certificate');
    setShowUploadCert(true);
  };

  const handleSubmitAssignment = () => {
    console.log('Course assigned successfully');
    toast.success('Course assigned successfully!');
    setShowAssignCourse(false);
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-green-600" />
            <span>Training & Development</span>
          </h1>
          <p className="text-gray-600 mt-1">LMS Integration, AI Skill Gap Analysis & Learning Progress Tracking</p>
        </div>
        <div className="flex space-x-3">
          <Button onClick={handleAssignCourse} className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
            <BookOpen className="w-4 h-4 mr-2" />
            Assign Course
          </Button>
          <Button onClick={handleAISkillsMatch} variant="outline" className="hover:bg-blue-50">
            <Brain className="w-4 h-4 mr-2" />
            AI Skills Match
          </Button>
          <Button onClick={handleUploadCertificate} variant="outline" className="hover:bg-green-50">
            <Upload className="w-4 h-4 mr-2" />
            Upload Certificate
          </Button>
        </div>
      </div>

      {/* Learning Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-900">Active Learners</h3>
                <p className="text-2xl font-bold text-blue-700">45</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-green-900">Courses Completed</h3>
                <p className="text-2xl font-bold text-green-700">128</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-purple-900">Certificates Earned</h3>
                <p className="text-2xl font-bold text-purple-700">67</p>
              </div>
              <Award className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-orange-900">Avg Completion</h3>
                <p className="text-2xl font-bold text-orange-700">74%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Skill Gap Analysis */}
      <Card className="bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50 border-indigo-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-indigo-900">
            <Brain className="w-5 h-5" />
            <span>AI Skill Gap Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {skillGapAnalysis.map((skill, index) => (
              <div key={index} className="p-4 bg-white rounded-lg border border-indigo-100 hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-indigo-900 mb-2">{skill.skill}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Gap Level:</span>
                    <Badge className={
                      skill.gap === 'High' ? 'bg-red-100 text-red-800' :
                      skill.gap === 'Medium' ? 'bg-orange-100 text-orange-800' :
                      'bg-green-100 text-green-800'
                    }>
                      {skill.gap}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Priority:</span>
                    <span className="text-sm font-medium">{skill.priority}</span>
                  </div>
                  <p className="text-sm text-indigo-700">{skill.recommendedCourses} courses recommended</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Employee Learning Progress */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Learning Progress</span>
              </CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    placeholder="Search learners..."
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
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
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
                          <p className="font-semibold text-lg text-green-600">{employee.completedCourses}</p>
                          <p className="text-xs text-gray-500">Completed</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-lg text-blue-600">{employee.inProgressCourses}</p>
                          <p className="text-xs text-gray-500">In Progress</p>
                        </div>
                        <div className="w-24">
                          <div className="flex justify-between text-sm mb-1">
                            <span>{employee.overallProgress}%</span>
                          </div>
                          <Progress value={employee.overallProgress} className="h-2" />
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleTrackProgress(employee.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Track Progress
                        </Button>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-600">Skill Gaps: </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {employee.skillGaps.map((skill, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Available Courses */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>Available Courses</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {courses.map((course) => (
                  <div key={course.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{course.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {course.level}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">Provider: {course.provider}</p>
                    <p className="text-xs text-gray-600 mb-1">Duration: {course.duration}</p>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs">{course.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500">{course.enrolled} enrolled</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        <PlayCircle className="w-3 h-3 mr-1" />
                        Preview
                      </Button>
                      <Button size="sm" className="text-xs bg-green-600 hover:bg-green-700">
                        Assign
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Assign Course Modal */}
      {showAssignCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl bg-white shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-6 h-6 text-green-600" />
                <span>Assign Course</span>
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowAssignCourse(false)}>
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Select Employee(s)</Label>
                <select multiple className="w-full p-2 border rounded-lg h-24">
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name} - {emp.department}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Select Course</Label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Select a course...</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>{course.title} - {course.provider}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Start Date</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label>Due Date</Label>
                  <Input type="date" />
                </div>
              </div>
              <div>
                <Label>Assignment Notes</Label>
                <Textarea placeholder="Add notes about this assignment..." />
              </div>
              <div className="flex space-x-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowAssignCourse(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitAssignment} className="flex-1 bg-gradient-to-r from-green-500 to-blue-500">
                  Assign Course
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* AI Skills Match Modal */}
      {showSkillsMatch && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-6 h-6 text-blue-600" />
                <span>AI Skills Match Results</span>
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowSkillsMatch(false)}>
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-4 bg-red-50 border-red-200">
                  <h3 className="font-semibold text-red-900 mb-3">Critical Skill Gaps</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Leadership Skills</span>
                      <Badge className="bg-red-100 text-red-800">High Priority</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Project Management</span>
                      <Badge className="bg-red-100 text-red-800">High Priority</Badge>
                    </div>
                  </div>
                  <Button size="sm" className="mt-3 bg-red-600 hover:bg-red-700">
                    <BookOpen className="w-3 h-3 mr-1" />
                    Assign Training
                  </Button>
                </Card>
                <Card className="p-4 bg-orange-50 border-orange-200">
                  <h3 className="font-semibold text-orange-900 mb-3">Recommended Courses</h3>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <strong>Advanced Leadership Skills</strong>
                      <p className="text-orange-700">Matches 3 employees' needs</p>
                    </div>
                    <div className="text-sm">
                      <strong>Data Analytics Fundamentals</strong>
                      <p className="text-orange-700">Matches 2 employees' needs</p>
                    </div>
                  </div>
                  <Button size="sm" className="mt-3 bg-orange-600 hover:bg-orange-700">
                    <Target className="w-3 h-3 mr-1" />
                    Auto-Assign
                  </Button>
                </Card>
              </div>
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-3">AI Recommendations</h3>
                <ul className="space-y-2 text-sm text-green-800">
                  <li>• Prioritize leadership training for senior developers</li>
                  <li>• Implement cross-departmental skill sharing sessions</li>
                  <li>• Create mentorship programs for high-potential employees</li>
                  <li>• Establish quarterly skill assessment reviews</li>
                </ul>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowSkillsMatch(false)}>
                  Close
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Upload Certificate Modal */}
      {showUploadCert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl bg-white shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-6 h-6 text-purple-600" />
                <span>Upload Certificate</span>
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowUploadCert(false)}>
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Employee</Label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Select employee...</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Course/Certification Name</Label>
                <Input placeholder="Enter course or certification name" />
              </div>
              <div>
                <Label>Issuing Organization</Label>
                <Input placeholder="e.g., Coursera, Udemy, Microsoft" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Issue Date</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label>Expiry Date (if applicable)</Label>
                  <Input type="date" />
                </div>
              </div>
              <div>
                <Label>Upload Certificate</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Drag & drop certificate file or click to browse</p>
                  <Input type="file" accept=".pdf,.jpg,.png" className="mt-2" />
                </div>
              </div>
              <div className="flex space-x-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowUploadCert(false)}>
                  Cancel
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500">
                  Upload Certificate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TrainingDevelopment;
