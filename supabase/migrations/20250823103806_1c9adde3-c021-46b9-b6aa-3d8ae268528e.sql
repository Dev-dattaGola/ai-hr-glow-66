
-- Create profiles table for user data
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  first_name text,
  last_name text,
  email text,
  avatar_url text,
  role text default 'user',
  department text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  primary key (id)
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Create policies
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

-- Create function to handle new user registration
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, first_name, last_name, email)
  values (
    new.id,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name',
    new.email
  );
  return new;
end;
$$;

-- Create trigger for new user registration
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create announcements table
create table public.announcements (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text not null,
  type text default 'general',
  priority text default 'medium',
  created_by uuid references auth.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.announcements enable row level security;

create policy "Users can view announcements" on public.announcements
  for select using (true);

-- Insert sample announcements
insert into public.announcements (title, content, type, priority) values
('Welcome to HR Suite', 'Welcome to our new AI-powered HR management system. Explore all the features available to streamline your HR processes.', 'welcome', 'high'),
('System Maintenance', 'Scheduled maintenance will occur this weekend. All systems will be back online by Monday morning.', 'maintenance', 'medium'),
('New Policy Update', 'Please review the updated employee handbook available in the documents section.', 'policy', 'medium');
