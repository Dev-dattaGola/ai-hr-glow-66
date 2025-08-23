
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { 
  Key, 
  Plus, 
  Eye, 
  EyeOff, 
  Copy, 
  Trash2, 
  Edit3,
  Calendar,
  Shield,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  service: string;
  permissions: string[];
  createdAt: string;
  lastUsed: string;
  status: "active" | "inactive" | "expired";
  expiresAt?: string;
}

const ApiKeysManager = () => {
  const { toast } = useToast();
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: "1",
      name: "Production API Key",
      key: "pk_live_51H7q2j2eZvKYlo2C...",
      service: "Stripe",
      permissions: ["read", "write"],
      createdAt: "2024-01-15",
      lastUsed: "2024-08-07",
      status: "active",
      expiresAt: "2025-01-15"
    },
    {
      id: "2",
      name: "Development Key",
      key: "sk_test_26PHem9AhJZvU37NdxM...",
      service: "OpenAI",
      permissions: ["read"],
      createdAt: "2024-03-10",
      lastUsed: "2024-08-05",
      status: "active"
    },
    {
      id: "3",
      name: "Legacy Integration",
      key: "ak_prod_wh_74jK9s8Nm3...",
      service: "Webhook",
      permissions: ["read", "write", "delete"],
      createdAt: "2023-12-01",
      lastUsed: "2024-06-20",
      status: "expired",
      expiresAt: "2024-06-30"
    }
  ]);

  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState<ApiKey | null>(null);

  const form = useForm({
    defaultValues: {
      name: "",
      service: "",
      permissions: [] as string[],
      expiresAt: "",
      description: ""
    }
  });

  const toggleKeyVisibility = (keyId: string) => {
    setShowKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const copyToClipboard = (text: string, keyName: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${keyName} copied to clipboard`,
    });
  };

  const handleCreateKey = (data: any) => {
    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: data.name,
      key: `ak_${Math.random().toString(36).substring(2, 15)}_${Math.random().toString(36).substring(2, 15)}`,
      service: data.service,
      permissions: data.permissions || ["read"],
      createdAt: new Date().toISOString().split('T')[0],
      lastUsed: "Never",
      status: "active",
      expiresAt: data.expiresAt || undefined
    };

    setApiKeys(prev => [newKey, ...prev]);
    setIsCreateModalOpen(false);
    form.reset();
    
    toast({
      title: "API Key Created",
      description: `${data.name} has been successfully created`,
    });
  };

  const handleDeleteKey = (keyId: string) => {
    setApiKeys(prev => prev.filter(key => key.id !== keyId));
    toast({
      title: "API Key Deleted",
      description: "The API key has been permanently removed",
    });
  };

  const handleToggleStatus = (keyId: string) => {
    setApiKeys(prev => prev.map(key => 
      key.id === keyId 
        ? { ...key, status: key.status === "active" ? "inactive" : "active" }
        : key
    ));
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      inactive: { color: "bg-gray-100 text-gray-800", icon: AlertTriangle },
      expired: { color: "bg-red-100 text-red-800", icon: AlertTriangle }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;
    
    return (
      <Badge className={`${config.color} border-0`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const maskApiKey = (key: string) => {
    return key.substring(0, 8) + "..." + key.substring(key.length - 4);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Key className="w-6 h-6" />
            API Keys Management
          </h2>
          <p className="text-gray-600">Manage your API keys and integrations securely</p>
        </div>
        
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Create New Key
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New API Key</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleCreateKey)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Key Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Production API Key" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="stripe">Stripe</SelectItem>
                          <SelectItem value="openai">OpenAI</SelectItem>
                          <SelectItem value="webhook">Webhook</SelectItem>
                          <SelectItem value="email">Email Service</SelectItem>
                          <SelectItem value="sms">SMS Service</SelectItem>
                          <SelectItem value="custom">Custom Service</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expiresAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiration Date (Optional)</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Brief description of this API key usage..." {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Key</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {apiKeys.map((apiKey) => (
          <Card key={apiKey.id} className="border-l-4 border-l-blue-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{apiKey.name}</CardTitle>
                    <p className="text-sm text-gray-600">{apiKey.service} Integration</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(apiKey.status)}
                  <Switch
                    checked={apiKey.status === "active"}
                    onCheckedChange={() => handleToggleStatus(apiKey.id)}
                    disabled={apiKey.status === "expired"}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <code className="flex-1 font-mono text-sm">
                    {showKeys[apiKey.id] ? apiKey.key : maskApiKey(apiKey.key)}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleKeyVisibility(apiKey.id)}
                  >
                    {showKeys[apiKey.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(apiKey.key, apiKey.name)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Created</p>
                    <p className="font-medium flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {apiKey.createdAt}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Last Used</p>
                    <p className="font-medium">{apiKey.lastUsed}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Permissions</p>
                    <div className="flex flex-wrap gap-1">
                      {apiKey.permissions.map((permission) => (
                        <Badge key={permission} variant="outline" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600">Expires</p>
                    <p className="font-medium">{apiKey.expiresAt || "Never"}</p>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingKey(apiKey)}
                  >
                    <Edit3 className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteKey(apiKey.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {apiKeys.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Key className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2">No API Keys</h3>
            <p className="text-gray-600 mb-4">Create your first API key to get started</p>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create API Key
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ApiKeysManager;
