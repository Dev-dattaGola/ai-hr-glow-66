
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getStorageData, addToStorage, updateInStorage } from '@/lib/localStorage';
import { initializeMockData } from '@/lib/mockData';

export interface LeaveRequest {
  id: string;
  employee_id: string;
  leave_type: 'vacation' | 'sick' | 'personal' | 'maternity' | 'paternity';
  start_date: string;
  end_date: string;
  days_requested: number;
  reason?: string;
  status: 'pending' | 'approved' | 'rejected';
  approved_by?: string;
  approved_at?: string;
  comments?: string;
  created_at: string;
  updated_at: string;
}

export const useLeaveRequests = () => {
  return useQuery({
    queryKey: ['leave-requests'],
    queryFn: async () => {
      initializeMockData();
      const leaveRequests = getStorageData<LeaveRequest>('leave_requests');
      const employees = getStorageData<any>('employees');
      
      // Simulate joining with employee data
      return leaveRequests.map(request => ({
        ...request,
        employees: employees.find(emp => emp.id === request.employee_id) || null
      }));
    },
  });
};

export const useCreateLeaveRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (leaveData: Omit<LeaveRequest, 'id' | 'created_at' | 'updated_at' | 'status'>) => {
      const newLeaveRequest = addToStorage<LeaveRequest>('leave_requests', {
        ...leaveData,
        status: 'pending' as const
      });
      return newLeaveRequest;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leave-requests'] });
      toast.success('Leave request submitted successfully');
    },
    onError: (error) => {
      toast.error(`Failed to submit leave request: ${error.message}`);
    },
  });
};

export const useUpdateLeaveRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updateData }: Partial<LeaveRequest> & { id: string }) => {
      const updatedRequest = updateInStorage<LeaveRequest>('leave_requests', id, updateData);
      if (!updatedRequest) throw new Error('Leave request not found');
      return updatedRequest;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leave-requests'] });
      toast.success('Leave request updated successfully');
    },
    onError: (error) => {
      toast.error(`Failed to update leave request: ${error.message}`);
    },
  });
};
