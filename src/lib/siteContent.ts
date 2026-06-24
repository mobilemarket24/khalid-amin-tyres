import { createClient } from "@supabase/supabase-js";

// محتوای پویا (site_texts / site_images) را در زمان build از Supabase می‌گیرد
// و سمت سرور رندر می‌کند تا در HTML نهایی باشد (برای سئو و حذف پرشِ محتوا).
//
// کل build فقط دو کوئری می‌زند: نتیجه در سطح ماژول memoize می‌شود و بین همه‌ی
// کامپوننت‌ها و صفحات به اشتراک گذاشته می‌شود.

interface SiteImage {
  image_url: string;
  alt_text: string | null;
}

type TextMap = Map<string, string>;
type ImageMap = Map<string, SiteImage>;

let textsPromise: Promise<TextMap> | null = null;
let imagesPromise: Promise<ImageMap> | null = null;

function getClient() {
  const url = import.meta.env.PUBLIC_SUPABASE_URL;
  const key = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}

async function loadTexts(): Promise<TextMap> {
  const map: TextMap = new Map();
  const supabase = getClient();
  if (!supabase) return map;

  const { data, error } = await supabase
    .from("site_texts")
    .select("text_key, text_value")
    .eq("is_active", true);

  if (error || !data) return map;

  for (const row of data) {
    if (row.text_key) map.set(row.text_key, row.text_value);
  }

  return map;
}

async function loadImages(): Promise<ImageMap> {
  const map: ImageMap = new Map();
  const supabase = getClient();
  if (!supabase) return map;

  const { data, error } = await supabase
    .from("site_images")
    .select("image_key, image_url, alt_text")
    .eq("is_active", true);

  if (error || !data) return map;

  for (const row of data) {
    if (row.image_key && row.image_url) {
      map.set(row.image_key, { image_url: row.image_url, alt_text: row.alt_text });
    }
  }

  return map;
}

/** متنِ پویا را برمی‌گرداند؛ اگر کلید نبود، fallback. */
export async function getSiteText(key: string, fallback: string): Promise<string> {
  if (!textsPromise) textsPromise = loadTexts();
  const map = await textsPromise;
  return map.get(key) ?? fallback;
}

/** تصویرِ پویا را برمی‌گرداند؛ اگر کلید نبود، null. */
export async function getSiteImage(key: string): Promise<SiteImage | null> {
  if (!imagesPromise) imagesPromise = loadImages();
  const map = await imagesPromise;
  return map.get(key) ?? null;
}
