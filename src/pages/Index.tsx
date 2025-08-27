
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Sidebar } from "@/components/Sidebar";
import { Dashboard } from "@/components/Dashboard";
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
import Settings from "@/components/Settings";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LogOut, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [activeModule, setActiveModule] = useState("dashboard");
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
  };

  const handleGoHome = () => {
    navigate("/home");
  };

  // Default role and access function for basic Index page
  const userRole = "employee";
  const hasModuleAccess = (module: string) => {
    // Basic access - everyone can access core modules
    const basicModules = ["dashboard", "employees", "attendance", "leave", "helpdesk", "settings"];
    return basicModules.includes(module);
  };

  const renderActiveModule = () => {
    switch (activeModule) {
      case "dashboard":
        return <Dashboard setActiveModule={setActiveModule} />;
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
        return <Settings />;
      default:
        return <Dashboard setActiveModule={setActiveModule} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <SidebarProvider>
        <div className="flex w-full min-h-screen">
          <Sidebar 
            activeModule={activeModule} 
            setActiveModule={setActiveModule}
            userRole={userRole}
            hasModuleAccess={hasModuleAccess}
          />
          <main className="flex-1 overflow-hidden">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  HR Management System
                </h1>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={handleGoHome}>
                    <Home className="w-4 h-4 mr-2" />
                    Home
                  </Button>
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

export default Index;
