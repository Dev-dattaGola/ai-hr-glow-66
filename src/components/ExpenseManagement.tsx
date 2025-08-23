
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Receipt, 
  Brain, 
  Camera, 
  Upload, 
  Plus, 
  Search,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Calendar,
  User,
  Tag,
  Download,
  Eye,
  X,
  Scan,
  CreditCard,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";

const ExpenseManagement = () => {
  const [showUploadExpense, setShowUploadExpense] = useState(false);
  const [showScanBill, setShowScanBill] = useState(false);
  const [showApproval, setShowApproval] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const expenses = [
    {
      id: 1,
      employee: "John Doe",
      amount: 250.00,
      category: "Travel",
      description: "Business trip to client meeting",
      date: "2024-01-15",
      status: "Pending",
      receipt: true,
      aiCategory: "Travel & Transportation"
    },
    {
      id: 2,
      employee: "Sarah Wilson",
      amount: 45.50,
      category: "Meals",
      description: "Client dinner",
      date: "2024-01-14",
      status: "Approved",
      receipt: true,
      aiCategory: "Meals & Entertainment"
    },
    {
      id: 3,
      employee: "Mike Johnson",
      amount: 120.00,
      category: "Office Supplies",
      description: "Stationery and equipment",
      date: "2024-01-13",
      status: "Rejected",
      receipt: false,
      aiCategory: "Office Supplies"
    },
  ];

  const categories = [
    { name: "Travel", budget: 5000, spent: 2800, color: "blue" },
    { name: "Meals", budget: 2000, spent: 850, color: "green" },
    { name: "Office Supplies", budget: 1500, spent: 680, color: "purple" },
    { name: "Training", budget: 3000, spent: 1200, color: "orange" },
  ];

  const handleUploadExpense = () => {
    console.log('Uploading expense');
    setShowUploadExpense(true);
  };

  const handleScanBill = () => {
    console.log('Scanning bill with camera');
    setShowScanBill(true);
    toast.success('Camera activated for bill scanning!');
  };

  const handleAICategory = (expenseId: number) => {
    console.log('AI categorizing expense:', expenseId);
    toast.success('AI has automatically categorized the expense!');
  };

  const handleApproveNow = (expenseId: number) => {
    const expense = expenses.find(e => e.id === expenseId);
    setSelectedExpense(expense);
    setShowApproval(true);
  };

  const handleSubmitExpense = () => {
    console.log('Expense submitted');
    toast.success('Expense submitted successfully!');
    setShowUploadExpense(false);
  };

  const handleApprove = () => {
    console.log('Expense approved');
    toast.success('Expense approved successfully!');
    setShowApproval(false);
  };

  const handleReject = () => {
    console.log('Expense rejected');
    toast.success('Expense rejected');
    setShowApproval(false);
  };

  const filteredExpenses = expenses.filter(expense =>
    expense.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent flex items-center space-x-2">
            <Receipt className="w-8 h-8 text-orange-600" />
            <span>Expense Management</span>
          </h1>
          <p className="text-gray-600 mt-1">OCR Bill Scanning, AI Categorization & Smart Approval Workflows</p>
        </div>
        <div className="flex space-x-3">
          <Button onClick={handleUploadExpense} className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
            <Upload className="w-4 h-4 mr-2" />
            Upload Expense
          </Button>
          <Button onClick={handleScanBill} variant="outline" className="hover:bg-blue-50">
            <Camera className="w-4 h-4 mr-2" />
            Scan Bill
          </Button>
        </div>
      </div>

      {/* Expense Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-900">Total Expenses</h3>
                <p className="text-2xl font-bold text-blue-700">$12,450</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-green-900">Approved</h3>
                <p className="text-2xl font-bold text-green-700">$8,200</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-orange-900">Pending</h3>
                <p className="text-2xl font-bold text-orange-700">$3,150</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-red-900">Rejected</h3>
                <p className="text-2xl font-bold text-red-700">$1,100</p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-purple-900">
            <Brain className="w-5 h-5" />
            <span>AI Expense Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border border-purple-100 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-purple-900 mb-2">Spending Patterns</h4>
              <p className="text-sm text-purple-800">Travel expenses increased 25% this month. Consider policy review.</p>
              <Badge className="mt-2 bg-orange-100 text-orange-800">Attention Needed</Badge>
            </div>
            <div className="p-4 bg-white rounded-lg border border-purple-100 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-purple-900 mb-2">Budget Alerts</h4>
              <p className="text-sm text-purple-800">Office supplies budget 45% utilized. On track for monthly limit.</p>
              <Badge className="mt-2 bg-green-100 text-green-800">On Track</Badge>
            </div>
            <div className="p-4 bg-white rounded-lg border border-purple-100 hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-purple-900 mb-2">Policy Compliance</h4>
              <p className="text-sm text-purple-800">92% of expenses comply with company policy. 3 need review.</p>
              <Badge className="mt-2 bg-blue-100 text-blue-800">Good Compliance</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Budget Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Tag className="w-5 h-5" />
            <span>Category Budget Overview</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <div key={index} className={`p-4 bg-${category.color}-50 border border-${category.color}-200 rounded-lg`}>
                <h4 className={`font-semibold text-${category.color}-900 mb-2`}>{category.name}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Spent: ${category.spent}</span>
                    <span>Budget: ${category.budget}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`bg-${category.color}-600 h-2 rounded-full`}
                      style={{ width: `${(category.spent / category.budget) * 100}%` }}
                    ></div>
                  </div>
                  <p className={`text-xs text-${category.color}-700`}>
                    {Math.round((category.spent / category.budget) * 100)}% utilized
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Expense List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Receipt className="w-5 h-5" />
            <span>Expense Reports</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredExpenses.map((expense) => (
              <Card key={expense.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white">
                      <Receipt className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{expense.employee}</h3>
                      <p className="text-sm text-gray-600">{expense.description}</p>
                      <p className="text-xs text-gray-500">{expense.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="font-semibold text-lg">${expense.amount}</p>
                      <p className="text-xs text-gray-500">{expense.category}</p>
                    </div>
                    <Badge 
                      variant={
                        expense.status === 'Approved' ? 'default' :
                        expense.status === 'Pending' ? 'secondary' : 
                        'destructive'
                      }
                    >
                      {expense.status}
                    </Badge>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAICategory(expense.id)}
                      >
                        <Brain className="w-3 h-3 mr-1" />
                        AI Category
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleApproveNow(expense.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {expense.status === 'Pending' ? 'Approve Now' : 'Review'}
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    {expense.receipt && <Badge variant="outline" className="text-xs">Receipt Available</Badge>}
                    <Badge variant="outline" className="text-xs">AI: {expense.aiCategory}</Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upload Expense Modal */}
      {showUploadExpense && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl bg-white shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center space-x-2">
                <Upload className="w-6 h-6 text-orange-600" />
                <span>Upload Expense</span>
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowUploadExpense(false)}>
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Amount</Label>
                  <Input type="number" placeholder="0.00" />
                </div>
                <div>
                  <Label>Date</Label>
                  <Input type="date" />
                </div>
              </div>
              <div>
                <Label>Category</Label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Select category...</option>
                  <option>Travel</option>
                  <option>Meals</option>
                  <option>Office Supplies</option>
                  <option>Training</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea placeholder="Enter expense description..." />
              </div>
              <div>
                <Label>Upload Receipt</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Receipt className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Drag & drop receipt or click to browse</p>
                  <Input type="file" accept=".pdf,.jpg,.png" className="mt-2" />
                  <div className="flex space-x-2 mt-3">
                    <Button size="sm" variant="outline" onClick={handleScanBill}>
                      <Camera className="w-3 h-3 mr-1" />
                      Scan with Camera
                    </Button>
                    <Button size="sm" variant="outline">
                      <Brain className="w-3 h-3 mr-1" />
                      AI Extract Data
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowUploadExpense(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitExpense} className="flex-1 bg-gradient-to-r from-orange-500 to-red-500">
                  Submit Expense
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Scan Bill Modal */}
      {showScanBill && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md bg-white shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center space-x-2">
                <Camera className="w-6 h-6 text-blue-600" />
                <span>Scan Bill</span>
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowScanBill(false)}>
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="w-64 h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mx-auto">
                  <div>
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Camera preview will appear here</p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowScanBill(false)}>
                  Cancel
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500">
                  <Scan className="w-4 h-4 mr-2" />
                  Capture
                </Button>
              </div>
              <div className="text-center text-xs text-gray-500">
                AI will automatically extract amount, date, and vendor information
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Approval Modal */}
      {showApproval && selectedExpense && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl bg-white shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span>Expense Approval</span>
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowApproval(false)}>
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Employee</Label>
                  <p className="font-semibold">{selectedExpense.employee}</p>
                </div>
                <div>
                  <Label>Amount</Label>
                  <p className="font-semibold text-lg">${selectedExpense.amount}</p>
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <p>{selectedExpense.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <p>{selectedExpense.category}</p>
                </div>
                <div>
                  <Label>Date</Label>
                  <p>{selectedExpense.date}</p>
                </div>
              </div>
              <div>
                <Label>AI Category Suggestion</Label>
                <p className="text-blue-600">{selectedExpense.aiCategory}</p>
              </div>
              <div>
                <Label>Approval Notes</Label>
                <Textarea placeholder="Add approval notes..." />
              </div>
              <div className="flex space-x-3 pt-4">
                <Button variant="destructive" className="flex-1" onClick={handleReject}>
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button onClick={handleApprove} className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ExpenseManagement;
