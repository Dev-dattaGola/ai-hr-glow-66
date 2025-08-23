
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  Zap, 
  Users, 
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  Smartphone,
  Key,
  Globe,
  Activity,
  Bell
} from "lucide-react";

interface SecuritySetting {
  id: string;
  name: string;
  description: string;
  status: "enabled" | "disabled" | "warning";
  lastUpdated: string;
  icon: any;
}

interface Session {
  id: string;
  device: string;
  location: string;
  ipAddress: string;
  lastActive: string;
  status: "active" | "expired";
  browser: string;
}

const SecurityDashboard = () => {
  const { toast } = useToast();
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);

  const [securitySettings, setSecuritySettings] = useState<SecuritySetting[]>([
    {
      id: "2fa",
      name: "Two-Factor Authentication",
      description: "Add an extra layer of security to your account",
      status: "disabled",
      lastUpdated: "Never",
      icon: Smartphone
    },
    {
      id: "password",
      name: "Password Policy",
      description: "Configure password requirements and strength",
      status: "enabled",
      lastUpdated: "2024-08-01",
      icon: Lock
    },
    {
      id: "sessions",
      name: "Session Management",
      description: "Monitor and control active login sessions",
      status: "enabled",
      lastUpdated: "2024-08-07",
      icon: Globe
    },
    {
      id: "login-alerts",
      name: "Login Alerts",
      description: "Get notified of suspicious login attempts",
      status: "warning",
      lastUpdated: "2024-07-15",
      icon: Bell
    }
  ]);

  const [sessions, setSessions] = useState<Session[]>([
    {
      id: "1",
      device: "MacBook Pro",
      location: "New York, US",
      ipAddress: "192.168.1.100",
      lastActive: "2024-08-07 14:30",
      status: "active",
      browser: "Chrome 118"
    },
    {
      id: "2",
      device: "iPhone 15",
      location: "New York, US",
      ipAddress: "192.168.1.101",
      lastActive: "2024-08-07 12:15",
      status: "active",
      browser: "Safari Mobile"
    },
    {
      id: "3",
      device: "Windows Desktop",
      location: "Los Angeles, US",
      ipAddress: "192.168.2.50",
      lastActive: "2024-08-05 09:45",
      status: "expired",
      browser: "Edge 118"
    }
  ]);

  const form2FA = useForm({
    defaultValues: {
      phoneNumber: "",
      backupCodes: true,
      authenticatorApp: false
    }
  });

  const passwordForm = useForm({
    defaultValues: {
      minLength: "8",
      requireUppercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      passwordExpiry: "90",
      preventReuse: "5"
    }
  });

  const handle2FASetup = (data: any) => {
    setIsTwoFactorEnabled(true);
    setSecuritySettings(prev => prev.map(setting => 
      setting.id === "2fa" 
        ? { ...setting, status: "enabled", lastUpdated: new Date().toISOString().split('T')[0] }
        : setting
    ));
    
    setIs2FAModalOpen(false);
    toast({
      title: "2FA Enabled",
      description: "Two-factor authentication has been successfully enabled",
    });
  };

  const handlePasswordPolicy = (data: any) => {
    setIsPasswordModalOpen(false);
    toast({
      title: "Password Policy Updated",
      description: "Password requirements have been updated successfully",
    });
  };

  const handleRevokeSession = (sessionId: string) => {
    setSessions(prev => prev.map(session => 
      session.id === sessionId 
        ? { ...session, status: "expired" }
        : session
    ));
    
    toast({
      title: "Session Revoked",
      description: "The selected session has been terminated",
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      enabled: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      disabled: { color: "bg-red-100 text-red-800", icon: AlertTriangle },
      warning: { color: "bg-yellow-100 text-yellow-800", icon: AlertTriangle }
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

  const getOverallSecurityScore = () => {
    const enabled = securitySettings.filter(s => s.status === "enabled").length;
    const total = securitySettings.length;
    return Math.round((enabled / total) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Security Overview</CardTitle>
                <p className="text-gray-600">Monitor and configure your account security</p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{getOverallSecurityScore()}%</div>
              <div className="text-sm text-gray-600">Security Score</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Security Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {securitySettings.map((setting) => {
          const Icon = setting.icon;
          return (
            <Card key={setting.id} className="border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{setting.name}</CardTitle>
                      <p className="text-sm text-gray-600">{setting.description}</p>
                    </div>
                  </div>
                  {getStatusBadge(setting.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Last updated: {setting.lastUpdated}
                  </div>
                  
                  {setting.id === "2fa" && (
                    <Dialog open={is2FAModalOpen} onOpenChange={setIs2FAModalOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <Shield className="w-4 h-4 mr-2" />
                          {isTwoFactorEnabled ? "Manage" : "Enable"} 2FA
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Setup Two-Factor Authentication</DialogTitle>
                        </DialogHeader>
                        <Form {...form2FA}>
                          <form onSubmit={form2FA.handleSubmit(handle2FASetup)} className="space-y-4">
                            <FormField
                              control={form2FA.control}
                              name="phoneNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone Number</FormLabel>
                                  <FormControl>
                                    <Input placeholder="+1 (555) 123-4567" {...field} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form2FA.control}
                              name="authenticatorApp"
                              render={({ field }) => (
                                <FormItem className="flex items-center justify-between">
                                  <FormLabel>Use Authenticator App</FormLabel>
                                  <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form2FA.control}
                              name="backupCodes"
                              render={({ field }) => (
                                <FormItem className="flex items-center justify-between">
                                  <FormLabel>Generate Backup Codes</FormLabel>
                                  <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />

                            <div className="flex justify-end space-x-2">
                              <Button type="button" variant="outline" onClick={() => setIs2FAModalOpen(false)}>
                                Cancel
                              </Button>
                              <Button type="submit">Enable 2FA</Button>
                            </div>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                  )}

                  {setting.id === "password" && (
                    <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          View Policy
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Password Policy Configuration</DialogTitle>
                        </DialogHeader>
                        <Form {...passwordForm}>
                          <form onSubmit={passwordForm.handleSubmit(handlePasswordPolicy)} className="space-y-4">
                            <FormField
                              control={passwordForm.control}
                              name="minLength"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Minimum Password Length</FormLabel>
                                  <FormControl>
                                    <Input type="number" {...field} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={passwordForm.control}
                              name="requireUppercase"
                              render={({ field }) => (
                                <FormItem className="flex items-center justify-between">
                                  <FormLabel>Require Uppercase Letters</FormLabel>
                                  <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={passwordForm.control}
                              name="requireNumbers"
                              render={({ field }) => (
                                <FormItem className="flex items-center justify-between">
                                  <FormLabel>Require Numbers</FormLabel>
                                  <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={passwordForm.control}
                              name="requireSpecialChars"
                              render={({ field }) => (
                                <FormItem className="flex items-center justify-between">
                                  <FormLabel>Require Special Characters</FormLabel>
                                  <FormControl>
                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={passwordForm.control}
                              name="passwordExpiry"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Password Expiry (Days)</FormLabel>
                                  <FormControl>
                                    <Input type="number" {...field} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />

                            <div className="flex justify-end space-x-2">
                              <Button type="button" variant="outline" onClick={() => setIsPasswordModalOpen(false)}>
                                Cancel
                              </Button>
                              <Button type="submit">Update Policy</Button>
                            </div>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                  )}

                  {setting.id === "sessions" && (
                    <Dialog open={isSessionModalOpen} onOpenChange={setIsSessionModalOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <Database className="w-4 h-4 mr-2" />
                          View Sessions
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>Active Sessions</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          {sessions.map((session) => (
                            <Card key={session.id}>
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-4">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                      <Globe className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                      <p className="font-medium">{session.device}</p>
                                      <p className="text-sm text-gray-600">{session.browser}</p>
                                      <p className="text-sm text-gray-600">{session.location} • {session.ipAddress}</p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <Badge 
                                      className={session.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                                    >
                                      {session.status}
                                    </Badge>
                                    <p className="text-sm text-gray-600 mt-1">
                                      <Clock className="w-4 h-4 inline mr-1" />
                                      {session.lastActive}
                                    </p>
                                    {session.status === "active" && (
                                      <Button 
                                        size="sm" 
                                        variant="destructive" 
                                        className="mt-2"
                                        onClick={() => handleRevokeSession(session.id)}
                                      >
                                        Revoke
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}

                  {setting.id === "login-alerts" && (
                    <Button variant="outline">
                      <Bell className="w-4 h-4 mr-2" />
                      Configure
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Security Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Recent Security Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "Password changed", time: "2024-08-07 10:30", status: "success" },
              { action: "Failed login attempt from unknown device", time: "2024-08-06 15:45", status: "warning" },
              { action: "API key created: Production Key", time: "2024-08-05 09:15", status: "info" },
              { action: "Session terminated: iPhone", time: "2024-08-04 18:20", status: "info" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === "success" ? "bg-green-500" : 
                    activity.status === "warning" ? "bg-yellow-500" : "bg-blue-500"
                  }`} />
                  <span>{activity.action}</span>
                </div>
                <span className="text-sm text-gray-600">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityDashboard;
