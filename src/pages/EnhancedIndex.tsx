
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/EnhancedAuthContext";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, Home, Settings as SettingsIcon, Sun, Moon, Globe } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Import role-specific dashboards
import { MasterDashboard } from "@/components/dashboards/MasterDashboard";
import { AdminDashboard } from "@/components/dashboards/AdminDashboard";
import { HRDashboard } from "@/components/dashboards/HRDashboard";
import { EmployeeDashboard } from "@/components/dashboards/EmployeeDashboard";

// Import existing components
import { EmployeeManagement } from "@/components/EmployeeManagement";
import { AttendanceTracking } from "@/components/AttendanceTracking";
import { LeaveManagement } from "@/components/LeaveManagement";
import { PayrollManagement } from "@/components/PayrollManagement";
import { Analytics } from "@/components/Analytics";
import { AIAssistant } from "@/components/AIAssistant";
import RecruitmentOnboarding from "@/components/RecruitmentOnboarding";
import LettersDocuments from "@/components/LettersDocuments";
import PerformanceManagement from "@/components/PerformanceManagement";
import TrainingDevelopment from "@/components/TrainingDevelopment";
import ExpenseManagement from "@/components/ExpenseManagement";
import ComplianceDocuments from "@/components/ComplianceDocuments";
import HelpdeskChatbot from "@/components/HelpdeskChatbot";
import SettingsComponent from "@/components/Settings";

