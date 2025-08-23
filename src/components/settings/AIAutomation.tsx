import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Bot,
  Plus,
  Edit,
  Trash2,
  Play,
  Pause,
  Settings,
  Zap,
  Link,
  Activity,
  CheckCircle,
  AlertCircle,
  Clock,
  GitBranch,
  Workflow,
  Save,
  RefreshCw,
  ExternalLink
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AutomationAgent {
  id: string;
  name: string;
  type: "n8n" | "make" | "zapier";
  description: string;
  status: "active" | "inactive" | "error";
  workflowCount: number;
  lastRun: string;
  apiKey: string;
  webhookUrl: string;
  isConnected: boolean;
  triggers: number;
  successRate: number;
}

const AIAutomation = () => {
  const { toast } = useToast();
  
  const [agents, setAgents] = useState<AutomationAgent[]>([
    {
      id: "1",
      name: "N8N HR Workflows",
      type: "n8n",
      description: "Employee onboarding and leave management automation",
      status: "active",
      workflowCount: 5,
      lastRun: "2 hours ago",
      apiKey: "n8n_key_***",
      webhookUrl: "https://my-n8n.app/webhook/hr",
      isConnected: true,
      triggers: 123,
      successRate: 95
    },
    {
      id: "2",
      name: "Make Payroll System",
      type: "make",
      description: "Automated payroll processing and notifications",
      status: "inactive",
      workflowCount: 3,
      lastRun: "Never",
      apiKey: "",
      webhookUrl: "",
      isConnected: false,
      triggers: 0,
      successRate: 0
    },
    {
      id: "3",
      name: "Zapier Integration Hub",
      type: "zapier",
      description: "Third-party app integrations and data sync",
      status: "error",
      workflowCount: 2,
      lastRun: "1 day ago",
      apiKey: "zap_key_***",
      webhookUrl: "https://hooks.zapier.com/hooks/hr",
      isConnected: false,
      triggers: 45,
      successRate: 78
    }
  ]);

  const [selectedAgent, setSelectedAgent] = useState<AutomationAgent | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const [newAgent, setNewAgent] = useState<{
    name: string;
    type: "n8n" | "make" | "zapier";
    description: string;
    apiKey: string;
    webhookUrl: string;
  }>({
    name: "",
    type: "n8n",
    description: "",
    apiKey: "",
    webhookUrl: ""
  });

  const handleCreateAgent = () => {
    if (!newAgent.name.trim() || !newAgent.apiKey.trim()) {
      toast({
        title: "Validation Error",
        description: "Agent name and API key are required",
        variant: "destructive",
      });
      return;
    }

    const agent: AutomationAgent = {
      id: Date.now().toString(),
      name: newAgent.name,
      type: newAgent.type,
      description: newAgent.description,
      status: "inactive",
      workflowCount: 0,
      lastRun: "Never",
      apiKey: newAgent.apiKey,
      webhookUrl: newAgent.webhookUrl,
      isConnected: false,
      triggers: 0,
      successRate: 0
    };

    setAgents(prev => [...prev, agent]);
    setIsCreateDialogOpen(false);
    setNewAgent({ name: "", type: "n8n", description: "", apiKey: "", webhookUrl: "" });

    toast({
      title: "Agent Created",
      description: `"${agent.name}" has been created successfully.`,
    });
  };

  const handleEditAgent = (agent: AutomationAgent) => {
    setSelectedAgent(agent);
    setNewAgent({
      name: agent.name,
      type: agent.type,
      description: agent.description,
      apiKey: agent.apiKey,
      webhookUrl: agent.webhookUrl
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateAgent = () => {
    if (!selectedAgent || !newAgent.name.trim()) return;

    setAgents(prev => prev.map(agent => 
      agent.id === selectedAgent.id 
        ? { ...agent, ...newAgent }
        : agent
    ));

    setIsEditDialogOpen(false);
    setSelectedAgent(null);
    setNewAgent({ name: "", type: "n8n", description: "", apiKey: "", webhookUrl: "" });

    toast({
      title: "Agent Updated",
      description: "Agent configuration has been updated successfully.",
    });
  };

  const handleDeleteAgent = (id: string) => {
    setAgents(prev => prev.filter(agent => agent.id !== id));
    toast({
      title: "Agent Deleted",
      description: "Agent has been removed successfully.",
    });
  };

  const handleToggleAgent = (id: string) => {
    setAgents(prev => prev.map(agent => 
      agent.id === id 
        ? { 
            ...agent, 
            status: agent.status === "active" ? "inactive" : "active",
            isConnected: agent.status !== "active"
          }
        : agent
    ));
  };

  const handleTestConnection = (id: string) => {
    const agent = agents.find(a => a.id === id);
    if (!agent) return;

    toast({
      title: "Testing Connection",
      description: `Testing connection to ${agent.name}...`,
    });

    // Simulate connection test
    setTimeout(() => {
      setAgents(prev => prev.map(a => 
        a.id === id 
          ? { ...a, isConnected: true, status: "active" }
          : a
      ));

      toast({
        title: "Connection Successful",
        description: `Successfully connected to ${agent.name}!`,
      });
    }, 2000);
  };

  const handleRunWorkflow = (id: string) => {
    const agent = agents.find(a => a.id === id);
    if (!agent) return;

    setAgents(prev => prev.map(a => 
      a.id === id 
        ? { ...a, lastRun: "Just now", triggers: a.triggers + 1 }
        : a
    ));

    toast({
      title: "Workflow Triggered",
      description: `Workflow executed on ${agent.name}`,
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "n8n": return "🔧";
      case "make": return "⚡";
      case "zapier": return "⚡";
      default: return "🤖";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-gray-100 text-gray-800";
      case "error": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">AI Automation Agents</CardTitle>
                <p className="text-gray-600">Integrate N8N, Make, and Zapier agents for workflow automation</p>
              </div>
            </div>
            <Badge variant="outline" className="px-3 py-1">
              <Activity className="w-4 h-4 mr-2" />
              {agents.filter(a => a.status === "active").length} Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Agent
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Automation Agent</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Agent Name</Label>
                      <Input
                        value={newAgent.name}
                        onChange={(e) => setNewAgent(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter agent name"
                      />
                    </div>
                    <div>
                      <Label>Platform Type</Label>
                      <Select value={newAgent.type} onValueChange={(value: "n8n" | "make" | "zapier") => setNewAgent(prev => ({ ...prev, type: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="n8n">N8N</SelectItem>
                          <SelectItem value="make">Make</SelectItem>
                          <SelectItem value="zapier">Zapier</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label>Description</Label>
                    <Textarea
                      value={newAgent.description}
                      onChange={(e) => setNewAgent(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe what this agent does"
                    />
                  </div>

                  <div>
                    <Label>API Key</Label>
                    <Input
                      type="password"
                      value={newAgent.apiKey}
                      onChange={(e) => setNewAgent(prev => ({ ...prev, apiKey: e.target.value }))}
                      placeholder="Enter API key"
                    />
                  </div>

                  <div>
                    <Label>Webhook URL (Optional)</Label>
                    <Input
                      value={newAgent.webhookUrl}
                      onChange={(e) => setNewAgent(prev => ({ ...prev, webhookUrl: e.target.value }))}
                      placeholder="https://your-webhook-url.com"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreateAgent}>Create Agent</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Sync All
              </Button>
              <Button variant="outline">
                <Activity className="w-4 h-4 mr-2" />
                View Logs
              </Button>
            </div>
          </div>

          <div className="grid gap-6">
            {agents.map((agent) => (
              <Card key={agent.id} className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg text-2xl">
                        {getTypeIcon(agent.type)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-3">
                          <h3 className="text-xl font-semibold">{agent.name}</h3>
                          <Badge className={getStatusColor(agent.status)}>
                            {agent.status === "active" && <CheckCircle className="w-3 h-3 mr-1" />}
                            {agent.status === "error" && <AlertCircle className="w-3 h-3 mr-1" />}
                            {agent.status === "inactive" && <Pause className="w-3 h-3 mr-1" />}
                            {agent.status}
                          </Badge>
                          <Badge variant="outline" className="uppercase">
                            {agent.type}
                          </Badge>
                          {agent.isConnected && (
                            <Badge variant="outline" className="text-green-600">
                              <Link className="w-3 h-3 mr-1" />
                              Connected
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 mt-1">{agent.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span>{agent.workflowCount} workflows</span>
                          <span>{agent.triggers} triggers</span>
                          <span>{agent.successRate}% success rate</span>
                          <span>Last run: {agent.lastRun}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={agent.status === "active"}
                        onCheckedChange={() => handleToggleAgent(agent.id)}
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleTestConnection(agent.id)}
                        disabled={!agent.apiKey}
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Test
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRunWorkflow(agent.id)}
                        disabled={agent.status !== "active"}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Run
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEditAgent(agent)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteAgent(agent.id)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                          <Workflow className="w-4 h-4 text-blue-600" />
                          <span className="text-sm">Workflows: {agent.workflowCount}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-orange-600" />
                          <span className="text-sm">Last Run: {agent.lastRun}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">Success: {agent.successRate}%</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Open Platform
                        </Button>
                        <Button variant="ghost" size="sm">
                          View Workflows
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Automation Agent</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Agent Name</Label>
                <Input
                  value={newAgent.name}
                  onChange={(e) => setNewAgent(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label>Platform Type</Label>
                <Select value={newAgent.type} onValueChange={(value: "n8n" | "make" | "zapier") => setNewAgent(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="n8n">N8N</SelectItem>
                    <SelectItem value="make">Make</SelectItem>
                    <SelectItem value="zapier">Zapier</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label>Description</Label>
              <Textarea
                value={newAgent.description}
                onChange={(e) => setNewAgent(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <div>
              <Label>API Key</Label>
              <Input
                type="password"
                value={newAgent.apiKey}
                onChange={(e) => setNewAgent(prev => ({ ...prev, apiKey: e.target.value }))}
              />
            </div>

            <div>
              <Label>Webhook URL</Label>
              <Input
                value={newAgent.webhookUrl}
                onChange={(e) => setNewAgent(prev => ({ ...prev, webhookUrl: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateAgent}>Update Agent</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AIAutomation;
