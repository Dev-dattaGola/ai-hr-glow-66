
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  status: string;
  avatar: string;
}

interface OrgChartNodeProps {
  employee: Employee;
  level: 'ceo' | 'manager' | 'staff';
  isEditable?: boolean;
  onClick: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const OrgChartNode = ({ 
  employee, 
  level, 
  isEditable = false,
  onClick, 
  onEdit, 
  onDelete 
}: OrgChartNodeProps) => {
  const sizeClasses = {
    ceo: 'w-24 h-24',
    manager: 'w-16 h-16', 
    staff: 'w-12 h-12'
  };

  const containerClasses = {
    ceo: 'p-6 bg-gradient-to-r from-purple-100 to-blue-100 border-purple-300 min-w-[200px]',
    manager: 'p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 min-w-[160px]',
    staff: 'p-3 bg-white border-gray-200 min-w-[120px]'
  };

  const textClasses = {
    ceo: 'text-purple-900 text-lg',
    manager: 'text-blue-900',
    staff: 'text-gray-900 text-sm'
  };

  return (
    <div 
      className={`relative rounded-lg border-2 cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${containerClasses[level]}`}
      onClick={onClick}
    >
      {/* Edit Actions */}
      {isEditable && (
        <div className="absolute -top-2 -right-2 flex space-x-1">
          <Button
            size="sm"
            variant="outline"
            className="h-6 w-6 p-0 bg-blue-500 border-blue-500 hover:bg-blue-600"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.();
            }}
          >
            <Edit className="w-3 h-3 text-white" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-6 w-6 p-0 bg-red-500 border-red-500 hover:bg-red-600"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
          >
            <Trash2 className="w-3 h-3 text-white" />
          </Button>
        </div>
      )}

      <div className="flex flex-col items-center space-y-2">
        <Avatar className={`${sizeClasses[level]} border-2 border-white shadow-md`}>
          <AvatarImage src={employee.avatar} alt={employee.name} />
          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold">
            {employee.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <div className="text-center">
          <h4 className={`font-semibold truncate ${textClasses[level]}`}>
            {employee.name}
          </h4>
          <p className={`text-xs truncate ${
            level === 'ceo' ? 'text-purple-700' :
            level === 'manager' ? 'text-blue-700' : 'text-gray-600'
          }`}>
            {employee.position}
          </p>
          <Badge variant="outline" className="mt-1 text-xs">
            {employee.department}
          </Badge>
          
          {/* Status indicator */}
          <div className={`mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
            employee.status === 'Active' 
              ? 'bg-green-100 text-green-800'
              : 'bg-orange-100 text-orange-800'
          }`}>
            {employee.status}
          </div>
        </div>
      </div>
    </div>
  );
};
