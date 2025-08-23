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
  DollarSign, 
  FileText, 
  Download, 
  Brain, 
  AlertTriangle, 
  CheckCircle,
  TrendingUp,
  Users,
  Calculator,
  CreditCard,
  Shield,
  Zap,
  Eye,
  Search,
  Filter,
  Upload,
  Clock,
  Edit,
  Plus
} from "lucide-react";

export const PayrollManagement = () => {
  const [activeTab, setActiveTab] = useState("processing");
  const [generatePayslipOpen, setGeneratePayslipOpen] = useState(false);
  const [aiReviewOpen, setAiReviewOpen] = useState(false);
  const [editEmployeeOpen, setEditEmployeeOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const { toast } = useToast();

  const payrollStats = [
    { type: "Total Employees", count: 156, change: "+8", color: "blue", icon: Users },
    { type: "Processed", count: 142, change: "+12", color: "green", icon: CheckCircle },
    { type: "Pending", count: 14, change: "-3", color: "orange", icon: Clock },
    { type: "Total Amount", count: "₹45.2L", change: "+15%", color: "purple", icon: DollarSign }
  ];

  const [employees, setEmployees] = useState([
    {
      id: "EMP001",
      name: "Sarah Johnson",
      designation: "Senior Developer",
      department: "Engineering",
      basicSalary: 85000,
      allowances: 15000,
      deductions: 8500,
      netSalary: 91500,
      status: "Processed",
      payslipGenerated: true
    },
    {
      id: "EMP002", 
      name: "Mike Chen",
      designation: "Product Manager",
      department: "Product",
      basicSalary: 95000,
      allowances: 18000,
      deductions: 9500,
      netSalary: 103500,
      status: "Pending",
      payslipGenerated: false
    },
    {
      id: "EMP003",
      name: "Jessica Smith", 
      designation: "UI/UX Designer",
      department: "Design",
      basicSalary: 70000,
      allowances: 12000,
      deductions: 7000,
      netSalary: 75000,
      status: "Processed",
      payslipGenerated: true
    }
  ]);

  const statutoryCompliance = [
    { type: "PF (Provident Fund)", rate: "12%", employee: 5400, employer: 5400, total: 10800, status: "Compliant" },
    { type: "ESI (Employee State Insurance)", rate: "0.75%", employee: 337, employer: 1350, total: 1687, status: "Compliant" },
    { type: "TDS (Tax Deducted at Source)", rate: "Variable", employee: 8500, employer: 0, total: 8500, status: "Compliant" },
    { type: "Professional Tax", rate: "₹200", employee: 200, employer: 0, total: 200, status: "Compliant" }
  ];

  const handleGeneratePayslip = () => {
    toast({
      title: "Payslip Generated",
      description: "Payslip has been generated successfully and sent to employee email.",
    });
    setGeneratePayslipOpen(false);
  };

  const handleProcessPayroll = () => {
    toast({
      title: "Payroll Processing",
      description: "Payroll processing has been initiated for all pending employees.",
    });
  };

  const handleAIReview = () => {
    toast({
      title: "AI Review Complete",
      description: "AI has reviewed all payslips and found 2 potential errors that need attention.",
    });
    setAiReviewOpen(false);
  };

  const handleDownloadBankSheet = () => {
    toast({
      title: "Bank Sheet Downloaded",
      description: "Bank transfer sheet has been downloaded successfully.",
    });
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setEditEmployeeOpen(true);
  };

  const handleSaveEmployee = () => {
    toast({
      title: "Employee Updated",
      description: "Employee salary details have been updated successfully.",
    });
    setEditEmployeeOpen(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded successfully for processing.`,
      });
    }
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 min-h-screen">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl shadow-lg">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <span>Payroll & Compensation</span>
          </h1>
          <p className="text-gray-600 text-lg">Automated salary processing with statutory compliance</p>
        </div>
        <div className="flex space-x-3">
          <input
            type="file"
            id="file-upload"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
            <Upload className="w-4 h-4 mr-2" />
            Upload Data
          </Button>
          
          <Dialog open={generatePayslipOpen} onOpenChange={setGeneratePayslipOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="hover:shadow-md transition-all duration-200">
                <FileText className="w-4 h-4 mr-2" />
                Generate Payslip
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Generate Individual Payslip</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Select Employee</Label>
                  <select className="w-full mt-1 p-2 border rounded-md">
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>{emp.name} ({emp.id})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>Pay Period</Label>
                  <Input type="month" defaultValue="2024-12" />
                </div>
                <Button onClick={handleGeneratePayslip} className="w-full">
                  Generate & Send Payslip
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button 
            onClick={handleProcessPayroll}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Process Payroll
          </Button>
          
          <Dialog open={aiReviewOpen} onOpenChange={setAiReviewOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="outline"
                className="border-purple-200 text-purple-700 hover:bg-purple-50 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Brain className="w-4 h-4 mr-2" />
                AI Review
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>AI Payroll Review Results</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
                    <p className="font-semibold text-green-900">140 Validated</p>
                    <p className="text-sm text-green-700">No errors found</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <AlertTriangle className="w-8 h-8 text-orange-600 mb-2" />
                    <p className="font-semibold text-orange-900">2 Warnings</p>
                    <p className="text-sm text-orange-700">Require attention</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <Zap className="w-8 h-8 text-purple-600 mb-2" />
                    <p className="font-semibold text-purple-900">3 Suggestions</p>
                    <p className="text-sm text-purple-700">Tax optimizations</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">Issues Found:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 p-2 bg-orange-50 rounded">
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                      <span className="text-sm">EMP045: TDS calculation mismatch - ₹850 difference</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 bg-orange-50 rounded">
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                      <span className="text-sm">EMP089: PF contribution exceeds monthly limit</span>
                    </div>
                  </div>
                </div>
                
                <Button onClick={handleAIReview} className="w-full">
                  Apply AI Corrections
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button 
            onClick={handleDownloadBankSheet}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Download className="w-4 h-4 mr-2" />
            Bank Sheet
          </Button>
        </div>
      </div>

      {/* AI Analytics Card */}
      <Card className="bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 border-purple-200 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <CardTitle className="text-purple-900">AI Payroll Intelligence</CardTitle>
            </div>
            <Badge className="bg-purple-100 text-purple-800">Real-time Analysis</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start space-x-3 p-3 bg-white/60 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-900">Error Detection</p>
                <p className="text-sm text-green-700">2 calculation errors found and auto-corrected</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-white/60 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-900">Tax Optimization</p>
                <p className="text-sm text-blue-700">Potential savings of ₹2.3L identified across team</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-white/60 rounded-lg">
              <Shield className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-indigo-900">Compliance Check</p>
                <p className="text-sm text-indigo-700">100% statutory compliance maintained</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {payrollStats.map((stat, index) => {
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

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <Card className="shadow-lg">
          <CardHeader>
            <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-lg h-12">
              <TabsTrigger value="processing" className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <Calculator className="w-4 h-4" />
                <span>Processing</span>
              </TabsTrigger>
              <TabsTrigger value="compliance" className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <Shield className="w-4 h-4" />
                <span>Compliance</span>
              </TabsTrigger>
              <TabsTrigger value="settlement" className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <CreditCard className="w-4 h-4" />
                <span>Settlement</span>
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center space-x-2 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <FileText className="w-4 h-4" />
                <span>Reports</span>
              </TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent className="p-6">
            <TabsContent value="processing" className="mt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Salary Processing</h3>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input placeholder="Search employees..." className="pl-10" />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Employee
                    </Button>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Basic Salary</TableHead>
                      <TableHead>Allowances</TableHead>
                      <TableHead>Deductions</TableHead>
                      <TableHead>Net Salary</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employees.map((employee) => (
                      <TableRow key={employee.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div>
                            <p className="font-medium">{employee.name}</p>
                            <p className="text-sm text-gray-500">{employee.id}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{employee.department}</p>
                            <p className="text-sm text-gray-500">{employee.designation}</p>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">₹{employee.basicSalary.toLocaleString()}</TableCell>
                        <TableCell className="text-green-600">₹{employee.allowances.toLocaleString()}</TableCell>
                        <TableCell className="text-red-600">₹{employee.deductions.toLocaleString()}</TableCell>
                        <TableCell className="font-bold">₹{employee.netSalary.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className={
                            employee.status === 'Processed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-orange-100 text-orange-800'
                          }>
                            {employee.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" onClick={() => handleEditEmployee(employee)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            {employee.payslipGenerated ? (
                              <Button size="sm">
                                <Download className="w-4 h-4" />
                              </Button>
                            ) : (
                              <Button size="sm" variant="outline" disabled>
                                Pending
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="compliance" className="mt-0">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Statutory Compliance Overview</h3>
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Compliance Report
                    </Button>
                    <Button>
                      <Shield className="w-4 h-4 mr-2" />
                      Update Rates
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {statutoryCompliance.map((item, index) => (
                    <Card key={index} className="hover:shadow-lg transition-all duration-200">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-gray-900">{item.type}</h4>
                          <Badge className="bg-green-100 text-green-800">{item.status}</Badge>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Rate</span>
                            <span className="font-medium">{item.rate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Employee Contribution</span>
                            <span className="font-medium">₹{item.employee.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Employer Contribution</span>
                            <span className="font-medium">₹{item.employer.toLocaleString()}</span>
                          </div>
                          <div className="border-t pt-2">
                            <div className="flex justify-between font-semibold">
                              <span>Total</span>
                              <span>₹{item.total.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settlement" className="mt-0">
              <div className="text-center py-12">
                <div className="p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl mb-6">
                  <CreditCard className="w-16 h-16 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Full & Final Settlement</h3>
                  <p className="text-gray-600 mb-6">Process employee settlements with automated calculations</p>
                  <div className="flex justify-center space-x-4">
                    <Button className="bg-gradient-to-r from-purple-500 to-indigo-600">
                      <Calculator className="w-4 h-4 mr-2" />
                      Start Settlement Process
                    </Button>
                    <Button variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Settlement Templates
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reports" className="mt-0">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Payroll Reports & Analytics</h3>
                  <Button>
                    <Download className="w-4 h-4 mr-2" />
                    Export All Reports
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <FileText className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                      <h4 className="font-semibold mb-2">Monthly Payroll Report</h4>
                      <p className="text-sm text-gray-600 mb-4">Comprehensive payroll summary</p>
                      <Button size="sm" variant="outline" className="w-full">
                        Generate Report
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
                      <h4 className="font-semibold mb-2">Compliance Report</h4>
                      <p className="text-sm text-gray-600 mb-4">Statutory compliance status</p>
                      <Button size="sm" variant="outline" className="w-full">
                        Generate Report
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <TrendingUp className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                      <h4 className="font-semibold mb-2">Cost Analysis</h4>
                      <p className="text-sm text-gray-600 mb-4">Department-wise cost breakdown</p>
                      <Button size="sm" variant="outline" className="w-full">
                        Generate Report
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>

      {/* Edit Employee Dialog */}
      <Dialog open={editEmployeeOpen} onOpenChange={setEditEmployeeOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Employee Salary</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-4">
              <div>
                <Label>Employee Name</Label>
                <Input value={selectedEmployee.name} disabled />
              </div>
              <div>
                <Label>Basic Salary</Label>
                <Input type="number" defaultValue={selectedEmployee.basicSalary} />
              </div>
              <div>
                <Label>Allowances</Label>
                <Input type="number" defaultValue={selectedEmployee.allowances} />
              </div>
              <div>
                <Label>Deductions</Label>
                <Input type="number" defaultValue={selectedEmployee.deductions} />
              </div>
              <Button onClick={handleSaveEmployee} className="w-full">
                Save Changes
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
