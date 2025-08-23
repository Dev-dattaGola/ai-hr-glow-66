
import { toast } from "@/hooks/use-toast";

export interface Workflow {
  id: string;
  name: string;
  description: string;
  category: string;
  status: "active" | "inactive" | "draft";
  triggers: number;
  lastRun: string;
  conditions: string[];
  actions: string[];
  createdAt: string;
  updatedAt: string;
  platform?: 'n8n' | 'make' | 'zapier';
  externalId?: string;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  conditions: string[];
  actions: string[];
  icon: string;
}

class WorkflowApiService {
  private storageKey = 'hr_workflows';
  private templatesKey = 'hr_workflow_templates';

  // Initialize with default templates
  constructor() {
    this.initializeTemplates();
  }

  private initializeTemplates() {
    const existingTemplates = localStorage.getItem(this.templatesKey);
    if (!existingTemplates) {
      const defaultTemplates: WorkflowTemplate[] = [
        {
          id: 'template-1',
          name: 'Employee Onboarding',
          description: 'Complete onboarding workflow for new employees',
          category: 'Onboarding',
          icon: 'Users',
          conditions: ['Employee status = "New"', 'Start date = Today'],
          actions: ['Send welcome email', 'Create IT accounts', 'Schedule orientation', 'Assign buddy']
        },
        {
          id: 'template-2',
          name: 'Exit Process',
          description: 'Employee exit procedures and offboarding',
          category: 'Exit',
          icon: 'AlertTriangle',
          conditions: ['Employee status = "Resigned"', 'Last working day <= Today + 7'],
          actions: ['Revoke access', 'Collect equipment', 'Schedule exit interview', 'Update payroll']
        },
        {
          id: 'template-3',
          name: 'Monthly Payroll Alert',
          description: 'Automated payroll processing reminders',
          category: 'Payroll',
          icon: 'Calendar',
          conditions: ['Date = Last day of month', 'Payroll status = "Pending"'],
          actions: ['Generate payroll report', 'Notify HR team', 'Update finance system']
        },
        {
          id: 'template-4',
          name: 'Leave Approval Chain',
          description: 'Automated leave approval workflow',
          category: 'Leave',
          icon: 'CheckCircle',
          conditions: ['Leave request submitted', 'Leave days > 3'],
          actions: ['Notify manager', 'Check leave balance', 'Send approval request']
        }
      ];
      localStorage.setItem(this.templatesKey, JSON.stringify(defaultTemplates));
    }
  }

  async createWorkflow(workflow: Omit<Workflow, 'id' | 'createdAt' | 'updatedAt' | 'triggers' | 'lastRun'>): Promise<Workflow> {
    const workflows = this.getWorkflows();
    const newWorkflow: Workflow = {
      ...workflow,
      id: Date.now().toString(),
      triggers: 0,
      lastRun: 'Never',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    workflows.push(newWorkflow);
    localStorage.setItem(this.storageKey, JSON.stringify(workflows));

    // Simulate external platform creation
    await this.createExternalWorkflow(newWorkflow);

    toast({
      title: "Workflow Created",
      description: `"${newWorkflow.name}" has been created and synced to automation platform.`,
    });

    return newWorkflow;
  }

  getWorkflows(): Workflow[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  async updateWorkflow(id: string, updates: Partial<Workflow>): Promise<Workflow | null> {
    const workflows = this.getWorkflows();
    const index = workflows.findIndex(w => w.id === id);
    
    if (index === -1) return null;

    workflows[index] = {
      ...workflows[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem(this.storageKey, JSON.stringify(workflows));

    // Simulate external platform update
    await this.updateExternalWorkflow(workflows[index]);

    return workflows[index];
  }

  async deleteWorkflow(id: string): Promise<boolean> {
    const workflows = this.getWorkflows();
    const workflow = workflows.find(w => w.id === id);
    
    if (!workflow) return false;

    const filteredWorkflows = workflows.filter(w => w.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(filteredWorkflows));

    // Simulate external platform deletion
    await this.deleteExternalWorkflow(workflow);

    return true;
  }

  async runWorkflow(id: string): Promise<boolean> {
    const workflows = this.getWorkflows();
    const workflowIndex = workflows.findIndex(w => w.id === id);
    
    if (workflowIndex === -1) return false;

    workflows[workflowIndex].triggers += 1;
    workflows[workflowIndex].lastRun = 'Just now';
    workflows[workflowIndex].updatedAt = new Date().toISOString();

    localStorage.setItem(this.storageKey, JSON.stringify(workflows));

    // Simulate external platform execution
    await this.executeExternalWorkflow(workflows[workflowIndex]);

    return true;
  }

  getWorkflowTemplates(): WorkflowTemplate[] {
    const data = localStorage.getItem(this.templatesKey);
    return data ? JSON.parse(data) : [];
  }

  async generateAIWorkflow(prompt: string): Promise<Workflow> {
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const aiGeneratedWorkflow: Workflow = {
      id: Date.now().toString(),
      name: `AI Generated: ${prompt}`,
      description: `Intelligent workflow generated based on: "${prompt}"`,
      category: 'AI Generated',
      status: 'draft',
      triggers: 0,
      lastRun: 'Never',
      conditions: [
        `Smart condition based on: ${prompt}`,
        'AI pattern detection enabled'
      ],
      actions: [
        `Automated action for: ${prompt}`,
        'Send AI insights notification',
        'Update analytics dashboard'
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const workflows = this.getWorkflows();
    workflows.push(aiGeneratedWorkflow);
    localStorage.setItem(this.storageKey, JSON.stringify(workflows));

    toast({
      title: "AI Workflow Generated",
      description: `Smart workflow created based on your requirements.`,
    });

    return aiGeneratedWorkflow;
  }

  // Simulate external platform integrations
  private async createExternalWorkflow(workflow: Workflow): Promise<void> {
    const delay = Math.random() * 1000 + 500; // 500-1500ms delay
    await new Promise(resolve => setTimeout(resolve, delay));

    // Simulate different platform responses
    const platforms = ['n8n', 'make', 'zapier'] as const;
    const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];
    
    console.log(`Creating workflow on ${randomPlatform}:`, {
      name: workflow.name,
      conditions: workflow.conditions,
      actions: workflow.actions
    });

    // Update workflow with external ID
    await this.updateWorkflow(workflow.id, {
      platform: randomPlatform,
      externalId: `${randomPlatform}_${Date.now()}`
    });
  }

  private async updateExternalWorkflow(workflow: Workflow): Promise<void> {
    if (!workflow.platform || !workflow.externalId) return;
    
    const delay = Math.random() * 500 + 200;
    await new Promise(resolve => setTimeout(resolve, delay));
    
    console.log(`Updating workflow on ${workflow.platform}:`, workflow.externalId);
  }

  private async deleteExternalWorkflow(workflow: Workflow): Promise<void> {
    if (!workflow.platform || !workflow.externalId) return;
    
    const delay = Math.random() * 500 + 200;
    await new Promise(resolve => setTimeout(resolve, delay));
    
    console.log(`Deleting workflow on ${workflow.platform}:`, workflow.externalId);
  }

  private async executeExternalWorkflow(workflow: Workflow): Promise<void> {
    if (!workflow.platform || !workflow.externalId) return;
    
    const delay = Math.random() * 1000 + 500;
    await new Promise(resolve => setTimeout(resolve, delay));
    
    console.log(`Executing workflow on ${workflow.platform}:`, workflow.externalId);
  }
}

export const workflowApi = new WorkflowApiService();
