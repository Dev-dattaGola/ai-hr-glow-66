import { Employee } from '@/hooks/useEmployees';
import { Announcement } from '@/hooks/useAnnouncements';
import { Expense } from '@/hooks/useExpenses';
import { LeaveRequest } from '@/hooks/useLeaveRequests';
import { AttendanceRecord } from '@/hooks/useAttendance';

// Initialize mock data if not already present
export const initializeMockData = () => {
  // Initialize employees
  if (!localStorage.getItem('employees')) {
    const mockEmployees: Employee[] = [
      {
        id: '1',
        employee_id: 'EMP001',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@company.com',
        phone: '+1234567890',
        department: 'Engineering',
        position: 'Software Developer',
        hire_date: '2023-01-15',
        salary: 75000,
        status: 'active',
        manager_id: '2',
        avatar_url: '',
        address: '123 Main St, City, State',
        emergency_contact: 'Jane Doe',
        emergency_phone: '+1234567891',
        created_at: '2023-01-15T00:00:00Z',
        updated_at: '2023-01-15T00:00:00Z',
        created_by: 'system'
      },
      {
        id: '2',
        employee_id: 'EMP002',
        first_name: 'Sarah',
        last_name: 'Johnson',
        email: 'sarah.johnson@company.com',
        phone: '+1234567892',
        department: 'Human Resources',
        position: 'HR Manager',
        hire_date: '2022-06-01',
        salary: 85000,
        status: 'active',
        avatar_url: '',
        address: '456 Oak Ave, City, State',
        emergency_contact: 'Mike Johnson',
        emergency_phone: '+1234567893',
        created_at: '2022-06-01T00:00:00Z',
        updated_at: '2022-06-01T00:00:00Z',
        created_by: 'system'
      },
      {
        id: '3',
        employee_id: 'EMP003',
        first_name: 'Mike',
        last_name: 'Wilson',
        email: 'mike.wilson@company.com',
        phone: '+1234567894',
        department: 'Finance',
        position: 'Financial Analyst',
        hire_date: '2023-03-10',
        salary: 70000,
        status: 'active',
        manager_id: '2',
        avatar_url: '',
        address: '789 Pine St, City, State',
        emergency_contact: 'Lisa Wilson',
        emergency_phone: '+1234567895',
        created_at: '2023-03-10T00:00:00Z',
        updated_at: '2023-03-10T00:00:00Z',
        created_by: 'system'
      }
    ];
    localStorage.setItem('employees', JSON.stringify(mockEmployees));
  }

  // Initialize announcements
  if (!localStorage.getItem('announcements')) {
    const mockAnnouncements: Announcement[] = [
      {
        id: '1',
        title: 'Welcome to Q1 2024',
        content: 'We are excited to start the new quarter with new goals and opportunities.',
        type: 'general',
        priority: 'medium',
        created_by: 'HR',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      },
      {
        id: '2',
        title: 'Holiday Schedule Updated',
        content: 'Please review the updated holiday schedule for 2024.',
        type: 'policy',
        priority: 'high',
        created_by: 'HR',
        created_at: '2024-01-02T00:00:00Z',
        updated_at: '2024-01-02T00:00:00Z'
      }
    ];
    localStorage.setItem('announcements', JSON.stringify(mockAnnouncements));
  }

  // Initialize expenses
  if (!localStorage.getItem('expenses')) {
    const mockExpenses: Expense[] = [
      {
        id: '1',
        employee_id: '1',
        expense_type: 'travel',
        amount: 250.50,
        currency: 'USD',
        description: 'Business trip to client meeting',
        expense_date: '2024-01-15',
        status: 'pending',
        created_at: '2024-01-15T00:00:00Z',
        updated_at: '2024-01-15T00:00:00Z'
      },
      {
        id: '2',
        employee_id: '2',
        expense_type: 'office_supplies',
        amount: 45.20,
        currency: 'USD',
        description: 'Office supplies for Q1',
        expense_date: '2024-01-10',
        status: 'approved',
        approved_by: 'admin',
        approved_at: '2024-01-12T00:00:00Z',
        created_at: '2024-01-10T00:00:00Z',
        updated_at: '2024-01-12T00:00:00Z'
      }
    ];
    localStorage.setItem('expenses', JSON.stringify(mockExpenses));
  }

  // Initialize leave requests
  if (!localStorage.getItem('leave_requests')) {
    const mockLeaveRequests: LeaveRequest[] = [
      {
        id: '1',
        employee_id: '1',
        leave_type: 'vacation',
        start_date: '2024-02-15',
        end_date: '2024-02-20',
        days_requested: 5,
        reason: 'Family vacation',
        status: 'pending',
        created_at: '2024-01-20T00:00:00Z',
        updated_at: '2024-01-20T00:00:00Z'
      },
      {
        id: '2',
        employee_id: '3',
        leave_type: 'sick',
        start_date: '2024-01-18',
        end_date: '2024-01-19',
        days_requested: 2,
        reason: 'Medical appointment',
        status: 'approved',
        approved_by: 'hr',
        approved_at: '2024-01-18T00:00:00Z',
        created_at: '2024-01-17T00:00:00Z',
        updated_at: '2024-01-18T00:00:00Z'
      }
    ];
    localStorage.setItem('leave_requests', JSON.stringify(mockLeaveRequests));
  }

  // Initialize attendance records
  if (!localStorage.getItem('attendance')) {
    const mockAttendance: AttendanceRecord[] = [
      {
        id: '1',
        employee_id: '1',
        date: '2024-01-22',
        clock_in: '09:00:00',
        clock_out: '17:30:00',
        total_hours: 8.5,
        status: 'present',
        created_at: '2024-01-22T00:00:00Z',
        updated_at: '2024-01-22T00:00:00Z'
      },
      {
        id: '2',
        employee_id: '2',
        date: '2024-01-22',
        clock_in: '08:30:00',
        clock_out: '17:00:00',
        break_start: '12:00:00',
        break_end: '13:00:00',
        total_hours: 8,
        status: 'present',
        created_at: '2024-01-22T00:00:00Z',
        updated_at: '2024-01-22T00:00:00Z'
      },
      {
        id: '3',
        employee_id: '3',
        date: '2024-01-22',
        clock_in: '09:15:00',
        clock_out: '17:15:00',
        total_hours: 8,
        status: 'late',
        notes: 'Traffic delay',
        created_at: '2024-01-22T00:00:00Z',
        updated_at: '2024-01-22T00:00:00Z'
      }
    ];
    localStorage.setItem('attendance', JSON.stringify(mockAttendance));
  }
};