
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getStorageData, addToStorage, updateInStorage } from '@/lib/localStorage';
import { initializeMockData } from '@/lib/mockData';

export interface Expense {
  id: string;
  employee_id: string;
  expense_type: string;
  amount: number;
  currency: string;
  description: string;
  expense_date: string;
  receipt_url?: string;
  status: 'pending' | 'approved' | 'rejected' | 'reimbursed';
  approved_by?: string;
  approved_at?: string;
  comments?: string;
  created_at: string;
  updated_at: string;
}

export const useExpenses = () => {
  return useQuery({
    queryKey: ['expenses'],
    queryFn: async () => {
      initializeMockData();
      const expenses = getStorageData<Expense>('expenses');
      const employees = getStorageData<any>('employees');
      
      // Simulate joining with employee data
      return expenses.map(expense => ({
        ...expense,
        employees: employees.find(emp => emp.id === expense.employee_id) || null
      }));
    },
  });
};

export const useCreateExpense = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (expenseData: Omit<Expense, 'id' | 'created_at' | 'updated_at' | 'status'>) => {
      const newExpense = addToStorage<Expense>('expenses', {
        ...expenseData,
        status: 'pending' as const
      });
      return newExpense;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      toast.success('Expense submitted successfully');
    },
    onError: (error) => {
      toast.error(`Failed to submit expense: ${error.message}`);
    },
  });
};

export const useUpdateExpense = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updateData }: Partial<Expense> & { id: string }) => {
      const updatedExpense = updateInStorage<Expense>('expenses', id, updateData);
      if (!updatedExpense) throw new Error('Expense not found');
      return updatedExpense;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      toast.success('Expense updated successfully');
    },
    onError: (error) => {
      toast.error(`Failed to update expense: ${error.message}`);
    },
  });
};
