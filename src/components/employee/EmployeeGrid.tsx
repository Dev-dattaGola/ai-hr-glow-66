
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Edit, Eye, MoreVertical, Phone, MapPin, AlertTriangle } from "lucide-react";

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
  missingDocs?: string[];
}

interface EmployeeGridProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onView: (employee: Employee) => void;
  onSendEmail: (employeeId: number) => void;
}

export const EmployeeGrid = ({ employees, onEdit, onView, onSendEmail }: EmployeeGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {employees.map((employee) => (
        <Card 
          key={employee.id} 
          className="hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm hover:-translate-y-1"
        >
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Avatar className="w-14 h-14 border-2 border-blue-200">
                <AvatarImage src={employee.avatar} alt={employee.name} />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold">
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-lg">{employee.name}</h3>
                <p className="text-sm text-gray-600 font-medium">{employee.position}</p>
              </div>
              <Button variant="ghost" size="sm" className="p-1 hover:bg-gray-100">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4 text-blue-500" />
                <span className="truncate">{employee.email}</span>
              </div>
              {employee.phone && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-green-500" />
                  <span>{employee.phone}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-50">
                  {employee.department}
                </Badge>
                <Badge className={
                  employee.status === "Active" 
                    ? "bg-green-100 text-green-800 hover:bg-green-100" 
                    : "bg-orange-100 text-orange-800 hover:bg-orange-100"
                }>
                  {employee.status}
                </Badge>
              </div>
              <p className="text-xs text-gray-500">Joined: {employee.joinDate}</p>
              
              {employee.missingDocs && employee.missingDocs.length > 0 && (
                <div className="flex items-center space-x-1 text-xs text-red-600 bg-red-50 p-2 rounded-md">
                  <AlertTriangle className="w-3 h-3" />
                  <span>{employee.missingDocs.length} missing document(s)</span>
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1 hover:bg-blue-50 hover:border-blue-300"
                onClick={() => onView(employee)}
              >
                <Eye className="w-3 h-3 mr-1" />
                View
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="flex-1 hover:bg-green-50 hover:border-green-300"
                onClick={() => onEdit(employee)}
              >
                <Edit className="w-3 h-3 mr-1" />
                Edit
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="hover:bg-purple-50 hover:border-purple-300"
                onClick={() => onSendEmail(employee.id)}
              >
                <Mail className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
