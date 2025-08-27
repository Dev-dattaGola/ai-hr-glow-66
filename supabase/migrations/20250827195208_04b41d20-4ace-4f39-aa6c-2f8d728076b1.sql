
-- 1) Ensure created_by is set automatically so policies can safely rely on it
create or replace function public.set_employee_created_by()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.created_by is null then
    new.created_by := auth.uid();
  end if;
  return new;
end;
$$;

drop trigger if exists trg_set_employee_created_by on public.employees;
create trigger trg_set_employee_created_by
before insert on public.employees
for each row
execute procedure public.set_employee_created_by();

-- 2) Allow admins and HR users to create employees
-- Note: Admins already have ALL via existing policy, this adds HR creation.
create policy "Admins and HR can create employees"
on public.employees
for insert
to authenticated
with check (
  -- Admins
  public.is_admin(auth.uid())
  OR
  -- HR role
  exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role in ('hr', 'admin')
  )
);
