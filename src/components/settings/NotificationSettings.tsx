
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Save, Mail, MessageSquare, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NotificationSettingsProps {
  onSave: () => void;
}

const NotificationSettings = ({ onSave }: NotificationSettingsProps) => {
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    leaveRequests: true,
    payrollAlerts: true,
    systemMaintenance: true,
    birthdayReminders: true,
    taskDeadlines: true,
    meetingReminders: true,
    documentExpiry: true,
    frequency: "immediate",
    quietHours: true,
    quietStart: "22:00",
    quietEnd: "08:00"
  });

  const handleSave = () => {
    onSave();
    toast({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl">Notification Settings</span>
          </CardTitle>
          <p className="text-gray-600">Configure how and when you receive notifications</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Notification Channels</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-sm text-gray-600">Receive via email</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.emailNotifications}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, emailNotifications: checked }))}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-5 h-5 text-green-600" />
                  <div>
                    <h4 className="font-medium">SMS</h4>
                    <p className="text-sm text-gray-600">Text messages</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.smsNotifications}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, smsNotifications: checked }))}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Smartphone className="w-5 h-5 text-purple-600" />
                  <div>
                    <h4 className="font-medium">Push</h4>
                    <p className="text-sm text-gray-600">Mobile/browser push</p>
                  </div>
                </div>
                <Switch
                  checked={notifications.pushNotifications}
                  onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, pushNotifications: checked }))}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Notification Types</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: 'leaveRequests', label: 'Leave Requests', desc: 'New leave applications and approvals' },
                { key: 'payrollAlerts', label: 'Payroll Alerts', desc: 'Payroll processing and salary updates' },
                { key: 'systemMaintenance', label: 'System Maintenance', desc: 'System updates and downtimes' },
                { key: 'birthdayReminders', label: 'Birthday Reminders', desc: 'Employee birthday notifications' },
                { key: 'taskDeadlines', label: 'Task Deadlines', desc: 'Upcoming task due dates' },
                { key: 'meetingReminders', label: 'Meeting Reminders', desc: 'Scheduled meeting notifications' },
                { key: 'documentExpiry', label: 'Document Expiry', desc: 'Expiring documents and certificates' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{item.label}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                  <Switch
                    checked={notifications[item.key as keyof typeof notifications] as boolean}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, [item.key]: checked }))}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Notification Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Notification Frequency</Label>
                <Select value={notifications.frequency} onValueChange={(value) => setNotifications(prev => ({ ...prev, frequency: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="hourly">Hourly Digest</SelectItem>
                    <SelectItem value="daily">Daily Digest</SelectItem>
                    <SelectItem value="weekly">Weekly Digest</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Quiet Hours</h4>
                    <p className="text-sm text-gray-600">Disable notifications during specific hours</p>
                  </div>
                  <Switch
                    checked={notifications.quietHours}
                    onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, quietHours: checked }))}
                  />
                </div>
                
                {notifications.quietHours && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Start Time</Label>
                      <Input
                        type="time"
                        value={notifications.quietStart}
                        onChange={(e) => setNotifications(prev => ({ ...prev, quietStart: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label>End Time</Label>
                      <Input
                        type="time"
                        value={notifications.quietEnd}
                        onChange={(e) => setNotifications(prev => ({ ...prev, quietEnd: e.target.value }))}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave} className="bg-gradient-to-r from-orange-600 to-red-600">
              <Save className="w-4 h-4 mr-2" />
              Save Notification Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSettings;
