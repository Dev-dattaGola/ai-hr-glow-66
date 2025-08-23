import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, User, Mail, Phone, MapPin, Briefcase, Calendar, DollarSign } from "lucide-react";
import { DocumentUpload } from "./DocumentUpload";

interface Employee {
  id?: number;
  name: string;
  email: string;
  department: string;
  position: string;
  status: string;
  joinDate: string;
  avatar?: string;
  phone?: string;
  address?: string;
  salary?: string;
  manager?: string;
  documents?: any[];
}

interface EmployeeFormProps {
  employee?: Employee | null;
  onClose: () => void;
  onSave: (employee: Employee) => void;
}

export const EmployeeForm = ({ employee, onClose, onSave }: EmployeeFormProps) => {
  const [formData, setFormData] = useState<Employee>({
    name: employee?.name || "",
    email: employee?.email || "",
    department: employee?.department || "",
    position: employee?.position || "",
    status: employee?.status || "Active",
    joinDate: employee?.joinDate || new Date().toISOString().split('T')[0],
    phone: employee?.phone || "",
    address: employee?.address || "",
    salary: employee?.salary || "",
    manager: employee?.manager || "",
  });

  const [documents, setDocuments] = useState([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, documents });
  };

  const handleInputChange = (field: keyof Employee, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={onClose}
          className="mb-4 hover:bg-blue-50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Employee List
        </Button>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <span>{employee ? "Edit Employee" : "Add New Employee"}</span>
        </h1>
        <p className="text-gray-600 mt-2">
          {employee ? "Update employee information" : "Create a new employee profile"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic and Work Information Cards */}
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardTitle>Employee Information</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <User className="w-5 h-5 text-blue-600" />
                  <span>Basic Information</span>
                </h3>
                
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter full name"
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter email address"
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Enter phone number"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-sm font-medium text-gray-700">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Enter full address"
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </div>

              {/* Work Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <Briefcase className="w-5 h-5 text-green-600" />
                  <span>Work Information</span>
                </h3>

                <div>
                  <Label htmlFor="position" className="text-sm font-medium text-gray-700">Position</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => handleInputChange("position", e.target.value)}
                    placeholder="Enter job position"
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="department" className="text-sm font-medium text-gray-700">Department</Label>
                  <select
                    id="department"
                    value={formData.department}
                    onChange={(e) => handleInputChange("department", e.target.value)}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                    <option value="HR">HR</option>
                    <option value="Sales">Sales</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="manager" className="text-sm font-medium text-gray-700">Manager</Label>
                  <Input
                    id="manager"
                    value={formData.manager}
                    onChange={(e) => handleInputChange("manager", e.target.value)}
                    placeholder="Enter manager name"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="salary" className="text-sm font-medium text-gray-700">Salary</Label>
                  <Input
                    id="salary"
                    value={formData.salary}
                    onChange={(e) => handleInputChange("salary", e.target.value)}
                    placeholder="Enter salary (e.g., $75,000)"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="joinDate" className="text-sm font-medium text-gray-700">Join Date</Label>
                  <Input
                    id="joinDate"
                    type="date"
                    value={formData.joinDate}
                    onChange={(e) => handleInputChange("joinDate", e.target.value)}
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="status" className="text-sm font-medium text-gray-700">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => handleInputChange("status", e.target.value)}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Upload Section */}
        <DocumentUpload 
          employeeId={employee?.id}
          onDocumentsChange={setDocuments}
        />

        {/* Action Buttons */}
        <Card className="shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              >
                <Save className="w-4 h-4 mr-2" />
                {employee ? "Update Employee" : "Add Employee"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};
