
import { 
  Home, 
  Users, 
  Clock, 
  Calendar, 
  DollarSign, 
  UserPlus, 
  BarChart3, 
  FileText,
  TrendingUp,
  BookOpen,
  Receipt,
  Shield,
  Headphones,
  Settings,
  Menu,
  X
} from "lucide-react";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}

const menuItems = [
  { key: "dashboard", label: "Dashboard", icon: Home },
  { key: "employees", label: "Employee Management", icon: Users },
  { key: "attendance", label: "Attendance Tracking", icon: Clock },
  { key: "leave", label: "Leave Management", icon: Calendar },
  { key: "payroll", label: "Payroll Management", icon: DollarSign },
  { key: "recruitment", label: "Recruitment & Onboarding", icon: UserPlus },
  { key: "performance", label: "Performance Management", icon: TrendingUp },
  { key: "training", label: "Training & Development", icon: BookOpen },
  { key: "expenses", label: "Expense Management", icon: Receipt },
  { key: "compliance", label: "Compliance & Documents", icon: Shield },
  { key: "analytics", label: "Analytics & Reports", icon: BarChart3 },
  { key: "letters", label: "Letters & Documents", icon: FileText },
  { key: "helpdesk", label: "Helpdesk & Chatbot", icon: Headphones },
  { key: "settings", label: "Settings", icon: Settings },
];

export function Sidebar({ activeModule, setActiveModule }: SidebarProps) {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarComponent collapsible="icon" className="border-r border-border/50">
      <SidebarHeader className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate">
                  HR Suite
                </h1>
                <p className="text-xs text-muted-foreground truncate">AI-Powered HR Management</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-8 w-8 hover:bg-accent transition-colors shrink-0"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <Menu className="h-4 w-4" />
            ) : (
              <X className="h-4 w-4" />
            )}
          </Button>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel>Core Modules</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.slice(0, 6).map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    onClick={() => setActiveModule(item.key)}
                    isActive={activeModule === item.key}
                    className="w-full justify-start"
                    tooltip={isCollapsed ? item.label : undefined}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Advanced Features</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.slice(6, -1).map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    onClick={() => setActiveModule(item.key)}
                    isActive={activeModule === item.key}
                    className="w-full justify-start"
                    tooltip={isCollapsed ? item.label : undefined}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveModule("settings")}
                  isActive={activeModule === "settings"}
                  className="w-full justify-start"
                  tooltip={isCollapsed ? "Settings" : undefined}
                >
                  <Settings className="w-4 h-4 shrink-0" />
                  {!isCollapsed && <span className="truncate">Settings</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarComponent>
  );
}
