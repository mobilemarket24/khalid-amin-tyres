export type BranchKey = "sharjah" | "dubai";

export const business = {
  displayName: "KHALID AMIN TYRES",
  legalName: "KHALID AMIN TYRES TR CO LLC",
  tagline: "Tyres & Rims in Dubai & Sharjah",

  email: "khalidamin.1978@yahoo.com",

  branches: {
    sharjah: {
      label: "Sharjah Branch",
      shortLabel: "Sharjah",
      code: "SHJ",
      whatsappLocal: "050 351 2023",
      whatsappNumber: "971503512023",
      address: "Industrial Area 4 - Industrial Area - Sharjah",
      hours: "9:00 AM - 11:00 PM",
      mapUrl: "https://maps.app.goo.gl/LERVNcG3KYdUgw736",
    },
    dubai: {
      label: "Dubai Branch",
      shortLabel: "Dubai",
      code: "DXB",
      whatsappLocal: "056 161 5010",
      whatsappNumber: "971561615010",
      address: "Al Manara St - Al Qouz Ind.first - Al Quoz 1 - Dubai",
      hours: "9:00 AM - 2:00 AM",
      mapUrl: "https://maps.app.goo.gl/XTaoALWe5LUrfQPVA",
    },
  },

  languages: [
    { label: "EN", href: "/" },
    { label: "عربي", href: "/ar/" },
  ],

  images: {
    exteriorDay: "/images/branch-exterior-day.jpg.webp",
    ferrariBay: "/images/ferrari-service-bay.jpg.webp",
    porscheBay: "/images/porsche-service-bay.jpg.webp",
    dubaiNight: "/images/branch-dubai-night.jpg.webp",
  },

  services: [
    "Tyres",
    "Rims",
    "Fitting & Balancing",
    "Wheel Alignment",
    "Mobile Tyre Service",
    "Nitrogen",
    "Battery",
    "Oil Change",
    "Roadside Support",
  ],

  brands: [
    "Michelin",
    "Bridgestone",
    "Dunlop",
    "Yokohama",
    "Pirelli",
    "Continental",
    "Nexen",
    "Zeetex",
    "BFGoodrich",
    "Goodyear",
  ],

  popularSizes: [
    "275/60R20",
    "265/65R17",
    "285/50R20",
    "275/40R20",
    "295/40R22",
    "205/55R16",
    "215/55R17",
    "245/45R20",
  ],
};