# Supabase — امنیت و RLS

این پوشه policyهای امنیتی پایگاه‌داده‌ی پروژه را نگه می‌دارد.

> **چرا مهم است:** کل سایت (عمومی و پنل ادمین) از مرورگر با `PUBLIC_SUPABASE_ANON_KEY`
> به Supabase وصل می‌شود. این کلید عمومی است و در JS سایت قابل دیدن است.
> چک‌کردن session در صفحات `/admin/*` فقط یک redirect سمت مرورگر است و قابل دور زدن.
> **تنها مرز امنیتی واقعی، RLS است.**

## فایل‌ها

- `rls-policies.sql` — ساخت `admin_users` + تابع `is_admin()` + فعال‌کردن RLS و
  تعریف policy برای همه‌ی جداول (`leads`, `products`, `product_images`,
  `product_branch_availability`, `brands`, `site_texts`, `site_images`, `branches`).

## ترتیب اجرا (یک‌بار)

1. در Supabase Dashboard → **SQL Editor**، محتوای `rls-policies.sql` را اجرا کن.
2. در همان فایل، بخش «افزودن ادمین» را با ایمیل واقعی خودت از کامنت خارج و اجرا کن:
   ```sql
   insert into public.admin_users (user_id, email)
   select id, email from auth.users where email = 'YOUR_ADMIN_EMAIL@example.com'
   on conflict (user_id) do nothing;
   ```
3. در **Authentication → Sign In / Providers**، ثبت‌نام عمومی را خاموش کن
   (وگرنه هر کسی می‌تواند حساب بسازد).

## مدل دسترسی

| جدول | کاربر ناشناس (anon) | ادمین (`admin_users`) |
|------|---------------------|------------------------|
| `leads` | فقط INSERT | SELECT / UPDATE / DELETE |
| `products` | SELECT ردیف‌های `status='active'` | کامل |
| `product_images` | SELECT تصاویر محصولات active | کامل |
| `product_branch_availability` | SELECT موجودی محصولات active | کامل |
| `brands` | SELECT `is_active=true` | کامل |
| `site_texts` | SELECT `is_active=true` | کامل |
| `site_images` | SELECT `is_active=true` | کامل |
| `branches` | هیچ | کامل |

## تست بعد از اجرا

با anon key باید بتوانی محصول active بخوانی و لید ثبت کنی، ولی **نباید** بتوانی
`leads` را بخوانی یا محصول/متن/تصویر را تغییر دهی.

بررسی فعال‌بودن RLS روی همه‌ی جداول:
```sql
select relname, relrowsecurity
from pg_class
where relkind = 'r' and relnamespace = 'public'::regnamespace
order by relname;
```
هر جدولی که `relrowsecurity = false` باشد هنوز باز است.

> ⚠️ نام ستون‌ها در `rls-policies.sql` (`product_id`, `status`, `source`, `is_active`)
> باید با schema واقعی جداولت مطابق باشد. قبل از اجرا بررسی کن.