const EnhancedIndex = () => {
  const [activeModule, setActiveModule] = useState("dashboard");
  const { user, profile, signOut, loading } = useAuth();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [language, setLanguage] = useState<'en' | 'es' | 'fr'>('en');
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Get role and features from user metadata (demo accounts) or profile
  const role = (user.user_metadata?.role || profile?.role || 'employee') as string;
  const userFeatures = user.user_metadata?.features || profile?.features || {};
  const userPermissions = user.user_metadata?.permissions || profile?.permissions || [];
  const department = user.user_metadata?.department || profile?.department || '';
  const employeeId = user.user_metadata?.employee_id || profile?.employee_id || '';

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const getRoleColor = (r: string) => {
    switch (r) {
      case 'master': return 'bg-red-600';
      case 'admin': return 'bg-orange-600';
      case 'hr': return 'bg-green-600';
      case 'employee': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  // Check if user has access to a specific module
  const hasModuleAccess = (module: string) => {
    // Master role has access to everything
    if (role === 'master' || userPermissions.includes('all')) {
      return true;
    }

    // Check specific feature access
    switch (module) {
      case 'dashboard':
        return true; // Everyone has dashboard access
      case 'employees':
        return userFeatures.employees?.access || userPermissions.includes('manage_employees') || userPermissions.includes('view_all_employees');
      case 'attendance':
        return userFeatures.attendance?.access || userPermissions.includes('manage_attendance') || userPermissions.includes('clock_in_out');
      case 'leave':
        return userFeatures.leave?.access || userPermissions.includes('approve_leave_requests') || userPermissions.includes('request_leave');
      case 'payroll':
        return userFeatures.payroll?.access || userPermissions.includes('manage_payroll') || userPermissions.includes('view_own_payroll');
      case 'recruitment':
        return userFeatures.recruitment?.access || userPermissions.includes('manage_recruitment') || userPermissions.includes('manage_candidates');
      case 'performance':
        return userFeatures.performance?.access || userPermissions.includes('manage_performance') || userPermissions.includes('view_own_performance');
      case 'training':
        return userFeatures.training?.access || userPermissions.includes('manage_training') || userPermissions.includes('access_training');
      case 'expenses':
        return userFeatures.expenses?.access || userPermissions.includes('manage_expenses') || userPermissions.includes('submit_expenses');
      case 'compliance':
        return userFeatures.settings?.access || userPermissions.includes('policy_management') || userPermissions.includes('compliance_tracking');
      case 'analytics':
        return userFeatures.analytics?.access || userPermissions.includes('view_analytics') || userPermissions.includes('advanced_analytics');
      case 'letters':
        return userFeatures.settings?.access || userPermissions.includes('manage_documents') || role === 'hr' || role === 'admin';
      case 'helpdesk':
        return true; // Everyone can access helpdesk
      case 'settings':
        return userFeatures.settings?.access || userPermissions.includes('manage_settings') || userPermissions.includes('edit_own_profile');
      default:
        return false;
    }
  };

  const renderDashboard = () => {
    switch (role) {
      case 'master':
        return <MasterDashboard setActiveModule={setActiveModule} />;
      case 'admin':
        return <AdminDashboard setActiveModule={setActiveModule} />;
      case 'hr':
        return <HRDashboard setActiveModule={setActiveModule} />;
      case 'employee':
        return <EmployeeDashboard setActiveModule={setActiveModule} />;
      default:
        return <EmployeeDashboard setActiveModule={setActiveModule} />;
    }
  };

  const renderActiveModule = () => {
    if (activeModule === "dashboard") {
      return renderDashboard();
    }

    // Check if user has access to the requested module
    if (!hasModuleAccess(activeModule)) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">Access Denied</h2>
            <p className="text-gray-500 mb-2">
              You don't have permission to access the <strong>{activeModule}</strong> module.
            </p>
            <p className="text-sm text-gray-400 mb-4">
              Your role: <span className="font-semibold">{role.toUpperCase()}</span>
            </p>
            <Button onClick={() => setActiveModule("dashboard")} className="mt-4">
              Return to Dashboard
            </Button>
          </div>
        </div>
      );
    }

    switch (activeModule) {
      case "employees":
        return <EmployeeManagement />;
      case "attendance":
        return <AttendanceTracking />;
      case "leave":
        return <LeaveManagement />;
      case "payroll":
        return <PayrollManagement />;
      case "recruitment":
        return <RecruitmentOnboarding />;
      case "performance":
        return <PerformanceManagement />;
      case "training":
        return <TrainingDevelopment />;
      case "expenses":
        return <ExpenseManagement />;
      case "compliance":
        return <ComplianceDocuments />;
      case "analytics":
        return <Analytics />;
      case "letters":
        return <LettersDocuments />;
      case "helpdesk":
        return <HelpdeskChatbot />;
      case "settings":
        return <SettingsComponent />;
      default:
        return renderDashboard();
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 ${theme === 'dark' ? 'dark' : ''}`}>
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <Sidebar 
            activeModule={activeModule} 
            setActiveModule={setActiveModule}
            userRole={role}
            hasModuleAccess={hasModuleAccess}
          />
          
          <main className="flex-1 overflow-hidden">
            {/* Enhanced Header */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    HR Management System
                  </h1>
                  <Badge className={`${getRoleColor(role)} text-white`}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-2">
                  {/* Theme Toggle */}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  >
                    {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  </Button>
                  
                  {/* Language Selector */}
                  <Select value={language} onValueChange={(v) => setLanguage(v as 'en' | 'es' | 'fr')}>
                    <SelectTrigger className="w-20">
                      <Globe className="w-4 h-4" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">EN</SelectItem>
                      <SelectItem value="es">ES</SelectItem>
                      <SelectItem value="fr">FR</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* User Info */}
                  <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {user.user_metadata?.first_name} {user.user_metadata?.last_name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {department} • {employeeId}
                      </p>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" onClick={handleGoHome}>
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </Button>
                  
                  {hasModuleAccess('settings') && (
                    <Button variant="outline" size="sm" onClick={() => setActiveModule('settings')}>
                      <SettingsIcon className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  )}
                  
                  <Button variant="outline" size="sm" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {renderActiveModule()}
            </div>
          </main>
          
          <AIAssistant />
        </div>
      </SidebarProvider>
    </div>
  );
};

export default EnhancedIndex;
