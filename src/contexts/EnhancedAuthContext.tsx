import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type UserRole = 'master' | 'admin' | 'hr' | 'employee';

export interface UserPermissions {
  payroll: { read: boolean; write: boolean; approve: boolean; delete: boolean };
  leave: { read: boolean; write: boolean; approve: boolean; delete: boolean };
  attendance: { read: boolean; write: boolean; approve: boolean; delete: boolean };
  reports: { read: boolean; write: boolean; approve: boolean; delete: boolean };
  documents: { read: boolean; write: boolean; approve: boolean; delete: boolean };
  employees: { read: boolean; write: boolean; approve: boolean; delete: boolean };
  settings: { read: boolean; write: boolean; approve: boolean; delete: boolean };
  expenses: { read: boolean; write: boolean; approve: boolean; delete: boolean };
}

export interface EnhancedUser extends User {
  role?: UserRole;
  permissions?: UserPermissions;
  department?: string;
  employee_id?: string;
}

interface AuthContextType {
  user: EnhancedUser | null;
  session: Session | null;
  loading: boolean;
  theme: 'light' | 'dark';
  language: 'en' | 'es' | 'fr';
  rememberMe: boolean;
  signIn: (credentials: SignInCredentials) => Promise<{ error: any }>;
  signUp: (userData: SignUpData) => Promise<{ error: any }>;
  signInWithOAuth: (provider: 'google' | 'github' | 'linkedin_oidc') => Promise<{ error: any }>;
  signInWithOTP: (phone: string) => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  masterLogin: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: 'en' | 'es' | 'fr') => void;
  setRememberMe: (remember: boolean) => void;
  hasPermission: (module: keyof UserPermissions, action: keyof UserPermissions[keyof UserPermissions]) => boolean;
}

interface SignInCredentials {
  email?: string;
  employeeId?: string;
  password: string;
}

interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  department: string;
  employeeId: string;
  role?: UserRole;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const defaultPermissions: Record<UserRole, UserPermissions> = {
  master: {
    payroll: { read: true, write: true, approve: true, delete: true },
    leave: { read: true, write: true, approve: true, delete: true },
    attendance: { read: true, write: true, approve: true, delete: true },
    reports: { read: true, write: true, approve: true, delete: true },
    documents: { read: true, write: true, approve: true, delete: true },
    employees: { read: true, write: true, approve: true, delete: true },
    settings: { read: true, write: true, approve: true, delete: true },
    expenses: { read: true, write: true, approve: true, delete: true },
  },
  admin: {
    payroll: { read: true, write: true, approve: true, delete: false },
    leave: { read: true, write: true, approve: true, delete: false },
    attendance: { read: true, write: true, approve: false, delete: false },
    reports: { read: true, write: true, approve: false, delete: false },
    documents: { read: true, write: true, approve: true, delete: false },
    employees: { read: true, write: true, approve: false, delete: false },
    settings: { read: true, write: false, approve: false, delete: false },
    expenses: { read: true, write: true, approve: true, delete: false },
  },
  hr: {
    payroll: { read: true, write: false, approve: false, delete: false },
    leave: { read: true, write: true, approve: true, delete: false },
    attendance: { read: true, write: true, approve: false, delete: false },
    reports: { read: true, write: true, approve: false, delete: false },
    documents: { read: true, write: true, approve: false, delete: false },
    employees: { read: true, write: true, approve: false, delete: false },
    settings: { read: false, write: false, approve: false, delete: false },
    expenses: { read: true, write: true, approve: false, delete: false },
  },
  employee: {
    payroll: { read: true, write: false, approve: false, delete: false },
    leave: { read: true, write: true, approve: false, delete: false },
    attendance: { read: true, write: true, approve: false, delete: false },
    reports: { read: true, write: false, approve: false, delete: false },
    documents: { read: true, write: false, approve: false, delete: false },
    employees: { read: false, write: false, approve: false, delete: false },
    settings: { read: false, write: false, approve: false, delete: false },
    expenses: { read: true, write: true, approve: false, delete: false },
  },
};

const createMockUser = (role: UserRole): EnhancedUser => {
  const now = new Date().toISOString();
  return {
    id: `${role}-user-id`,
    email: `${role}@hrsuite.com`,
    app_metadata: { provider: 'email', roles: [role] },
    user_metadata: { first_name: role.charAt(0).toUpperCase() + role.slice(1), last_name: 'User' },
    aud: 'authenticated',
    created_at: now,
    confirmed_at: now,
    last_sign_in_at: now,
    updated_at: now,
    identities: [],
    role,
    permissions: defaultPermissions[role],
    department: 'System',
    employee_id: `${role.toUpperCase()}001`,
  } as EnhancedUser;
};

const createMockSession = (mockUser: EnhancedUser): Session => {
  const nowSec = Math.floor(Date.now() / 1000);
  return {
    access_token: `${mockUser.role}-access-token`,
    token_type: 'bearer',
    expires_in: 3600,
    expires_at: nowSec + 3600,
    refresh_token: `${mockUser.role}-refresh-token`,
    user: mockUser,
  } as Session;
};

