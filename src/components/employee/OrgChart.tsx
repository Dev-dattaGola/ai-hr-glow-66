
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Building, 
  Users, 
  Brain, 
  Download, 
  Upload,
  Edit,
  Save,
  Plus,
  Trash2,
  RefreshCw,
  Move,
  Zap
} from "lucide-react";
import { OrgChartNode } from "./OrgChartNode";
import { OrgChartConnections } from "./OrgChartConnections";
import { OrgChartEditor } from "./OrgChartEditor";
import { AIChartGenerator } from "./AIChartGenerator";

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  status: string;
  manager?: string;
  avatar: string;
  reportees?: number[];
  level?: number;
  x?: number;
  y?: number;
}

interface OrgChartProps {
  employees: Employee[];
  onClose: () => void;
}

export const OrgChart = ({ employees, onClose }: OrgChartProps) => {
  const [editMode, setEditMode] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [orgData, setOrgData] = useState(() => buildOrgHierarchy(employees));
  const [viewMode, setViewMode] = useState<'hierarchy' | 'circular' | 'network'>('hierarchy');
  const [showAIGenerator, setShowAIGenerator] = useState(false);

  function buildOrgHierarchy(empList: Employee[]) {
    const hierarchy: Record<string, any> = {};
    const employeeMap = new Map(empList.map(emp => [emp.id, emp]));
    
    empList.forEach(emp => {
      if (!hierarchy[emp.department]) {
        hierarchy[emp.department] = {
          ceo: null,
          managers: [],
          staff: [],
          structure: []
        };
      }
      
      if (emp.position.toLowerCase().includes('ceo') || emp.position.toLowerCase().includes('director')) {
        hierarchy[emp.department].ceo = emp;
      } else if (emp.position.toLowerCase().includes('manager') || emp.position.toLowerCase().includes('lead')) {
        hierarchy[emp.department].managers.push(emp);
      } else {
        hierarchy[emp.department].staff.push(emp);
      }
    });
    
    return hierarchy;
  }

  const handleGenerateAIChart = (config: any) => {
    console.log("Generating AI org chart with config:", config);
    // AI chart generation logic here
    setShowAIGenerator(false);
  };

  const handleExportChart = () => {
    const chartData = {
      employees: orgData,
      viewMode,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(chartData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `org-chart-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportChart = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        setOrgData(data.employees || data);
        setViewMode(data.viewMode || 'hierarchy');
      } catch (error) {
        console.error("Failed to import chart:", error);
      }
    };
    reader.readAsText(file);
  };

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const handleEditEmployee = (updatedEmployee: Employee) => {
    const newOrgData = { ...orgData };
    Object.keys(newOrgData).forEach(dept => {
      ['ceo', 'managers', 'staff'].forEach(level => {
        if (Array.isArray(newOrgData[dept][level])) {
          newOrgData[dept][level] = newOrgData[dept][level].map((emp: Employee) =>
            emp.id === updatedEmployee.id ? updatedEmployee : emp
          );
        } else if (newOrgData[dept][level]?.id === updatedEmployee.id) {
          newOrgData[dept][level] = updatedEmployee;
        }
      });
    });
    setOrgData(newOrgData);
    setSelectedEmployee(null);
  };

  const EmployeeNode = ({ employee, level, onClick }: { 
    employee: Employee; 
    level: 'ceo' | 'manager' | 'staff';
    onClick: () => void;
  }) => {
    const sizeClasses = {
      ceo: 'w-24 h-24',
      manager: 'w-16 h-16', 
      staff: 'w-12 h-12'
    };

    const containerClasses = {
      ceo: 'p-6 bg-gradient-to-r from-purple-100 to-blue-100 border-purple-300',
      manager: 'p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200',
      staff: 'p-3 bg-white border-gray-200'
    };

    return (
      <div 
        className={`rounded-lg border-2 cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${containerClasses[level]}`}
        onClick={onClick}
      >
        <div className="flex flex-col items-center space-y-2">
          <Avatar className={`${sizeClasses[level]} border-2 border-white shadow-md`}>
            <AvatarImage src={employee.avatar} alt={employee.name} />
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold">
              {employee.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h4 className={`font-semibold truncate ${
              level === 'ceo' ? 'text-purple-900 text-lg' : 
              level === 'manager' ? 'text-blue-900' : 'text-gray-900 text-sm'
            }`}>
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
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={onClose}
          className="mb-4 hover:bg-blue-50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Employee List
        </Button>
        
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                <Building className="w-8 h-8 text-white" />
              </div>
              <span>Interactive Organization Chart</span>
            </h1>
            <p className="text-gray-600 mt-2">AI-powered organizational structure with full editing capabilities</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {/* View Mode Buttons */}
            <div className="flex bg-white rounded-lg p-1 border">
              {[
                { mode: 'hierarchy' as const, icon: Building, label: 'Hierarchy' },
                { mode: 'circular' as const, icon: RefreshCw, label: 'Circular' },
                { mode: 'network' as const, icon: Move, label: 'Network' }
              ].map(({ mode, icon: Icon, label }) => (
                <Button
                  key={mode}
                  variant={viewMode === mode ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode(mode)}
                  className="h-8"
                >
                  <Icon className="w-3 h-3 mr-1" />
                  {label}
                </Button>
              ))}
            </div>

            {/* Action Buttons */}
            <Button 
              variant="outline"
              onClick={() => setShowAIGenerator(true)}
              className="border-purple-200 hover:bg-purple-50"
            >
              <Brain className="w-4 h-4 mr-2" />
              AI Generate
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setEditMode(!editMode)}
              className={editMode ? "bg-green-50 border-green-200" : "border-blue-200 hover:bg-blue-50"}
            >
              {editMode ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
              {editMode ? 'Save' : 'Edit'}
            </Button>
            
            <input
              type="file"
              accept=".json"
              onChange={handleImportChart}
              style={{ display: 'none' }}
              id="import-chart"
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById('import-chart')?.click()}
              className="border-orange-200 hover:bg-orange-50"
            >
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            
            <Button
              variant="outline"
              onClick={handleExportChart}
              className="border-green-200 hover:bg-green-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* AI Generator Modal */}
      {showAIGenerator && (
        <AIChartGenerator
          employees={employees}
          onGenerate={handleGenerateAIChart}
          onClose={() => setShowAIGenerator(false)}
        />
      )}

      {/* Organization Chart Display */}
      <div className="space-y-8 overflow-x-auto">
        {Object.entries(orgData).map(([department, data]) => (
          <Card key={department} className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-6 h-6 text-gray-600" />
                  <span>{department} Department</span>
                </div>
                <div className="text-sm text-gray-600">
                  {(data.ceo ? 1 : 0) + data.managers.length + data.staff.length} employees
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="relative">
                {/* CEO Level */}
                {data.ceo && (
                  <div className="flex justify-center mb-12">
                    <div className="relative">
                      <EmployeeNode 
                        employee={data.ceo} 
                        level="ceo"
                        onClick={() => handleEmployeeClick(data.ceo)}
                      />
                      {/* Connection line down */}
                      {(data.managers.length > 0 || data.staff.length > 0) && (
                        <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-px h-8 bg-gradient-to-b from-purple-400 to-blue-400"></div>
                      )}
                    </div>
                  </div>
                )}

                {/* Manager Level */}
                {data.managers.length > 0 && (
                  <div className="mb-12">
                    <div className="flex justify-center mb-4">
                      <h4 className="text-lg font-semibold text-blue-900 flex items-center space-x-2">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        <span>Management Team</span>
                      </h4>
                    </div>
                    
                    {/* Horizontal connection line */}
                    {data.managers.length > 1 && data.ceo && (
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-96 h-px bg-blue-300 mb-4"></div>
                    )}
                    
                    <div className="flex justify-center space-x-8 mb-8">
                      {data.managers.map((manager: Employee, index: number) => (
                        <div key={manager.id} className="relative">
                          <EmployeeNode 
                            employee={manager} 
                            level="manager"
                            onClick={() => handleEmployeeClick(manager)}
                          />
                          {/* Connection line down to staff */}
                          {data.staff.length > 0 && (
                            <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-px h-8 bg-blue-300"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Staff Level */}
                {data.staff.length > 0 && (
                  <div>
                    <div className="flex justify-center mb-4">
                      <h4 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gray-400 rounded"></div>
                        <span>Team Members</span>
                      </h4>
                    </div>
                    
                    {/* Horizontal connection line for staff */}
                    {data.staff.length > 1 && (data.managers.length > 0 || data.ceo) && (
                      <div className="flex justify-center mb-4">
                        <div className="w-full max-w-4xl h-px bg-gray-300"></div>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 justify-items-center">
                      {data.staff.map((employee: Employee) => (
                        <EmployeeNode 
                          key={employee.id}
                          employee={employee} 
                          level="staff"
                          onClick={() => handleEmployeeClick(employee)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Employee Editor */}
      {selectedEmployee && (
        <OrgChartEditor
          employee={selectedEmployee}
          onSave={handleEditEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}

      {/* Summary Stats */}
      <Card className="mt-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span>Organization Analytics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{employees.length}</div>
              <p className="text-sm text-gray-600">Total Employees</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {Object.keys(orgData).length}
              </div>
              <p className="text-sm text-gray-600">Departments</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {Object.values(orgData).reduce((acc: number, dept: any) => 
                  acc + (dept.ceo ? 1 : 0) + dept.managers.length, 0)}
              </div>
              <p className="text-sm text-gray-600">Leadership</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
              <p className="text-sm text-gray-600">Structure Health</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
