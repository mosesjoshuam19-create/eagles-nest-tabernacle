# Supabase setup

## Vercel environment variables

Add these variables to the Vercel project for Production, Preview, and Development:

```text
VITE_SUPABASE_URL=https://gveiphxqgtgkswmzjbzc.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<Supabase anon/public key>
```

The publishable key is available in Supabase under **Project Settings >
API**. Do not use the `service_role` key in the frontend or in Vercel.

## Database and storage

Run the migration in
`supabase/migrations/20260914130000_security_and_media.sql` using the Supabase
SQL Editor or the Supabase CLI. It:

- enables RLS on public content tables
- allows anonymous visitors to read published content only
- allows authenticated staff roles to manage content
- creates/configures the public `media` storage bucket
- limits media uploads to approved image/video types and 50 MB

After running the migration, create or assign an `admin` or
`media_director` role in `public.user_roles` for users who need to manage
content.
