import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import GeneralSettings from "@/components/settings/GeneralSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import PrivacySettings from "@/components/settings/PrivacySettings";
import SecurityDashboard from "@/components/settings/SecurityDashboard";
import ThirdPartyIntegrations from "@/components/settings/ThirdPartyIntegrations";
import WorkflowDesigner from "@/components/settings/WorkflowDesigner";
import EnhancedWorkflowDesigner from "@/components/settings/EnhancedWorkflowDesigner";
import AutomationOrchestration from "@/components/settings/AutomationOrchestration";
import ApiKeysManager from "@/components/settings/ApiKeysManager";
import AIAutomation from "@/components/settings/AIAutomation";
import AIFAQCategories from "@/components/settings/AIFAQCategories";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  const settingsCategories = [
    {
      id: "general",
      label: "General",
      description: "Basic application settings and preferences"
    },
    {
      id: "notifications",
      label: "Notifications",
      description: "Manage email and push notification preferences"
    },
    {
      id: "privacy",
      label: "Privacy",
      description: "Control data sharing and privacy settings"
    },
    {
      id: "security",
      label: "Security",
      description: "Security monitoring and access controls",
      badge: "Enhanced"
    },
    {
      id: "integrations",
      label: "Integrations",
      description: "Third-party service connections"
    },
    {
      id: "workflow",
      label: "Workflow Designer",
      description: "Create and manage automated workflows",
      badge: "New"
    },
    {
      id: "enhanced-workflow",
      label: "Enhanced Workflow",
      description: "Advanced workflow automation features",
      badge: "Pro"
    },
    {
      id: "automation",
      label: "Automation Hub",
      description: "Orchestrate complex automation sequences",
      badge: "Enterprise"
    },
    {
      id: "api-keys",
      label: "API Keys",
      description: "Manage API keys and service credentials"
    },
    {
      id: "ai-automation",
      label: "AI Automation",
      description: "Configure AI-powered automation features",
      badge: "AI"
    },
    {
      id: "ai-faq",
      label: "AI FAQ Management",
      description: "Manage AI chatbot FAQ categories and responses",
      badge: "AI"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-2">
            Configure your HR Suite preferences and system settings
          </p>
        </div>
        <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
          Save All Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <TabsList className="flex flex-col h-auto w-full space-y-1 bg-transparent p-2">
                {settingsCategories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="w-full justify-start text-left p-3 h-auto data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <div className="flex flex-col items-start space-y-1 w-full">
                      <div className="flex items-center gap-2 w-full">
                        <span className="font-medium">{category.label}</span>
                        {category.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {category.badge}
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground text-left">
                        {category.description}
                      </span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>
            </CardContent>
          </Card>

          <div className="lg:col-span-3">
            <TabsContent value="general" className="mt-0">
              <GeneralSettings onSave={handleSave} />
            </TabsContent>

            <TabsContent value="notifications" className="mt-0">
              <NotificationSettings onSave={handleSave} />
            </TabsContent>

            <TabsContent value="privacy" className="mt-0">
              <PrivacySettings onSave={handleSave} />
            </TabsContent>

            <TabsContent value="security" className="mt-0">
              <SecurityDashboard />
            </TabsContent>

            <TabsContent value="integrations" className="mt-0">
              <ThirdPartyIntegrations onSave={handleSave} />
            </TabsContent>

            <TabsContent value="workflow" className="mt-0">
              <WorkflowDesigner onSave={handleSave} />
            </TabsContent>

            <TabsContent value="enhanced-workflow" className="mt-0">
              <EnhancedWorkflowDesigner onSave={handleSave} />
            </TabsContent>

            <TabsContent value="automation" className="mt-0">
              <AutomationOrchestration onSave={handleSave} />
            </TabsContent>

            <TabsContent value="api-keys" className="mt-0">
              <ApiKeysManager onSave={handleSave} />
            </TabsContent>

            <TabsContent value="ai-automation" className="mt-0">
              <AIAutomation />
            </TabsContent>

            <TabsContent value="ai-faq" className="mt-0">
              <AIFAQCategories />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default Settings;
