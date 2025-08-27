
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, User, Shield, Users, Crown } from "lucide-react";
import { toast } from "sonner";

interface LoginCredential {
  email: string;
  password: string;
  role: string;
  description: string;
  icon: React.ReactNode;
}

export const LoginCredentials = () => {
  const credentials: LoginCredential[] = [
    {
      email: "master@hrsuite.com",
      password: "master2024",
      role: "Master",
      description: "Full system access, all permissions",
      icon: <Crown className="w-4 h-4" />
    },
    {
      email: "admin@hrsuite.com", 
      password: "admin2024",
      role: "Admin",
      description: "Administrative access, most permissions",
      icon: <Shield className="w-4 h-4" />
    },
    {
      email: "hr@hrsuite.com",
      password: "hr2024", 
      role: "HR",
      description: "Human Resources access, employee management",
      icon: <Users className="w-4 h-4" />
    },
    {
      email: "manager@hrsuite.com",
      password: "manager2024",
      role: "Manager",
      description: "Management level access",
      icon: <Shield className="w-4 h-4" />
    },
    {
      email: "employee@hrsuite.com",
      password: "employee2024",
      role: "Employee", 
      description: "Basic employee access, own data only",
      icon: <User className="w-4 h-4" />
    },
    {
      email: "john.doe@hrsuite.com",
      password: "john2024",
      role: "Employee",
      description: "Sample employee account",
      icon: <User className="w-4 h-4" />
    },
    {
      email: "jane.smith@hrsuite.com",
      password: "jane2024",
      role: "HR",
      description: "Sample HR representative",
      icon: <Users className="w-4 h-4" />
    },
    {
      email: "mike.johnson@hrsuite.com",
      password: "mike2024", 
      role: "Admin",
      description: "Sample administrator account",
      icon: <Shield className="w-4 h-4" />
    }
  ];

  const copyCredentials = (email: string, password: string) => {
    const text = `Email: ${email}\nPassword: ${password}`;
    navigator.clipboard.writeText(text);
    toast.success("Credentials copied to clipboard!");
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'master': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'admin': case 'manager': return 'bg-red-100 text-red-800 border-red-200';
      case 'hr': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'employee': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="w-5 h-5" />
          <span>Demo Login Credentials</span>
        </CardTitle>
        <p className="text-sm text-gray-600">
          Use these credentials to test different user roles and permissions in the HR system.
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {credentials.map((credential, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <Badge className={getRoleColor(credential.role)}>
                  <span className="flex items-center space-x-1">
                    {credential.icon}
                    <span>{credential.role}</span>
                  </span>
                </Badge>
                <button
                  onClick={() => copyCredentials(credential.email, credential.password)}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                  title="Copy credentials"
                >
                  <Copy className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              
              <div className="space-y-1 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Email:</span>
                  <span className="ml-2 font-mono text-blue-600">{credential.email}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Password:</span>
                  <span className="ml-2 font-mono text-green-600">{credential.password}</span>
                </div>
                <p className="text-gray-500 text-xs mt-2">{credential.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Data Synchronization</h4>
          <p className="text-sm text-blue-700">
            When you create an employee and assign them to a user account, their data will be automatically 
            synchronized across all modules including attendance, leave requests, payroll, and performance reviews. 
            Any updates to employee information will be reflected throughout the system in real-time.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
