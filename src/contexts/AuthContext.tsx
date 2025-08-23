
import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, userData?: any) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  masterLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for master login first
    const masterAccess = localStorage.getItem('master_access');
    if (masterAccess === 'true') {
      // Create a mock user for master access
      const mockUser = {
        id: 'master-user-id',
        email: 'master@hrsuite.com',
        user_metadata: {
          first_name: 'Master',
          last_name: 'Admin'
        }
      } as User;
      
      setUser(mockUser);
      setSession({ user: mockUser } as Session);
      setLoading(false);
      return;
    }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    // Master login bypass
    if (email === 'master@hrsuite.com' || email === 'admin@hrsuite.com' || password === 'master123') {
      masterLogin();
      return { error: null };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string, userData?: any) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: userData
      }
    });
    return { error };
  };

  const signOut = async () => {
    localStorage.removeItem('master_access');
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  const masterLogin = () => {
    localStorage.setItem('master_access', 'true');
    const mockUser = {
      id: 'master-user-id',
      email: 'master@hrsuite.com',
      user_metadata: {
        first_name: 'Master',
        last_name: 'Admin'
      }
    } as User;
    
    setUser(mockUser);
    setSession({ user: mockUser } as Session);
  };

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    masterLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
