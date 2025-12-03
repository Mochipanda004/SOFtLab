-- Profiles y roles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  role text check (role in ('admin','teacher','student')) default 'student',
  avatar_url text,
  created_at timestamp with time zone default now()
);

-- Cursos
create table if not exists public.courses (
  id text primary key,
  title text not null,
  instrument text not null,
  level text not null,
  modality text not null,
  image_url text,
  instructor_id uuid references public.profiles(id),
  schedule_text text,
  price integer not null,
  capacity integer not null default 0,
  max_capacity integer not null default 0,
  duration_months integer,
  certification_included boolean default false,
  materials_included integer default 0,
  available boolean default true,
  description text,
  created_at timestamp with time zone default now()
);

create table if not exists public.course_learning (
  id bigserial primary key,
  course_id text references public.courses(id) on delete cascade,
  item_text text not null,
  sort_order integer default 0
);

create table if not exists public.course_program (
  id bigserial primary key,
  course_id text references public.courses(id) on delete cascade,
  item_text text not null,
  sort_order integer default 0
);

create table if not exists public.course_requirements (
  id bigserial primary key,
  course_id text references public.courses(id) on delete cascade,
  item_text text not null,
  sort_order integer default 0
);

-- Inscripciones y lista de espera
create table if not exists public.enrollments (
  id bigserial primary key,
  course_id text references public.courses(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  status text check (status in ('active','completed','cancelled')) default 'active',
  enrolled_at timestamp with time zone default now()
);

create table if not exists public.waitlists (
  id bigserial primary key,
  course_id text references public.courses(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  joined_at timestamp with time zone default now()
);

-- Trigger para nuevos usuarios
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', ''), 'student')
  on conflict (id) do nothing;
  return new;
end;$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- RLS y políticas
alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.course_learning enable row level security;
alter table public.course_program enable row level security;
alter table public.course_requirements enable row level security;
alter table public.enrollments enable row level security;
alter table public.waitlists enable row level security;

-- profiles: owner puede ver su fila; admin todo
create policy profiles_owner_select on public.profiles for select using (auth.uid() = id or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
create policy profiles_owner_update on public.profiles for update using (auth.uid() = id or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- courses: lectura pública; escritura admin
create policy courses_public_select on public.courses for select using (true);
create policy courses_admin_write on public.courses for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- course_*: lectura pública; escritura admin
create policy course_learning_public_select on public.course_learning for select using (true);
create policy course_learning_admin_write on public.course_learning for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
create policy course_program_public_select on public.course_program for select using (true);
create policy course_program_admin_write on public.course_program for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));
create policy course_requirements_public_select on public.course_requirements for select using (true);
create policy course_requirements_admin_write on public.course_requirements for all using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin'));

-- enrollments: dueño y admin/teacher por curso
create policy enrollments_owner_select on public.enrollments for select using (user_id = auth.uid() or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','teacher')));
create policy enrollments_owner_insert on public.enrollments for insert with check (user_id = auth.uid());

-- waitlists: dueño y admin/teacher por curso
create policy waitlists_owner_select on public.waitlists for select using (user_id = auth.uid() or exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','teacher')));
create policy waitlists_owner_insert on public.waitlists for insert with check (user_id = auth.uid());

