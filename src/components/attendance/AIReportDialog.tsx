
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  Users,
  Target,
  Zap,
  Download
} from "lucide-react";

interface AIInsight {
  id: string;
  type: 'pattern' | 'anomaly' | 'prediction' | 'recommendation';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  confidence: number;
  impact: string;
  actionable: boolean;
}

export const AIReportDialog = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  const generateReport = async () => {
    setIsGenerating(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsGenerating(false);
    setReportGenerated(true);
  };

  const insights: AIInsight[] = [
    {
      id: "1",
      type: "anomaly",
      title: "Potential Buddy Punching Detected",
      description: "Unusual patterns detected for 2 employees - similar punch times and locations suggest potential buddy punching.",
      severity: "high",
      confidence: 87,
      impact: "Payroll accuracy compromised",
      actionable: true
    },
    {
      id: "2",
      type: "pattern",
      title: "Late Arrival Trend - Marketing Team",
      description: "Marketing team shows 15% increase in late arrivals over the past 2 weeks, primarily on Mondays.",
      severity: "medium",
      confidence: 92,
      impact: "Team productivity may be affected",
      actionable: true
    },
    {
      id: "3",
      type: "prediction",
      title: "Overtime Projection",
      description: "Engineering team is projected to exceed monthly overtime budget by 23% if current trends continue.",
      severity: "high",
      confidence: 78,
      impact: "Budget overrun of ~$15,000",
      actionable: true
    },
    {
      id: "4",
      type: "recommendation",
      title: "Flexible Hours Implementation",
      description: "Analysis suggests implementing flexible work hours could reduce late arrivals by 40% for remote-capable roles.",
      severity: "low",
      confidence: 85,
      impact: "Improved employee satisfaction",
      actionable: true
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pattern': return <TrendingUp className="w-5 h-5" />;
      case 'anomaly': return <AlertTriangle className="w-5 h-5" />;
      case 'prediction': return <Target className="w-5 h-5" />;
      case 'recommendation': return <Zap className="w-5 h-5" />;
      default: return <Brain className="w-5 h-5" />;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
          <Brain className="w-4 h-4 mr-2" />
          AI Report
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Brain className="w-6 h-6 text-green-600" />
              <span>AI Attendance Analytics Report</span>
            </span>
            {reportGenerated && (
              <Button size="sm" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {!reportGenerated ? (
            <div className="text-center py-8">
              {!isGenerating ? (
                <div className="space-y-4">
                  <Brain className="w-16 h-16 text-green-600 mx-auto" />
                  <h3 className="text-lg font-semibold">Generate AI Analytics Report</h3>
                  <p className="text-gray-600">
                    Our AI will analyze attendance patterns, detect anomalies, and provide actionable insights.
                  </p>
                  <Button onClick={generateReport} className="bg-green-600 hover:bg-green-700">
                    Generate Report
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto"></div>
                  <h3 className="text-lg font-semibold">Analyzing Attendance Data...</h3>
                  <p className="text-gray-600">
                    Processing patterns, detecting anomalies, and generating insights.
                  </p>
                  <div className="w-64 mx-auto">
                    <Progress value={75} className="h-2" />
                    <p className="text-sm text-gray-500 mt-2">Analyzing 2,847 attendance records...</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-r from-blue-50 to-sky-50">
                  <CardContent className="p-4 text-center">
                    <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-800">247</p>
                    <p className="text-sm text-blue-700">Records Analyzed</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-orange-50 to-red-50">
                  <CardContent className="p-4 text-center">
                    <AlertTriangle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-orange-800">4</p>
                    <p className="text-sm text-orange-700">Issues Detected</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardContent className="p-4 text-center">
                    <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-800">85%</p>
                    <p className="text-sm text-green-700">Confidence Score</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardContent className="p-4 text-center">
                    <Zap className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-purple-800">3</p>
                    <p className="text-sm text-purple-700">Actionable Items</p>
                  </CardContent>
                </Card>
              </div>

              {/* Insights */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-green-600" />
                  <span>AI-Generated Insights</span>
                </h3>
                
                {insights.map((insight) => (
                  <Card key={insight.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(insight.type)}
                          <h4 className="font-semibold">{insight.title}</h4>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getSeverityColor(insight.severity)}>
                            {insight.severity.toUpperCase()}
                          </Badge>
                          {insight.actionable && (
                            <Badge variant="outline" className="text-green-600 border-green-200">
                              Actionable
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-3">{insight.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          <strong>Impact:</strong> {insight.impact}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Confidence:</span>
                          <div className="w-24">
                            <Progress value={insight.confidence} className="h-2" />
                          </div>
                          <span className="text-sm font-semibold">{insight.confidence}%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Recommendations */}
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardHeader>
                  <CardTitle className="text-green-900">Recommended Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-green-800">
                    <li>• Investigate potential buddy punching incidents immediately</li>
                    <li>• Consider team meeting with Marketing department about punctuality</li>
                    <li>• Review Engineering team workload and consider hiring</li>
                    <li>• Pilot flexible working hours program for eligible roles</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
