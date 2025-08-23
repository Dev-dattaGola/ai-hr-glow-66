
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { X, Save, Upload } from "lucide-react";

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  status: string;
  avatar: string;
  manager?: string;
}

interface OrgChartEditorProps {
  employee: Employee;
  onSave: (employee: Employee) => void;
  onClose: () => void;
}

export const OrgChartEditor = ({ employee, onSave, onClose }: OrgChartEditorProps) => {
  const [editedEmployee, setEditedEmployee] = useState<Employee>({ ...employee });

  const handleSave = () => {
    onSave(editedEmployee);
    onClose();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditedEmployee({
          ...editedEmployee,
          avatar: e.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white shadow-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold">Edit Employee</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-2">
            <Avatar className="w-20 h-20 border-4 border-blue-200">
              <AvatarImage src={editedEmployee.avatar} alt={editedEmployee.name} />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg">
                {editedEmployee.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="avatar-upload"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => document.getElementById('avatar-upload')?.click()}
            >
              <Upload className="w-3 h-3 mr-1" />
              Change Photo
            </Button>
          </div>

          {/* Form Fields */}
          <div className="space-y-3">
            <div>
              <Label htmlFor="name" className="text-sm font-medium">Name</Label>
              <Input
                id="name"
                value={editedEmployee.name}
                onChange={(e) => setEditedEmployee({
                  ...editedEmployee,
                  name: e.target.value
                })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="position" className="text-sm font-medium">Position</Label>
              <Input
                id="position"
                value={editedEmployee.position}
                onChange={(e) => setEditedEmployee({
                  ...editedEmployee,
                  position: e.target.value
                })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                value={editedEmployee.email}
                onChange={(e) => setEditedEmployee({
                  ...editedEmployee,
                  email: e.target.value
                })}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="department" className="text-sm font-medium">Department</Label>
              <select
                id="department"
                value={editedEmployee.department}
                onChange={(e) => setEditedEmployee({
                  ...editedEmployee,
                  department: e.target.value
                })}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="Sales">Sales</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
              </select>
            </div>

            <div>
              <Label htmlFor="status" className="text-sm font-medium">Status</Label>
              <select
                id="status"
                value={editedEmployee.status}
                onChange={(e) => setEditedEmployee({
                  ...editedEmployee,
                  status: e.target.value
                })}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div>
              <Label htmlFor="manager" className="text-sm font-medium">Manager</Label>
              <Input
                id="manager"
                value={editedEmployee.manager || ''}
                onChange={(e) => setEditedEmployee({
                  ...editedEmployee,
                  manager: e.target.value
                })}
                className="mt-1"
                placeholder="Manager's name"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={handleSave}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
