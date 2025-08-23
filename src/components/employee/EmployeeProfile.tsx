
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Edit, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase, 
  DollarSign, 
  User,
  AlertTriangle,
  FileText,
  Award
} from "lucide-react";

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

interface EmployeeProfileProps {
  employee: Employee;
  onClose: () => void;
  onEdit: () => void;
}

export const EmployeeProfile = ({ employee, onClose, onEdit }: EmployeeProfileProps) => {
  if (!employee) return null;

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
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Employee Profile</h1>
          <Button 
            onClick={onEdit}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <div className="lg:col-span-1">
          <Card className="shadow-lg border-0">
            <CardContent className="p-6 text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-blue-200">
                <AvatarImage src={employee.avatar} alt={employee.name} />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-2xl font-bold">
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{employee.name}</h2>
              <p className="text-gray-600 font-medium mb-4">{employee.position}</p>
              <Badge 
                className={
                  employee.status === "Active" 
                    ? "bg-green-100 text-green-800 px-4 py-2" 
                    : "bg-orange-100 text-orange-800 px-4 py-2"
                }
              >
                {employee.status}
              </Badge>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-lg border-0 mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                View Documents
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Award className="w-4 h-4 mr-2" />
                Performance Review
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-blue-600" />
                <span>Contact Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{employee.email}</p>
                  </div>
                </div>
                {employee.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium">{employee.phone}</p>
                    </div>
                  </div>
                )}
                {employee.address && (
                  <div className="flex items-start space-x-3 md:col-span-2">
                    <MapPin className="w-5 h-5 text-red-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Address</p>
                      <p className="font-medium">{employee.address}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Work Information */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-green-600" />
                <span>Work Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Briefcase className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-600">Department</p>
                    <Badge variant="outline" className="mt-1 text-blue-700 border-blue-200">
                      {employee.department}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-600">Join Date</p>
                    <p className="font-medium">{employee.joinDate}</p>
                  </div>
                </div>
                {employee.manager && (
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-indigo-500" />
                    <div>
                      <p className="text-sm text-gray-600">Manager</p>
                      <p className="font-medium">{employee.manager}</p>
                    </div>
                  </div>
                )}
                {employee.salary && (
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-600">Salary</p>
                      <p className="font-medium">{employee.salary}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Missing Documents Alert */}
          {employee.missingDocs && employee.missingDocs.length > 0 && (
            <Card className="shadow-lg border-0 border-l-4 border-l-red-500">
              <CardHeader className="bg-red-50">
                <CardTitle className="flex items-center space-x-2 text-red-700">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Missing Documents</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-red-600 mb-3">
                  The following documents are missing from this employee's profile:
                </p>
                <div className="flex flex-wrap gap-2">
                  {employee.missingDocs.map((doc, index) => (
                    <Badge key={index} variant="destructive" className="bg-red-100 text-red-800">
                      {doc}
                    </Badge>
                  ))}
                </div>
                <Button className="mt-4 bg-red-600 hover:bg-red-700">
                  <Mail className="w-4 h-4 mr-2" />
                  Request Documents
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Performance & Notes */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-purple-600" />
                <span>Performance & Notes</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">4.2/5</div>
                  <p className="text-sm text-gray-600">Performance Rating</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                  <p className="text-sm text-gray-600">Attendance Rate</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">12</div>
                  <p className="text-sm text-gray-600">Projects Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