export const EnhancedAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<EnhancedUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [language, setLanguage] = useState<'en' | 'es' | 'fr'>('en');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // Load preferences from localStorage
    const savedTheme = localStorage.getItem('hrms_theme') as 'light' | 'dark' | null;
    const savedLanguage = localStorage.getItem('hrms_language') as 'en' | 'es' | 'fr' | null;
    const savedRememberMe = localStorage.getItem('hrms_remember_me') === 'true';

    if (savedTheme) setTheme(savedTheme);
    if (savedLanguage) setLanguage(savedLanguage);
    setRememberMe(savedRememberMe);

    // Check for master login first
    const masterAccess = localStorage.getItem('master_access');
    if (masterAccess === 'true') {
      const mockUser = createMockUser('master');
      setUser(mockUser);
      setSession(createMockSession(mockUser));
      setLoading(false);
      return;
    }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        
        if (session?.user) {
          // Fetch user role and permissions from profiles
          const enhancedUser = await enhanceUserWithRole(session.user);
          setUser(enhancedUser);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log('Initial session check:', session);
      setSession(session);
      
      if (session?.user) {
        const enhancedUser = await enhanceUserWithRole(session.user);
        setUser(enhancedUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const enhanceUserWithRole = async (baseUser: User): Promise<EnhancedUser> => {
    try {
      // Try to fetch from profiles table, but handle if it doesn't exist
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', baseUser.id)
        .single();

      if (error) {
        console.log('Profile fetch error (this is normal for demo):', error);
        // Use default role for demo purposes
        const role = 'employee' as UserRole;
        const permissions = defaultPermissions[role];

        return {
          ...baseUser,
          role,
          permissions,
          department: 'General',
          employee_id: `EMP${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        };
      }

      const role = (profile?.role as UserRole) || 'employee';
      const permissions = defaultPermissions[role];

      return {
        ...baseUser,
        role,
        permissions,
        department: profile?.department || 'General',
        employee_id: `EMP${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      };
    } catch (error) {
      console.error('Error enhancing user with role:', error);
      return {
        ...baseUser,
        role: 'employee',
        permissions: defaultPermissions.employee,
        department: 'General',
        employee_id: 'EMP001',
      };
    }
  };

  const signIn = async (credentials: SignInCredentials) => {
    console.log('Attempting to sign in with:', credentials);
    
    // Master login bypass
    if (credentials.email === 'master@hrsuite.com' || credentials.password === 'master123') {
      masterLogin();
      return { error: null };
    }

    // Demo logins for different roles
    const demoAccounts = {
      'admin@hrsuite.com': 'admin',
      'hr@hrsuite.com': 'hr',
      'employee@hrsuite.com': 'employee',
    };

    if (credentials.email && demoAccounts[credentials.email as keyof typeof demoAccounts]) {
      const role = demoAccounts[credentials.email as keyof typeof demoAccounts] as UserRole;
      const mockUser = createMockUser(role);
      localStorage.setItem(`${role}_access`, 'true');
      setUser(mockUser);
      setSession(createMockSession(mockUser));
      toast.success(`Welcome back, ${role}!`);
      return { error: null };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: credentials.email || '',
      password: credentials.password,
    });
    
    if (error) {
      console.error('Sign in error:', error);
      toast.error('Sign in failed: ' + error.message);
    } else {
      console.log('Sign in successful');
      toast.success('Welcome back!');
    }
    
    return { error };
  };

  const signUp = async (userData: SignUpData) => {
    console.log('Attempting to sign up with:', userData);
    
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          first_name: userData.firstName,
          last_name: userData.lastName,
          department: userData.department,
          employee_id: userData.employeeId,
          role: userData.role || 'employee'
        }
      }
    });
    
    if (error) {
      console.error('Sign up error:', error);
      toast.error('Sign up failed: ' + error.message);
    } else {
      console.log('Sign up successful - check email for confirmation');
      toast.success('Account created! Please check your email for confirmation.');
    }
    
    return { error };
  };

  const signInWithOAuth = async (provider: 'google' | 'github' | 'linkedin_oidc') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });
    
    if (error) {
      console.error(`${provider} sign in error:`, error);
      toast.error(`${provider} sign in failed: ` + error.message);
    }
    
    return { error };
  };

  const signInWithOTP = async (phone: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      phone,
    });
    
    if (error) {
      console.error('OTP sign in error:', error);
      toast.error('OTP sign in failed: ' + error.message);
    } else {
      toast.success('OTP sent to your phone!');
    }
    
    return { error };
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    if (error) {
      console.error('Password reset error:', error);
      toast.error('Password reset failed: ' + error.message);
    } else {
      toast.success('Password reset link sent to your email!');
    }
    
    return { error };
  };

  const signOut = async () => {
    console.log('Signing out...');
    localStorage.removeItem('master_access');
    localStorage.removeItem('admin_access');
    localStorage.removeItem('hr_access');
    localStorage.removeItem('employee_access');
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    toast.success('Signed out successfully');
  };

  const masterLogin = () => {
    console.log('Master login activated');
    localStorage.setItem('master_access', 'true');
    const mockUser = createMockUser('master');
    setUser(mockUser);
    setSession(createMockSession(mockUser));
    toast.success('Master access granted!');
  };

  const updateTheme = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    localStorage.setItem('hrms_theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const updateLanguage = (newLanguage: 'en' | 'es' | 'fr') => {
    setLanguage(newLanguage);
    localStorage.setItem('hrms_language', newLanguage);
  };

  const updateRememberMe = (remember: boolean) => {
    setRememberMe(remember);
    localStorage.setItem('hrms_remember_me', remember.toString());
  };

  const hasPermission = (module: keyof UserPermissions, action: keyof UserPermissions[keyof UserPermissions]) => {
    if (!user?.permissions) return false;
    return user.permissions[module][action];
  };

  const value = {
    user,
    session,
    loading,
    theme,
    language,
    rememberMe,
    signIn,
    signUp,
    signInWithOAuth,
    signInWithOTP,
    resetPassword,
    signOut,
    masterLogin,
    setTheme: updateTheme,
    setLanguage: updateLanguage,
    setRememberMe: updateRememberMe,
    hasPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
