-- =============================================================================
-- KHALID AMIN TYRES — Supabase RLS Policies
-- =============================================================================
-- هدف: بستن کامل دسترسی‌ها روی anon key عمومی و محدود کردن همه‌ی عملیات ادمین
-- به ادمین‌های واقعی (جدول admin_users)، نه هر کاربر authenticated.
--
-- نحوه‌ی استفاده:
--   1) این فایل را در Supabase Dashboard → SQL Editor باز و اجرا کن.
--   2) سپس بخش "افزودن ادمین" پایین فایل را با ایمیل ادمین واقعی اجرا کن.
--   3) در Authentication → Sign In / Providers، ثبت‌نام عمومی را خاموش کن.
--
-- هشدار: نام ستون‌ها (product_id, status, source, is_active) باید با schema
-- واقعی جداول تو مطابق باشد. در صورت تفاوت، قبل از اجرا اصلاح کن.
--
-- این اسکریپت idempotent است (drop policy if exists قبل از create).
-- =============================================================================


-- =============================================================================
-- 0) پایه: جدول ادمین‌ها + تابع کمکی is_admin()
-- =============================================================================

create table if not exists public.admin_users (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  email      text,
  created_at timestamptz default now()
);

alter table public.admin_users enable row level security;
-- هیچ policyای برای anon/authenticated روی این جدول نمی‌گذاریم.
-- پیش‌فرض RLS = بسته. مدیریت ردیف‌ها فقط با service_role / داشبورد.

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users where user_id = auth.uid()
  );
$$;


-- =============================================================================
-- 1) leads  (حساس‌ترین — داده‌ی شخصی مشتری)
--    anon: فقط INSERT (فرم سایت)   |   admin: SELECT / UPDATE / DELETE
-- =============================================================================

alter table public.leads enable row level security;

drop policy if exists "anon can insert leads"  on public.leads;
drop policy if exists "admin read leads"        on public.leads;
drop policy if exists "admin update leads"      on public.leads;
drop policy if exists "admin delete leads"      on public.leads;

create policy "anon can insert leads"
  on public.leads for insert to anon
  with check (status = 'new' and source = 'website');

create policy "admin read leads"
  on public.leads for select to authenticated
  using (public.is_admin());

create policy "admin update leads"
  on public.leads for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "admin delete leads"
  on public.leads for delete to authenticated
  using (public.is_admin());


-- =============================================================================
-- 2) products
--    anon: SELECT فقط ردیف‌های active   |   admin: کامل
-- =============================================================================

alter table public.products enable row level security;

drop policy if exists "public read active products" on public.products;
drop policy if exists "admin read all products"     on public.products;
drop policy if exists "admin write products"         on public.products;

create policy "public read active products"
  on public.products for select to anon
  using (status = 'active');

create policy "admin read all products"
  on public.products for select to authenticated
  using (public.is_admin());

create policy "admin write products"
  on public.products for all to authenticated
  using (public.is_admin()) with check (public.is_admin());


-- =============================================================================
-- 3) product_images
--    anon: SELECT فقط تصاویر محصولات active (join عمومی)   |   admin: کامل
-- =============================================================================

alter table public.product_images enable row level security;

drop policy if exists "public read images of active products" on public.product_images;
drop policy if exists "admin write product_images"            on public.product_images;

create policy "public read images of active products"
  on public.product_images for select to anon
  using (
    exists (
      select 1 from public.products p
      where p.id = product_images.product_id and p.status = 'active'
    )
  );

create policy "admin write product_images"
  on public.product_images for all to authenticated
  using (public.is_admin()) with check (public.is_admin());


-- =============================================================================
-- 4) product_branch_availability
--    anon: SELECT فقط برای محصولات active (join عمومی)   |   admin: کامل
-- =============================================================================

alter table public.product_branch_availability enable row level security;

drop policy if exists "public read availability of active products" on public.product_branch_availability;
drop policy if exists "admin write availability"                    on public.product_branch_availability;

create policy "public read availability of active products"
  on public.product_branch_availability for select to anon
  using (
    exists (
      select 1 from public.products p
      where p.id = product_branch_availability.product_id and p.status = 'active'
    )
  );

create policy "admin write availability"
  on public.product_branch_availability for all to authenticated
  using (public.is_admin()) with check (public.is_admin());


-- =============================================================================
-- 5) brands
--    anon: SELECT فقط is_active = true   |   admin: کامل
-- =============================================================================

alter table public.brands enable row level security;

drop policy if exists "public read active brands" on public.brands;
drop policy if exists "admin write brands"         on public.brands;

create policy "public read active brands"
  on public.brands for select to anon
  using (is_active = true);

create policy "admin write brands"
  on public.brands for all to authenticated
  using (public.is_admin()) with check (public.is_admin());


-- =============================================================================
-- 6) site_texts
--    anon: SELECT فقط is_active = true   |   admin: کامل
-- =============================================================================

alter table public.site_texts enable row level security;

drop policy if exists "public read active site_texts" on public.site_texts;
drop policy if exists "admin write site_texts"         on public.site_texts;

create policy "public read active site_texts"
  on public.site_texts for select to anon
  using (is_active = true);

create policy "admin write site_texts"
  on public.site_texts for all to authenticated
  using (public.is_admin()) with check (public.is_admin());


-- =============================================================================
-- 7) site_images
--    anon: SELECT فقط is_active = true   |   admin: کامل
-- =============================================================================

alter table public.site_images enable row level security;

drop policy if exists "public read active site_images" on public.site_images;
drop policy if exists "admin write site_images"         on public.site_images;

create policy "public read active site_images"
  on public.site_images for select to anon
  using (is_active = true);

create policy "admin write site_images"
  on public.site_images for all to authenticated
  using (public.is_admin()) with check (public.is_admin());


-- =============================================================================
-- 8) branches  (فقط ادمین — سایت عمومی از src/data/business.ts می‌خواند)
--    anon: هیچ   |   admin: کامل
-- =============================================================================

alter table public.branches enable row level security;

drop policy if exists "admin all branches" on public.branches;

create policy "admin all branches"
  on public.branches for all to authenticated
  using (public.is_admin()) with check (public.is_admin());
-- بدون policy برای anon → کاملاً بسته برای عموم.


-- =============================================================================
-- افزودن ادمین (یک‌بار، با ایمیل واقعی خودت اجرا کن)
-- =============================================================================
-- insert into public.admin_users (user_id, email)
-- select id, email from auth.users where email = 'YOUR_ADMIN_EMAIL@example.com'
-- on conflict (user_id) do nothing;


-- =============================================================================
-- بررسی وضعیت RLS بعد از اجرا
-- =============================================================================
-- select relname, relrowsecurity
-- from pg_class
-- where relkind = 'r' and relnamespace = 'public'::regnamespace
-- order by relname;
-- هر جدولی که relrowsecurity = false باشد هنوز باز است.
