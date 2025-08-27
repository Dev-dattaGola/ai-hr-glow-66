
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  profile: any | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData?: any) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (updates: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo credentials with updated credentials as requested
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
    permissions: ['all']
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
    permissions: ['manage_employees', 'manage_payroll', 'manage_attendance', 'manage_performance']
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
    permissions: ['manage_employees', 'manage_leave', 'manage_recruitment']
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
    permissions: ['view_own_data', 'submit_requests']
  }
};

export const EnhancedAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
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

    // Get initial session from Supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      // Clear demo session if real auth event occurs
      localStorage.removeItem('demo_user');
      
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

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
            permissions: demoAccount.permissions
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
        toast.success(`Welcome back, ${demoAccount.first_name}!`);
        return;
      }

      // Try real Supabase authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      toast.success('Successfully signed in!');
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
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (error) throw error;
      
      toast.success('Account created successfully! Please check your email to verify your account.');
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
      
      // Sign out from Supabase if real session exists
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
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
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/`
      });
      if (error) throw error;
      
      toast.success('Password reset email sent!');
    } catch (error: any) {
      console.error('Reset password error:', error);
      toast.error(error.message || 'Failed to send reset email');
      throw error;
    }
  };

  const updateProfile = async (updates: any) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;
      
      await fetchProfile(user.id);
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
