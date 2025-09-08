
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getStorageData, addToStorage, updateInStorage, deleteFromStorage } from '@/lib/localStorage';
import { initializeMockData } from '@/lib/mockData';

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
  user_id?: string;
}

export const useEmployees = () => {
  return useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      initializeMockData();
      return getStorageData<Employee>('employees');
    },
  });
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (employeeData: Omit<Employee, 'id' | 'created_at' | 'updated_at'>) => {
      const newEmployee = addToStorage<Employee>('employees', employeeData);
      return newEmployee;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      queryClient.invalidateQueries({ queryKey: ['available-users'] });
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
      const updatedEmployee = updateInStorage<Employee>('employees', id, updateData);
      if (!updatedEmployee) throw new Error('Employee not found');
      return updatedEmployee;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      queryClient.invalidateQueries({ queryKey: ['available-users'] });
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
      const success = deleteFromStorage<Employee>('employees', id);
      if (!success) throw new Error('Employee not found');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      queryClient.invalidateQueries({ queryKey: ['available-users'] });
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
      // Return mock available users for demo
      return [
        { id: 'user-1', email: 'available1@company.com', first_name: 'Available', last_name: 'User1' },
        { id: 'user-2', email: 'available2@company.com', first_name: 'Available', last_name: 'User2' }
      ];
    },
  });
};
