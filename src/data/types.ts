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
