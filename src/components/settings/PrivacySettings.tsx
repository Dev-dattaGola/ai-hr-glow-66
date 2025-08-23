
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Shield, Save, Eye, Lock, Database, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PrivacySettingsProps {
  onSave: () => void;
}

const PrivacySettings = ({ onSave }: PrivacySettingsProps) => {
  const { toast } = useToast();
  
  const [privacy, setPrivacy] = useState({
    dataRetention: "7years",
    allowDataExport: true,
    requireConsent: true,
    anonymizeData: false,
    shareAnalytics: false,
    cookiesEssential: true,
    cookiesAnalytics: false,
    cookiesMarketing: false,
    profileVisibility: "colleagues",
    contactInfoVisible: true,
    salaryVisible: false,
    performanceVisible: false,
    auditLogging: true,
    dataBackup: true,
    encryptData: true,
    accessLogging: true
  });

  const handleSave = () => {
    onSave();
    toast({
      title: "Privacy Settings Saved",
      description: "Your privacy preferences have been updated.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-teal-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl">Privacy & Security Settings</span>
          </CardTitle>
          <p className="text-gray-600">Control your data privacy and security preferences</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <Database className="w-5 h-5" />
              <span>Data Management</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Data Retention Period</Label>
                <Select value={privacy.dataRetention} onValueChange={(value) => setPrivacy(prev => ({ ...prev, dataRetention: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1year">1 Year</SelectItem>
                    <SelectItem value="3years">3 Years</SelectItem>
                    <SelectItem value="5years">5 Years</SelectItem>
                    <SelectItem value="7years">7 Years</SelectItem>
                    <SelectItem value="indefinite">Indefinite</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {[
                  { key: 'allowDataExport', label: 'Allow Data Export', desc: 'Users can export their data' },
                  { key: 'requireConsent', label: 'Require Consent', desc: 'Explicit consent for data processing' },
                  { key: 'anonymizeData', label: 'Anonymize Data', desc: 'Remove personal identifiers from reports' },
                  { key: 'shareAnalytics', label: 'Share Analytics', desc: 'Share anonymized analytics data' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-sm">{item.label}</h4>
                      <p className="text-xs text-gray-600">{item.desc}</p>
                    </div>
                    <Switch
                      checked={privacy[item.key as keyof typeof privacy] as boolean}
                      onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, [item.key]: checked }))}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <Eye className="w-5 h-5" />
              <span>Profile Visibility</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Profile Visibility</Label>
                <Select value={privacy.profileVisibility} onValueChange={(value) => setPrivacy(prev => ({ ...prev, profileVisibility: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="colleagues">Colleagues Only</SelectItem>
                    <SelectItem value="team">Team Members Only</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                {[
                  { key: 'contactInfoVisible', label: 'Contact Information', desc: 'Email, phone number visible' },
                  { key: 'salaryVisible', label: 'Salary Information', desc: 'Compensation details visible' },
                  { key: 'performanceVisible', label: 'Performance Data', desc: 'Reviews and ratings visible' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium text-sm">{item.label}</h4>
                      <p className="text-xs text-gray-600">{item.desc}</p>
                    </div>
                    <Switch
                      checked={privacy[item.key as keyof typeof privacy] as boolean}
                      onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, [item.key]: checked }))}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Cookie Preferences</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                <div>
                  <h4 className="font-medium">Essential Cookies</h4>
                  <p className="text-sm text-gray-600">Required for basic site functionality</p>
                </div>
                <Switch checked={true} disabled />
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Analytics Cookies</h4>
                  <p className="text-sm text-gray-600">Help us improve the site performance</p>
                </div>
                <Switch
                  checked={privacy.cookiesAnalytics}
                  onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, cookiesAnalytics: checked }))}
                />
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Marketing Cookies</h4>
                  <p className="text-sm text-gray-600">Used for targeted advertising</p>
                </div>
                <Switch
                  checked={privacy.cookiesMarketing}
                  onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, cookiesMarketing: checked }))}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <Lock className="w-5 h-5" />
              <span>Security Features</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: 'auditLogging', label: 'Audit Logging', desc: 'Log all system activities' },
                { key: 'dataBackup', label: 'Data Backup', desc: 'Regular automated backups' },
                { key: 'encryptData', label: 'Data Encryption', desc: 'Encrypt sensitive data at rest' },
                { key: 'accessLogging', label: 'Access Logging', desc: 'Log all data access attempts' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{item.label}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                  <Switch
                    checked={privacy[item.key as keyof typeof privacy] as boolean}
                    onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, [item.key]: checked }))}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-1" />
              <div>
                <h4 className="font-medium text-yellow-800">Data Privacy Notice</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Your privacy settings control how your personal information is used and shared. 
                  Changes may take up to 24 hours to take effect across all systems.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave} className="bg-gradient-to-r from-green-600 to-teal-600">
              <Save className="w-4 h-4 mr-2" />
              Save Privacy Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacySettings;
