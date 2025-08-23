
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  Briefcase, 
  Users, 
  Calendar, 
  Brain, 
  Video, 
  FileText, 
  Upload, 
  Search, 
  Filter,
  Plus,
  Eye,
  Clock,
  CheckCircle,
  MapPin,
  DollarSign,
  Star,
  UserPlus,
  Mail,
  Phone,
  Download,
  Edit,
  Send,
  Globe
} from "lucide-react";

export const RecruitmentOnboarding = () => {
  const [activeTab, setActiveTab] = useState("jobs");
  const [addJobOpen, setAddJobOpen] = useState(false);
  const [scheduleInterviewOpen, setScheduleInterviewOpen] = useState(false);
  const [aiShortlistOpen, setAiShortlistOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const { toast } = useToast();

  const recruitmentStats = [
    { type: "Active Jobs", count: 12, change: "+3", color: "blue", icon: Briefcase },
    { type: "Applications", count: 245, change: "+28", color: "green", icon: Users },
    { type: "Interviews", count: 18, change: "+5", color: "purple", icon: Video },
    { type: "Hired This Month", count: 8, change: "+2", color: "orange", icon: UserPlus }
  ];

  const [jobs, setJobs] = useState([
    {
      id: "JOB001",
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Mumbai, India",
      type: "Full-time",
      salary: "₹15-25 LPA",
      status: "Active",
      applications: 45,
      posted: "2024-01-15",
      platforms: ["LinkedIn", "Naukri", "Indeed"]
    },
    {
      id: "JOB002",
      title: "Product Manager",
      department: "Product",
      location: "Bangalore, India",
      type: "Full-time",
      salary: "₹20-30 LPA",
      status: "Active",
      applications: 32,
      posted: "2024-01-10",
      platforms: ["LinkedIn", "Naukri"]
    },
    {
      id: "JOB003",
      title: "UI/UX Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      salary: "₹12-18 LPA",
      status: "Draft",
      applications: 0,
      posted: "2024-01-20",
      platforms: []
    }
  ]);

  const candidates = [
    {
      id: "CAN001",
      name: "Rahul Sharma",
      email: "rahul.sharma@email.com",
      phone: "+91 9876543210",
      position: "Senior Full Stack Developer",
      experience: "5 years",
      skills: ["React", "Node.js", "Python", "AWS"],
      status: "Interview Scheduled",
      score: 92,
      resumeUrl: "#",
      interviewDate: "2024-01-25"
    },
    {
      id: "CAN002",
      name: "Priya Patel",
      email: "priya.patel@email.com",
      phone: "+91 9876543211",
      position: "Product Manager",
      experience: "7 years",
      skills: ["Product Strategy", "Analytics", "Agile", "Leadership"],
      status: "AI Shortlisted",
      score: 88,
      resumeUrl: "#",
      interviewDate: null
    },
    {
      id: "CAN003",
      name: "Arjun Kumar",
      email: "arjun.kumar@email.com",
      phone: "+91 9876543212",
      position: "UI/UX Designer",
      experience: "3 years",
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
      status: "Under Review",
      score: 85,
      resumeUrl: "#",
      interviewDate: null
    }
  ];

  const onboardingTasks = [
    { task: "Send Welcome Email", completed: true },
    { task: "Prepare Workspace", completed: true },
    { task: "IT Setup & Access", completed: false },
    { task: "Documentation Submission", completed: false },
    { task: "Orientation Schedule", completed: false },
    { task: "Buddy Assignment", completed: false }
  ];

  const handleAddJob = () => {
    toast({
      title: "Job Posted Successfully",
      description: "Job has been posted to LinkedIn, Naukri, and Indeed.",
    });
    setAddJobOpen(false);
  };

  const handleAIShortlist = () => {
    toast({
      title: "AI Shortlisting Complete",
      description: "15 candidates have been AI shortlisted based on skills and experience match.",
    });
    setAiShortlistOpen(false);
  };

  const handleScheduleInterview = () => {
    toast({
      title: "Interview Scheduled",
      description: "Interview has been scheduled and calendar invites sent to all participants.",
    });
    setScheduleInterviewOpen(false);
  };

  const handleOnboardNow = () => {
    toast({
      title: "Onboarding Initiated",
      description: "Onboarding workflow has been started for the selected candidate.",
    });
    setOnboardingOpen(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "Resume Uploaded",
        description: `${file.name} has been uploaded and is being processed by AI.`,
      });
    }
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <span>Recruitment & Onboarding</span>
          </h1>
          <p className="text-gray-600 text-lg">AI-powered hiring and seamless onboarding</p>
        </div>
        <div className="flex space-x-3">
          <input
            type="file"
            id="resume-upload"
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button variant="outline" onClick={() => document.getElementById('resume-upload')?.click()}>
            <Upload className="w-4 h-4 mr-2" />
            Upload Resume
          </Button>
          
          <Dialog open={addJobOpen} onOpenChange={setAddJobOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg">
                <Plus className="w-4 h-4 mr-2" />
                Add Job
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Post New Job</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Job Title</Label>
                    <Input placeholder="e.g. Senior Developer" />
                  </div>
                  <div>
                    <Label>Department</Label>
                    <Input placeholder="e.g. Engineering" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Location</Label>
                    <Input placeholder="e.g. Mumbai, India" />
                  </div>
                  <div>
                    <Label>Salary Range</Label>
                    <Input placeholder="e.g. ₹15-25 LPA" />
                  </div>
                </div>
                <div>
                  <Label>Job Description</Label>
                  <textarea 
                    className="w-full p-2 border rounded-md h-32" 
                    placeholder="Enter job description..."
                  />
                </div>
                <div>
                  <Label>Post to Platforms</Label>
                  <div className="flex space-x-4 mt-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span>LinkedIn</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span>Naukri</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span>Indeed</span>
                    </label>
                  </div>
                </div>
                <Button onClick={handleAddJob} className="w-full">
                  <Globe className="w-4 h-4 mr-2" />
                  Post Job to Selected Platforms
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={aiShortlistOpen} onOpenChange={setAiShortlistOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                <Brain className="w-4 h-4 mr-2" />
                AI Shortlist
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>AI Candidate Shortlisting</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Select Job Position</Label>
                  <select className="w-full mt-1 p-2 border rounded-md">
                    {jobs.map(job => (
                      <option key={job.id} value={job.id}>{job.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>Minimum Experience (years)</Label>
                  <Input type="number" defaultValue="3" />
                </div>
                <div>
                  <Label>Required Skills (comma separated)</Label>
                  <Input placeholder="React, Node.js, Python" />
                </div>
                <div>
                  <Label>AI Matching Threshold</Label>
                  <Input type="number" min="0" max="100" defaultValue="75" />
                </div>
                <Button onClick={handleAIShortlist} className="w-full">
                  <Brain className="w-4 h-4 mr-2" />
                  Start AI Shortlisting
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={scheduleInterviewOpen} onOpenChange={setScheduleInterviewOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Interview
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule Interview</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Select Candidate</Label>
                  <select className="w-full mt-1 p-2 border rounded-md">
                    {candidates.map(candidate => (
                      <option key={candidate.id} value={candidate.id}>
                        {candidate.name} - {candidate.position}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Interview Date</Label>
                    <Input type="date" />
                  </div>
                  <div>
                    <Label>Interview Time</Label>
                    <Input type="time" />
                  </div>
                </div>
                <div>
                  <Label>Interview Platform</Label>
                  <select className="w-full mt-1 p-2 border rounded-md">
                    <option value="google-meet">Google Meet</option>
                    <option value="zoom">Zoom</option>
                    <option value="teams">Microsoft Teams</option>
                    <option value="office">In-Person</option>
                  </select>
                </div>
                <div>
                  <Label>Interviewers</Label>
                  <Input placeholder="Select interviewers..." />
                </div>
                <Button onClick={handleScheduleInterview} className="w-full">
                  <Video className="w-4 h-4 mr-2" />
                  Schedule & Send Invites
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={onboardingOpen} onOpenChange={setOnboardingOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                <UserPlus className="w-4 h-4 mr-2" />
                Onboard Now
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Start Onboarding Process</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Select Candidate</Label>
                  <select className="w-full mt-1 p-2 border rounded-md">
                    {candidates.filter(c => c.status === 'Interview Scheduled').map(candidate => (
                      <option key={candidate.id} value={candidate.id}>
                        {candidate.name} - {candidate.position}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>Start Date</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label>Reporting Manager</Label>
                  <Input placeholder="Select manager..." />
                </div>
                <div>
                  <Label>Buddy Assignment</Label>
                  <Input placeholder="Assign buddy..." />
                </div>
                <div className="space-y-2">
                  <Label>Onboarding Tasks</Label>
                  {onboardingTasks.map((task, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked={task.completed} />
                      <span className={task.completed ? 'line-through text-gray-500' : ''}>{task.task}</span>
                    </div>
                  ))}
                </div>
                <Button onClick={handleOnboardNow} className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Start Onboarding Workflow
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-blue-200 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <CardTitle className="text-blue-900">AI Recruitment Intelligence</CardTitle>
            </div>
            <Badge className="bg-blue-100 text-blue-800">Live Analysis</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start space-x-3 p-3 bg-white/60 rounded-lg">
              <Users className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-900">Resume Parsing</p>
                <p className="text-sm text-green-700">245 resumes parsed with 95% accuracy</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-white/60 rounded-lg">
              <Star className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-900">Skill Matching</p>
                <p className="text-sm text-blue-700">78 candidates matched for open positions</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-white/60 rounded-lg">
              <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-purple-900">Interview Insights</p>
                <p className="text-sm text-purple-700">AI recommendations for 12 candidates</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {recruitmentStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-all duration-200 group cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center space-x-3 mb-2">
                  <div className={`p-3 rounded-full ${
                    stat.color === 'green' ? 'bg-green-100' :
                    stat.color === 'orange' ? 'bg-orange-100' :
                    stat.color === 'purple' ? 'bg-purple-100' :
                    'bg-blue-100'
                  } group-hover:scale-110 transition-transform duration-200`}>
                    <Icon className={`w-6 h-6 ${
                      stat.color === 'green' ? 'text-green-600' :
                      stat.color === 'orange' ? 'text-orange-600' :
                      stat.color === 'purple' ? 'text-purple-600' :
                      'text-blue-600'
                    }`} />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.count}</p>
                <p className="text-sm font-medium text-gray-600 mb-2">{stat.type}</p>
                <p className={`text-xs font-semibold ${
                  stat.color === 'green' ? 'text-green-600' :
                  stat.color === 'orange' ? 'text-orange-600' :
                  stat.color === 'purple' ? 'text-purple-600' :
                  'text-blue-600'
                }`}>
                  {stat.change} this month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
            <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-lg h-12">
              <TabsTrigger value="jobs" className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <Briefcase className="w-4 h-4" />
                <span>Job Postings</span>
              </TabsTrigger>
              <TabsTrigger value="candidates" className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <Users className="w-4 h-4" />
                <span>Candidates</span>
              </TabsTrigger>
              <TabsTrigger value="interviews" className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <Calendar className="w-4 h-4" />
                <span>Interviews</span>
              </TabsTrigger>
              <TabsTrigger value="onboarding" className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <UserPlus className="w-4 h-4" />
                <span>Onboarding</span>
              </TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent className="p-6">
            <TabsContent value="jobs" className="mt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Job Postings</h3>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input placeholder="Search jobs..." className="pl-10" />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Salary</TableHead>
                      <TableHead>Applications</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Platforms</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {jobs.map((job) => (
                      <TableRow key={job.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div>
                            <p className="font-medium">{job.title}</p>
                            <p className="text-sm text-gray-500">{job.id}</p>
                          </div>
                        </TableCell>
                        <TableCell>{job.department}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span>{job.location}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span>{job.salary}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{job.applications}</TableCell>
                        <TableCell>
                          <Badge className={
                            job.status === 'Active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }>
                            {job.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            {job.platforms.map((platform, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {platform}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="candidates" className="mt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Candidate Pipeline</h3>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input placeholder="Search candidates..." className="pl-10" />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4">
                  {candidates.map((candidate) => (
                    <Card key={candidate.id} className="p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {candidate.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg">{candidate.name}</h4>
                            <p className="text-gray-600 mb-2">{candidate.position}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Mail className="w-4 h-4" />
                                <span>{candidate.email}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Phone className="w-4 h-4" />
                                <span>{candidate.phone}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="w-4 h-4" />
                                <span>{candidate.experience}</span>
                              </div>
                            </div>
                            <div className="mt-2">
                              <div className="flex flex-wrap gap-1">
                                {candidate.skills.map((skill, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-sm font-medium">AI Score:</span>
                            <Badge className="bg-green-100 text-green-800">
                              {candidate.score}%
                            </Badge>
                          </div>
                          <Badge className={
                            candidate.status === 'Interview Scheduled' 
                              ? 'bg-blue-100 text-blue-800' 
                              : candidate.status === 'AI Shortlisted'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-gray-100 text-gray-800'
                          }>
                            {candidate.status}
                          </Badge>
                          <div className="flex space-x-2 mt-3">
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Mail className="w-4 h-4" />
                            </Button>
                            <Button size="sm">
                              <Calendar className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="interviews" className="mt-0">
              <div className="text-center py-12">
                <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl mb-6">
                  <Video className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Interview Management</h3>
                  <p className="text-gray-600 mb-6">Schedule and manage interviews with Google Meet/Zoom integration</p>
                  <div className="flex justify-center space-x-4">
                    <Button className="bg-gradient-to-r from-blue-500 to-indigo-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      View Interview Calendar
                    </Button>
                    <Button variant="outline">
                      <Video className="w-4 h-4 mr-2" />
                      Upcoming Interviews
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="onboarding" className="mt-0">
              <div className="text-center py-12">
                <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl mb-6">
                  <UserPlus className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Onboarding Workflow</h3>
                  <p className="text-gray-600 mb-6">Automated onboarding process with task tracking and notifications</p>
                  <div className="flex justify-center space-x-4">
                    <Button className="bg-gradient-to-r from-green-500 to-emerald-600">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      View Active Onboarding
                    </Button>
                    <Button variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Onboarding Templates
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default RecruitmentOnboarding;
