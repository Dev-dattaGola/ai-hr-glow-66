import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Employee {
  id: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  department: string;
  position: string;
  hire_date: string;
  salary?: number;
  status: 'active' | 'inactive' | 'on_leave';
  manager_id?: string;
  avatar_url?: string;
  address?: string;
  emergency_contact?: string;
  emergency_phone?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
  user_id?: string; // New field for linking to auth users
}

export const useEmployees = () => {
  return useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Employee[];
    },
  });
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (employeeData: Omit<Employee, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('employees')
        .insert([employeeData])
        .select()
        .single();
      
      if (error) throw error;
      
      // If user_id is provided, also create/update the profile
      if (employeeData.user_id) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: employeeData.user_id,
            email: employeeData.email,
            first_name: employeeData.first_name,
            last_name: employeeData.last_name,
            department: employeeData.department,
            position: employeeData.position,
            role: 'employee' // Default role
          });
        
        if (profileError) {
          console.warn('Profile update failed:', profileError);
        }
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Employee created successfully');
    },
    onError: (error) => {
      toast.error(`Failed to create employee: ${error.message}`);
    },
  });
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updateData }: Partial<Employee> & { id: string }) => {
      const { data, error } = await supabase
        .from('employees')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      
      // If user_id is provided, also update the profile
      if (updateData.user_id) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: updateData.user_id,
            email: updateData.email,
            first_name: updateData.first_name,
            last_name: updateData.last_name,
            department: updateData.department,
            position: updateData.position
          });
        
        if (profileError) {
          console.warn('Profile update failed:', profileError);
        }
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Employee updated successfully');
    },
    onError: (error) => {
      toast.error(`Failed to update employee: ${error.message}`);
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('employees')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      toast.success('Employee deleted successfully');
    },
    onError: (error) => {
      toast.error(`Failed to delete employee: ${error.message}`);
    },
  });
};

// New hook to fetch available users for assignment
export const useAvailableUsers = () => {
  return useQuery({
    queryKey: ['available-users'],
    queryFn: async () => {
      // First get all auth users from profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email, first_name, last_name');
      
      if (profilesError) throw profilesError;
      
      // Then get all assigned user IDs from employees
      const { data: employees, error: employeesError } = await supabase
        .from('employees')
        .select('user_id')
        .not('user_id', 'is', null);
      
      if (employeesError) throw employeesError;
      
      const assignedUserIds = employees.map(emp => emp.user_id).filter(Boolean);
      
      // Return users that are not yet assigned to employees
      return profiles?.filter(profile => !assignedUserIds.includes(profile.id)) || [];
    },
  });
};
