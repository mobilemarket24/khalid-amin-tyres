// محتوای یکتا برای صفحات برند.
// هر برندی که اینجا تعریف شود، به‌جای متن قالبی، متن و متای اختصاصی می‌گیرد.
// برندهای تعریف‌نشده همان رفتار قبلی (قالبی) را دارند و بخش محتوا رندر نمی‌شود.

export interface BrandHighlight {
  title: string;
  text: string;
}

export interface BrandContent {
  metaTitle: string;
  metaDescription: string;
  heroSubtitle: string;
  intro: string[];
  highlights: BrandHighlight[];
  sectionTitle: string;
}

export const BRAND_CONTENT: Record<string, BrandContent> = {
  michelin: {
    metaTitle: "Michelin Tyres in Dubai & Sharjah | Khalid Amin Tyres",
    metaDescription:
      "Michelin tyres in Dubai and Sharjah — Primacy, Pilot Sport, Defender and CrossClimate ranges. Fitting, balancing and WhatsApp pricing at both branches.",
    heroSubtitle:
      "Michelin is the tyre most UAE drivers choose when they want tread life that lasts. Tell us your size and we will confirm stock and price from the nearest branch.",
    sectionTitle: "About Michelin tyres",
    intro: [
      "Michelin has built its reputation on tyres that stay safe late in their life rather than only when new. For UAE drivers that matters: long highway runs between the Emirates, high summer road temperatures and constant air-conditioning load all wear a tyre faster than city driving in a cooler climate. A Michelin casing is usually chosen by owners who keep a car for several years and want the cost per kilometre to work out lower, even if the price per tyre is higher at the start.",
      "The ranges we are asked for most are Primacy for quiet saloon comfort, Pilot Sport for performance cars and sports saloons, Defender and Latitude for SUVs doing mixed highway and light off-road use, and CrossClimate where a driver wants one tyre that copes with sudden rain. If you are unsure which range fits your car, send us the model year and the size written on your current sidewall and we will tell you what Michelin offers for it.",
    ],
    highlights: [
      {
        title: "Long tread life",
        text: "Chosen by drivers covering high annual mileage between Dubai, Sharjah and the Northern Emirates.",
      },
      {
        title: "Wet braking",
        text: "A strong option for the short, heavy rain spells the UAE gets in winter months.",
      },
      {
        title: "Full size range",
        text: "From 16-inch saloon fitments up to 22-inch SUV sizes, ordered in when not in branch stock.",
      },
    ],
  },

  bridgestone: {
    metaTitle: "Bridgestone Tyres in Dubai & Sharjah | Khalid Amin Tyres",
    metaDescription:
      "Bridgestone tyres in Dubai and Sharjah — Dueler, Turanza, Potenza and Ecopia. Popular Land Cruiser and Patrol sizes with fitting at both branches.",
    heroSubtitle:
      "Bridgestone is the factory-fitted tyre on many of the SUVs and saloons sold in the Gulf. Send us your size and we will confirm branch stock and today's price.",
    sectionTitle: "About Bridgestone tyres",
    intro: [
      "Bridgestone is often the tyre a car left the factory with, which is why so many owners in Dubai and Sharjah replace like for like. Keeping the original fitment means the ride, steering weight and noise level stay the way the manufacturer tuned them — something drivers of large SUVs notice immediately if they switch to an unfamiliar brand.",
      "The Dueler H/T range is the one we move most, because it suits the Land Cruiser, Patrol, Prado and similar 20-inch SUV fitments that dominate UAE roads. Alongside it we supply Turanza for comfort-focused saloons, Potenza where an owner wants sharper response, and Ecopia where fuel use matters. Production year is worth asking about on any tyre purchase, and we list it openly on every Bridgestone we stock.",
    ],
    highlights: [
      {
        title: "OE fitment",
        text: "Matches the original specification on many Japanese SUVs and saloons sold in the region.",
      },
      {
        title: "Dueler for SUVs",
        text: "Highway-terrain pattern built for stable, quiet running on long Emirates highway drives.",
      },
      {
        title: "Production year shown",
        text: "We publish the manufacturing year on each listing so you know exactly what you are buying.",
      },
    ],
  },

  pirelli: {
    metaTitle: "Pirelli Tyres in Dubai & Sharjah | Khalid Amin Tyres",
    metaDescription:
      "Pirelli tyres in Dubai and Sharjah — P Zero, Cinturato and Scorpion ranges for performance and luxury cars. Fitting and WhatsApp pricing at both branches.",
    heroSubtitle:
      "Pirelli is the fitment of choice on a large share of the performance and luxury cars driven in Dubai. Send us your size and we will confirm availability.",
    sectionTitle: "About Pirelli tyres",
    intro: [
      "Pirelli sits at the performance end of the market, and in Dubai that is exactly where a lot of the car park sits too. Many German and Italian performance models are homologated on Pirelli from new, sometimes with a manufacturer-specific marking on the sidewall. Fitting the marked version matters on these cars, because the compound and construction were tuned alongside that model's suspension and electronics.",
      "P Zero covers the sports and high-performance fitments, Cinturato handles premium saloons where rolling resistance and quietness come first, and Scorpion is the SUV line. Several Cinturato sizes are also offered with Seal Inside technology, which lets a tyre hold pressure after a small tread puncture — useful on roads where debris is common. Tell us the size and any letter marking on your current tyre and we will match it correctly.",
    ],
    highlights: [
      {
        title: "Performance fitments",
        text: "P Zero and Cinturato sizes for German, Italian and Japanese performance cars.",
      },
      {
        title: "Seal Inside options",
        text: "Selected sizes can seal small tread punctures and hold pressure until you reach us.",
      },
      {
        title: "Correct markings",
        text: "We check manufacturer sidewall markings so the replacement matches the original homologation.",
      },
    ],
  },

  dunlop: {
    metaTitle: "Dunlop Tyres in Dubai & Sharjah | Khalid Amin Tyres",
    metaDescription:
      "Dunlop tyres in Dubai and Sharjah — SP Sport and Grandtrek ranges for saloons, SUVs and 4x4s. Fitting, balancing and fast WhatsApp pricing.",
    heroSubtitle:
      "Dunlop gives sharp handling without a premium price tag, and the Grandtrek line is a long-standing favourite on UAE 4x4s. Send us your size for a quote.",
    sectionTitle: "About Dunlop tyres",
    intro: [
      "Dunlop tends to be the choice of drivers who want responsive steering and a firm, planted feel but do not want to pay the very top of the market. It is a practical middle ground, and in the UAE it is particularly well known through the Grandtrek range fitted to 4x4s used for both highway driving and weekend desert trips.",
      "For saloons and crossovers, SP Sport covers most common 16 to 19-inch sizes with a bias towards handling response. For larger SUVs and pickups, Grandtrek offers patterns aimed at mixed surfaces where a tyre has to stay composed on hot asphalt and still cope with sand and gravel. If you drive out of the city at weekends, tell us — it changes which pattern we recommend.",
    ],
    highlights: [
      {
        title: "Handling focus",
        text: "A firmer, more responsive feel than comfort-first tyres in the same price band.",
      },
      {
        title: "Grandtrek for 4x4",
        text: "Patterns suited to drivers mixing highway kilometres with weekend desert and gravel use.",
      },
      {
        title: "Value positioning",
        text: "A sensible step between budget tyres and the premium brands, with real brand backing.",
      },
    ],
  },

  continental: {
    metaTitle: "Continental Tyres in Dubai & Sharjah | Khalid Amin Tyres",
    metaDescription:
      "Continental tyres in Dubai and Sharjah — PremiumContact, SportContact and CrossContact ranges. German engineering with fitting at both branches.",
    heroSubtitle:
      "Continental is the tyre to ask for when braking distance is your priority. Send us your size and we will confirm stock at the Dubai or Sharjah branch.",
    sectionTitle: "About Continental tyres",
    intro: [
      "Continental's engineering reputation rests heavily on braking, and that is a sensible priority on UAE roads where traffic moves quickly and stops suddenly. Independent European tyre testing has consistently placed Continental near the top for stopping distance in both dry and wet conditions, which is why it is a common original fitment on German cars and why many owners here stay with it at replacement time.",
      "PremiumContact is the saloon and crossover line where comfort and braking are balanced, SportContact covers performance fitments, and CrossContact is built for SUVs. Compound choice matters a great deal in Gulf heat, so if your car came on a European-market tyre it is worth asking us whether the same size is offered in a specification better suited to sustained high ambient temperatures.",
    ],
    highlights: [
      {
        title: "Braking performance",
        text: "Consistently strong dry and wet stopping distances in independent European testing.",
      },
      {
        title: "German OE fitment",
        text: "A frequent factory fitment on German saloons, estates and SUVs sold in the region.",
      },
      {
        title: "Heat-suited specs",
        text: "We advise on the specification best matched to sustained Gulf summer temperatures.",
      },
    ],
  },
};

export function getBrandContent(slug: string): BrandContent | null {
  return BRAND_CONTENT[slug.toLowerCase()] ?? null;
}
