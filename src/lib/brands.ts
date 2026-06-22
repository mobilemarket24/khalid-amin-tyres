import { createClient } from "@supabase/supabase-js";

export interface BrandEntry {
  slug: string;
  name: string;
}

// Hardcoded fallback so the static build never fails if Supabase is unreachable
// at build time. Mirrors the active brands currently in the database.
const FALLBACK_BRANDS: BrandEntry[] = [
  { slug: "michelin", name: "Michelin" },
  { slug: "bridgestone", name: "Bridgestone" },
  { slug: "pirelli", name: "Pirelli" },
  { slug: "continental", name: "Continental" },
  { slug: "yokohama", name: "Yokohama" },
  { slug: "dunlop", name: "Dunlop" },
  { slug: "bfgoodrich", name: "BFGoodrich" },
  { slug: "falken", name: "Falken" },
  { slug: "nexen", name: "Nexen" },
  { slug: "kumho", name: "Kumho" },
  { slug: "hankook", name: "Hankook" },
  { slug: "goodyear", name: "Goodyear" },
  { slug: "toyo", name: "Toyo" },
  { slug: "nitto", name: "Nitto" },
  { slug: "zeetex", name: "Zeetex" },
  { slug: "fortune", name: "Fortune" },
  { slug: "vitour", name: "Vitour" },
];

/**
 * Returns active brands (slug + name) for building static brand pages and menus.
 * Falls back to a known list if the Supabase query fails so the build is resilient.
 */
export async function getActiveBrands(): Promise<BrandEntry[]> {
  const url = import.meta.env.PUBLIC_SUPABASE_URL;
  const key = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return FALLBACK_BRANDS;

  try {
    const supabase = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });

    const { data, error } = await supabase
      .from("brands")
      .select("name, slug")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true });

    if (error || !data || data.length === 0) return FALLBACK_BRANDS;

    const cleaned = data
      .filter((b) => b.slug && b.name)
      .map((b) => ({ slug: String(b.slug), name: String(b.name) }));

    return cleaned.length ? cleaned : FALLBACK_BRANDS;
  } catch {
    return FALLBACK_BRANDS;
  }
}
