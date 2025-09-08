
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getStorageData, addToStorage, updateInStorage } from '@/lib/localStorage';
import { initializeMockData } from '@/lib/mockData';

export interface AttendanceRecord {
  id: string;
  employee_id: string;
  date: string;
  clock_in?: string;
  clock_out?: string;
  break_start?: string;
  break_end?: string;
  total_hours?: number;
  status: 'present' | 'absent' | 'late' | 'half_day';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export const useAttendance = (employeeId?: string) => {
  return useQuery({
    queryKey: ['attendance', employeeId],
    queryFn: async () => {
      initializeMockData();
      let attendance = getStorageData<AttendanceRecord>('attendance');
      const employees = getStorageData<any>('employees');
      
      if (employeeId) {
        attendance = attendance.filter(record => record.employee_id === employeeId);
      }
      
      // Simulate joining with employee data
      return attendance.map(record => ({
        ...record,
        employees: employees.find(emp => emp.id === record.employee_id) || null
      }));
    },
  });
};

export const useCreateAttendance = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (attendanceData: Omit<AttendanceRecord, 'id' | 'created_at' | 'updated_at'>) => {
      const newAttendance = addToStorage<AttendanceRecord>('attendance', attendanceData);
      return newAttendance;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
      toast.success('Attendance recorded successfully');
    },
    onError: (error) => {
      toast.error(`Failed to record attendance: ${error.message}`);
    },
  });
};

export const useUpdateAttendance = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updateData }: Partial<AttendanceRecord> & { id: string }) => {
      const updatedAttendance = updateInStorage<AttendanceRecord>('attendance', id, updateData);
      if (!updatedAttendance) throw new Error('Attendance record not found');
      return updatedAttendance;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
      toast.success('Attendance updated successfully');
    },
    onError: (error) => {
      toast.error(`Failed to update attendance: ${error.message}`);
    },
  });
};
