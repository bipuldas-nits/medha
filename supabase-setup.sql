-- Medha database setup for Supabase
-- Paste this whole file into Supabase → SQL Editor → New query, then press Run.
-- It is safe to run more than once.
--
-- Who can see what (enforced by the database itself, not by the app):
--   • A teacher sees and manages only the classes they created, their students and their lectures.
--   • A student can ask to join a class with its code, and can read its lectures only after
--     the teacher approves them.
--   • Signed-out visitors can read nothing.

-- ---------- tables ----------
create table if not exists public.classes (
  id          uuid primary key default gen_random_uuid(),
  teacher_id  uuid not null default auth.uid() references auth.users on delete cascade,
  name        text not null check (char_length(name) between 1 and 120),
  code        text not null unique default upper(substr(md5(random()::text || clock_timestamp()::text), 1, 6)),
  created_at  timestamptz not null default now()
);

create table if not exists public.memberships (
  class_id     uuid not null references public.classes on delete cascade,
  student_id   uuid not null references auth.users on delete cascade,
  student_name text not null check (char_length(student_name) between 1 and 100),
  roll_no      text check (char_length(roll_no) <= 40),
  email        text,
  status       text not null default 'pending' check (status in ('pending','approved','removed')),
  requested_at timestamptz not null default now(),
  decided_at   timestamptz,
  primary key (class_id, student_id)
);

create table if not exists public.lectures (
  id           uuid primary key default gen_random_uuid(),
  class_id     uuid not null references public.classes on delete cascade,
  teacher_id   uuid not null default auth.uid() references auth.users on delete cascade,
  local_id     text not null,
  title        text,
  lecture_date date,
  data         jsonb,
  html         text,
  published_at timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (class_id, local_id)
);

create index if not exists memberships_student_idx on public.memberships (student_id);
create index if not exists lectures_class_idx on public.lectures (class_id, published_at desc);

-- ---------- helper checks (run with owner rights so policies never loop) ----------
create or replace function public.is_class_teacher(cid uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.classes where id = cid and teacher_id = auth.uid());
$$;

create or replace function public.is_approved_member(cid uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.memberships
                 where class_id = cid and student_id = auth.uid() and status = 'approved');
$$;

-- ---------- joining a class by its code ----------
create or replace function public.join_class(p_code text, p_name text, p_roll text default null)
returns json language plpgsql security definer set search_path = public as $$
declare c public.classes%rowtype;
begin
  if auth.uid() is null then raise exception 'Sign in first'; end if;
  if coalesce(trim(p_name), '') = '' then raise exception 'Enter your name'; end if;
  select * into c from public.classes where code = upper(trim(p_code));
  if not found then raise exception 'No class has that code. Check it with your teacher.'; end if;
  if c.teacher_id = auth.uid() then raise exception 'You are the teacher of this class'; end if;
  insert into public.memberships (class_id, student_id, student_name, roll_no, email, status)
  values (c.id, auth.uid(), left(trim(p_name), 100), left(nullif(trim(p_roll), ''), 40), auth.jwt() ->> 'email', 'pending')
  on conflict (class_id, student_id) do update
    set student_name = excluded.student_name,
        roll_no      = excluded.roll_no,
        status       = case when public.memberships.status = 'approved' then 'approved' else 'pending' end,
        requested_at = now();
  return json_build_object('class_id', c.id, 'name', c.name);
end $$;

-- ---------- row level security ----------
alter table public.classes     enable row level security;
alter table public.memberships enable row level security;
alter table public.lectures    enable row level security;

drop policy if exists "teacher manages own classes" on public.classes;
create policy "teacher manages own classes" on public.classes
  for all to authenticated using (teacher_id = auth.uid()) with check (teacher_id = auth.uid());

drop policy if exists "students see classes they asked to join" on public.classes;
create policy "students see classes they asked to join" on public.classes
  for select to authenticated using (exists (
    select 1 from public.memberships m where m.class_id = classes.id and m.student_id = auth.uid()));

drop policy if exists "see own requests or own class roster" on public.memberships;
create policy "see own requests or own class roster" on public.memberships
  for select to authenticated using (student_id = auth.uid() or public.is_class_teacher(class_id));

drop policy if exists "teacher approves or removes" on public.memberships;
create policy "teacher approves or removes" on public.memberships
  for update to authenticated using (public.is_class_teacher(class_id)) with check (public.is_class_teacher(class_id));

drop policy if exists "student leaves or teacher deletes" on public.memberships;
create policy "student leaves or teacher deletes" on public.memberships
  for delete to authenticated using (student_id = auth.uid() or public.is_class_teacher(class_id));

drop policy if exists "teacher manages own lectures" on public.lectures;
create policy "teacher manages own lectures" on public.lectures
  for all to authenticated using (teacher_id = auth.uid())
  with check (teacher_id = auth.uid() and public.is_class_teacher(class_id));

drop policy if exists "approved students read lectures" on public.lectures;
create policy "approved students read lectures" on public.lectures
  for select to authenticated using (public.is_approved_member(class_id));

-- ---------- privileges ----------
revoke all on public.classes, public.memberships, public.lectures from anon;
-- joining happens only through join_class(); teachers may change only the status of a request
revoke insert, update on public.memberships from authenticated;
grant select, delete on public.memberships to authenticated;
grant update (status, decided_at) on public.memberships to authenticated;
grant select, insert, update, delete on public.classes, public.lectures to authenticated;

revoke execute on function public.join_class(text, text, text), public.is_class_teacher(uuid), public.is_approved_member(uuid) from public, anon;
grant execute on function public.join_class(text, text, text), public.is_class_teacher(uuid), public.is_approved_member(uuid) to authenticated;
