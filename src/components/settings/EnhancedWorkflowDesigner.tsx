import { useState, useEffect } from "react";
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
  Workflow,
  Plus,
  Search,
  Play,
  Lightbulb,
  FileText,
  Edit,
  Trash2,
  Settings,
  Clock,
  Users,
  Mail,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Upload,
  Download,
  Zap,
  Brain,
  Loader2,
  ExternalLink,
  Database,
  Cloud
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { workflowApi, type Workflow as WorkflowType, type WorkflowTemplate } from "@/services/workflowApi";

interface EnhancedWorkflowDesignerProps {
  onSave: () => void;
}

const EnhancedWorkflowDesigner = ({ onSave }: EnhancedWorkflowDesignerProps) => {
  const { toast } = useToast();
  
  const [workflows, setWorkflows] = useState<WorkflowType[]>([]);
  const [templates, setTemplates] = useState<WorkflowTemplate[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowType | null>(null);
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [aiPrompt, setAiPrompt] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  const [newWorkflow, setNewWorkflow] = useState({
    name: "",
    description: "",
    category: "",
    conditions: [""],
    actions: [""],
    status: "draft" as "active" | "inactive" | "draft"
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setWorkflows(workflowApi.getWorkflows());
    setTemplates(workflowApi.getWorkflowTemplates());
  };

  const handleCreateWorkflow = async () => {
    if (!newWorkflow.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Workflow name is required",
        variant: "destructive",
      });
      return;
    }

    setLoading(prev => ({ ...prev, create: true }));

    try {
      await workflowApi.createWorkflow({
        name: newWorkflow.name,
        description: newWorkflow.description,
        category: newWorkflow.category || "General",
        status: newWorkflow.status,
        conditions: newWorkflow.conditions.filter(c => c.trim()),
        actions: newWorkflow.actions.filter(a => a.trim())
      });

      loadData();
      setIsCreateDialogOpen(false);
      resetNewWorkflow();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create workflow",
        variant: "destructive",
      });
    } finally {
      setLoading(prev => ({ ...prev, create: false }));
    }
  };

  const handleEditWorkflow = (workflow: WorkflowType) => {
    setSelectedWorkflow(workflow);
    setNewWorkflow({
      name: workflow.name,
      description: workflow.description,
      category: workflow.category,
      conditions: workflow.conditions,
      actions: workflow.actions,
      status: workflow.status
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateWorkflow = async () => {
    if (!selectedWorkflow) return;

    setLoading(prev => ({ ...prev, [`edit_${selectedWorkflow.id}`]: true }));

    try {
      await workflowApi.updateWorkflow(selectedWorkflow.id, {
        name: newWorkflow.name,
        description: newWorkflow.description,
        category: newWorkflow.category,
        conditions: newWorkflow.conditions.filter(c => c.trim()),
        actions: newWorkflow.actions.filter(a => a.trim()),
        status: newWorkflow.status
      });

      loadData();
      setIsEditDialogOpen(false);
      setSelectedWorkflow(null);
      resetNewWorkflow();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update workflow",
        variant: "destructive",
      });
    } finally {
      setLoading(prev => ({ ...prev, [`edit_${selectedWorkflow.id}`]: false }));
    }
  };

  const handleDeleteWorkflow = async (id: string) => {
    setLoading(prev => ({ ...prev, [`delete_${id}`]: true }));

    try {
      await workflowApi.deleteWorkflow(id);
      loadData();
      toast({
        title: "Workflow Deleted",
        description: "Workflow has been removed from all platforms.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete workflow",
        variant: "destructive",
      });
    } finally {
      setLoading(prev => ({ ...prev, [`delete_${id}`]: false }));
    }
  };

  const handleToggleWorkflow = async (id: string) => {
    const workflow = workflows.find(w => w.id === id);
    if (!workflow) return;

    setLoading(prev => ({ ...prev, [`toggle_${id}`]: true }));

    try {
      await workflowApi.updateWorkflow(id, {
        status: workflow.status === 'active' ? 'inactive' : 'active'
      });
      
      loadData();
      toast({
        title: "Workflow Updated",
        description: `"${workflow.name}" is now ${workflow.status === 'active' ? 'inactive' : 'active'}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to toggle workflow",
        variant: "destructive",
      });
    } finally {
      setLoading(prev => ({ ...prev, [`toggle_${id}`]: false }));
    }
  };

  const handleRunWorkflow = async (id: string) => {
    const workflow = workflows.find(w => w.id === id);
    if (!workflow || workflow.status !== 'active') return;

    setLoading(prev => ({ ...prev, [`run_${id}`]: true }));

    try {
      await workflowApi.runWorkflow(id);
      loadData();
      toast({
        title: "Workflow Executed",
        description: `"${workflow.name}" is running on ${workflow.platform || 'automation platform'}...`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to run workflow",
        variant: "destructive",
      });
    } finally {
      setLoading(prev => ({ ...prev, [`run_${id}`]: false }));
    }
  };

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) {
      toast({
        title: "Input Required",
        description: "Please describe what workflow you want to create",
        variant: "destructive",
      });
      return;
    }

    setLoading(prev => ({ ...prev, ai: true }));

    try {
      await workflowApi.generateAIWorkflow(aiPrompt);
      loadData();
      setIsAIDialogOpen(false);
      setAiPrompt("");
    } catch (error) {
      toast({
        title: "AI Generation Failed",
        description: "Failed to generate workflow with AI",
        variant: "destructive",
      });
    } finally {
      setLoading(prev => ({ ...prev, ai: false }));
    }
  };

  const handleTemplateCreate = (template: WorkflowTemplate) => {
    setNewWorkflow({
      name: template.name,
      description: template.description,
      category: template.category,
      conditions: [...template.conditions],
      actions: [...template.actions],
      status: "draft"
    });
    setIsCreateDialogOpen(true);
  };

  const handleExportWorkflows = () => {
    const data = JSON.stringify(workflows, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hr-workflows.json';
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: "Workflows have been exported to JSON file.",
    });
  };

  const resetNewWorkflow = () => {
    setNewWorkflow({
      name: "",
      description: "",
      category: "",
      conditions: [""],
      actions: [""],
      status: "draft"
    });
  };

  const addCondition = () => {
    setNewWorkflow(prev => ({
      ...prev,
      conditions: [...prev.conditions, ""]
    }));
  };

  const addAction = () => {
    setNewWorkflow(prev => ({
      ...prev,
      actions: [...prev.actions, ""]
    }));
  };

  const removeCondition = (index: number) => {
    setNewWorkflow(prev => ({
      ...prev,
      conditions: prev.conditions.filter((_, i) => i !== index)
    }));
  };

  const removeAction = (index: number) => {
    setNewWorkflow(prev => ({
      ...prev,
      actions: prev.actions.filter((_, i) => i !== index)
    }));
  };

  const filteredWorkflows = workflows.filter(workflow =>
    workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workflow.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (workflow: WorkflowType) => {
    if (workflow.platform) {
      return workflow.platform === 'n8n' ? <Database className="w-4 h-4" /> :
             workflow.platform === 'make' ? <Zap className="w-4 h-4" /> :
             <Cloud className="w-4 h-4" />;
    }
    return <Workflow className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Workflow className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl">Advanced Workflow Designer</span>
                <p className="text-sm text-gray-600 mt-1">Create, manage, and sync workflows with automation platforms</p>
              </div>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Search workflows..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Workflow
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Workflow</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Workflow Name *</Label>
                        <Input
                          value={newWorkflow.name}
                          onChange={(e) => setNewWorkflow(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter workflow name"
                        />
                      </div>
                      <div>
                        <Label>Category</Label>
                        <Select value={newWorkflow.category} onValueChange={(value) => setNewWorkflow(prev => ({ ...prev, category: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Onboarding">Onboarding</SelectItem>
                            <SelectItem value="Exit">Exit Process</SelectItem>
                            <SelectItem value="Payroll">Payroll</SelectItem>
                            <SelectItem value="Leave">Leave Management</SelectItem>
                            <SelectItem value="Performance">Performance</SelectItem>
                            <SelectItem value="Documents">Documents</SelectItem>
                            <SelectItem value="General">General</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={newWorkflow.description}
                        onChange={(e) => setNewWorkflow(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe what this workflow does"
                        rows={3}
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label>Conditions (When to trigger)</Label>
                        <Button type="button" variant="outline" size="sm" onClick={addCondition}>
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      {newWorkflow.conditions.map((condition, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                          <Input
                            value={condition}
                            onChange={(e) => {
                              const newConditions = [...newWorkflow.conditions];
                              newConditions[index] = e.target.value;
                              setNewWorkflow(prev => ({ ...prev, conditions: newConditions }));
                            }}
                            placeholder="e.g., Employee status = 'New'"
                          />
                          {newWorkflow.conditions.length > 1 && (
                            <Button type="button" variant="outline" size="sm" onClick={() => removeCondition(index)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label>Actions (What to do)</Label>
                        <Button type="button" variant="outline" size="sm" onClick={addAction}>
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      {newWorkflow.actions.map((action, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                          <Input
                            value={action}
                            onChange={(e) => {
                              const newActions = [...newWorkflow.actions];
                              newActions[index] = e.target.value;
                              setNewWorkflow(prev => ({ ...prev, actions: newActions }));
                            }}
                            placeholder="e.g., Send welcome email"
                          />
                          {newWorkflow.actions.length > 1 && (
                            <Button type="button" variant="outline" size="sm" onClick={() => removeAction(index)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>

                    <div>
                      <Label>Initial Status</Label>
                      <Select value={newWorkflow.status} onValueChange={(value: "active" | "inactive" | "draft") => setNewWorkflow(prev => ({ ...prev, status: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => {
                      setIsCreateDialogOpen(false);
                      resetNewWorkflow();
                    }}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleCreateWorkflow} 
                      className="bg-gradient-to-r from-green-600 to-blue-600"
                      disabled={loading.create}
                    >
                      {loading.create ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                      Create & Sync to Platform
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={isAIDialogOpen} onOpenChange={setIsAIDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600">
                    <Brain className="w-4 h-4 mr-2" />
                    AI Generate
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2">
                      <Brain className="w-5 h-5" />
                      <span>AI Workflow Generator</span>
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Describe the workflow you need</Label>
                      <Textarea
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        placeholder="e.g., Create a workflow that automatically processes new employee documents and sends them for approval..."
                        rows={4}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAIDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleAIGenerate} 
                      className="bg-gradient-to-r from-purple-600 to-pink-600"
                      disabled={loading.ai}
                    >
                      {loading.ai ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Brain className="w-4 h-4 mr-2" />}
                      Generate with AI
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button variant="outline" onClick={handleExportWorkflows}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Active</span>
                </div>
                <p className="text-2xl font-bold text-green-600">
                  {workflows.filter(w => w.status === 'active').length}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <span className="font-medium">Inactive</span>
                </div>
                <p className="text-2xl font-bold text-gray-600">
                  {workflows.filter(w => w.status === 'inactive').length}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-yellow-200">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-yellow-600" />
                  <span className="font-medium">Drafts</span>
                </div>
                <p className="text-2xl font-bold text-yellow-600">
                  {workflows.filter(w => w.status === 'draft').length}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Total Runs</span>
                </div>
                <p className="text-2xl font-bold text-blue-600">
                  {workflows.reduce((sum, w) => sum + w.triggers, 0)}
                </p>
              </div>
            </div>

            {/* Workflows List */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Workflows ({filteredWorkflows.length})</h3>
              <div className="space-y-3">
                {filteredWorkflows.map((workflow) => (
                  <div key={workflow.id} className="bg-white border-2 rounded-lg p-4 hover:shadow-lg transition-all duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-4 h-4 rounded-full ${
                          workflow.status === 'active' ? 'bg-green-500' : 
                          workflow.status === 'inactive' ? 'bg-gray-400' : 'bg-yellow-500'
                        }`} />
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h4 className="font-medium text-lg">{workflow.name}</h4>
                            <Badge variant="outline" className="flex items-center space-x-1">
                              {getStatusIcon(workflow)}
                              <span>{workflow.category}</span>
                            </Badge>
                            {workflow.platform && (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                {workflow.platform}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{workflow.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span>{workflow.triggers} runs</span>
                            <span>Last run: {workflow.lastRun}</span>
                            <span>Updated: {new Date(workflow.updatedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={workflow.status === 'active'}
                          onCheckedChange={() => handleToggleWorkflow(workflow.id)}
                          disabled={loading[`toggle_${workflow.id}`]}
                        />
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditWorkflow(workflow)}
                          disabled={loading[`edit_${workflow.id}`]}
                        >
                          {loading[`edit_${workflow.id}`] ? <Loader2 className="w-4 h-4 animate-spin" /> : <Edit className="w-4 h-4" />}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleRunWorkflow(workflow.id)}
                          disabled={workflow.status !== 'active' || loading[`run_${workflow.id}`]}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          {loading[`run_${workflow.id}`] ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDeleteWorkflow(workflow.id)}
                          disabled={loading[`delete_${workflow.id}`]}
                          className="text-red-600 hover:text-red-700"
                        >
                          {loading[`delete_${workflow.id}`] ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Templates */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Workflow Templates</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <Card 
                    key={template.id} 
                    className="cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-400 bg-gradient-to-br from-white to-blue-50"
                    onClick={() => handleTemplateCreate(template)}
                  >
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg inline-block mb-3">
                          <Workflow className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="font-medium text-lg mb-2">{template.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                        <div className="space-y-2">
                          <Badge variant="secondary">{template.category}</Badge>
                          <div className="text-xs text-gray-500">
                            {template.conditions.length} conditions • {template.actions.length} actions
                          </div>
                        </div>
                        <Button size="sm" className="mt-3 bg-gradient-to-r from-green-500 to-blue-500">
                          <Plus className="w-4 h-4 mr-1" />
                          Use Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Workflow</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Workflow Name *</Label>
                <Input
                  value={newWorkflow.name}
                  onChange={(e) => setNewWorkflow(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter workflow name"
                />
              </div>
              <div>
                <Label>Category</Label>
                <Select value={newWorkflow.category} onValueChange={(value) => setNewWorkflow(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Onboarding">Onboarding</SelectItem>
                    <SelectItem value="Exit">Exit Process</SelectItem>
                    <SelectItem value="Payroll">Payroll</SelectItem>
                    <SelectItem value="Leave">Leave Management</SelectItem>
                    <SelectItem value="Performance">Performance</SelectItem>
                    <SelectItem value="Documents">Documents</SelectItem>
                    <SelectItem value="General">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label>Description</Label>
              <Textarea
                value={newWorkflow.description}
                onChange={(e) => setNewWorkflow(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what this workflow does"
                rows={3}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Conditions (When to trigger)</Label>
                <Button type="button" variant="outline" size="sm" onClick={addCondition}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {newWorkflow.conditions.map((condition, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <Input
                    value={condition}
                    onChange={(e) => {
                      const newConditions = [...newWorkflow.conditions];
                      newConditions[index] = e.target.value;
                      setNewWorkflow(prev => ({ ...prev, conditions: newConditions }));
                    }}
                    placeholder="e.g., Employee status = 'New'"
                  />
                  {newWorkflow.conditions.length > 1 && (
                    <Button type="button" variant="outline" size="sm" onClick={() => removeCondition(index)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Actions (What to do)</Label>
                <Button type="button" variant="outline" size="sm" onClick={addAction}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {newWorkflow.actions.map((action, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <Input
                    value={action}
                    onChange={(e) => {
                      const newActions = [...newWorkflow.actions];
                      newActions[index] = e.target.value;
                      setNewWorkflow(prev => ({ ...prev, actions: newActions }));
                    }}
                    placeholder="e.g., Send welcome email"
                  />
                  {newWorkflow.actions.length > 1 && (
                    <Button type="button" variant="outline" size="sm" onClick={() => removeAction(index)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div>
              <Label>Initial Status</Label>
              <Select value={newWorkflow.status} onValueChange={(value: "active" | "inactive" | "draft") => setNewWorkflow(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsEditDialogOpen(false);
              setSelectedWorkflow(null);
              resetNewWorkflow();
            }}>
              Cancel
            </Button>
            <Button 
              onClick={handleUpdateWorkflow} 
              className="bg-gradient-to-r from-blue-600 to-purple-600"
              disabled={selectedWorkflow && loading[`edit_${selectedWorkflow.id}`]}
            >
              {selectedWorkflow && loading[`edit_${selectedWorkflow.id}`] ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Update & Sync
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnhancedWorkflowDesigner;
