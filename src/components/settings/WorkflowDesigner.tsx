
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
  Upload
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WorkflowDesignerProps {
  onSave: () => void;
}

interface WorkflowType {
  id: number;
  name: string;
  description: string;
  status: "active" | "inactive" | "draft";
  triggers: number;
  lastRun: string;
  category: string;
  conditions: string[];
  actions: string[];
}

const WorkflowDesigner = ({ onSave }: WorkflowDesignerProps) => {
  const { toast } = useToast();
  
  const [workflows, setWorkflows] = useState<WorkflowType[]>([
    {
      id: 1,
      name: "New Hire Onboarding",
      description: "Automated onboarding process for new employees",
      status: "active",
      triggers: 3,
      lastRun: "2 hours ago",
      category: "Onboarding",
      conditions: ["Employee status = 'New'", "Start date <= Today"],
      actions: ["Send welcome email", "Create IT accounts", "Schedule orientation"]
    },
    {
      id: 2,
      name: "Monthly Payroll Alert",
      description: "Automated payroll processing reminders",
      status: "active",
      triggers: 1,
      lastRun: "1 day ago",
      category: "Payroll",
      conditions: ["Date = Last day of month"],
      actions: ["Generate payroll report", "Notify HR team", "Update finance system"]
    },
    {
      id: 3,
      name: "Exit Process Automation",
      description: "Handle employee exit procedures",
      status: "inactive",
      triggers: 0,
      lastRun: "Never",
      category: "Exit",
      conditions: ["Employee status = 'Resigned'"],
      actions: ["Revoke access", "Collect equipment", "Schedule exit interview"]
    }
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowType | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const [newWorkflow, setNewWorkflow] = useState({
    name: "",
    description: "",
    category: "",
    conditions: [""],
    actions: [""],
    status: "draft" as const
  });

  const workflowTemplates = [
    {
      name: "Employee Onboarding",
      description: "Complete onboarding workflow",
      icon: Users,
      category: "Onboarding"
    },
    {
      name: "Exit Process",
      description: "Employee exit procedures",
      icon: AlertTriangle,
      category: "Exit"
    },
    {
      name: "Monthly Payroll Alert",
      description: "Payroll processing reminders",
      icon: Calendar,
      category: "Payroll"
    },
    {
      name: "Leave Approval Chain",
      description: "Automated leave approval workflow",
      icon: CheckCircle,
      category: "Leave"
    },
    {
      name: "Performance Review Cycle",
      description: "Quarterly performance reviews",
      icon: FileText,
      category: "Performance"
    },
    {
      name: "Document Generation",
      description: "Auto-generate HR documents",
      icon: FileText,
      category: "Documents"
    }
  ];

  const handleCreateWorkflow = () => {
    if (!newWorkflow.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Workflow name is required",
        variant: "destructive",
      });
      return;
    }

    const workflow: WorkflowType = {
      id: Date.now(),
      name: newWorkflow.name,
      description: newWorkflow.description,
      status: newWorkflow.status,
      triggers: 0,
      lastRun: "Never",
      category: newWorkflow.category,
      conditions: newWorkflow.conditions.filter(c => c.trim()),
      actions: newWorkflow.actions.filter(a => a.trim())
    };

    setWorkflows(prev => [...prev, workflow]);
    setIsCreateDialogOpen(false);
    setNewWorkflow({
      name: "",
      description: "",
      category: "",
      conditions: [""],
      actions: [""],
      status: "draft"
    });

    toast({
      title: "Workflow Created",
      description: `"${workflow.name}" has been created successfully.`,
    });
  };

  const handleEditWorkflow = (workflow: WorkflowType) => {
    setSelectedWorkflow(workflow);
    setIsEditDialogOpen(true);
  };

  const handleDeleteWorkflow = (id: number) => {
    setWorkflows(prev => prev.filter(w => w.id !== id));
    toast({
      title: "Workflow Deleted",
      description: "Workflow has been removed successfully.",
    });
  };

  const handleToggleWorkflow = (id: number) => {
    setWorkflows(prev => prev.map(w => 
      w.id === id 
        ? { ...w, status: w.status === 'active' ? 'inactive' : 'active' as const }
        : w
    ));
    
    const workflow = workflows.find(w => w.id === id);
    toast({
      title: "Workflow Updated",
      description: `"${workflow?.name}" is now ${workflow?.status === 'active' ? 'inactive' : 'active'}.`,
    });
  };

  const handleRunWorkflow = (id: number) => {
    const workflow = workflows.find(w => w.id === id);
    setWorkflows(prev => prev.map(w => 
      w.id === id 
        ? { ...w, lastRun: "Just now", triggers: w.triggers + 1 }
        : w
    ));
    
    toast({
      title: "Workflow Triggered",
      description: `"${workflow?.name}" is now running...`,
    });
  };

  const handleTemplateCreate = (template: any) => {
    setNewWorkflow({
      name: template.name,
      description: template.description,
      category: template.category,
      conditions: [""],
      actions: [""],
      status: "draft"
    });
    setIsCreateDialogOpen(true);
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

  return (
    <div className="space-y-6">
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Workflow className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl">Workflow Management</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Workflow
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Workflow</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Workflow Name</Label>
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
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateWorkflow} className="bg-gradient-to-r from-green-600 to-blue-600">
                      Create Workflow
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button variant="outline">
                <Search className="w-4 h-4 mr-2" />
                View Logs
              </Button>
              <Button variant="outline">
                <Lightbulb className="w-4 h-4 mr-2" />
                AI Suggest
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Active Workflows</h3>
            <div className="grid gap-4">
              {workflows.map((workflow) => (
                <div key={workflow.id} className="flex items-center justify-between p-4 border-2 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 rounded-full ${
                      workflow.status === 'active' ? 'bg-green-500' : 
                      workflow.status === 'inactive' ? 'bg-gray-400' : 'bg-yellow-500'
                    }`} />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-lg">{workflow.name}</h4>
                        <Badge variant="outline">{workflow.category}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{workflow.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {workflow.triggers} triggers • Last run: {workflow.lastRun}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={workflow.status === 'active'}
                      onCheckedChange={() => handleToggleWorkflow(workflow.id)}
                    />
                    <Button variant="outline" size="sm" onClick={() => handleEditWorkflow(workflow)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleRunWorkflow(workflow.id)}
                      disabled={workflow.status !== 'active'}
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDeleteWorkflow(workflow.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-4">Workflow Templates</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {workflowTemplates.map((template, index) => (
                  <Card 
                    key={index} 
                    className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-300 bg-gradient-to-br from-white to-gray-50"
                    onClick={() => handleTemplateCreate(template)}
                  >
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg inline-block mb-3">
                          <template.icon className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="font-medium text-lg mb-2">{template.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                        <Badge variant="secondary">{template.category}</Badge>
                        <p className="text-xs text-blue-600 mt-2 font-medium">Click to create</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkflowDesigner;
