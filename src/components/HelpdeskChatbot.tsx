import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Bot, 
  MessageSquare, 
  Plus, 
  Search,
  Send,
  User,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  Edit3,
  X,
  PhoneCall,
  Mail,
  FileText,
  Star,
  TrendingUp,
  Headphones,
  Calendar,
  Download,
  Upload
} from "lucide-react";
import { toast } from "sonner";

const HelpdeskChatbot = () => {
  const [chatMessage, setChatMessage] = useState("");
  const [showRaiseTicket, setShowRaiseTicket] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showTicketDetails, setShowTicketDetails] = useState(false);
  const [showScheduleCall, setShowScheduleCall] = useState(false);
  const [showEmailHR, setShowEmailHR] = useState(false);
  const [showRequestDocument, setShowRequestDocument] = useState(false);
  const [showRateSupport, setShowRateSupport] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [rating, setRating] = useState(0);

  const tickets = [
    {
      id: 1001,
      title: "Leave Balance Query",
      employee: "John Doe",
      category: "Leave Management",
      priority: "Medium",
      status: "Open",
      created: "2024-01-15",
      updated: "2024-01-16",
      sla: 24,
      timeRemaining: 8
    },
    {
      id: 1002,
      title: "Payroll Discrepancy",
      employee: "Sarah Wilson",
      category: "Payroll",
      priority: "High",
      status: "In Progress",
      created: "2024-01-14",
      updated: "2024-01-16",
      sla: 8,
      timeRemaining: 2
    },
    {
      id: 1003,
      title: "Document Access Issue",
      employee: "Mike Johnson",
      category: "IT Support",
      priority: "Low",
      status: "Resolved",
      created: "2024-01-13",
      updated: "2024-01-16",
      sla: 48,
      timeRemaining: 0
    },
  ];

  const faqCategories = [
    {
      name: "Leave Policies",
      count: 15,
      color: "blue",
      questions: [
        "How many vacation days do I have?",
        "Can I carry forward unused leave?",
        "How to apply for medical leave?"
      ]
    },
    {
      name: "Payroll",
      count: 12,
      color: "green",
      questions: [
        "When is payday?",
        "How to update tax information?",
        "Understanding pay slip deductions"
      ]
    },
    {
      name: "Benefits",
      count: 10,
      color: "purple",
      questions: [
        "Health insurance enrollment",
        "Retirement plan options",
        "Employee discounts"
      ]
    },
    {
      name: "IT Support",
      count: 8,
      color: "orange",
      questions: [
        "Password reset procedure",
        "VPN setup instructions",
        "Software installation requests"
      ]
    },
  ];

  const chatHistory = [
    { type: "bot", message: "Hello! I'm HRBot. How can I help you today?", time: "10:00 AM" },
    { type: "user", message: "How many vacation days do I have left?", time: "10:01 AM" },
    { type: "bot", message: "Let me check your leave balance. You have 12 vacation days remaining for this year. Would you like to see the breakdown by leave type?", time: "10:01 AM" },
    { type: "user", message: "Yes, please show me all leave types", time: "10:02 AM" },
    { type: "bot", message: "Here's your complete leave balance:\n• Vacation Days: 12 remaining\n• Sick Leave: 5 remaining\n• Personal Days: 3 remaining\n• Comp Time: 2 days\n\nIs there anything else you'd like to know?", time: "10:02 AM" },
  ];

  const handleAskHRBot = () => {
    console.log('Opening HRBot chat');
    setShowChatbot(true);
  };

  const handleScheduleCall = () => {
    console.log('Opening schedule call modal');
    setShowScheduleCall(true);
  };

  const handleEmailHR = () => {
    console.log('Opening email HR modal');
    setShowEmailHR(true);
  };

  const handleRequestDocument = () => {
    console.log('Opening request document modal');
    setShowRequestDocument(true);
  };

  const handleRateSupport = () => {
    console.log('Opening rate support modal');
    setShowRateSupport(true);
  };

  const handleRaiseTicket = () => {
    console.log('Raising new ticket');
    setShowRaiseTicket(true);
  };

  const handleTrackTicket = (ticketId: number) => {
    const ticket = tickets.find(t => t.id === ticketId);
    setSelectedTicket(ticket);
    setShowTicketDetails(true);
  };

  const handleCloseTicket = (ticketId: number) => {
    console.log('Closing ticket:', ticketId);
    toast.success('Ticket closed successfully!');
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    console.log('Sending message:', chatMessage);
    toast.success('Message sent to HRBot!');
    setChatMessage("");
  };

  const handleSubmitTicket = () => {
    console.log('Ticket submitted');
    toast.success('Ticket raised successfully! Ticket ID: #1004');
    setShowRaiseTicket(false);
  };

  const handleSubmitCallRequest = () => {
    console.log('Call scheduled');
    toast.success('HR call scheduled successfully! You will receive a confirmation email.');
    setShowScheduleCall(false);
  };

  const handleSendEmail = () => {
    console.log('Email sent');
    toast.success('Email sent to HR team successfully!');
    setShowEmailHR(false);
  };

  const handleSubmitDocumentRequest = () => {
    console.log('Document requested');
    toast.success('Document request submitted successfully! Processing time: 2-3 business days.');
    setShowRequestDocument(false);
  };

  const handleSubmitRating = () => {
    console.log('Rating submitted:', rating);
    toast.success('Thank you for your feedback! Rating submitted successfully.');
    setShowRateSupport(false);
    setRating(0);
  };

  const filteredTickets = tickets.filter(ticket =>
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.employee.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center space-x-2">
            <Headphones className="w-8 h-8 text-cyan-600" />
            <span>Helpdesk & AI Chatbot</span>
          </h1>
          <p className="text-gray-600 mt-1">AI-powered HR Assistant, Ticket Management & SLA Tracking</p>
        </div>
        <div className="flex space-x-3">
          <Button onClick={handleAskHRBot} className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg">
            <Bot className="w-4 h-4 mr-2" />
            Ask HRBot
          </Button>
          <Button onClick={handleRaiseTicket} variant="outline" className="hover:bg-orange-50 shadow-md border-orange-200">
            <Plus className="w-4 h-4 mr-2" />
            Raise Ticket
          </Button>
        </div>
      </div>

      {/* Helpdesk Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-900">Total Tickets</h3>
                <p className="text-2xl font-bold text-blue-700">156</p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-orange-900">Open Tickets</h3>
                <p className="text-2xl font-bold text-orange-700">23</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-green-900">Resolved</h3>
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
                <h3 className="font-semibold text-purple-900">Avg Resolution</h3>
                <p className="text-2xl font-bold text-purple-700">18h</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="w-5 h-5" />
            <span>AI-Powered FAQ Categories</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {faqCategories.map((category, index) => (
              <Card key={index} className={`p-4 hover:shadow-md transition-shadow cursor-pointer ${
                category.color === 'blue' ? 'bg-blue-50 border-blue-200' :
                category.color === 'green' ? 'bg-green-50 border-green-200' :
                category.color === 'purple' ? 'bg-purple-50 border-purple-200' :
                'bg-orange-50 border-orange-200'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className={`font-semibold ${
                    category.color === 'blue' ? 'text-blue-900' :
                    category.color === 'green' ? 'text-green-900' :
                    category.color === 'purple' ? 'text-purple-900' :
                    'text-orange-900'
                  }`}>{category.name}</h4>
                  <Badge className={`${
                    category.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                    category.color === 'green' ? 'bg-green-100 text-green-800' :
                    category.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {category.count} FAQs
                  </Badge>
                </div>
                <div className="space-y-2">
                  {category.questions.slice(0, 2).map((question, qIndex) => (
                    <p key={qIndex} className={`text-xs hover:underline cursor-pointer ${
                      category.color === 'blue' ? 'text-blue-700' :
                      category.color === 'green' ? 'text-green-700' :
                      category.color === 'purple' ? 'text-purple-700' :
                      'text-orange-700'
                    }`}>
                      • {question}
                    </p>
                  ))}
                  <Button size="sm" className={`mt-2 text-white ${
                    category.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                    category.color === 'green' ? 'bg-green-600 hover:bg-green-700' :
                    category.color === 'purple' ? 'bg-purple-600 hover:bg-purple-700' :
                    'bg-orange-600 hover:bg-orange-700'
                  }`}>
                    <Bot className="w-3 h-3 mr-1" />
                    Ask Bot
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Tickets */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Active Tickets</span>
              </CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    placeholder="Search tickets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTickets.map((ticket) => (
                  <Card key={ticket.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          ticket.priority === 'High' ? 'bg-red-100' :
                          ticket.priority === 'Medium' ? 'bg-orange-100' :
                          'bg-green-100'
                        }`}>
                          <MessageSquare className={`w-6 h-6 ${
                            ticket.priority === 'High' ? 'text-red-600' :
                            ticket.priority === 'Medium' ? 'text-orange-600' :
                            'text-green-600'
                          }`} />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-gray-900">#{ticket.id}</h3>
                            <Badge variant="outline" className="text-xs">
                              {ticket.priority}
                            </Badge>
                          </div>
                          <p className="text-sm font-medium">{ticket.title}</p>
                          <p className="text-xs text-gray-600">{ticket.employee} • {ticket.category}</p>
                          <p className="text-xs text-gray-500">Created: {ticket.created}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <Badge 
                            variant={
                              ticket.status === 'Open' ? 'outline' :
                              ticket.status === 'In Progress' ? 'secondary' : 
                              'default'
                            }
                            className="mb-1"
                          >
                            {ticket.status}
                          </Badge>
                          <p className={`text-xs ${
                            ticket.timeRemaining <= 2 ? 'text-red-600' :
                            ticket.timeRemaining <= 8 ? 'text-orange-600' :
                            'text-green-600'
                          }`}>
                            SLA: {ticket.timeRemaining}h remaining
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => handleTrackTicket(ticket.id)}>
                            <Eye className="w-3 h-3 mr-1" />
                            Track Ticket
                          </Button>
                          {ticket.status === 'Resolved' && (
                            <Button size="sm" onClick={() => handleCloseTicket(ticket.id)} className="bg-green-600 hover:bg-green-700">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Close Ticket
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & SLA Monitor */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>SLA Monitor</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                <div>
                  <p className="font-semibold text-red-900">Critical</p>
                  <p className="text-sm text-red-700">2 tickets overdue</p>
                </div>
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div>
                  <p className="font-semibold text-orange-900">Warning</p>
                  <p className="text-sm text-orange-700">5 tickets &lt; 2h SLA</p>
                </div>
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div>
                  <p className="font-semibold text-green-900">On Track</p>
                  <p className="text-sm text-green-700">16 tickets within SLA</p>
                </div>
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-blue-900">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-4">
              <Button 
                className="w-full justify-start bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-md transition-all duration-200 hover:shadow-lg" 
                onClick={handleAskHRBot}
              >
                <Bot className="w-4 h-4 mr-2" />
                Chat with HRBot
              </Button>
              <Button 
                className="w-full justify-start bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md transition-all duration-200 hover:shadow-lg"
                onClick={handleScheduleCall}
              >
                <PhoneCall className="w-4 h-4 mr-2" />
                Schedule HR Call
              </Button>
              <Button 
                className="w-full justify-start bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-md transition-all duration-200 hover:shadow-lg"
                onClick={handleEmailHR}
              >
                <Mail className="w-4 h-4 mr-2" />
                Email HR Team
              </Button>
              <Button 
                className="w-full justify-start bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-md transition-all duration-200 hover:shadow-lg"
                onClick={handleRequestDocument}
              >
                <FileText className="w-4 h-4 mr-2" />
                Request Document
              </Button>
              <Button 
                className="w-full justify-start bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-md transition-all duration-200 hover:shadow-lg"
                onClick={handleRateSupport}
              >
                <Star className="w-4 h-4 mr-2" />
                Rate Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* HRBot Chat Modal */}
      {showChatbot && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl bg-white shadow-2xl h-[600px] flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center space-x-2">
                <Bot className="w-6 h-6 text-blue-600" />
                <span>HRBot Assistant</span>
                <Badge className="bg-green-100 text-green-800">Online</Badge>
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowChatbot(false)}>
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 rounded-lg">
                {chatHistory.map((message, index) => (
                  <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white border border-gray-200'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{message.message}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <Input
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Ask me about policies, leave, payroll..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                HRBot can help with policies, leave, payroll, and document requests
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Raise Ticket Modal */}
      {showRaiseTicket && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl bg-white shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center space-x-2">
                <Plus className="w-6 h-6 text-orange-600" />
                <span>Raise Support Ticket</span>
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowRaiseTicket(false)}>
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>Select category...</option>
                    <option>Leave Management</option>
                    <option>Payroll</option>
                    <option>Benefits</option>
                    <option>IT Support</option>
                    <option>Document Request</option>
                    <option>Policy Query</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <Label>Priority</Label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>Medium</option>
                    <option>Low</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </div>
              </div>
              <div>
                <Label>Subject</Label>
                <Input placeholder="Brief description of your issue" />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea 
                  placeholder="Please provide detailed information about your request or issue..."
                  className="min-h-[120px]"
                />
              </div>
              <div>
                <Label>Attachments (optional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <FileText className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Drag & drop files or click to browse</p>
                  <Input type="file" multiple className="mt-2" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <Label className="text-sm">Send me email updates on this ticket</Label>
              </div>
              <div className="flex space-x-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowRaiseTicket(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitTicket} className="flex-1 bg-gradient-to-r from-orange-500 to-red-500">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Ticket
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Track Ticket Modal */}
      {showTicketDetails && selectedTicket && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-3xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center space-x-2">
                <Eye className="w-6 h-6 text-blue-600" />
                <span>Ticket #{selectedTicket.id}</span>
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowTicketDetails(false)}>
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Title</Label>
                  <p className="font-semibold">{selectedTicket.title}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge variant="outline">{selectedTicket.status}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Priority</Label>
                  <p>{selectedTicket.priority}</p>
                </div>
                <div>
                  <Label>Category</Label>
                  <p>{selectedTicket.category}</p>
                </div>
                <div>
                  <Label>SLA Remaining</Label>
                  <p className={`font-semibold ${
                    selectedTicket.timeRemaining <= 2 ? 'text-red-600' :
                    selectedTicket.timeRemaining <= 8 ? 'text-orange-600' :
                    'text-green-600'
                  }`}>
                    {selectedTicket.timeRemaining}h
                  </p>
                </div>
              </div>
              <div>
                <Label>Timeline</Label>
                <div className="space-y-3 mt-2">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-sm">Ticket Created</p>
                      <p className="text-xs text-gray-600">{selectedTicket.created}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-sm">Assigned to HR Team</p>
                      <p className="text-xs text-gray-600">{selectedTicket.created}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    <div>
                      <p className="font-semibold text-sm">In Progress</p>
                      <p className="text-xs text-gray-600">{selectedTicket.updated}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowTicketDetails(false)}>
                  Close
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Add Comment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Schedule HR Call Modal */}
      {showScheduleCall && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl bg-white shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-6 h-6 text-green-600" />
                <span>Schedule HR Call</span>
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowScheduleCall(false)}>
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Preferred Date</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label>Preferred Time</Label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>09:00 AM</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>02:00 PM</option>
                    <option>03:00 PM</option>
                    <option>04:00 PM</option>
                  </select>
                </div>
              </div>
              <div>
                <Label>Call Duration</Label>
                <select className="w-full p-2 border rounded-lg">
                  <option>30 minutes</option>
                  <option>60 minutes</option>
                  <option>90 minutes</option>
                </select>
              </div>
              <div>
                <Label>Purpose of Call</Label>
                <select className="w-full p-2 border rounded-lg">
                  <option>General HR Consultation</option>
                  <option>Leave Discussion</option>
                  <option>Performance Review</option>
                  <option>Career Development</option>
                  <option>Policy Clarification</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <Label>Additional Notes</Label>
                <Textarea 
                  placeholder="Please provide any additional details about what you'd like to discuss..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowScheduleCall(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitCallRequest} className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Call
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Email HR Team Modal */}
      {showEmailHR && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl bg-white shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center space-x-2">
                <Mail className="w-6 h-6 text-purple-600" />
                <span>Email HR Team</span>
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowEmailHR(false)}>
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>To</Label>
                <select className="w-full p-2 border rounded-lg">
                  <option>HR General (hr@company.com)</option>
                  <option>HR Manager (manager@company.com)</option>
                  <option>Payroll Team (payroll@company.com)</option>
                  <option>Benefits Team (benefits@company.com)</option>
                </select>
              </div>
              <div>
                <Label>Priority</Label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Normal</option>
                  <option>High</option>
                  <option>Urgent</option>
                </select>
              </div>
              <div>
                <Label>Subject</Label>
                <Input placeholder="Enter email subject" />
              </div>
              <div>
                <Label>Message</Label>
                <Textarea 
                  placeholder="Type your message here..."
                  className="min-h-[150px]"
                />
              </div>
              <div>
                <Label>Attachments (optional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Drag & drop files or click to browse</p>
                  <Input type="file" multiple className="mt-2" />
                </div>
              </div>
              <div className="flex space-x-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowEmailHR(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSendEmail} className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500">
                  <Send className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Request Document Modal */}
      {showRequestDocument && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl bg-white shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-6 h-6 text-orange-600" />
                <span>Request Document</span>
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowRequestDocument(false)}>
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Document Type</Label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Employment Letter</option>
                  <option>Salary Certificate</option>
                  <option>Experience Letter</option>
                  <option>Tax Documents (W-2, 1099)</option>
                  <option>Benefits Summary</option>
                  <option>Leave Balance Statement</option>
                  <option>Training Certificate</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <Label>Delivery Method</Label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Email (PDF)</option>
                  <option>Physical Copy (Mail)</option>
                  <option>Download Portal</option>
                  <option>Pick up from HR Office</option>
                </select>
              </div>
              <div>
                <Label>Purpose/Reason</Label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Personal Records</option>
                  <option>Loan Application</option>
                  <option>Visa/Immigration</option>
                  <option>Background Verification</option>
                  <option>Insurance Claim</option>
                  <option>Tax Filing</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <Label>Additional Details</Label>
                <Textarea 
                  placeholder="Please provide any specific requirements or details about the document request..."
                  className="min-h-[100px]"
                />
              </div>
              <div>
                <Label>Urgency</Label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Standard (5-7 business days)</option>
                  <option>Priority (2-3 business days)</option>
                  <option>Urgent (24-48 hours)</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowRequestDocument(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitDocumentRequest} className="flex-1 bg-gradient-to-r from-orange-500 to-red-500">
                  <Download className="w-4 h-4 mr-2" />
                  Submit Request
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Rate Support Modal */}
      {showRateSupport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl bg-white shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-6 h-6 text-yellow-600" />
                <span>Rate Our Support</span>
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowRateSupport(false)}>
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4">How was your support experience?</h3>
                <div className="flex justify-center space-x-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`w-12 h-12 transition-colors ${
                        star <= rating ? 'text-yellow-400' : 'text-gray-300'
                      } hover:text-yellow-400`}
                    >
                      <Star className="w-full h-full fill-current" />
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mb-6">
                  {rating === 0 && "Please rate your experience"}
                  {rating === 1 && "Poor - We'll work to improve"}
                  {rating === 2 && "Fair - There's room for improvement"}
                  {rating === 3 && "Good - We're glad we could help"}
                  {rating === 4 && "Very Good - Thank you for your feedback"}
                  {rating === 5 && "Excellent - We're thrilled to hear this!"}
                </p>
              </div>
              
              <div>
                <Label>What did we do well? (Optional)</Label>
                <Textarea 
                  placeholder="Tell us what you liked about our support..."
                  className="min-h-[80px]"
                />
              </div>
              
              <div>
                <Label>How can we improve? (Optional)</Label>
                <Textarea 
                  placeholder="Any suggestions for improvement?"
                  className="min-h-[80px]"
                />
              </div>
              
              <div>
                <Label>Support Channel Used</Label>
                <select className="w-full p-2 border rounded-lg">
                  <option>HRBot Chat</option>
                  <option>Support Ticket</option>
                  <option>Phone Call</option>
                  <option>Email</option>
                  <option>In-Person</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowRateSupport(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmitRating} 
                  disabled={rating === 0}
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 disabled:opacity-50"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Submit Rating
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default HelpdeskChatbot;
