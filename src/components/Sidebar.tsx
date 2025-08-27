
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
import { Badge } from "@/components/ui/badge";

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
  userRole: string;
  hasModuleAccess: (module: string) => boolean;
}

const menuItems = [
  { key: "dashboard", label: "Dashboard", icon: Home, group: "core" },
  { key: "employees", label: "Employee Management", icon: Users, group: "core" },
  { key: "attendance", label: "Attendance Tracking", icon: Clock, group: "core" },
  { key: "leave", label: "Leave Management", icon: Calendar, group: "core" },
  { key: "payroll", label: "Payroll Management", icon: DollarSign, group: "core" },
  { key: "recruitment", label: "Recruitment & Onboarding", icon: UserPlus, group: "core" },
  { key: "performance", label: "Performance Management", icon: TrendingUp, group: "advanced" },
  { key: "training", label: "Training & Development", icon: BookOpen, group: "advanced" },
  { key: "expenses", label: "Expense Management", icon: Receipt, group: "advanced" },
  { key: "compliance", label: "Compliance & Documents", icon: Shield, group: "advanced" },
  { key: "analytics", label: "Analytics & Reports", icon: BarChart3, group: "advanced" },
  { key: "letters", label: "Letters & Documents", icon: FileText, group: "advanced" },
  { key: "helpdesk", label: "Helpdesk & Chatbot", icon: Headphones, group: "advanced" },
  { key: "settings", label: "Settings", icon: Settings, group: "system" },
];

export function Sidebar({ activeModule, setActiveModule, userRole, hasModuleAccess }: SidebarProps) {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";

  // Filter menu items based on user access
  const accessibleItems = menuItems.filter(item => hasModuleAccess(item.key));
  
  const coreModules = accessibleItems.filter(item => item.group === "core");
  const advancedModules = accessibleItems.filter(item => item.group === "advanced");
  const systemModules = accessibleItems.filter(item => item.group === "system");

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'master': return 'bg-red-100 text-red-800';
      case 'admin': return 'bg-orange-100 text-orange-800';
      case 'hr': return 'bg-green-100 text-green-800';
      case 'employee': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
                <div className="flex items-center gap-2">
                  <p className="text-xs text-muted-foreground truncate">AI-Powered HR Management</p>
                  <Badge variant="outline" className={`text-xs ${getRoleBadgeColor(userRole)}`}>
                    {userRole.toUpperCase()}
                  </Badge>
                </div>
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
        {coreModules.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Core Modules</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {coreModules.map((item) => (
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
        )}

        {advancedModules.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Advanced Features</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {advancedModules.map((item) => (
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
        )}

        {systemModules.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>System</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {systemModules.map((item) => (
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
        )}

        {/* Show access summary if collapsed */}
        {isCollapsed && (
          <div className="px-2 py-4">
            <div className="text-center">
              <Badge variant="outline" className={`text-xs ${getRoleBadgeColor(userRole)}`}>
                {userRole.toUpperCase()}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">
                {accessibleItems.length} modules
              </p>
            </div>
          </div>
        )}
      </SidebarContent>
    </SidebarComponent>
  );
}
