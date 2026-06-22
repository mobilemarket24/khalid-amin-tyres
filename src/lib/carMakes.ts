export interface CarMake {
  slug: string;
  name: string;
}

// Car makes used for the Rims menu and the /rims/[make]/ SEO landing pages.
// Rims are organised by car brand (Mercedes, BMW, ...), not by tyre brand.
// Stable, curated list — add or remove makes here as needed.
export const CAR_MAKES: CarMake[] = [
  { slug: "mercedes", name: "Mercedes-Benz" },
  { slug: "bmw", name: "BMW" },
  { slug: "audi", name: "Audi" },
  { slug: "toyota", name: "Toyota" },
  { slug: "nissan", name: "Nissan" },
  { slug: "lexus", name: "Lexus" },
  { slug: "range-rover", name: "Range Rover" },
  { slug: "porsche", name: "Porsche" },
  { slug: "ford", name: "Ford" },
  { slug: "chevrolet", name: "Chevrolet" },
  { slug: "gmc", name: "GMC" },
  { slug: "honda", name: "Honda" },
  { slug: "hyundai", name: "Hyundai" },
  { slug: "kia", name: "Kia" },
  { slug: "mitsubishi", name: "Mitsubishi" },
  { slug: "infiniti", name: "Infiniti" },
];
