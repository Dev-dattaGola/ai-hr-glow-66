
-- Add user_id column to employees table to link with auth users
ALTER TABLE employees 
ADD COLUMN user_id UUID REFERENCES auth.users(id);

-- Create index for better performance
CREATE INDEX idx_employees_user_id ON employees(user_id);

-- Add RLS policy to allow users to view employees linked to their user_id
CREATE POLICY "Users can view linked employee records" 
  ON employees 
  FOR SELECT 
  USING (user_id = auth.uid());

-- Update existing RLS policies to include user_id access
DROP POLICY IF EXISTS "Employees can view their own record" ON employees;
CREATE POLICY "Employees can view their own record" 
  ON employees 
  FOR SELECT 
  USING (id = get_current_employee_id() OR user_id = auth.uid());
