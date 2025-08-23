
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  FileText, 
  GraduationCap,
  Bell,
  Target,
  Zap
} from "lucide-react";

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  status: string;
  joinDate: string;
  missingDocs?: string[];
}

interface AIInsightsPanelProps {
  employees: Employee[];
}

export const AIInsightsPanel = ({ employees }: AIInsightsPanelProps) => {
  const missingDocsCount = employees.reduce((acc, emp) => acc + (emp.missingDocs?.length || 0), 0);
  const employeesWithMissingDocs = employees.filter(emp => emp.missingDocs && emp.missingDocs.length > 0);
  const recentHires = employees.filter(emp => {
    const joinDate = new Date(emp.joinDate);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    return joinDate > threeMonthsAgo;
  });

  const aiInsights = [
    {
      type: "urgent",
      title: "Missing Documents Alert",
      description: `${employeesWithMissingDocs.length} employees have ${missingDocsCount} missing documents total`,
      action: "Send Reminders",
      icon: FileText,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    },
    {
      type: "suggestion",
      title: "Training Recommendations",
      description: "3 employees in Engineering team would benefit from React training",
      action: "View Recommendations",
      icon: GraduationCap,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      type: "insight",
      title: "Onboarding Opportunity",
      description: `${recentHires.length} recent hires could benefit from buddy assignments`,
      action: "Create Pairs",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      type: "optimization",
      title: "Department Balance",
      description: "Marketing team is 20% under capacity for Q4 goals",
      action: "View Analysis",
      icon: Target,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
  ];

  const handleAIAction = (actionType: string, insightTitle: string) => {
    console.log(`AI Action: ${actionType} for ${insightTitle}`);
    // Implementation for AI actions
  };

  return (
    <div className="space-y-6">
      {/* Main AI Insights Card */}
      <Card className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border-emerald-200 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-emerald-900">AI-Powered Insights</span>
              <p className="text-sm text-emerald-700 font-normal">Smart recommendations for your workforce</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {aiInsights.map((insight, index) => (
              <Card key={index} className={`${insight.bgColor} ${insight.borderColor} border transition-all hover:shadow-md`}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg bg-white shadow-sm`}>
                      <insight.icon className={`w-5 h-5 ${insight.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${insight.color} ${insight.borderColor} bg-white`}
                        >
                          {insight.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{insight.description}</p>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleAIAction(insight.action, insight.title)}
                        className={`${insight.borderColor} ${insight.color} hover:bg-white`}
                      >
                        <Zap className="w-3 h-3 mr-1" />
                        {insight.action}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-emerald-600">{employees.length}</div>
              <div className="text-xs text-gray-600">Total Employees</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-blue-600">{missingDocsCount}</div>
              <div className="text-xs text-gray-600">Missing Documents</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-green-600">{recentHires.length}</div>
              <div className="text-xs text-gray-600">Recent Hires (3M)</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-purple-600">92%</div>
              <div className="text-xs text-gray-600">Profile Completion</div>
            </div>
          </div>

          {/* Global AI Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button 
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white"
              onClick={() => handleAIAction("bulk_reminder", "documents")}
            >
              <Bell className="w-4 h-4 mr-2" />
              Send Bulk Reminders
            </Button>
            <Button 
              variant="outline"
              className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              onClick={() => handleAIAction("generate_report", "insights")}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Generate AI Report
            </Button>
            <Button 
              variant="outline"
              className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              onClick={() => handleAIAction("optimize_structure", "organization")}
            >
              <Target className="w-4 h-4 mr-2" />
              Optimize Structure
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
