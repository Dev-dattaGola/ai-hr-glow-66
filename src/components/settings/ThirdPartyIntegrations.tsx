
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
  Link,
  Settings,
  RefreshCw,
  DollarSign,
  MessageSquare,
  Upload,
  Calendar,
  FileText,
  CheckCircle,
  Shield,
  Mail,
  Users,
  BookOpen,
  BarChart3,
  Clock,
  Plus,
  AlertCircle,
  ExternalLink,
  Key,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ThirdPartyIntegrationsProps {
  onSave: () => void;
}

interface Integration {
  id: string;
  name: string;
  description: string;
  status: "connected" | "disconnected" | "error";
  category: string;
  icon: any;
  features: string[];
  setupUrl?: string;
  apiKeyRequired: boolean;
  webhookUrl?: string;
  lastSync?: string;
}

const ThirdPartyIntegrations = ({ onSave }: ThirdPartyIntegrationsProps) => {
  const { toast } = useToast();
  
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "razorpay",
      name: "RazorpayX",
      description: "Payroll and salary disbursement",
      status: "disconnected",
      category: "Payroll",
      icon: DollarSign,
      features: ["Salary processing", "Tax calculations", "Direct deposits"],
      apiKeyRequired: true,
      setupUrl: "https://razorpay.com"
    },
    {
      id: "zoho-payroll",
      name: "Zoho Payroll",
      description: "Complete payroll management",
      status: "connected",
      category: "Payroll",
      icon: DollarSign,
      features: ["Payroll automation", "Compliance", "Reports"],
      apiKeyRequired: true,
      lastSync: "2 hours ago"
    },
    {
      id: "google-meet",
      name: "Google Meet",
      description: "Video conferencing for interviews",
      status: "connected",
      category: "Communication",
      icon: MessageSquare,
      features: ["Interview scheduling", "Meeting recordings", "Calendar sync"],
      apiKeyRequired: true,
      lastSync: "1 hour ago"
    },
    {
      id: "microsoft-teams",
      name: "Microsoft Teams",
      description: "Team collaboration and meetings",
      status: "disconnected",
      category: "Communication",
      icon: MessageSquare,
      features: ["Team chat", "Video calls", "File sharing"],
      apiKeyRequired: true
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      description: "Job posting and recruitment",
      status: "connected",
      category: "Job Boards",
      icon: Users,
      features: ["Job posting", "Candidate sourcing", "Company branding"],
      apiKeyRequired: true,
      lastSync: "30 minutes ago"
    },
    {
      id: "naukri",
      name: "Naukri.com",
      description: "India's leading job portal",
      status: "disconnected",
      category: "Job Boards",
      icon: Users,
      features: ["Job posting", "Resume database", "Candidate matching"],
      apiKeyRequired: true
    },
    {
      id: "google-calendar",
      name: "Google Calendar",
      description: "Calendar and scheduling integration",
      status: "connected",
      category: "Calendar",
      icon: Calendar,
      features: ["Interview scheduling", "Leave tracking", "Meeting sync"],
      apiKeyRequired: true,
      lastSync: "15 minutes ago"
    },
    {
      id: "google-drive",
      name: "Google Drive",
      description: "Document storage and sharing",
      status: "connected",
      category: "Storage",
      icon: FileText,
      features: ["Document storage", "File sharing", "Backup"],
      apiKeyRequired: true,
      lastSync: "5 minutes ago"
    },
    {
      id: "docusign",
      name: "DocuSign",
      description: "Electronic signature solution",
      status: "connected",
      category: "eSignature",
      icon: CheckCircle,
      features: ["Document signing", "Digital contracts", "Audit trails"],
      apiKeyRequired: true,
      lastSync: "1 day ago"
    },
    {
      id: "slack",
      name: "Slack",
      description: "Team communication platform",
      status: "connected",
      category: "Messaging",
      icon: MessageSquare,
      features: ["Team chat", "Notifications", "Bot integration"],
      apiKeyRequired: true,
      lastSync: "Just now"
    },
    {
      id: "linkedin-learning",
      name: "LinkedIn Learning",
      description: "Professional development courses",
      status: "connected",
      category: "LMS",
      icon: BookOpen,
      features: ["Course assignments", "Progress tracking", "Skill assessments"],
      apiKeyRequired: true,
      lastSync: "2 hours ago"
    },
    {
      id: "tally",
      name: "Tally",
      description: "Accounting and finance software",
      status: "disconnected",
      category: "Finance",
      icon: BarChart3,
      features: ["Payroll sync", "Expense tracking", "Financial reports"],
      apiKeyRequired: true
    }
  ]);

  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  
  const categories = {
    "Payroll": { icon: DollarSign, color: "from-green-500 to-emerald-600" },
    "Communication": { icon: MessageSquare, color: "from-blue-500 to-cyan-600" },
    "Job Boards": { icon: Users, color: "from-purple-500 to-violet-600" },
    "Calendar": { icon: Calendar, color: "from-orange-500 to-red-600" },
    "Storage": { icon: FileText, color: "from-gray-500 to-slate-600" },
    "eSignature": { icon: CheckCircle, color: "from-green-500 to-teal-600" },
    "Messaging": { icon: MessageSquare, color: "from-indigo-500 to-blue-600" },
    "LMS": { icon: BookOpen, color: "from-yellow-500 to-amber-600" },
    "Finance": { icon: BarChart3, color: "from-pink-500 to-rose-600" }
  };

  const handleToggleIntegration = (integrationId: string) => {
    const integration = integrations.find(i => i.id === integrationId);
    if (!integration) return;

    if (integration.status === "disconnected") {
      if (integration.apiKeyRequired) {
        setSelectedIntegration(integration);
        setIsConfigDialogOpen(true);
      } else {
        // Direct connection for integrations that don't need API keys
        connectIntegration(integrationId);
      }
    } else {
      disconnectIntegration(integrationId);
    }
  };

  const connectIntegration = (integrationId: string, apiKeyValue?: string, webhookValue?: string) => {
    setIntegrations(prev => prev.map(integration =>
      integration.id === integrationId
        ? {
            ...integration,
            status: "connected" as const,
            lastSync: "Just now",
            ...(apiKeyValue && { apiKey: apiKeyValue }),
            ...(webhookValue && { webhookUrl: webhookValue })
          }
        : integration
    ));

    const integration = integrations.find(i => i.id === integrationId);
    toast({
      title: "Integration Connected",
      description: `${integration?.name} has been connected successfully.`,
    });
  };

  const disconnectIntegration = (integrationId: string) => {
    setIntegrations(prev => prev.map(integration =>
      integration.id === integrationId
        ? { ...integration, status: "disconnected" as const, lastSync: undefined }
        : integration
    ));

    const integration = integrations.find(i => i.id === integrationId);
    toast({
      title: "Integration Disconnected",
      description: `${integration?.name} has been disconnected.`,
    });
  };

  const handleConfigSave = () => {
    if (!selectedIntegration) return;

    if (selectedIntegration.apiKeyRequired && !apiKey.trim()) {
      toast({
        title: "Configuration Error",
        description: "API Key is required for this integration.",
        variant: "destructive",
      });
      return;
    }

    connectIntegration(selectedIntegration.id, apiKey, webhookUrl);
    setIsConfigDialogOpen(false);
    setApiKey("");
    setWebhookUrl("");
    setSelectedIntegration(null);
  };

  const handleSync = (integrationId: string) => {
    setIntegrations(prev => prev.map(integration =>
      integration.id === integrationId && integration.status === "connected"
        ? { ...integration, lastSync: "Just now" }
        : integration
    ));

    const integration = integrations.find(i => i.id === integrationId);
    toast({
      title: "Sync Completed",
      description: `${integration?.name} data has been synchronized.`,
    });
  };

  const handleTestConnection = (integration: Integration) => {
    toast({
      title: "Testing Connection",
      description: `Testing connection to ${integration.name}...`,
    });

    // Simulate test
    setTimeout(() => {
      toast({
        title: "Connection Test",
        description: `Connection to ${integration.name} successful!`,
      });
    }, 2000);
  };

  const groupedIntegrations = Object.entries(
    integrations.reduce((acc, integration) => {
      if (!acc[integration.category]) {
        acc[integration.category] = [];
      }
      acc[integration.category].push(integration);
      return acc;
    }, {} as Record<string, Integration[]>)
  );

  return (
    <div className="space-y-6">
      <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg">
              <Link className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl">Third-Party Integrations</span>
          </CardTitle>
          <p className="text-gray-600">Connect your HR system with external tools and services</p>
        </CardHeader>
      </Card>

      <div className="grid gap-6">
        {groupedIntegrations.map(([category, categoryIntegrations]) => {
          const categoryConfig = categories[category as keyof typeof categories];
          return (
            <Card key={category} className="border-2 hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 bg-gradient-to-r ${categoryConfig.color} rounded-lg`}>
                    <categoryConfig.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{category}</CardTitle>
                    <p className="text-sm text-gray-600">
                      {categoryIntegrations.filter(i => i.status === "connected").length} of {categoryIntegrations.length} connected
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {categoryIntegrations.map((integration) => (
                    <div key={integration.id} className="flex items-center justify-between p-4 border-2 rounded-lg bg-white hover:shadow-sm transition-all">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <integration.icon className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-lg">{integration.name}</h4>
                            <Badge 
                              variant={integration.status === "connected" ? "default" : "secondary"}
                              className={integration.status === "connected" ? "bg-green-100 text-green-800" : ""}
                            >
                              {integration.status === "connected" ? "Connected" : "Disconnected"}
                            </Badge>
                            {integration.status === "error" && (
                              <Badge variant="destructive">Error</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{integration.description}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-gray-500">Features:</span>
                            {integration.features.slice(0, 2).map((feature, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">{feature}</Badge>
                            ))}
                            {integration.features.length > 2 && (
                              <Badge variant="outline" className="text-xs">+{integration.features.length - 2} more</Badge>
                            )}
                          </div>
                          {integration.lastSync && (
                            <p className="text-xs text-gray-500 mt-1">Last sync: {integration.lastSync}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={integration.status === "connected"}
                          onCheckedChange={() => handleToggleIntegration(integration.id)}
                        />
                        {integration.status === "connected" && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleSync(integration.id)}
                            >
                              <RefreshCw className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleTestConnection(integration)}
                            >
                              <Zap className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedIntegration(integration);
                            setIsConfigDialogOpen(true);
                          }}
                        >
                          <Settings className="w-4 h-4" />
                        </Button>
                        {integration.setupUrl && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => window.open(integration.setupUrl, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Configuration Dialog */}
      <Dialog open={isConfigDialogOpen} onOpenChange={setIsConfigDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              Configure {selectedIntegration?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              {selectedIntegration && (
                <selectedIntegration.icon className="w-6 h-6 text-blue-600" />
              )}
              <div>
                <h4 className="font-medium">{selectedIntegration?.name}</h4>
                <p className="text-sm text-gray-600">{selectedIntegration?.description}</p>
              </div>
            </div>

            {selectedIntegration?.apiKeyRequired && (
              <div>
                <Label className="flex items-center space-x-2">
                  <Key className="w-4 h-4" />
                  <span>API Key</span>
                </Label>
                <Input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Get your API key from {selectedIntegration?.name} developer settings
                </p>
              </div>
            )}

            <div>
              <Label>Webhook URL (Optional)</Label>
              <Input
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://your-webhook-url.com"
              />
              <p className="text-xs text-gray-500 mt-1">
                Used for real-time data synchronization
              </p>
            </div>

            {selectedIntegration?.features && (
              <div>
                <Label>Available Features</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedIntegration.features.map((feature, idx) => (
                    <Badge key={idx} variant="outline">{feature}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsConfigDialogOpen(false);
                setApiKey("");
                setWebhookUrl("");
                setSelectedIntegration(null);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleConfigSave} className="bg-gradient-to-r from-purple-600 to-blue-600">
              {selectedIntegration?.status === "connected" ? "Update" : "Connect"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ThirdPartyIntegrations;
