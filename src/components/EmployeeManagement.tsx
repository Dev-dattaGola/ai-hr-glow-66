import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Search, 
  Plus, 
  Filter, 
  Download, 
  Upload,
  Brain,
  Mail,
  FileText,
  Briefcase,
  UserPlus,
  Eye,
  Edit,
  MoreVertical,
  Building,
  TrendingUp
} from "lucide-react";
import { EmployeeGrid } from "./employee/EmployeeGrid";
import { EmployeeForm } from "./employee/EmployeeForm";
import { EmployeeProfile } from "./employee/EmployeeProfile";
import { OrgChart } from "./employee/OrgChart";
import { BulkUploadDialog } from "./employee/BulkUploadDialog";
import { AIInsightsPanel } from "./employee/AIInsightsPanel";
import { emailService } from "../services/emailService";
import { aiAnalysisService } from "../services/aiAnalysisService";
import { toast } from "@/hooks/use-toast";

export const EmployeeManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [activeView, setActiveView] = useState("grid"); // grid, profile, form, orgchart
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showBulkUpload, setShowBulkUpload] = useState(false);

  const employees = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      department: "Marketing",
      position: "Senior Manager",
      status: "Active",
      joinDate: "2022-01-15",
      avatar: "/placeholder.svg",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, NYC",
      salary: "$85,000",
      manager: "John Smith",
      missingDocs: ["Tax Forms", "Emergency Contact"]
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike.chen@company.com",
      department: "Engineering",
      position: "Software Engineer",
      status: "Active",
      joinDate: "2023-03-20",
      avatar: "/placeholder.svg",
      phone: "+1 (555) 234-5678",
      address: "456 Oak Ave, SF",
      salary: "$95,000",
      manager: "Sarah Johnson",
      missingDocs: ["Profile Photo"]
    },
    {
      id: 3,
      name: "Anna Smith",
      email: "anna.smith@company.com",
      department: "HR",
      position: "HR Specialist",
      status: "On Leave",
      joinDate: "2021-11-10",
      avatar: "/placeholder.svg",
      phone: "+1 (555) 345-6789",
      address: "789 Pine St, LA",
      salary: "$70,000",
      manager: "David Wilson",
      missingDocs: []
    },
    {
      id: 4,
      name: "David Wilson",
      email: "david.wilson@company.com",
      department: "Sales",
      position: "Account Executive",
      status: "Active",
      joinDate: "2023-07-01",
      avatar: "/placeholder.svg",
      phone: "+1 (555) 456-7890",
      address: "321 Elm Dr, Chicago",
      salary: "$78,000",
      manager: "Sarah Johnson",
      missingDocs: ["Bank Details", "ID Copy"]
    }
  ];

  const departments = ["All", "Engineering", "Marketing", "HR", "Sales", "Finance"];
  
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDepartment === "All" || emp.department === selectedDepartment;
    return matchesSearch && matchesDept;
  });

  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    setActiveView("form");
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setActiveView("form");
  };

  const handleViewProfile = (employee) => {
    setSelectedEmployee(employee);
    setActiveView("profile");
  };

  const handleSendWelcomeEmail = async (employee) => {
    const welcomeData = {
      employeeName: employee.name,
      employeeEmail: employee.email,
      position: employee.position,
      department: employee.department,
      startDate: employee.joinDate,
      manager: employee.manager,
      companyName: "Your Company"
    };

    await emailService.sendWelcomeEmail(welcomeData);
  };

  const handleBulkWelcomeEmails = async () => {
    const activeEmployees = employees.filter(emp => emp.status === "Active");
    const welcomeDataList = activeEmployees.map(employee => ({
      employeeName: employee.name,
      employeeEmail: employee.email,
      position: employee.position,
      department: employee.department,
      startDate: employee.joinDate,
      manager: employee.manager,
      companyName: "Your Company"
    }));

    await emailService.sendBulkWelcomeEmails(welcomeDataList);
  };

  const handleAIProfileAnalysis = async (employee) => {
    try {
      const analysis = await aiAnalysisService.analyzeEmployeeProfile(employee);
      console.log('AI Analysis Result:', analysis);
      
      // You could open a modal or navigate to a detailed analysis view here
      toast({
        title: "AI Analysis Complete",
        description: `Profile analysis generated for ${employee.name}. Overall score: ${analysis.overallScore}%`,
      });
    } catch (error) {
      console.error('AI Analysis failed:', error);
    }
  };

  const handleBulkAIAnalysis = async () => {
    try {
      const analyses = await aiAnalysisService.analyzeMulitpleProfiles(employees);
      console.log('Bulk AI Analysis Results:', analyses);
      
      // You could show a summary or detailed results view here
      const avgScore = analyses.reduce((sum, analysis) => sum + analysis.overallScore, 0) / analyses.length;
      
      toast({
        title: "Bulk AI Analysis Complete",
        description: `Analyzed ${analyses.length} profiles. Average score: ${Math.round(avgScore)}%`,
      });
    } catch (error) {
      console.error('Bulk AI Analysis failed:', error);
    }
  };

  const handleExportData = () => {
    console.log("Exporting employee data");
    // Implementation for data export
  };

  const renderActiveView = () => {
    switch (activeView) {
      case "form":
        return (
          <EmployeeForm 
            employee={selectedEmployee} 
            onClose={() => setActiveView("grid")}
            onSave={() => setActiveView("grid")}
          />
        );
      case "profile":
        return (
          <EmployeeProfile 
            employee={selectedEmployee} 
            onClose={() => setActiveView("grid")}
            onEdit={() => setActiveView("form")}
          />
        );
      case "orgchart":
        return (
          <OrgChart 
            employees={employees}
            onClose={() => setActiveView("grid")}
          />
        );
      default:
        return (
          <EmployeeGrid 
            employees={filteredEmployees}
            onEdit={handleEditEmployee}
            onView={handleViewProfile}
            onSendEmail={handleSendWelcomeEmail}
            onAIAnalysis={handleAIProfileAnalysis}
          />
        );
    }
  };

  if (activeView === "form" || activeView === "profile" || activeView === "orgchart") {
    return renderActiveView();
  }

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <span>Employee Management</span>
          </h1>
          <p className="text-gray-600 mt-2">Manage your workforce efficiently with AI-powered insights</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button 
            variant="outline" 
            onClick={() => setShowBulkUpload(true)}
            className="border-blue-200 hover:bg-blue-50"
          >
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button 
            variant="outline"
            onClick={handleExportData}
            className="border-green-200 hover:bg-green-50"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button 
            variant="outline"
            onClick={() => setActiveView("orgchart")}
            className="border-purple-200 hover:bg-purple-50"
          >
            <Building className="w-4 h-4 mr-2" />
            Org Chart
          </Button>
          <Button 
            onClick={handleAddEmployee}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Employee
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Employees</p>
                <p className="text-3xl font-bold text-blue-900">{employees.length}</p>
                <p className="text-xs text-blue-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12% from last month
                </p>
              </div>
              <Users className="w-10 h-10 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Active</p>
                <p className="text-3xl font-bold text-green-900">
                  {employees.filter(e => e.status === "Active").length}
                </p>
                <p className="text-xs text-green-600">92% of total</p>
              </div>
              <UserPlus className="w-10 h-10 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">On Leave</p>
                <p className="text-3xl font-bold text-orange-900">
                  {employees.filter(e => e.status === "On Leave").length}
                </p>
                <p className="text-xs text-orange-600">8% of total</p>
              </div>
              <Briefcase className="w-10 h-10 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Missing Docs</p>
                <p className="text-3xl font-bold text-purple-900">
                  {employees.reduce((acc, emp) => acc + emp.missingDocs.length, 0)}
                </p>
                <p className="text-xs text-purple-600">Needs attention</p>
              </div>
              <FileText className="w-10 h-10 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Panel */}
      <AIInsightsPanel employees={employees} />

      {/* Search and Filter */}
      <Card className="shadow-md border-0">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search employees by name, email, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" size="default" className="h-12">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <select 
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="h-12 px-4 border border-gray-200 rounded-md text-sm bg-white focus:border-blue-500 focus:ring-blue-500"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Employee Grid */}
      {renderActiveView()}

      {/* Bulk Actions */}
      <Card className="shadow-md border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-blue-600" />
            <span>Bulk Actions & AI Tools</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              onClick={handleBulkWelcomeEmails}
              className="h-16 flex-col space-y-2 border-blue-200 hover:bg-blue-50"
            >
              <Mail className="w-6 h-6 text-blue-600" />
              <span className="text-sm">Send Welcome Emails</span>
            </Button>
            <Button 
              variant="outline"
              onClick={handleBulkAIAnalysis}
              className="h-16 flex-col space-y-2 border-purple-200 hover:bg-purple-50"
            >
              <Brain className="w-6 h-6 text-purple-600" />
              <span className="text-sm">AI Profile Analysis</span>
            </Button>
            <Button 
              variant="outline"
              onClick={() => setShowBulkUpload(true)}
              className="h-16 flex-col space-y-2 border-green-200 hover:bg-green-50"
            >
              <Upload className="w-6 h-6 text-green-600" />
              <span className="text-sm">Bulk Upload</span>
            </Button>
            <Button 
              variant="outline"
              onClick={handleExportData}
              className="h-16 flex-col space-y-2 border-orange-200 hover:bg-orange-50"
            >
              <Download className="w-6 h-6 text-orange-600" />
              <span className="text-sm">Export Data</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Upload Dialog */}
      {showBulkUpload && (
        <BulkUploadDialog 
          open={showBulkUpload}
          onClose={() => setShowBulkUpload(false)}
        />
      )}
    </div>
  );
};
