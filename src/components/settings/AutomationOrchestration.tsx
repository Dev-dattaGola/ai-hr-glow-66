
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Workflow,
  Bot,
  MessageSquare,
  BarChart3,
  ThumbsUp,
  Activity,
  RefreshCw,
  Brain,
  CheckCircle,
  AlertCircle,
  Clock,
  Mic,
  Settings,
  DollarSign
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import EnhancedWorkflowDesigner from "./EnhancedWorkflowDesigner";
import ThirdPartyIntegrations from "./ThirdPartyIntegrations";

interface AutomationOrchestrationProps {
  onSave: () => void;
}

const AutomationOrchestration = ({ onSave }: AutomationOrchestrationProps) => {
  const { toast } = useToast();

  // AI Actions state
  const [aiActions, setAiActions] = useState({
    patternDetection: true,
    nlpQueries: true,
    smartRecommendations: true,
    voiceCommands: false
  });

  const handleAIQuery = () => {
    toast({
      title: "HR AI Assistant",
      description: "AI is ready to answer your HR questions...",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg">
            <Workflow className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Automation & AI Orchestration</h2>
            <p className="text-gray-600">Automate HR workflows and enhance decision-making with AI</p>
          </div>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          <Brain className="w-4 h-4 mr-2" />
          AI-Powered Platform
        </Badge>
      </div>

      <Tabs defaultValue="workflow-designer" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="workflow-designer">Workflow Designer</TabsTrigger>
          <TabsTrigger value="ai-actions">AI Smart Actions</TabsTrigger>
          <TabsTrigger value="integrations">Third-party Integrations</TabsTrigger>
          <TabsTrigger value="activity-logs">Activity Logs</TabsTrigger>
        </TabsList>

        {/* Enhanced Workflow Designer Tab */}
        <TabsContent value="workflow-designer">
          <EnhancedWorkflowDesigner onSave={onSave} />
        </TabsContent>

        {/* AI Smart Actions Tab */}
        <TabsContent value="ai-actions" className="space-y-6">
          <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bot className="w-5 h-5" />
                <span>AI Smart Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">AI Capabilities</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border-2 rounded-lg bg-white">
                      <div>
                        <h4 className="font-medium">Pattern Detection</h4>
                        <p className="text-sm text-gray-600">Detect frequent absenteeism, high attrition</p>
                      </div>
                      <Switch
                        checked={aiActions.patternDetection}
                        onCheckedChange={(checked) => setAiActions(prev => ({...prev, patternDetection: checked}))}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 border-2 rounded-lg bg-white">
                      <div>
                        <h4 className="font-medium">NLP Queries</h4>
                        <p className="text-sm text-gray-600">Natural language HR questions</p>
                      </div>
                      <Switch
                        checked={aiActions.nlpQueries}
                        onCheckedChange={(checked) => setAiActions(prev => ({...prev, nlpQueries: checked}))}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 border-2 rounded-lg bg-white">
                      <div>
                        <h4 className="font-medium">Smart Recommendations</h4>
                        <p className="text-sm text-gray-600">AI training assignments, approvals</p>
                      </div>
                      <Switch
                        checked={aiActions.smartRecommendations}
                        onCheckedChange={(checked) => setAiActions(prev => ({...prev, smartRecommendations: checked}))}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 border-2 rounded-lg bg-white">
                      <div>
                        <h4 className="font-medium">Voice Commands</h4>
                        <p className="text-sm text-gray-600">Voice-activated HR queries</p>
                      </div>
                      <Switch
                        checked={aiActions.voiceCommands}
                        onCheckedChange={(checked) => setAiActions(prev => ({...prev, voiceCommands: checked}))}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button onClick={handleAIQuery} className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Ask HR AI
                    </Button>
                    <Button variant="outline" className="w-full justify-start hover:bg-blue-50">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Generate Insight
                    </Button>
                    <Button variant="outline" className="w-full justify-start hover:bg-green-50">
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      Recommend Action
                    </Button>
                    <Button variant="outline" className="w-full justify-start hover:bg-purple-50">
                      <Mic className="w-4 h-4 mr-2" />
                      Voice Query
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-2">
                <h4 className="font-medium mb-4">Recent AI Insights</h4>
                <div className="space-y-3">
                  <div className="flex items-center text-sm bg-white p-3 rounded-lg">
                    <AlertCircle className="w-4 h-4 mr-3 text-amber-600" />
                    <span>High attrition risk detected in Marketing department (15% increase)</span>
                  </div>
                  <div className="flex items-center text-sm bg-white p-3 rounded-lg">
                    <CheckCircle className="w-4 h-4 mr-3 text-green-600" />
                    <span>Recommended 3 employees for leadership training based on performance</span>
                  </div>
                  <div className="flex items-center text-sm bg-white p-3 rounded-lg">
                    <Clock className="w-4 h-4 mr-3 text-blue-600" />
                    <span>Optimal interview scheduling: Tuesday 10-12 PM shows highest attendance</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Third-party Integrations Tab */}
        <TabsContent value="integrations">
          <ThirdPartyIntegrations onSave={onSave} />
        </TabsContent>

        {/* Activity Logs Tab */}
        <TabsContent value="activity-logs" className="space-y-6">
          <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>Activity Logs & Versioning</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Recent Activities</h3>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      time: "2 minutes ago",
                      action: "Workflow 'New Hire Onboarding' executed",
                      status: "success",
                      details: "Employee: John Doe - Platform: n8n - Duration: 1.2s"
                    },
                    {
                      time: "15 minutes ago",
                      action: "AI Pattern Detection alert",
                      status: "warning",
                      details: "High attrition risk detected in Sales team - Confidence: 87%"
                    },
                    {
                      time: "1 hour ago",
                      action: "Integration sync completed",
                      status: "success",
                      details: "Google Calendar - 23 events synchronized via API"
                    },
                    {
                      time: "2 hours ago",
                      action: "Workflow execution failed",
                      status: "error",
                      details: "Monthly Payroll Alert - Make.com API timeout"
                    },
                    {
                      time: "3 hours ago",
                      action: "New workflow created",
                      status: "success",
                      details: "AI Generated workflow synced to Zapier - ID: zap_1234"
                    }
                  ].map((log, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 border-2 rounded-lg bg-white hover:shadow-sm transition-shadow">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        log.status === 'success' ? 'bg-green-500' :
                        log.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{log.action}</h4>
                          <span className="text-sm text-gray-500">{log.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{log.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={onSave} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
          <Settings className="w-4 h-4 mr-2" />
          Save Automation Settings
        </Button>
      </div>
    </div>
  );
};

export default AutomationOrchestration;
