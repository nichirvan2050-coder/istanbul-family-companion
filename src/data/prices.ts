const TODAY = "2026-09-17";

export interface PriceEntry {
  placeId?: string;
  name: string;
  category: "free" | "paid";
  price?: string;
  currency?: "TRY";
  lastVerified?: string;
  sourceName?: string;
  sourceUrl?: string;
  status: "verified" | "check" | "unverified";
}

export const freeAttractions: PriceEntry[] = [
  { name: "Blue Mosque", placeId: "blue-mosque", category: "free", status: "verified" },
  { name: "Hippodrome / Sultanahmet Square", placeId: "hippodrome", category: "free", status: "verified" },
  { name: "Gülhane Park", placeId: "gulhane-park", category: "free", status: "verified" },
  { name: "Grand Bazaar (entry)", placeId: "grand-bazaar", category: "free", status: "verified" },
  { name: "Süleymaniye Mosque", placeId: "suleymaniye-mosque", category: "free", status: "verified" },
  { name: "Spice Bazaar (entry)", placeId: "spice-bazaar", category: "free", status: "verified" },
  { name: "Eminönü Waterfront", placeId: "eminonu", category: "free", status: "verified" },
  { name: "Galata Bridge", placeId: "galata-bridge", category: "free", status: "verified" },
  { name: "İstiklal Street", placeId: "istiklal-street", category: "free", status: "verified" },
  { name: "Taksim Square", placeId: "taksim-square", category: "free", status: "verified" },
  { name: "Ortaköy Square", placeId: "ortakoy", category: "free", status: "verified" },
  { name: "Moda waterfront park", placeId: "moda", category: "free", status: "verified" },
  { name: "Fener & Balat streets", placeId: "balat", category: "free", status: "verified" },
  { name: "Golden Horn parks", placeId: "golden-horn", category: "free", status: "verified" },
  { name: "Yıldız Park", placeId: "yildiz-park", category: "free", status: "verified" },
  { name: "Emirgan Park", placeId: "emirgan-park", category: "free", status: "verified" },
  { name: "Çamlıca Hill", placeId: "camlica-hill", category: "free", status: "verified" },
  { name: "Maçka Park", placeId: "macka-park", category: "free", status: "verified" },
];

export const paidAttractions: PriceEntry[] = [
  { name: "Hagia Sophia (upper gallery)", placeId: "hagia-sophia", category: "paid", price: "≈ €25 (foreign visitor)", lastVerified: TODAY, sourceName: "Hagia Sophia visitor information", sourceUrl: "https://www.hagiasophia.com/", status: "check" },
  { name: "Basilica Cistern (day)", placeId: "basilica-cistern", category: "paid", price: "≈ 1,950 TRY", lastVerified: TODAY, sourceName: "Basilica Cistern (official)", sourceUrl: "https://yerebatan.com/", status: "check" },
  { name: "Topkapı Palace (combined)", placeId: "topkapi-palace", category: "paid", price: "≈ 2,750 TRY (foreign visitor)", lastVerified: TODAY, sourceName: "Milli Saraylar", sourceUrl: "https://millisaraylar.gov.tr/", status: "check" },
  { name: "Dolmabahçe Palace (combined)", placeId: "dolmabahce-palace", category: "paid", price: "≈ 1,800 TRY (foreign visitor)", lastVerified: TODAY, sourceName: "Milli Saraylar", sourceUrl: "https://millisaraylar.gov.tr/", status: "check" },
  { name: "Galata Tower", placeId: "galata-tower", category: "paid", price: "≈ €30 (foreign visitor)", lastVerified: TODAY, sourceName: "Galata Tower (official)", sourceUrl: "https://galatatower.com/en", status: "check" },
  { name: "Chora Church (Kariye)", placeId: "chora-church", category: "paid", price: "Not currently verified", lastVerified: TODAY, sourceName: "Ministry of Culture & Tourism", sourceUrl: "https://muze.gov.tr/", status: "unverified" },
  { name: "Rumeli Fortress", placeId: "rumeli-fortress", category: "paid", price: "Not currently verified", lastVerified: TODAY, sourceName: "Ministry of Culture & Tourism", sourceUrl: "https://muze.gov.tr/", status: "unverified" },
  { name: "Miniatürk", placeId: undefined, category: "paid", price: "≈ 330–900 TRY", lastVerified: TODAY, sourceName: "Current travel-info sources", sourceUrl: "https://kulturportali.gov.tr/", status: "check" },
  { name: "Istanbul Aquarium", placeId: undefined, category: "paid", price: "≈ 1,100–1,250 TRY", lastVerified: TODAY, sourceName: "Current travel-info sources", sourceUrl: "https://kulturportali.gov.tr/", status: "check" },
  { name: "Rahmi M. Koç Museum", placeId: undefined, category: "paid", price: "Not currently verified", lastVerified: TODAY, sourceName: "Rahmi M. Koç Museum", sourceUrl: "http://www.rmk-museum.org.tr/", status: "unverified" },
];

export const museumPass = {
  price: {
    value: "≈ 6,500 TRY",
    validity: "5 consecutive days from first use (not from purchase)",
    lastVerified: TODAY,
    sourceName: "Ministry of Culture & Tourism — Museum Pass",
    sourceUrl: "https://muze.gov.tr/",
    status: "check" as const,
  },
  included: [
    "Topkapı Palace + Harem",
    "Istanbul Archaeological Museums",
    "Hagia Sophia History & Experience Museum (a separate exhibit, not the mosque itself)",
    "Istanbul Mosaic Museum",
    "Several other state museums and sites",
  ],
  excluded: [
    "Hagia Sophia main worship floor (the mosque)",
    "Basilica Cistern",
    "Dolmabahçe Palace",
    "Galata Tower's evening Night Museology session",
    "Privately operated museums",
  ],
  conditions: "Children under 12 enter free at included venues regardless of pass ownership.",
  note: "Whether the pass or individual tickets work out cheaper depends entirely on which paid sites you actually plan to visit and at what prices apply on your travel dates — this app does not tell you which to choose.",
};
