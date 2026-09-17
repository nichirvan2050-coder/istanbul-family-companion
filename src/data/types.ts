// Shared data types for My Istanbul.
// Every changing fact (price, hours, rating) carries its own source + verification date
// instead of a global "trust me" — see /sources and /about for the verification policy.

export type SourceType = "official" | "reputable" | "community" | "unverified";

export type VerificationStatus = "verified" | "check" | "unverified";

export interface Sourced<T> {
  value: T;
  sourceName: string;
  sourceUrl: string;
  sourceType: SourceType;
  lastVerified: string; // ISO date
  status: VerificationStatus;
  note?: string;
}

export interface SourceRef {
  name: string;
  url: string;
  type: SourceType;
}

export type FamilyLevel = "easy" | "moderate" | "difficult";
export type WalkingLevel = "light" | "moderate" | "heavy";

// Structural destination type — distinct from the thematic `category` tags
// below, so the AI/UI can tell "find a neighborhood" apart from "find a
// museum" apart from "find a family activity."
export type DestType =
  | "attraction"
  | "neighborhood"
  | "museum"
  | "palace"
  | "mosque"
  | "market"
  | "park"
  | "waterfront"
  | "viewpoint"
  | "beach"
  | "family_activity"
  | "shopping"
  | "nature"
  | "island"
  | "island_attraction"
  | "day_trip"
  | "historic_site"
  | "food_area"
  | "transport_experience";

// Large-region grouping for browsing ("Explore Istanbul"). "day-trip" is
// explicitly outside Istanbul (see Place.outsideIstanbul) — never mixed into
// normal Istanbul browsing/search results without that flag being visible.
export type Region =
  | "historic-peninsula"
  | "beyoglu"
  | "golden-horn"
  | "bosphorus-european"
  | "bosphorus-asian"
  | "uskudar"
  | "kadikoy-asian"
  | "islands"
  | "bakirkoy-florya"
  | "nature"
  | "black-sea"
  | "modern-city"
  | "day-trip";

// Super-groups for the simple "Explore Istanbul" drill-down (section 28/37):
// a handful of big buttons, each expanding to several Regions, so the huge
// destination database never has to be shown flat on one screen.
export type RegionGroup = "europe" | "asia" | "bosphorus" | "islands" | "nature" | "day-trip";

export const regionGroups: Record<RegionGroup, { label: string; icon: string; regions: Region[] }> = {
  europe: { label: "European Side", icon: "🏛️", regions: ["historic-peninsula", "beyoglu", "golden-horn", "bakirkoy-florya", "modern-city"] },
  asia: { label: "Asian Side", icon: "🌏", regions: ["uskudar", "kadikoy-asian"] },
  bosphorus: { label: "Bosphorus", icon: "🌊", regions: ["bosphorus-european", "bosphorus-asian"] },
  islands: { label: "Princes' Islands", icon: "🏝️", regions: ["islands"] },
  nature: { label: "Nature & Outdoors", icon: "🌳", regions: ["nature", "black-sea"] },
  "day-trip": { label: "Day Trips", icon: "🚗", regions: ["day-trip"] },
};

export const regionLabels: Record<Region, string> = {
  "historic-peninsula": "Historic Peninsula",
  beyoglu: "Beyoğlu / Galata / Karaköy",
  "golden-horn": "Golden Horn / Eyüp",
  "bosphorus-european": "Bosphorus — European Side",
  "bosphorus-asian": "Bosphorus — Asian Side",
  uskudar: "Üsküdar",
  "kadikoy-asian": "Kadıköy & Asian Side",
  islands: "Princes' Islands",
  "bakirkoy-florya": "Bakırköy & Florya",
  nature: "Nature & Outdoors",
  "black-sea": "Black Sea Coast",
  "modern-city": "Modern City (Nişantaşı / Şişli)",
  "day-trip": "Day Trips (Outside Istanbul)",
};

export interface FamilyInfo {
  level: FamilyLevel;
  stroller?: string;
  toilets?: string;
  seating?: string;
  walking?: string;
  crowd?: string;
  indoorOutdoor?: "indoor" | "outdoor" | "both";
  shade?: string;
  changingFacilities?: string;
}

