
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Eye, 
  Edit, 
  Mail, 
  MoreVertical,
  Brain,
  FileText,
  AlertTriangle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  status: string;
  joinDate: string;
  avatar: string;
  phone?: string;
  address?: string;
  salary?: string;
  manager?: string;
  missingDocs?: string[];
}

interface EmployeeGridProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onView: (employee: Employee) => void;
  onSendEmail: (employee: Employee) => void;
  onAIAnalysis?: (employee: Employee) => void;
}

export const EmployeeGrid = ({ 
  employees, 
  onEdit, 
  onView, 
  onSendEmail,
  onAIAnalysis 
}: EmployeeGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {employees.map((employee) => (
        <Card key={employee.id} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Avatar className="w-16 h-16 border-2 border-blue-200">
                <AvatarImage src={employee.avatar} alt={employee.name} />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold">
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onView(employee)}>
                    <Eye className="w-4 h-4 mr-2" />
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onEdit(employee)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onSendEmail(employee)}>
                    <Mail className="w-4 h-4 mr-2" />
                    Send Welcome Email
                  </DropdownMenuItem>
                  {onAIAnalysis && (
                    <DropdownMenuItem onClick={() => onAIAnalysis(employee)}>
                      <Brain className="w-4 h-4 mr-2" />
                      AI Analysis
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="text-center mb-4">
              <h3 className="font-bold text-lg text-gray-900 mb-1">{employee.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{employee.position}</p>
              <Badge 
                className={
                  employee.status === "Active" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-orange-100 text-orange-800"
                }
              >
                {employee.status}
              </Badge>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium">Dept:</span>
                <span className="ml-2">{employee.department}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium">Joined:</span>
                <span className="ml-2">{employee.joinDate}</span>
              </div>
              {employee.manager && (
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium">Manager:</span>
                  <span className="ml-2">{employee.manager}</span>
                </div>
              )}
            </div>

            {/* Missing Documents Alert */}
            {employee.missingDocs && employee.missingDocs.length > 0 && (
              <div className="flex items-center text-xs text-red-600 bg-red-50 p-2 rounded-md mb-4">
                <AlertTriangle className="w-4 h-4 mr-2" />
                <span>{employee.missingDocs.length} missing documents</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => onView(employee)}
                className="flex-1"
              >
                <Eye className="w-4 h-4 mr-1" />
                View
              </Button>
              <Button 
                size="sm" 
                onClick={() => onEdit(employee)}
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex space-x-1 mt-2">
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => onSendEmail(employee)}
                className="flex-1 text-blue-600 hover:bg-blue-50"
              >
                <Mail className="w-3 h-3 mr-1" />
                Email
              </Button>
              {onAIAnalysis && (
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => onAIAnalysis(employee)}
                  className="flex-1 text-purple-600 hover:bg-purple-50"
                >
                  <Brain className="w-3 h-3 mr-1" />
                  AI
                </Button>
              )}
              <Button 
                size="sm" 
                variant="ghost"
                className="flex-1 text-gray-600 hover:bg-gray-50"
              >
                <FileText className="w-3 h-3 mr-1" />
                Docs
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
