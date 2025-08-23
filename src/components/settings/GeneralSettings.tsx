
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Settings, Save, Globe, Clock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GeneralSettingsProps {
  onSave: () => void;
}

const GeneralSettings = ({ onSave }: GeneralSettingsProps) => {
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    companyName: "HRMS Company",
    timezone: "UTC-5",
    language: "en",
    dateFormat: "MM/DD/YYYY",
    currency: "USD",
    workingDays: 5,
    workingHours: 8,
    fiscalYearStart: "01-01",
    allowSelfService: true,
    enableMobileApp: true,
    autoBackup: true,
    maintenanceMode: false
  });

  const handleSave = () => {
    onSave();
    toast({
      title: "Settings Saved",
      description: "General settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl">General Settings</span>
          </CardTitle>
          <p className="text-gray-600">Configure basic system settings and preferences</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label>Company Name</Label>
                <Input
                  value={settings.companyName}
                  onChange={(e) => setSettings(prev => ({ ...prev, companyName: e.target.value }))}
                />
              </div>
              
              <div>
                <Label>Timezone</Label>
                <Select value={settings.timezone} onValueChange={(value) => setSettings(prev => ({ ...prev, timezone: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC-5">UTC-5 (Eastern)</SelectItem>
                    <SelectItem value="UTC-6">UTC-6 (Central)</SelectItem>
                    <SelectItem value="UTC-7">UTC-7 (Mountain)</SelectItem>
                    <SelectItem value="UTC-8">UTC-8 (Pacific)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Language</Label>
                <Select value={settings.language} onValueChange={(value) => setSettings(prev => ({ ...prev, language: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Date Format</Label>
                <Select value={settings.dateFormat} onValueChange={(value) => setSettings(prev => ({ ...prev, dateFormat: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Currency</Label>
                <Select value={settings.currency} onValueChange={(value) => setSettings(prev => ({ ...prev, currency: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                    <SelectItem value="INR">INR (₹)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Working Days per Week</Label>
                <Input
                  type="number"
                  value={settings.workingDays}
                  onChange={(e) => setSettings(prev => ({ ...prev, workingDays: parseInt(e.target.value) }))}
                />
              </div>

              <div>
                <Label>Working Hours per Day</Label>
                <Input
                  type="number"
                  value={settings.workingHours}
                  onChange={(e) => setSettings(prev => ({ ...prev, workingHours: parseInt(e.target.value) }))}
                />
              </div>

              <div>
                <Label>Fiscal Year Start (MM-DD)</Label>
                <Input
                  value={settings.fiscalYearStart}
                  onChange={(e) => setSettings(prev => ({ ...prev, fiscalYearStart: e.target.value }))}
                  placeholder="MM-DD"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">System Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Employee Self Service</h4>
                  <p className="text-sm text-gray-600">Allow employees to update their information</p>
                </div>
                <Switch
                  checked={settings.allowSelfService}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, allowSelfService: checked }))}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Mobile App Access</h4>
                  <p className="text-sm text-gray-600">Enable mobile application access</p>
                </div>
                <Switch
                  checked={settings.enableMobileApp}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableMobileApp: checked }))}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Automatic Backups</h4>
                  <p className="text-sm text-gray-600">Daily automated system backups</p>
                </div>
                <Switch
                  checked={settings.autoBackup}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoBackup: checked }))}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Maintenance Mode</h4>
                  <p className="text-sm text-gray-600">Put system in maintenance mode</p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, maintenanceMode: checked }))}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave} className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Save className="w-4 h-4 mr-2" />
              Save General Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeneralSettings;
