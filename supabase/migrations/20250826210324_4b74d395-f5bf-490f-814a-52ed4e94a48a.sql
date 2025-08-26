
-- Create employees table
CREATE TABLE public.employees (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  department TEXT NOT NULL,
  position TEXT NOT NULL,
  hire_date DATE NOT NULL,
  salary DECIMAL(10,2),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'on_leave')),
  manager_id UUID REFERENCES public.employees(id),
  avatar_url TEXT,
  address TEXT,
  emergency_contact TEXT,
  emergency_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Create leave_requests table
CREATE TABLE public.leave_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID REFERENCES public.employees(id) NOT NULL,
  leave_type TEXT NOT NULL CHECK (leave_type IN ('vacation', 'sick', 'personal', 'maternity', 'paternity')),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  days_requested INTEGER NOT NULL,
  reason TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  approved_by UUID REFERENCES public.employees(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create attendance table
CREATE TABLE public.attendance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID REFERENCES public.employees(id) NOT NULL,
  date DATE NOT NULL,
  clock_in TIME,
  clock_out TIME,
  break_start TIME,
  break_end TIME,
  total_hours DECIMAL(4,2),
  status TEXT DEFAULT 'present' CHECK (status IN ('present', 'absent', 'late', 'half_day')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(employee_id, date)
);

-- Create payroll table
CREATE TABLE public.payroll (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID REFERENCES public.employees(id) NOT NULL,
  pay_period_start DATE NOT NULL,
  pay_period_end DATE NOT NULL,
  base_salary DECIMAL(10,2) NOT NULL,
  overtime_hours DECIMAL(4,2) DEFAULT 0,
  overtime_rate DECIMAL(10,2) DEFAULT 0,
  bonus DECIMAL(10,2) DEFAULT 0,
  deductions DECIMAL(10,2) DEFAULT 0,
  gross_pay DECIMAL(10,2) NOT NULL,
  tax_deductions DECIMAL(10,2) NOT NULL,
  net_pay DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'processed', 'paid')),
  processed_by UUID REFERENCES auth.users(id),
  processed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create performance_reviews table
CREATE TABLE public.performance_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID REFERENCES public.employees(id) NOT NULL,
  reviewer_id UUID REFERENCES public.employees(id) NOT NULL,
  review_period_start DATE NOT NULL,
  review_period_end DATE NOT NULL,
  overall_rating INTEGER CHECK (overall_rating >= 1 AND overall_rating <= 5),
  goals TEXT,
  achievements TEXT,
  areas_for_improvement TEXT,
  reviewer_comments TEXT,
  employee_comments TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create training_records table
CREATE TABLE public.training_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID REFERENCES public.employees(id) NOT NULL,
  training_name TEXT NOT NULL,
  training_type TEXT NOT NULL,
  provider TEXT,
  start_date DATE NOT NULL,
  completion_date DATE,
  status TEXT DEFAULT 'enrolled' CHECK (status IN ('enrolled', 'in_progress', 'completed', 'cancelled')),
  score DECIMAL(5,2),
  certificate_url TEXT,
  cost DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create expenses table
CREATE TABLE public.expenses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID REFERENCES public.employees(id) NOT NULL,
  expense_type TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  description TEXT NOT NULL,
  expense_date DATE NOT NULL,
  receipt_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'reimbursed')),
  approved_by UUID REFERENCES public.employees(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payroll ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_id AND role = 'admin'
  );
$$;

-- Create security definer function to get current user's employee record
CREATE OR REPLACE FUNCTION public.get_current_employee_id()
RETURNS UUID
LANGUAGE SQL
SECURITY DEFINER
STABLE
AS $$
  SELECT e.id FROM public.employees e
  JOIN public.profiles p ON p.email = e.email
  WHERE p.id = auth.uid();
$$;

-- RLS Policies for employees table
CREATE POLICY "Admins can manage all employees"
  ON public.employees FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Employees can view their own record"
  ON public.employees FOR SELECT
  TO authenticated
  USING (id = public.get_current_employee_id());

-- RLS Policies for leave_requests table
CREATE POLICY "Admins can manage all leave requests"
  ON public.leave_requests FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Employees can manage their own leave requests"
  ON public.leave_requests FOR ALL
  TO authenticated
  USING (employee_id = public.get_current_employee_id());

-- RLS Policies for attendance table
CREATE POLICY "Admins can manage all attendance"
  ON public.attendance FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Employees can view their own attendance"
  ON public.attendance FOR SELECT
  TO authenticated
  USING (employee_id = public.get_current_employee_id());

-- RLS Policies for payroll table
CREATE POLICY "Admins can manage all payroll"
  ON public.payroll FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Employees can view their own payroll"
  ON public.payroll FOR SELECT
  TO authenticated
  USING (employee_id = public.get_current_employee_id());

-- RLS Policies for performance_reviews table
CREATE POLICY "Admins can manage all performance reviews"
  ON public.performance_reviews FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Employees can view their own reviews"
  ON public.performance_reviews FOR SELECT
  TO authenticated
  USING (employee_id = public.get_current_employee_id() OR reviewer_id = public.get_current_employee_id());

-- RLS Policies for training_records table
CREATE POLICY "Admins can manage all training records"
  ON public.training_records FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Employees can view their own training"
  ON public.training_records FOR SELECT
  TO authenticated
  USING (employee_id = public.get_current_employee_id());

-- RLS Policies for expenses table
CREATE POLICY "Admins can manage all expenses"
  ON public.expenses FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Employees can manage their own expenses"
  ON public.expenses FOR ALL
  TO authenticated
  USING (employee_id = public.get_current_employee_id());

-- Create indexes for better performance
CREATE INDEX idx_employees_email ON public.employees(email);
CREATE INDEX idx_employees_department ON public.employees(department);
CREATE INDEX idx_employees_status ON public.employees(status);
CREATE INDEX idx_leave_requests_employee ON public.leave_requests(employee_id);
CREATE INDEX idx_leave_requests_status ON public.leave_requests(status);
CREATE INDEX idx_attendance_employee_date ON public.attendance(employee_id, date);
CREATE INDEX idx_payroll_employee ON public.payroll(employee_id);
CREATE INDEX idx_performance_reviews_employee ON public.performance_reviews(employee_id);
CREATE INDEX idx_training_records_employee ON public.training_records(employee_id);
CREATE INDEX idx_expenses_employee ON public.expenses(employee_id);
CREATE INDEX idx_expenses_status ON public.expenses(status);

-- Update the profiles table role to include HR roles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS department TEXT,
ADD COLUMN IF NOT EXISTS position TEXT;

-- Update the existing trigger to handle department and position
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
begin
  insert into public.profiles (id, first_name, last_name, email, department, position)
  values (
    new.id,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name',
    new.email,
    new.raw_user_meta_data ->> 'department',
    new.raw_user_meta_data ->> 'position'
  );
  return new;
end;
$$;
