import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  FileText, 
  Brain, 
  Mail, 
  Download, 
  Edit, 
  Plus, 
  Search,
  Zap,
  Send,
  User,
  Calendar,
  Building,
  Award,
  X,
  Check,
  TrendingUp,
  AlertTriangle
} from "lucide-react";
import { toast } from "sonner";

const LettersDocuments = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [showGenerator, setShowGenerator] = useState(false);
  const [showAIEdit, setShowAIEdit] = useState(false);
  const [letterContent, setLetterContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const employees = [
    { id: 1, name: "John Doe", email: "john@company.com", department: "Engineering", position: "Senior Developer", joinDate: "2022-01-15", salary: 75000 },
    { id: 2, name: "Sarah Wilson", email: "sarah@company.com", department: "Marketing", position: "Marketing Manager", joinDate: "2021-06-20", salary: 65000 },
    { id: 3, name: "Mike Johnson", email: "mike@company.com", department: "Sales", position: "Sales Executive", joinDate: "2023-03-10", salary: 55000 },
  ];

  const letterTemplates = [
    {
      id: "offer",
      name: "Offer Letter",
      description: "Job offer letter for new employees",
      category: "Recruitment",
      icon: Award,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      template: `Dear [Employee Name],

We are pleased to offer you the position of [Position] at [Company Name]. Your starting date will be [Start Date], and your annual salary will be $[Salary].

We look forward to having you join our team.

Best regards,
[HR Manager Name]`
    },
    {
      id: "experience",
      name: "Experience Letter",
      description: "Certificate of employment experience",
      category: "General",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      template: `To Whom It May Concern,

This is to certify that [Employee Name] was employed with [Company Name] as [Position] from [Start Date] to [End Date].

During the tenure, [Employee Name] has shown excellent performance and dedication.

Sincerely,
[HR Manager Name]`
    },
    {
      id: "relieving",
      name: "Relieving Letter",
      description: "Employee relieving and clearance letter",
      category: "Exit",
      icon: User,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      template: `Dear [Employee Name],

We acknowledge the receipt of your resignation letter dated [Resignation Date]. Your last working day with [Company Name] is [Last Working Date].

We appreciate your contributions and wish you success in your future endeavors.

Best regards,
[HR Manager Name]`
    },
    {
      id: "increment",
      name: "Increment Letter",
      description: "Salary increment notification letter",
      category: "Compensation",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      template: `Dear [Employee Name],

We are pleased to inform you that effective [Effective Date], your salary has been revised from $[Old Salary] to $[New Salary].

This increment recognizes your excellent performance and contribution to the company.

Congratulations!

Best regards,
[HR Manager Name]`
    },
    {
      id: "promotion",
      name: "Promotion Letter",
      description: "Employee promotion announcement",
      category: "Career",
      icon: Award,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      template: `Dear [Employee Name],

Congratulations! We are pleased to promote you to the position of [New Position] effective [Effective Date].

Your new responsibilities will include [Responsibilities]. Your revised salary will be $[New Salary].

We appreciate your dedication and look forward to your continued success.

Best regards,
[HR Manager Name]`
    },
    {
      id: "warning",
      name: "Warning Letter",
      description: "Disciplinary warning letter",
      category: "Disciplinary",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      template: `Dear [Employee Name],

This letter serves as a formal warning regarding [Issue]. This incident occurred on [Date].

Please note that any further violations may result in more serious disciplinary action.

We expect immediate improvement in your conduct.

Regards,
[HR Manager Name]`
    }
  ];

  const recentLetters = [
    { id: 1, type: "Offer Letter", employee: "John Doe", date: "2024-01-15", status: "Sent" },
    { id: 2, type: "Experience Letter", employee: "Sarah Wilson", date: "2024-01-10", status: "Draft" },
    { id: 3, type: "Increment Letter", employee: "Mike Johnson", date: "2024-01-08", status: "Sent" },
  ];

  const handleSelectTemplate = (templateId: string) => {
    const template = letterTemplates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setLetterContent(template.template);
      setShowGenerator(true);
    }
  };

  const handleSelectEmployee = (employee: any) => {
    setSelectedEmployee(employee);
    if (letterContent && employee) {
      const filledContent = letterContent
        .replace(/\[Employee Name\]/g, employee.name)
        .replace(/\[Position\]/g, employee.position)
        .replace(/\[Department\]/g, employee.department)
        .replace(/\[Salary\]/g, employee.salary.toLocaleString())
        .replace(/\[Start Date\]/g, employee.joinDate)
        .replace(/\[Company Name\]/g, "Your Company")
        .replace(/\[HR Manager Name\]/g, "HR Manager");
      setLetterContent(filledContent);
    }
  };

  const handleAIEdit = () => {
    console.log('AI Edit triggered');
    setShowAIEdit(true);
    toast.success('AI suggestions generated!');
  };

  const handleGenerateLetter = () => {
    console.log('Generating letter');
    toast.success('Letter generated successfully!');
    setShowGenerator(false);
  };

  const handleSendEmail = () => {
    console.log('Sending email');
    toast.success('Letter sent via email successfully!');
  };

  const handleDownload = (format: string) => {
    console.log(`Downloading as ${format}`);
    toast.success(`Letter downloaded as ${format}`);
  };

  const filteredTemplates = letterTemplates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent flex items-center space-x-2">
            <FileText className="w-8 h-8 text-blue-600" />
            <span>Letters & Documents Generator</span>
          </h1>
          <p className="text-gray-600 mt-1">AI-powered document generation with auto-fill capabilities</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="hover:bg-blue-50">
            <FileText className="w-4 h-4 mr-2" />
            Manage Templates
          </Button>
          <Button 
            onClick={() => setShowGenerator(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Letter
          </Button>
        </div>
      </div>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border-emerald-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-emerald-900">
            <Brain className="w-5 h-5" />
            <span>AI Template Suggestions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border border-emerald-100 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-emerald-900 mb-2">Pending Actions</h4>
              <p className="text-sm text-emerald-800">3 offer letters need to be generated for new hires</p>
              <Badge className="mt-2 bg-blue-100 text-blue-800">Action Required</Badge>
            </div>
            <div className="p-4 bg-white rounded-lg border border-emerald-100 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-emerald-900 mb-2">Smart Suggestions</h4>
              <p className="text-sm text-emerald-800">AI recommends updating increment letters for Q4 reviews</p>
              <Badge className="mt-2 bg-purple-100 text-purple-800">AI Insight</Badge>
            </div>
            <div className="p-4 bg-white rounded-lg border border-emerald-100 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-emerald-900 mb-2">Template Optimization</h4>
              <p className="text-sm text-emerald-800">2 templates can be improved based on recent usage patterns</p>
              <Badge className="mt-2 bg-orange-100 text-orange-800">Optimization</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Template Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Templates Library */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Letter Templates</span>
              </CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTemplates.map((template) => {
                  const Icon = template.icon;
                  return (
                    <Card 
                      key={template.id} 
                      className={`${template.bgColor} ${template.borderColor} border cursor-pointer hover:shadow-md transition-all`}
                      onClick={() => handleSelectTemplate(template.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg bg-white shadow-sm`}>
                            <Icon className={`w-5 h-5 ${template.color}`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold text-gray-900">{template.name}</h3>
                              <Badge variant="outline" className="text-xs">
                                {template.category}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                            <Button size="sm" variant="outline" className="w-full">
                              <Zap className="w-3 h-3 mr-2" />
                              Select Template
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Letters */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Recent Letters</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentLetters.map((letter) => (
                  <div key={letter.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{letter.type}</h4>
                      <Badge variant={letter.status === 'Sent' ? 'default' : 'secondary'}>
                        {letter.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{letter.employee}</p>
                    <p className="text-xs text-gray-500">{letter.date}</p>
                    <div className="flex space-x-2 mt-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Letter Generator Modal */}
      {showGenerator && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-6xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-6 h-6 text-blue-600" />
                <span>Letter Generator</span>
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowGenerator(false)}>
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Employee Selection */}
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Select Employee</Label>
                    <div className="space-y-2">
                      {employees.map((employee) => (
                        <div
                          key={employee.id}
                          className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                            selectedEmployee?.id === employee.id ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'
                          }`}
                          onClick={() => handleSelectEmployee(employee)}
                        >
                          <h4 className="font-medium text-sm">{employee.name}</h4>
                          <p className="text-xs text-gray-600">{employee.position}</p>
                          <p className="text-xs text-gray-500">{employee.department}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Actions */}
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
                      onClick={handleAIEdit}
                    >
                      <Brain className="w-4 h-4 mr-2" />
                      AI Edit & Improve
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-green-200 text-green-700 hover:bg-green-50"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Auto-Fill Data
                    </Button>
                  </div>
                </div>

                {/* Letter Content */}
                <div className="lg:col-span-2 space-y-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Letter Content</Label>
                    <Textarea
                      value={letterContent}
                      onChange={(e) => setLetterContent(e.target.value)}
                      className="min-h-[400px] font-mono text-sm"
                      placeholder="Select a template and employee to auto-generate content..."
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={handleGenerateLetter} className="bg-gradient-to-r from-blue-500 to-purple-500">
                      <Check className="w-4 h-4 mr-2" />
                      Generate Letter
                    </Button>
                    <Button variant="outline" onClick={() => handleDownload('PDF')}>
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button variant="outline" onClick={() => handleDownload('Word')}>
                      <Download className="w-4 h-4 mr-2" />
                      Download Word
                    </Button>
                    <Button variant="outline" onClick={handleSendEmail}>
                      <Mail className="w-4 h-4 mr-2" />
                      Send Email
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* AI Edit Suggestions Modal */}
      {showAIEdit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl bg-white shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-6 h-6 text-purple-600" />
                <span>AI Edit Suggestions</span>
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowAIEdit(false)}>
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-1">Grammar & Style</h4>
                  <p className="text-sm text-blue-700">Consider changing "We are pleased" to "We are delighted" for a warmer tone</p>
                  <Button size="sm" className="mt-2 bg-blue-600 hover:bg-blue-700">
                    Apply Suggestion
                  </Button>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-900 mb-1">Legal Compliance</h4>
                  <p className="text-sm text-green-700">Add "This offer is contingent upon background verification" clause</p>
                  <Button size="sm" className="mt-2 bg-green-600 hover:bg-green-700">
                    Apply Suggestion
                  </Button>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-900 mb-1">Personalization</h4>
                  <p className="text-sm text-purple-700">Include specific achievements from the interview process</p>
                  <Button size="sm" className="mt-2 bg-purple-600 hover:bg-purple-700">
                    Apply Suggestion
                  </Button>
                </div>
              </div>
              <div className="flex space-x-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowAIEdit(false)}>
                  Close
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500">
                  Apply All Suggestions
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LettersDocuments;
