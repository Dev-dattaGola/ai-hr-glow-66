
import { useState } from "react";
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

const Index = () => {
  const [activeModule, setActiveModule] = useState("dashboard");

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
          <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
          <main className="flex-1 overflow-hidden">
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
