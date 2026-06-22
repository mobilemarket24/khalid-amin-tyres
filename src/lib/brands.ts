import { createClient } from "@supabase/supabase-js";
import { CAR_MAKES } from "./carMakes";

export type BrandCategory = "tyre" | "rim" | "both";

export interface BrandEntry {
  slug: string;
  name: string;
  category: BrandCategory;
}

// Tyre-brand fallback so the static build never fails if Supabase is
// unreachable at build time. Mirrors the active tyre brands in the database.
const FALLBACK_TYRE_BRANDS: BrandEntry[] = [
  { slug: "michelin", name: "Michelin", category: "tyre" },
  { slug: "bridgestone", name: "Bridgestone", category: "tyre" },
  { slug: "pirelli", name: "Pirelli", category: "tyre" },
  { slug: "continental", name: "Continental", category: "tyre" },
  { slug: "yokohama", name: "Yokohama", category: "tyre" },
  { slug: "dunlop", name: "Dunlop", category: "tyre" },
  { slug: "bfgoodrich", name: "BFGoodrich", category: "tyre" },
  { slug: "falken", name: "Falken", category: "tyre" },
  { slug: "nexen", name: "Nexen", category: "tyre" },
  { slug: "kumho", name: "Kumho", category: "tyre" },
  { slug: "goodyear", name: "Goodyear", category: "tyre" },
  { slug: "zeetex", name: "Zeetex", category: "tyre" },
  { slug: "vitour", name: "Vitour", category: "tyre" },
];

// Rim brands are car makes. Used as fallback until the `category` column exists
// and car makes are seeded into the brands table.
const FALLBACK_RIM_BRANDS: BrandEntry[] = CAR_MAKES.map((m) => ({
  slug: m.slug,
  name: m.name,
  category: "rim",
}));

function normalizeCategory(value: unknown): BrandCategory {
  const v = String(value || "").toLowerCase();
  if (v === "rim" || v === "both") return v;
  return "tyre";
}

async function fetchAllBrands(): Promise<BrandEntry[] | null> {
  const url = import.meta.env.PUBLIC_SUPABASE_URL;
  const key = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return null;

  try {
    const supabase = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });

    // select("*") is resilient: works whether or not the `category` column
    // exists yet (it is simply absent on each row until the migration runs).
    const { data, error } = await supabase
      .from("brands")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true });

    if (error || !data || data.length === 0) return null;

    return data
      .filter((b) => b.slug && b.name)
      .map((b) => ({
        slug: String(b.slug),
        name: String(b.name),
        category: normalizeCategory((b as Record<string, unknown>).category),
      }));
  } catch {
    return null;
  }
}

/**
 * Returns active brands of a given category ("tyre" or "rim").
 * Brands marked "both" appear in either list.
 * Falls back to the known tyre/car-make lists if the query fails or returns
 * nothing for that category (e.g. before the `category` column is added).
 */
export async function getBrandsByCategory(
  category: "tyre" | "rim"
): Promise<BrandEntry[]> {
  const all = await fetchAllBrands();
  const fallback =
    category === "rim" ? FALLBACK_RIM_BRANDS : FALLBACK_TYRE_BRANDS;

  if (!all) return fallback;

  const filtered = all.filter(
    (b) => b.category === category || b.category === "both"
  );

  // If nothing matches this category yet (column missing or not tagged),
  // fall back so menus and pages are never empty.
  if (filtered.length === 0) {
    return category === "rim" ? FALLBACK_RIM_BRANDS : all;
  }

  return filtered;
}

/** Backwards-compatible helper (tyre brands). */
export async function getActiveBrands(): Promise<BrandEntry[]> {
  return getBrandsByCategory("tyre");
}
