-- Run this migration against the project's Supabase database.
-- All policies are recreated so the migration is safe to re-run.

do $$
begin
  create type public.app_role as enum (
    'admin',
    'pastor',
    'trustee',
    'deacon',
    'music_director',
    'media_director',
    'member'
  );
exception
  when duplicate_object then null;
end
$$;

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  assigned_at timestamptz not null default now(),
  assigned_by uuid references auth.users(id) on delete set null,
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

drop policy if exists "Users can read their own roles" on public.user_roles;
create policy "Users can read their own roles"
  on public.user_roles for select
  to authenticated
  using (user_id = auth.uid());

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_date timestamptz not null,
  event_type text,
  location text,
  is_published boolean not null default false,
  created_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.media_content (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  media_type text not null,
  file_url text,
  thumbnail_url text,
  duration numeric,
  is_published boolean not null default false,
  created_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  publish_date timestamptz,
  is_published boolean not null default false,
  created_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.archived_services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  service_date date not null,
  video_url text,
  thumbnail_url text,
  duration_seconds integer,
  is_published boolean not null default false,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = auth.uid()
      and role in ('admin', 'pastor', 'deacon', 'media_director', 'music_director', 'trustee')
  );
$$;

revoke all on function public.is_staff() from public;
grant execute on function public.is_staff() to authenticated;

alter table public.events enable row level security;
alter table public.media_content enable row level security;
alter table public.announcements enable row level security;
alter table public.archived_services enable row level security;

drop policy if exists "Published events are public" on public.events;
create policy "Published events are public"
  on public.events for select
  to anon, authenticated
  using (coalesce(is_published, false) = true);

drop policy if exists "Staff manage events" on public.events;
create policy "Staff manage events"
  on public.events for all
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

drop policy if exists "Published media is public" on public.media_content;
create policy "Published media is public"
  on public.media_content for select
  to anon, authenticated
  using (coalesce(is_published, false) = true);

drop policy if exists "Staff manage media" on public.media_content;
create policy "Staff manage media"
  on public.media_content for all
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

drop policy if exists "Published announcements are public" on public.announcements;
create policy "Published announcements are public"
  on public.announcements for select
  to anon, authenticated
  using (coalesce(is_published, false) = true);

drop policy if exists "Staff manage announcements" on public.announcements;
create policy "Staff manage announcements"
  on public.announcements for all
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

drop policy if exists "Published archived services are public" on public.archived_services;
create policy "Published archived services are public"
  on public.archived_services for select
  to anon, authenticated
  using (coalesce(is_published, false) = true);

drop policy if exists "Staff manage archived services" on public.archived_services;
create policy "Staff manage archived services"
  on public.archived_services for all
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media',
  'media',
  true,
  52428800,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can read media files" on storage.objects;
create policy "Public can read media files"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'media');

drop policy if exists "Staff can upload media files" on storage.objects;
create policy "Staff can upload media files"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media' and public.is_staff());

drop policy if exists "Staff can update media files" on storage.objects;
create policy "Staff can update media files"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media' and public.is_staff())
  with check (bucket_id = 'media' and public.is_staff());

drop policy if exists "Staff can delete media files" on storage.objects;
create policy "Staff can delete media files"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media' and public.is_staff());