export interface TimelineEvent {
  year: string;
  label: string;
}

export interface TransportStep {
  mode: "tram" | "metro" | "marmaray" | "ferry" | "bus" | "funicular" | "walk" | "taxi";
  line?: string;
  from?: string;
  to?: string;
  detail?: string;
  duration?: string; // approximate, e.g. "~15-25 min"
}

export interface Place {
  id: string;
  name: string;
  category: ("history" | "byzantine" | "ottoman" | "bosphorus" | "city" | "family" | "park" | "market" | "religious" | "viewpoint")[];
  district: string;
  area: string;
  destType?: DestType;
  region?: Region;
  outsideIstanbul?: boolean;
  coordinates?: { lat: number; lng: number };
  summary: string;
  whatIsIt: string;
  history: string;
  timeline?: TimelineEvent[];
  whyVisit: string[];
  duration: string;
  family: FamilyInfo;
  ticket: {
    free: boolean;
    price?: Sourced<string>;
  };
  openingHours: Sourced<string>;
  dontMiss?: string[];
  transport: TransportStep[];
  withChildNearby?: string[]; // place ids
  nearby: string[]; // place ids
  mapQuery: string;
  officialUrl?: string;
  sources: SourceRef[];
}

// A fixed piece of transport infrastructure (tram/metro/Marmaray stop,
// funicular station, or ferry pier) — kept separate from Place so "Near Me"
// can surface real transit options alongside tourist destinations. Modeled
// only on well-known, stable infrastructure (lines don't move), unlike bus
// stops or timetables, which change too often to hard-code responsibly.
export interface Station {
  id: string;
  name: string;
  modes: ("tram" | "metro" | "marmaray" | "ferry" | "funicular")[];
  lines: string[]; // e.g. ["T1"], ["M2"], ["Şehir Hatları"]
  coordinates: { lat: number; lng: number };
  district: string;
  area: string;
  interchange?: string[]; // other station ids reachable by a short walk/transfer here
}

export interface Area {
  id: string;
  name: string;
  whyFamilies: string;
  transport: string;
  walking: WalkingLevel;
  attractions: string[]; // place ids
  parksWaterfront?: string;
  food?: string;
  shopping?: string;
  evening?: string;
  childSuitability: FamilyLevel;
  considerations?: string;
}

export interface Activity {
  id: string;
  name: string;
  district: string;
  ageSuitability: string;
  duration: string;
  price: Sourced<string> | null;
  location: string;
  transport: TransportStep[];
  strollerSuitability: string;
  toilets?: string;
  nearbyFood?: string;
  officialUrl?: string;
  sources: SourceRef[];
  status: VerificationStatus;
  category: "park" | "aquarium" | "museum" | "playground" | "waterfront" | "shopping";
}

export interface Stay {
  id: string;
  name: string;
  area: string;
  type: "hotel" | "apartment";
  rating: {
    value: number | null;
    scale: number;
    sourceName: string;
    sourceUrl: string;
    reviewCount: number | null;
    lastVerified: string;
  } | null;
  price: {
    value: string | null; // "From ₺X/night" or null if unverified
    currency: "TRY";
    lastVerified: string;
    sourceName?: string;
  };
  familyFeatures: string[];
  transport: string[];
  nearby: string[]; // place ids
  officialUrl?: string;
  sources: SourceRef[];
}

export interface TurkishPhrase {
  id: string;
  category: "basic" | "taxi" | "transport" | "hotel" | "restaurant" | "shopping" | "practical" | "emergency";
  turkish: string;
  english: string;
  kurdish: string;
  arabic: string;
  pronunciation: string;
}

export interface DayStop {
  time: string;
  type: "transport" | "place" | "break" | "note";
  placeId?: string;
  transport?: TransportStep;
  label?: string;
  detail?: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  subtitle: string;
  area: string;
  places: string[]; // place ids, in order
  transport: string[]; // short labels for home page ("T1 Tram", "Ferry")
  walking: WalkingLevel;
  familyFriendly: boolean;
  timeline: DayStop[];
  turkishPhraseIds: string[];
  flexible?: boolean;
}
