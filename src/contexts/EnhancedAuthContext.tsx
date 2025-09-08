import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface AuthContextType {
  user: any | null;
  profile: any | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData?: any) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (updates: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Enhanced demo credentials with comprehensive feature access
const DEMO_CREDENTIALS = {
  master: {
    email: 'master@company.com',
    password: 'Master123!',
    role: 'master',
    first_name: 'Master',
    last_name: 'Admin',
    department: 'Administration',
    position: 'Master Administrator',
    employee_id: 'MASTER001',
    permissions: [
      // Full system access
      'all',
      'system_admin',
      'user_management',
      'role_management',
      'system_settings',
      'security_settings',
      'backup_restore',
      'audit_logs',
      // Employee Management
      'create_employees',
      'edit_employees',
      'delete_employees',
      'view_all_employees',
      'manage_org_chart',
      'bulk_employee_operations',
      // Attendance & Time Management
      'manage_attendance',
      'view_all_attendance',
      'edit_attendance',
      'attendance_reports',
      'overtime_management',
      // Leave Management
      'approve_leave_requests',
      'manage_leave_policies',
      'view_all_leave_requests',
      'leave_analytics',
      // Payroll Management
      'manage_payroll',
      'process_payroll',
      'payroll_reports',
      'tax_settings',
      'salary_adjustments',
      // Performance Management
      'manage_performance_reviews',
      'view_all_reviews',
      'performance_analytics',
      'goal_management',
      // Training & Development
      'manage_training_programs',
      'assign_training',
      'training_reports',
      'certification_management',
      // Recruitment
      'manage_job_postings',
      'candidate_management',
      'interview_scheduling',
      'recruitment_analytics',
      // Expense Management
      'approve_expenses',
      'expense_reports',
      'budget_management',
      // Analytics & Reports
      'advanced_analytics',
      'custom_reports',
      'dashboard_management',
      'data_export'
    ],
    features: {
      dashboard: { access: true, level: 'full' },
      employees: { access: true, level: 'full', canCreate: true, canEdit: true, canDelete: true },
      attendance: { access: true, level: 'full', canManage: true, canReport: true },
      leave: { access: true, level: 'full', canApprove: true, canManagePolicies: true },
      payroll: { access: true, level: 'full', canProcess: true, canReport: true },
      performance: { access: true, level: 'full', canManage: true, canReview: true },
      training: { access: true, level: 'full', canManage: true, canAssign: true },
      recruitment: { access: true, level: 'full', canManage: true, canSchedule: true },
      expenses: { access: true, level: 'full', canApprove: true, canReport: true },
      analytics: { access: true, level: 'advanced', canExport: true, canCustomize: true },
      settings: { access: true, level: 'full', canManageSystem: true, canManageSecurity: true }
    }
  },
  admin: {
    email: 'admin@company.com',
    password: 'Admin123!',
    role: 'admin',
    first_name: 'System',
    last_name: 'Admin',
    department: 'Administration',
    position: 'System Administrator',
    employee_id: 'ADMIN001',
    permissions: [
      // Administrative access
      'manage_employees',
      'manage_attendance',
      'manage_payroll',
      'manage_performance',
      'manage_training',
      'manage_recruitment',
      'manage_expenses',
      'view_analytics',
      'manage_reports',
      // Employee Management
      'create_employees',
      'edit_employees',
      'view_all_employees',
      'manage_org_chart',
      // Attendance Management
      'view_all_attendance',
      'edit_attendance',
      'attendance_reports',
      // Leave Management
      'approve_leave_requests',
      'view_all_leave_requests',
      'leave_reports',
      // Payroll Management
      'process_payroll',
      'payroll_reports',
      'salary_management',
      // Performance Management
      'manage_performance_reviews',
      'view_performance_reports',
      // Training Management
      'assign_training',
      'training_reports',
      // Recruitment
      'manage_candidates',
      'schedule_interviews',
      // Expense Management
      'approve_expenses',
      'expense_reports'
    ],
    features: {
      dashboard: { access: true, level: 'admin' },
      employees: { access: true, level: 'full', canCreate: true, canEdit: true, canDelete: false },
      attendance: { access: true, level: 'manage', canManage: true, canReport: true },
      leave: { access: true, level: 'approve', canApprove: true, canManagePolicies: false },
      payroll: { access: true, level: 'process', canProcess: true, canReport: true },
      performance: { access: true, level: 'manage', canManage: true, canReview: true },
      training: { access: true, level: 'assign', canManage: false, canAssign: true },
      recruitment: { access: true, level: 'manage', canManage: true, canSchedule: true },
      expenses: { access: true, level: 'approve', canApprove: true, canReport: true },
      analytics: { access: true, level: 'standard', canExport: true, canCustomize: false },
      settings: { access: true, level: 'limited', canManageSystem: false, canManageSecurity: false }
    }
  },
  hr: {
    email: 'hr@company.com',
    password: 'HR123!',
    role: 'hr',
    first_name: 'Sarah',
    last_name: 'Johnson',
    department: 'Human Resources',
    position: 'HR Manager',
    employee_id: 'HR001',
    permissions: [
      // HR specific permissions
      'manage_employees',
      'manage_leave',
      'manage_recruitment',
      'manage_training',
      'manage_performance',
      'view_hr_analytics',
      // Employee Management
      'create_employees',
      'edit_employees',
      'view_all_employees',
      'employee_onboarding',
      // Leave Management
      'approve_leave_requests',
      'manage_leave_policies',
      'leave_planning',
      // Recruitment
      'post_jobs',
      'manage_candidates',
      'schedule_interviews',
      'onboarding_process',
      // Training & Development
      'create_training_programs',
      'assign_training',
      'track_certifications',
      // Performance Management
      'initiate_reviews',
      'performance_planning',
      'goal_setting',
      // Compliance
      'policy_management',
      'compliance_tracking'
    ],
    features: {
      dashboard: { access: true, level: 'hr' },
      employees: { access: true, level: 'hr', canCreate: true, canEdit: true, canDelete: false },
      attendance: { access: true, level: 'view', canManage: false, canReport: true },
      leave: { access: true, level: 'full', canApprove: true, canManagePolicies: true },
      payroll: { access: false, level: 'none', canProcess: false, canReport: false },
      performance: { access: true, level: 'hr', canManage: true, canReview: true },
      training: { access: true, level: 'full', canManage: true, canAssign: true },
      recruitment: { access: true, level: 'full', canManage: true, canSchedule: true },
      expenses: { access: true, level: 'view', canApprove: false, canReport: true },
      analytics: { access: true, level: 'hr', canExport: true, canCustomize: false },
      settings: { access: true, level: 'hr', canManageSystem: false, canManageSecurity: false }
    }
  },
  employee: {
    email: 'employee@company.com',
    password: 'Employee123!',
    role: 'employee',
    first_name: 'John',
    last_name: 'Doe',
    department: 'Engineering',
    position: 'Software Developer',
    employee_id: 'EMP001',
    permissions: [
      // Self-service permissions
      'view_own_data',
      'edit_own_profile',
      'submit_requests',
      'view_own_payroll',
      'clock_in_out',
      'request_leave',
      'view_own_performance',
      'access_training',
      'submit_expenses',
      'view_company_directory'
    ],
    features: {
      dashboard: { access: true, level: 'employee' },
      employees: { access: true, level: 'view', canCreate: false, canEdit: false, canDelete: false },
      attendance: { access: true, level: 'self', canManage: false, canReport: false },
      leave: { access: true, level: 'self', canApprove: false, canManagePolicies: false },
      payroll: { access: true, level: 'self', canProcess: false, canReport: false },
      performance: { access: true, level: 'self', canManage: false, canReview: false },
      training: { access: true, level: 'self', canManage: false, canAssign: false },
      recruitment: { access: false, level: 'none', canManage: false, canSchedule: false },
      expenses: { access: true, level: 'self', canApprove: false, canReport: false },
      analytics: { access: false, level: 'none', canExport: false, canCustomize: false },
      settings: { access: true, level: 'profile', canManageSystem: false, canManageSecurity: false }
    }
  }
};

export const EnhancedAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for demo user session in localStorage
    const demoUser = localStorage.getItem('demo_user');
    if (demoUser) {
      const userData = JSON.parse(demoUser);
      setUser(userData);
      setProfile(userData);
      setLoading(false);
      return;
    }

    // No real auth system - just complete loading
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Check if it's a demo account
      const demoAccount = Object.values(DEMO_CREDENTIALS).find(
        cred => cred.email === email && cred.password === password
      );

      if (demoAccount) {
        // Create a mock user object for demo
        const mockUser: any = {
          id: `demo-${demoAccount.role}`,
          email: demoAccount.email,
          user_metadata: {
            first_name: demoAccount.first_name,
            last_name: demoAccount.last_name,
            role: demoAccount.role,
            department: demoAccount.department,
            position: demoAccount.position,
            employee_id: demoAccount.employee_id,
            permissions: demoAccount.permissions,
            features: demoAccount.features
          },
          app_metadata: {},
          aud: 'authenticated',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        // Store demo session
        localStorage.setItem('demo_user', JSON.stringify(mockUser));
        
        setUser(mockUser);
        setProfile(mockUser);
        toast.success(`Welcome back, ${demoAccount.first_name}! Role: ${demoAccount.role.toUpperCase()}`);
        return;
      }

      // No real auth system - just show error for non-demo accounts
      toast.error('Invalid credentials. Please use demo accounts.');
      throw new Error('Invalid credentials. Please use demo accounts.');
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast.error(error.message || 'Invalid credentials. Try using demo accounts.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData?: any) => {
    setLoading(true);
    try {
      // Frontend only - no real signup
      toast.success('Demo mode: Account creation disabled. Please use demo accounts.');
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast.error(error.message || 'Failed to create account');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      // Clear demo session
      localStorage.removeItem('demo_user');
      
      setUser(null);
      setProfile(null);
      toast.success('Successfully signed out!');
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast.error(error.message || 'Failed to sign out');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      // Frontend only - no real password reset
      toast.success('Demo mode: Password reset disabled. Please use demo accounts.');
    } catch (error: any) {
      console.error('Reset password error:', error);
      toast.error(error.message || 'Failed to send reset email');
      throw error;
    }
  };

  const updateProfile = async (updates: any) => {
    if (!user) return;
    
    try {
      // Frontend only - update local demo user data
      const updatedUser = { ...user, ...updates };
      localStorage.setItem('demo_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setProfile(updatedUser);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      console.error('Update profile error:', error);
      toast.error(error.message || 'Failed to update profile');
      throw error;
    }
  };

  const value = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an EnhancedAuthProvider');
  }
  return context;
};

// Export demo credentials for easy access
export { DEMO_CREDENTIALS };
