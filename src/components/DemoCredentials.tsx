
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, User, Shield, Users, Crown } from "lucide-react";
import { toast } from "sonner";

const credentials = [
  {
    email: "master@company.com",
    password: "Master123!",
    role: "Master",
    description: "Full system access, all permissions",
    icon: Crown,
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    first_name: "Master",
    last_name: "Admin",
    department: "Administration",
    position: "Master Administrator"
  },
  {
    email: "admin@company.com", 
    password: "Admin123!",
    role: "Admin",
    description: "Administrative access, most permissions",
    icon: Shield,
    color: 'bg-red-100 text-red-800 border-red-200',
    first_name: "System",
    last_name: "Admin",
    department: "Administration",
    position: "System Administrator"
  },
  {
    email: "hr@company.com",
    password: "HR123!", 
    role: "HR",
    description: "Human Resources access, employee management",
    icon: Users,
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    first_name: "Sarah",
    last_name: "Johnson",
    department: "Human Resources",
    position: "HR Manager"
  },
  {
    email: "employee@company.com",
    password: "Employee123!",
    role: "Employee", 
    description: "Basic employee access, own data only",
    icon: User,
    color: 'bg-green-100 text-green-800 border-green-200',
    first_name: "John",
    last_name: "Doe",
    department: "Engineering",
    position: "Software Developer"
  }
];

export const DemoCredentials = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-gray-800">
          Demo Login Credentials
        </CardTitle>
        <p className="text-center text-gray-600">
          Use these credentials to test different user roles and permissions
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {credentials.map((cred, index) => {
            const IconComponent = cred.icon;
            return (
              <div
                key={index}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <IconComponent className="w-5 h-5" />
                    <h3 className="font-semibold text-lg">
                      {cred.first_name} {cred.last_name}
                    </h3>
                  </div>
                  <Badge className={cred.color}>
                    {cred.role.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Email:</span>
                    <div className="flex items-center justify-between mt-1">
                      <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                        {cred.email}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(cred.email)}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <span className="font-medium text-gray-600">Password:</span>
                    <div className="flex items-center justify-between mt-1">
                      <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                        {cred.password}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(cred.password)}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <p className="text-xs text-gray-500">
                      <span className="font-medium">Department:</span> {cred.department}
                    </p>
                    <p className="text-xs text-gray-500">
                      <span className="font-medium">Position:</span> {cred.position}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">Role Permissions:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li><strong>Master:</strong> Complete system control, all administrative functions</li>
            <li><strong>Admin:</strong> Full system access, can manage all employees, view all data</li>
            <li><strong>HR:</strong> Can create/edit employees, access HR features, manage leave requests</li>
            <li><strong>Employee:</strong> Can view own data, submit requests, limited system access</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
