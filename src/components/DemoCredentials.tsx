
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, User, Shield, Users, Crown, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

const credentials = [
  {
    email: "master@company.com",
    password: "Master123!",
    role: "Master",
    description: "Complete system control & administration",
    icon: Crown,
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    first_name: "Master",
    last_name: "Admin",
    department: "Administration",
    position: "Master Administrator",
    features: [
      "Full System Access",
      "User Management", 
      "Security Settings",
      "All Modules Access",
      "Advanced Analytics",
      "System Configuration"
    ]
  },
  {
    email: "admin@company.com", 
    password: "Admin123!",
    role: "Admin",
    description: "Administrative access with most permissions",
    icon: Shield,
    color: 'bg-red-100 text-red-800 border-red-200',
    first_name: "System",
    last_name: "Admin",
    department: "Administration",
    position: "System Administrator",
    features: [
      "Employee Management",
      "Payroll Processing",
      "Attendance Management",
      "Performance Reviews",
      "Recruitment Management",
      "Standard Analytics"
    ]
  },
  {
    email: "hr@company.com",
    password: "HR123!", 
    role: "HR",
    description: "Human Resources access & employee management",
    icon: Users,
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    first_name: "Sarah",
    last_name: "Johnson",
    department: "Human Resources",
    position: "HR Manager",
    features: [
      "Employee Onboarding",
      "Leave Management",
      "Recruitment & Hiring",
      "Training Programs",
      "Performance Planning",
      "HR Analytics"
    ]
  },
  {
    email: "employee@company.com",
    password: "Employee123!",
    role: "Employee", 
    description: "Self-service access for personal data",
    icon: User,
    color: 'bg-green-100 text-green-800 border-green-200',
    first_name: "John",
    last_name: "Doe",
    department: "Engineering",
    position: "Software Developer",
    features: [
      "Personal Dashboard",
      "Time Clock In/Out",
      "Leave Requests",
      "View Payslips",
      "Training Access",
      "Expense Submission"
    ]
  }
];

export const DemoCredentials = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const copyCredentials = (email: string, password: string) => {
    const text = `Email: ${email}\nPassword: ${password}`;
    navigator.clipboard.writeText(text);
    toast.success('Login credentials copied!');
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-gray-800">
          Demo Login Credentials & Feature Access
        </CardTitle>
        <p className="text-center text-gray-600">
          Use these credentials to test different user roles and their specific permissions
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {credentials.map((cred, index) => {
            const IconComponent = cred.icon;
            return (
              <div
                key={index}
                className="border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <IconComponent className="w-6 h-6" />
                    <div>
                      <h3 className="font-semibold text-lg">
                        {cred.first_name} {cred.last_name}
                      </h3>
                      <p className="text-sm text-gray-500">{cred.position}</p>
                    </div>
                  </div>
                  <Badge className={cred.color}>
                    {cred.role.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-700">Email:</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(cred.email)}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <code className="text-sm font-mono text-blue-600 block">
                      {cred.email}
                    </code>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-700">Password:</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(cred.password)}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <code className="text-sm font-mono text-green-600 block">
                      {cred.password}
                    </code>
                  </div>

                  <Button
                    onClick={() => copyCredentials(cred.email, cred.password)}
                    className="w-full"
                    variant="outline"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Both Credentials
                  </Button>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Feature Access:
                  </h4>
                  <div className="grid grid-cols-1 gap-1">
                    {cred.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t">
                  <p className="text-xs text-gray-500">
                    <span className="font-medium">Department:</span> {cred.department}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Access Levels Explained:
            </h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li><strong>Master:</strong> Complete system control, all administrative functions</li>
              <li><strong>Admin:</strong> Full operational access, can manage all employees and processes</li>
              <li><strong>HR:</strong> Employee lifecycle management, recruitment, training, compliance</li>
              <li><strong>Employee:</strong> Self-service portal, personal data management only</li>
            </ul>
          </div>
          
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
            <h4 className="font-semibold text-amber-800 mb-2 flex items-center">
              <XCircle className="w-4 h-4 mr-2" />
              Feature Restrictions:
            </h4>
            <ul className="text-sm text-amber-700 space-y-1">
              <li><strong>Employees:</strong> Cannot access payroll processing or admin settings</li>
              <li><strong>HR:</strong> Limited payroll access, cannot modify system settings</li>
              <li><strong>Admin:</strong> Cannot delete employees or access master-level settings</li>
              <li><strong>All Roles:</strong> Data access respects role-based security policies</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
