
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  Brain, 
  Upload, 
  Download, 
  Plus, 
  Search,
  AlertTriangle,
  CheckCircle,
  Calendar,
  FileText,
  Send,
  Eye,
  Edit3,
  X,
  Clock,
  User,
  Building,
  Award,
  Lock,
  Signature
} from "lucide-react";
import { toast } from "sonner";

const ComplianceDocuments = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [showUploadDoc, setShowUploadDoc] = useState(false);
  const [showSendSign, setShowSendSign] = useState(false);
  const [showExpiryAlert, setShowExpiryAlert] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const employees = [
    {
      id: 1,
      name: "John Doe",
      position: "Senior Developer",
      department: "Engineering",
      documents: 8,
      expiringDocs: 2,
      complianceScore: 95
    },
    {
      id: 2,
      name: "Sarah Wilson",
      position: "Marketing Manager",
      department: "Marketing",
      documents: 12,
      expiringDocs: 0,
      complianceScore: 100
    },
    {
      id: 3,
      name: "Mike Johnson",
      position: "Sales Executive",
      department: "Sales",
      documents: 6,
      expiringDocs: 1,
      complianceScore: 88
    },
  ];

  const documents = [
    {
      id: 1,
      employee: "John Doe",
      type: "Employment Contract",
      category: "Legal",
      uploadDate: "2024-01-01",
      expiryDate: "2024-12-31",
      status: "Active",
      signed: true,
      daysToExpiry: 180
    },
    {
      id: 2,
      employee: "Sarah Wilson",
      type: "Work Visa",
      category: "Immigration",
      uploadDate: "2023-06-15",
      expiryDate: "2024-03-15",
      status: "Expiring Soon",
      signed: true,
      daysToExpiry: 30
    },
    {
      id: 3,
      employee: "Mike Johnson",
      type: "NDA Agreement",
      category: "Legal",
      uploadDate: "2024-01-10",
      expiryDate: "2025-01-10",
      status: "Pending Signature",
      signed: false,
      daysToExpiry: 365
    },
  ];

  const complianceAlerts = [
    { type: "Contract Expiry", count: 3, priority: "High", color: "red" },
    { type: "Missing Documents", count: 2, priority: "Medium", color: "orange" },
    { type: "Signature Pending", count: 5, priority: "High", color: "blue" },
    { type: "Visa Renewal", count: 1, priority: "Critical", color: "purple" },
  ];

  const handleUploadDoc = () => {
    console.log('Uploading document');
    setShowUploadDoc(true);
  };

  const handleSendForSign = () => {
    console.log('Sending document for signature');
    setShowSendSign(true);
  };

  const handleAIExpiryAlert = () => {
    console.log('AI Expiry Alert');
    setShowExpiryAlert(true);
    toast.success('AI has generated expiry alerts for upcoming renewals!');
  };

  const handleDownload = (docId: number) => {
    console.log('Downloading document:', docId);
    toast.success('Document downloaded successfully!');
  };

  const handleSubmitDocument = () => {
    console.log('Document uploaded');
    toast.success('Document uploaded successfully!');
    setShowUploadDoc(false);
  };

  const handleSendSignature = () => {
    console.log('Document sent for signature');
    toast.success('Document sent for e-signature!');
    setShowSendSign(false);
  };

  const filteredDocuments = documents.filter(doc =>
    doc.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center space-x-2">
            <Shield className="w-8 h-8 text-blue-600" />
            <span>Compliance & Document Center</span>
          </h1>
          <p className="text-gray-600 mt-1">Document Management, Auto-Expiry Alerts & E-Signature Integration</p>
        </div>
        <div className="flex space-x-3">
          <Button onClick={handleUploadDoc} className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
            <Upload className="w-4 h-4 mr-2" />
            Upload Doc
          </Button>
          <Button onClick={handleSendForSign} variant="outline" className="hover:bg-purple-50">
            <Signature className="w-4 h-4 mr-2" />
            Send for Sign
          </Button>
          <Button onClick={handleAIExpiryAlert} variant="outline" className="hover:bg-red-50">
            <Brain className="w-4 h-4 mr-2" />
            AI Expiry Alert
          </Button>
        </div>
      </div>

      {/* Compliance Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-green-900">Total Documents</h3>
                <p className="text-2xl font-bold text-green-700">243</p>
              </div>
              <FileText className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-900">Active Contracts</h3>
                <p className="text-2xl font-bold text-blue-700">156</p>
              </div>
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-orange-900">Expiring Soon</h3>
                <p className="text-2xl font-bold text-orange-700">8</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-purple-900">Pending Signs</h3>
                <p className="text-2xl font-bold text-purple-700">12</p>
              </div>
              <Signature className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Alerts */}
      <Card className="bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-red-900">
            <AlertTriangle className="w-5 h-5" />
            <span>Compliance Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {complianceAlerts.map((alert, index) => (
              <div key={index} className={`p-4 bg-white rounded-lg border border-${alert.color}-100 hover:shadow-md transition-shadow`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`font-semibold text-${alert.color}-900`}>{alert.type}</h4>
                  <Badge className={`bg-${alert.color}-100 text-${alert.color}-800`}>
                    {alert.priority}
                  </Badge>
                </div>
                <p className={`text-2xl font-bold text-${alert.color}-700 mb-2`}>{alert.count}</p>
                <Button size="sm" className={`bg-${alert.color}-600 hover:bg-${alert.color}-700 text-white`}>
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Employee Compliance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Employee Compliance</span>
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
                {employees.map((employee) => (
                  <Card key={employee.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
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
                          <p className="font-semibold text-lg">{employee.documents}</p>
                          <p className="text-xs text-gray-500">Documents</p>
                        </div>
                        <div className="text-center">
                          <p className={`font-semibold text-lg ${employee.expiringDocs > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                            {employee.expiringDocs}
                          </p>
                          <p className="text-xs text-gray-500">Expiring</p>
                        </div>
                        <div className="w-24">
                          <div className="flex justify-between text-sm mb-1">
                            <span>{employee.complianceScore}%</span>
                          </div>
                          <Progress value={employee.complianceScore} className="h-2" />
                          <p className="text-xs text-gray-500 mt-1">Compliance</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Bulk Upload Documents
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Signature className="w-4 h-4 mr-2" />
                Setup E-Signature Template
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Expiry Reminders
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Brain className="w-4 h-4 mr-2" />
                AI Compliance Audit
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Generate Compliance Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Document List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Recent Documents</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      doc.status === 'Active' ? 'bg-green-100' :
                      doc.status === 'Expiring Soon' ? 'bg-orange-100' :
                      'bg-blue-100'
                    }`}>
                      <FileText className={`w-6 h-6 ${
                        doc.status === 'Active' ? 'text-green-600' :
                        doc.status === 'Expiring Soon' ? 'text-orange-600' :
                        'text-blue-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{doc.type}</h3>
                      <p className="text-sm text-gray-600">{doc.employee}</p>
                      <p className="text-xs text-gray-500">Category: {doc.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">Expires: {doc.expiryDate}</p>
                      <p className={`text-xs ${
                        doc.daysToExpiry <= 30 ? 'text-red-600' :
                        doc.daysToExpiry <= 90 ? 'text-orange-600' :
                        'text-green-600'
                      }`}>
                        {doc.daysToExpiry} days remaining
                      </p>
                    </div>
                    <Badge 
                      variant={
                        doc.status === 'Active' ? 'default' :
                        doc.status === 'Expiring Soon' ? 'secondary' : 
                        'outline'
                      }
                    >
                      {doc.status}
                    </Badge>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDownload(doc.id)}>
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upload Document Modal */}
      {showUploadDoc && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl bg-white shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center space-x-2">
                <Upload className="w-6 h-6 text-blue-600" />
                <span>Upload Document</span>
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowUploadDoc(false)}>
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Select Employee</Label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Select employee...</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name} - {emp.department}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Document Type</Label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>Select type...</option>
                    <option>Employment Contract</option>
                    <option>Work Visa</option>
                    <option>NDA Agreement</option>
                    <option>Tax Documents</option>
                    <option>Training Certificate</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <Label>Category</Label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>Legal</option>
                    <option>Immigration</option>
                    <option>Tax</option>
                    <option>Training</option>
                    <option>Personal</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Issue Date</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label>Expiry Date</Label>
                  <Input type="date" />
                </div>
              </div>
              <div>
                <Label>Upload Document</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Drag & drop document or click to browse</p>
                  <Input type="file" accept=".pdf,.doc,.docx" className="mt-2" />
                </div>
              </div>
              <div>
                <Label>Notes</Label>
                <Textarea placeholder="Add any notes about this document..." />
              </div>
              <div className="flex space-x-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowUploadDoc(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitDocument} className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500">
                  Upload Document
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Send for Signature Modal */}
      {showSendSign && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl bg-white shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center space-x-2">
                <Signature className="w-6 h-6 text-purple-600" />
                <span>Send for E-Signature</span>
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowSendSign(false)}>
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Select Document</Label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Select document...</option>
                  <option>Employment Contract - John Doe</option>
                  <option>NDA Agreement - Mike Johnson</option>
                  <option>Offer Letter - Sarah Wilson</option>
                </select>
              </div>
              <div>
                <Label>Recipient Email</Label>
                <Input type="email" placeholder="employee@company.com" />
              </div>
              <div>
                <Label>E-Signature Service</Label>
                <select className="w-full p-2 border rounded-lg">
                  <option>DocuSign</option>
                  <option>Adobe Sign</option>
                  <option>HelloSign</option>
                </select>
              </div>
              <div>
                <Label>Subject</Label>
                <Input placeholder="Please sign the attached document" />
              </div>
              <div>
                <Label>Message</Label>
                <Textarea placeholder="Add a personal message for the recipient..." />
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <Label className="text-sm">Send reminder after 3 days if not signed</Label>
              </div>
              <div className="flex space-x-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowSendSign(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSendSignature} className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500">
                  <Send className="w-4 h-4 mr-2" />
                  Send for Signature
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* AI Expiry Alert Modal */}
      {showExpiryAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-6 h-6 text-orange-600" />
                <span>AI Expiry Alerts</span>
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowExpiryAlert(false)}>
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 bg-red-50 border-red-200">
                  <h3 className="font-semibold text-red-900 mb-3">Critical (≤30 days)</h3>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <strong>Sarah Wilson</strong>
                      <p className="text-red-700">Work Visa expires in 30 days</p>
                    </div>
                  </div>
                  <Button size="sm" className="mt-3 bg-red-600 hover:bg-red-700">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Urgent Action
                  </Button>
                </Card>
                <Card className="p-4 bg-orange-50 border-orange-200">
                  <h3 className="font-semibold text-orange-900 mb-3">Warning (≤90 days)</h3>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <strong>John Doe</strong>
                      <p className="text-orange-700">Contract expires in 60 days</p>
                    </div>
                  </div>
                  <Button size="sm" className="mt-3 bg-orange-600 hover:bg-orange-700">
                    <Clock className="w-3 h-3 mr-1" />
                    Plan Renewal
                  </Button>
                </Card>
                <Card className="p-4 bg-yellow-50 border-yellow-200">
                  <h3 className="font-semibold text-yellow-900 mb-3">Info (≤180 days)</h3>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <strong>Mike Johnson</strong>
                      <p className="text-yellow-700">Training cert expires in 120 days</p>
                    </div>
                  </div>
                  <Button size="sm" className="mt-3 bg-yellow-600 hover:bg-yellow-700">
                    <Calendar className="w-3 h-3 mr-1" />
                    Schedule
                  </Button>
                </Card>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-3">AI Recommendations</h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>• Set up automated renewal reminders 60 days before expiry</li>
                  <li>• Create renewal workflows for visa and contract renewals</li>
                  <li>• Implement document versioning for updated contracts</li>
                  <li>• Schedule quarterly compliance reviews</li>
                </ul>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowExpiryAlert(false)}>
                  Close
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  Setup Auto-Reminders
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ComplianceDocuments;
