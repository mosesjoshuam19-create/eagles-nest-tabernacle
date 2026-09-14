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

create table if not exists public.leaders (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  position text not null,
  category text not null default 'ministers',
  description text,
  biography text not null,
  responsibility text,
  image_url text,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.leaders alter column created_by drop not null;

insert into public.leaders (
  id, name, position, category, description, biography, responsibility, sort_order, is_published
)
values
  ('00000000-0000-0000-0000-000000000101', 'Pastor Leslie Mkandawire', 'Pastor', 'pastor',
   'Lead Pastor emphasizing balanced ministry approach',
   'Pastor Leslie Mkandawire has always emphasized a balanced approach to ministry. Teaching on being born again in Christ Jesus, character, relationship with Christ, family, marriage and reaching beyond the walls of our church to spread the Message of the Hour worldwide. His ministry focuses on practical Christian living while maintaining the fundamental truths of the End Time Message.',
   null, 1, true),
  ('00000000-0000-0000-0000-000000000102', 'Brother Timothy Tcheleni', 'Chairman of the Board', 'deacons',
   'Chairman of the Deacon Board',
   'Brother Timothy Tcheleni serves as the Chairman of the Board of Deacons. He is a Holy Spirit filled man who acts in an office of spiritual assistance to the pastors, responsible for benefits that bless the general and spiritual welfare of the church.',
   null, 2, true),
  ('00000000-0000-0000-0000-000000000103', 'Brother Joseph Mkandgo', 'Deacon', 'deacons',
   'Deacon serving the church',
   'Brother Joseph Mkandgo is one of our seven Holy Spirit filled deacons who serve in spiritual assistance to the pastors, working for the general and spiritual welfare of our church community.',
   null, 3, true),
  ('00000000-0000-0000-0000-000000000104', 'Brother Precious Chitsulo', 'Deacon', 'deacons',
   'Deacon serving the church',
   'Brother Precious Chitsulo serves as a deacon, dedicated to the spiritual assistance of our pastoral team and the welfare of our church congregation.',
   null, 4, true),
  ('00000000-0000-0000-0000-000000000105', 'Brother Henderson Chihana', 'Deacon', 'deacons',
   'Deacon serving the church',
   'Brother Henderson Chihana is a faithful deacon who works alongside our pastoral team to ensure the spiritual and general welfare of our church community.',
   null, 5, true),
  ('00000000-0000-0000-0000-000000000106', 'Brother Yamikani Nkhalango', 'Deacon', 'deacons',
   'Deacon serving the church',
   'Brother Yamikani Nkhalango serves our church as a deacon, providing spiritual assistance and working for the benefit of our church family.',
   null, 6, true),
  ('00000000-0000-0000-0000-000000000107', 'Brother Wesley', 'Deacon', 'deacons',
   'Deacon serving the church',
   'Brother Wesley is one of our dedicated deacons who serves in spiritual assistance to our pastors and works for the welfare of our church.',
   null, 7, true),
  ('00000000-0000-0000-0000-000000000108', 'Brother Rhodwell Mphonde', 'Deacon - Chibakha Church', 'deacons',
   'Responsible for Chibakha Church',
   'Brother Rhodwell Mphonde serves as a deacon with special responsibility for our Chibakha satellite church, ensuring the spiritual welfare of that congregation.',
   'Chibakha Church', 8, true),
  ('00000000-0000-0000-0000-000000000109', 'Brother Portphar Damiano Mwale', 'Chairman of the Board of Trustees', 'trustees',
   'Chairman overseeing church welfare',
   'Brother Portphar Damiano Mwale serves as Chairman of the Board of Trustees. The trustees are the body of men that oversee the welfare of the church as a business group, elected to protect the church in its financial matters, business investments, supervision of properties, and expenditures.',
   null, 9, true),
  ('00000000-0000-0000-0000-000000000110', 'Brother Henry Jack', 'Church Treasurer', 'trustees',
   'Managing church finances',
   'Brother Henry Jack serves as our Church Treasurer, responsible for managing the financial affairs of the church and ensuring proper stewardship of God''s resources.',
   null, 10, true),
  ('00000000-0000-0000-0000-000000000111', 'Brother Paul Mnelemba', 'Trustee', 'trustees',
   'Trustee serving the church',
   'Brother Paul Mnelemba serves as a trustee, helping to oversee the welfare of the church in its business matters and financial stewardship.',
   null, 11, true)
on conflict (id) do nothing;

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
alter table public.leaders enable row level security;

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

drop policy if exists "Published leaders are public" on public.leaders;
create policy "Published leaders are public"
  on public.leaders for select
  to anon, authenticated
  using (coalesce(is_published, false) = true);

drop policy if exists "Staff manage leaders" on public.leaders;
create policy "Staff manage leaders"
  on public.leaders for all
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

create index if not exists events_published_date_idx
  on public.events (is_published, event_date);
create index if not exists media_content_published_type_idx
  on public.media_content (is_published, media_type, created_at desc);
create index if not exists announcements_published_date_idx
  on public.announcements (is_published, publish_date desc);
create index if not exists leaders_published_category_idx
  on public.leaders (is_published, category, sort_order);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists events_set_updated_at on public.events;
create trigger events_set_updated_at
before update on public.events
for each row execute function public.set_updated_at();

drop trigger if exists media_content_set_updated_at on public.media_content;
create trigger media_content_set_updated_at
before update on public.media_content
for each row execute function public.set_updated_at();

drop trigger if exists announcements_set_updated_at on public.announcements;
create trigger announcements_set_updated_at
before update on public.announcements
for each row execute function public.set_updated_at();

drop trigger if exists leaders_set_updated_at on public.leaders;
create trigger leaders_set_updated_at
before update on public.leaders
for each row execute function public.set_updated_at();

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
