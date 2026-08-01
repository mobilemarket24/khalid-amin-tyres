import { createClient } from "@supabase/supabase-js";

// سایز تایرهای موجود را در زمان build از Supabase می‌خواند تا جستجوی سایز
// آبشاری (عرض → فقط ارتفاع‌های موجود → فقط رینگ‌های موجود) و نمایش موجودی
// واقعی ممکن شود. نتیجه در سطح ماژول memoize می‌شود (یک کوئری برای کل build).

export interface TyreMatch {
  slug: string;
  title: string;
  price: number | null;
  priceVisible: boolean;
  image: string;
  availability: Record<string, string>; // branch_id -> status
}

export interface TyreSizeIndex {
  widths: number[];
  // width -> height -> rims[]
  tree: Record<string, Record<string, number[]>>;
  // "215/55R17" -> matching products
  matches: Record<string, TyreMatch[]>;
}

let promise: Promise<TyreSizeIndex> | null = null;

function parseSize(p: any): { w: number; h: number; r: number } | null {
  const s = String(p.size_display || "");
  const m = s.match(/(\d{2,3})\s*\/\s*(\d{2,3})\s*[rR]?\s*(\d{2})/);
  if (m) return { w: Number(m[1]), h: Number(m[2]), r: Number(m[3]) };

  const w = Number(p.tire_width);
  const h = Number(p.tire_profile);
  const r = Number(p.tire_rim_diameter);
  if (w && h && r) return { w, h, r: Math.round(r) };

  return null;
}

async function load(): Promise<TyreSizeIndex> {
  const empty: TyreSizeIndex = { widths: [], tree: {}, matches: {} };

  const url = import.meta.env.PUBLIC_SUPABASE_URL;
  const key = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return empty;

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });

  const { data, error } = await supabase
    .from("products")
    .select(`
      slug, title, size_display,
      tire_width, tire_profile, tire_rim_diameter,
      price, price_aed, price_visible, product_type, status,
      product_images ( image_url, is_primary ),
      product_branch_availability ( branch_id, availability_status )
    `)
    .eq("status", "active")
    .eq("product_type", "tyre");

  if (error || !data) return empty;

  const setTree: Record<string, Record<string, Set<number>>> = {};
  const matches: Record<string, TyreMatch[]> = {};

  for (const p of data) {
    const size = parseSize(p);
    if (!size) continue;
    const { w, h, r } = size;

    (setTree[w] ??= {});
    (setTree[w][h] ??= new Set<number>()).add(r);

    const images = p.product_images || [];
    const primary = images.find((i: any) => i.is_primary) || images[0];

    const availability: Record<string, string> = {};
    for (const row of p.product_branch_availability || []) {
      availability[row.branch_id] = row.availability_status;
    }

    const key = `${w}/${h}R${r}`;
    (matches[key] ??= []).push({
      slug: p.slug,
      title: p.title,
      price: (p.price ?? p.price_aed) ?? null,
      priceVisible: p.price_visible !== false,
      image: primary?.image_url || "",
      availability,
    });
  }

  const tree: Record<string, Record<string, number[]>> = {};
  for (const w of Object.keys(setTree)) {
    tree[w] = {};
    for (const h of Object.keys(setTree[w])) {
      tree[w][h] = [...setTree[w][h]].sort((a, b) => a - b);
    }
  }

  const widths = Object.keys(setTree)
    .map(Number)
    .sort((a, b) => a - b);

  return { widths, tree, matches };
}

export function getTyreSizeIndex(): Promise<TyreSizeIndex> {
  if (!promise) promise = load();
  return promise;
}
