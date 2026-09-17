// Istanbul AI's "brain": a rule-based intent + search engine that runs
// entirely over this app's own structured data (src/data/*). It never calls
// an external language model and never invents a place, price, or fact — it
// can only surface records that already exist in the data files, each
// carrying its own source. If nothing matches, it says so rather than
// guessing. This keeps the assistant fast, free to run, privacy-friendly,
// and impossible to hallucinate with — the trade-off (documented in the
// implementation report) is that it understands patterns, not open-ended
// natural language, the way a hosted LLM would.

import { places, placeById } from "@/data/places";
import { areas } from "@/data/areas";
import { activities } from "@/data/activities";
import { stays } from "@/data/stays";
import { stations } from "@/data/stations";
import { turkishPhrases, needThisNowIds } from "@/data/turkish";
import { fareTable, istanbulkart } from "@/data/transport";
import { paidAttractions, museumPass } from "@/data/prices";
import { Place, Station, regionGroups, RegionGroup } from "@/data/types";
import { haversineKm } from "@/lib/geo";

export type AIIntent =
  | "find_places"
  | "nearby_places"
  | "family_places"
  | "find_stays"
  | "find_activities"
  | "transport"
  | "price"
  | "history"
  | "create_mini_plan"
  | "turkish_phrase"
  | "day_trip"
  | "island_plan"
  | "area_plan"
  | "unknown";

const islandIds = ["buyukada", "heybeliada", "burgazada", "kinaliada"];
const dayTripIds = ["sapanca", "masukiye", "kartepe"];

export interface AICard {
  id: string;
  kind: "place" | "area" | "stay" | "activity" | "phrase" | "station";
  title: string;
  subtitle?: string;
  detail?: string;
  href: string;
  familyLevel?: string;
  price?: string;
  distanceKm?: number;
}

export interface AIResponse {
  intent: AIIntent;
  text: string;
  cards: AICard[];
  sourceNote?: string;
}

export interface AIContext {
  lastCards?: AICard[];
  userCoords?: { lat: number; lng: number };
}

function stationToCard(s: Station, distanceKm?: number): AICard {
  const icon = s.modes.includes("ferry") ? "⛴️" : s.modes.includes("marmaray") ? "🚆" : s.modes.includes("metro") ? "🚇" : s.modes.includes("funicular") ? "🚡" : "🚋";
  return {
    id: s.id,
    kind: "station",
    title: `${icon} ${s.name}`,
    subtitle: s.lines.join(" · "),
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${s.name} ${s.area} Istanbul`)}`,
    distanceKm,
  };
}

function placeToCard(p: Place, distanceKm?: number): AICard {
  return {
    id: p.id,
    kind: "place",
    title: p.name,
    subtitle: p.area,
    detail: p.summary,
    href: `/places/${p.id}`,
    familyLevel: p.family.level,
    price: p.ticket.free ? "Free" : "Paid",
    distanceKm,
  };
}

function matchPlaces(query: string): Place[] {
  const q = query.toLowerCase();
  const terms = q.split(/\s+/).filter((t) => t.length > 2);
  return places
    .map((p) => {
      const haystack = `${p.name} ${p.area} ${p.district} ${p.summary} ${p.category.join(" ")}`.toLowerCase();
      let score = 0;
      for (const t of terms) if (haystack.includes(t)) score += 1;
      if (haystack.includes(q)) score += 3;
      return { p, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.p);
}

function detectIntent(query: string): AIIntent {
  const q = query.toLowerCase();
  if (/\bsapanca\b|\bma[sş]ukiye\b|\bkartepe\b|\bday ?trip\b/.test(q)) return "day_trip";
  if (/\bisland(s)?\b|\bb[üu]y[üu]kada\b|\bheybeliada\b|\bburgazada\b|\bk[iı]nal[iı]ada\b|\bprinces.? islands\b|\badalar\b/.test(q)) return "island_plan";
  if (/\basian side\b|\beuropean side\b|\bday on the (asian|european|bosphorus)\b/.test(q)) return "area_plan";
  if (/\b\d+\s*(hour|hr)s?\b|\ball afternoon\b|\ball morning\b|\btonight\b|\bcouple of hours\b/.test(q)) return "create_mini_plan";
  if (/\bturkish\b|\bsay\b.*\bturkish\b|\bhow do i (say|ask)\b|\btell the (taxi|driver|waiter)\b/.test(q)) return "turkish_phrase";
  if (/\bhow much\b|\bprice\b|\bcost\b|\bticket\b|\bfare\b/.test(q)) return "price";
  if (/\bhow do (i|we) get\b|\bferry\b|\btram\b|\bmetro\b|\bmarmaray\b|\bbus\b|\btransport\b|\bistanbulkart\b/.test(q)) return "transport";
  if (/\bstroller\b|\bsmall child\b|\byoung child\b|\bwith (a |our )?(kid|child|daughter|son)\b|\bfamily\b/.test(q)) return "family_places";
  if (/\bnear me\b|\bnearby\b|\bclose to\b|\baround here\b|\bnearest (station|tram|metro|ferry|stop)\b/.test(q)) return "nearby_places";
  if (/\bhotel\b|\bstay\b|\baccommodation\b|\bapartment\b/.test(q)) return "find_stays";
  if (/\baquarium\b|\bmuseum for kids\b|\bplayground\b|\bactivity\b|\bactivities\b/.test(q)) return "find_activities";
  if (/\bhistory\b|\btell me about\b|\bwhy is\b.*\bimportant\b|\bwhat happened\b/.test(q)) return "history";
  return "find_places";
}

function findNamedPlace(query: string): Place | undefined {
  const q = query.toLowerCase();
  return places.find((p) => q.includes(p.name.toLowerCase()) || q.includes(p.id.replace(/-/g, " ")));
}

function miniPlan(query: string): AIResponse {
  const q = query.toLowerCase();
  const hoursMatch = q.match(/(\d+)\s*hour/);
  const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : q.includes("afternoon") ? 4 : q.includes("tonight") ? 2 : 2;
  const wantsEasy = /\bstroller\b|\bsmall child\b|\byoung child\b|\bnot too much walking\b|\brelax/.test(q);
  const pool = wantsEasy ? places.filter((p) => p.family.level === "easy") : places;
  const picks: Place[] = [];
  const maxStops = Math.max(2, Math.min(5, Math.round(hours / 1)));
  for (const p of pool) {
    if (picks.length >= maxStops) break;
    if (!picks.some((x) => x.area === p.area) || picks.length === 0) picks.push(p);
  }
  const cards = picks.map((p) => placeToCard(p));
  const text =
    picks.length > 0
      ? `Here's a realistic ${hours}-hour plan using verified places from the guide${wantsEasy ? ", kept to easy/family-friendly stops" : ""}. Times are approximate — adjust for crowds and breaks.`
      : "I couldn't build a plan from the current data — try naming an area (e.g. \"2 hours near Sultanahmet\").";
  return { intent: "create_mini_plan", text, cards, sourceNote: "Built only from places already verified in this guide." };
}

function turkishAnswer(query: string): AIResponse {
  const q = query.toLowerCase();
  const scored = turkishPhrases
    .map((ph) => {
      const haystack = `${ph.english} ${ph.turkish}`.toLowerCase();
      const terms = q.split(/\s+/).filter((t) => t.length > 2);
      let score = 0;
      for (const t of terms) if (haystack.includes(t)) score += 1;
      return { ph, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    return {
      intent: "turkish_phrase",
      text: "I don't have a verified Turkish phrase that matches that exactly. Here are the most commonly needed phrases instead:",
      cards: needThisNowIds.map((id) => {
        const ph = turkishPhrases.find((p) => p.id === id)!;
        return { id: ph.id, kind: "phrase" as const, title: ph.turkish, subtitle: ph.english, href: "/turkish" };
      }),
    };
  }
  const top = scored.slice(0, 4).map(({ ph }) => ({ id: ph.id, kind: "phrase" as const, title: ph.turkish, subtitle: ph.english, detail: ph.pronunciation, href: "/turkish" }));
  return { intent: "turkish_phrase", text: `Turkish: "${scored[0].ph.turkish}" — ${scored[0].ph.english}`, cards: top };
}

function priceAnswer(query: string): AIResponse {
  const named = findNamedPlace(query);
  if (named) {
    if (named.ticket.free) {
      return { intent: "price", text: `${named.name} is free to enter.`, cards: [placeToCard(named)] };
    }
    const p = named.ticket.price;
    return {
      intent: "price",
      text: p ? `${named.name}: ${p.value}. Source: ${p.sourceName}, checked ${p.lastVerified}.` : `I don't have a verified current price for ${named.name}.`,
      cards: [placeToCard(named)],
      sourceNote: p ? `${p.sourceName} — ${p.sourceUrl}` : undefined,
    };
  }
  if (/museum pass/.test(query.toLowerCase())) {
    return {
      intent: "price",
      text: `Museum Pass Istanbul: ${museumPass.price.value}, valid ${museumPass.price.validity}. Source: ${museumPass.price.sourceName}, checked ${museumPass.price.lastVerified}. See /prices for what's included and excluded.`,
      cards: [],
    };
  }
  return {
    intent: "price",
    text: "Name a specific place (e.g. \"How much is Topkapı?\") and I'll give you the verified price and source, or see the full Prices page.",
    cards: paidAttractions.slice(0, 4).map((a) => ({ id: a.placeId ?? a.name, kind: "place" as const, title: a.name, subtitle: a.price, href: a.placeId ? `/places/${a.placeId}` : "/prices" })),
  };
}

function transportAnswer(query: string): AIResponse {
  const q = query.toLowerCase();
  if (/istanbulkart/.test(q)) {
    return { intent: "transport", text: `Istanbulkart: ${istanbulkart.whatIsIt} ${istanbulkart.cardFee.value} (source: ${istanbulkart.cardFee.sourceName}, checked ${istanbulkart.cardFee.lastVerified}).`, cards: [] };
  }
  const named = findNamedPlace(query);
  if (named && named.transport.length > 0) {
    const t = named.transport[0];
    return {
      intent: "transport",
      text: `To reach ${named.name}: ${t.mode}${t.line ? ` (${t.line})` : ""}${t.to ? ` to ${t.to}` : ""}${t.duration ? `, ${t.duration}` : ""}.`,
      cards: [placeToCard(named)],
    };
  }
  const row = fareTable.find((f) => q.includes(f.transport.toLowerCase().split(" ")[0]));
  if (row) {
    return { intent: "transport", text: `${row.transport}: ${row.fare} (${row.fareType}). Source: ${row.sourceName}, checked — see /transport for details.`, cards: [] };
  }
  return { intent: "transport", text: "See /transport for tram, metro, Marmaray, ferry, bus, and Istanbulkart details, or ask about a specific place (e.g. \"How do I get to Kadıköy?\").", cards: [] };
}

function familyAnswer(query: string, context: AIContext): AIResponse {
  const base = matchPlaces(query);
  const pool = (base.length > 0 ? base : places).filter((p) => p.family.level !== "difficult");
  const sorted = [...pool].sort((a, b) => (a.family.level === "easy" ? -1 : 0) - (b.family.level === "easy" ? -1 : 0));
  const cards = sorted.slice(0, 6).map((p) => placeToCard(p, context.userCoords && p.coordinates ? haversineKm(context.userCoords, p.coordinates) : undefined));
  return {
    intent: "family_places",
    text: cards.length > 0 ? "Family-friendly options, easiest first:" : "I couldn't find a verified family-friendly match — try /family for the full list.",
    cards,
  };
}

function nearbyAnswer(query: string, context: AIContext): AIResponse {
  if (!context.userCoords) {
    return { intent: "nearby_places", text: "Location access is off. Search by area instead, or enable location to use \"Near Me.\"", cards: [] };
  }
  const q = query.toLowerCase();
  const wantsStationOnly = /\bstation\b|\btransit\b|\btram stop\b|\bmetro stop\b|\bferry (pier|dock)\b/.test(q);

  const nearestPlaces = places
    .filter((p) => p.coordinates)
    .map((p) => ({ p, d: haversineKm(context.userCoords!, p.coordinates!) }))
    .sort((a, b) => a.d - b.d);
  const nearestStations = stations
    .map((s) => ({ s, d: haversineKm(context.userCoords!, s.coordinates) }))
    .sort((a, b) => a.d - b.d);

  if (wantsStationOnly) {
    return {
      intent: "nearby_places",
      text: "Closest transit stations to your current location:",
      cards: nearestStations.slice(0, 6).map(({ s, d }) => stationToCard(s, d)),
      sourceNote: "Station coordinates are approximate (street-block accuracy) — confirm exact platform/exit locally.",
    };
  }

  const placeCards = nearestPlaces.slice(0, 5).map(({ p, d }) => placeToCard(p, d));
  const stationCards = nearestStations.slice(0, 3).map(({ s, d }) => stationToCard(s, d));
  return {
    intent: "nearby_places",
    text: "Closest verified places to your current location, plus the nearest transit:",
    cards: [...placeCards, ...stationCards],
    sourceNote: "Station coordinates are approximate (street-block accuracy) — confirm exact platform/exit locally. See /near-me for the full sorted list.",
  };
}

function staysAnswer(query: string): AIResponse {
  const q = query.toLowerCase();
  const filtered = stays.filter((s) => q.includes(s.area.toLowerCase()) || !/[a-z]/.test(q.replace(/hotel|stay|family|near|the|tram/g, "")));
  const list = (filtered.length > 0 ? filtered : stays).slice(0, 4);
  return {
    intent: "find_stays",
    text: "Family Stays only shows areas and verified guest ratings — it is not a booking platform, and hotels are never ranked against each other.",
    cards: list.map((s) => ({ id: s.id, kind: "stay" as const, title: s.name, subtitle: s.area, detail: s.rating?.value ? `${s.rating.sourceName}: ${s.rating.value}/${s.rating.scale}` : "Rating not verified", href: `/stays/${s.id}` })),
  };
}

function activitiesAnswer(): AIResponse {
  return {
    intent: "find_activities",
    text: "Verified family activities:",
    cards: activities.map((a) => ({ id: a.id, kind: "activity" as const, title: a.name, subtitle: a.district, detail: a.price?.value, href: `/activities/${a.id}` })),
  };
}

function historyAnswer(query: string): AIResponse {
  const named = findNamedPlace(query) ?? matchPlaces(query)[0];
  if (!named) {
    return { intent: "history", text: "Name a place (e.g. \"Tell me about Hagia Sophia\") and I'll pull its verified history.", cards: [] };
  }
  return {
    intent: "history",
    text: named.history.length > 320 ? named.history.slice(0, 320) + "…" : named.history,
    cards: [placeToCard(named)],
  };
}

function dayTripAnswer(query: string): AIResponse {
  const q = query.toLowerCase();
  const named = dayTripIds.map((id) => placeById(id)).find((p) => p && q.includes(p.name.toLowerCase()));
  if (named) {
    return {
      intent: "day_trip",
      text: `📍 Outside Istanbul (${named.district}). 🚗 ${named.transport[0]?.detail ?? "Best reached by car"}${named.transport[0]?.duration ? ` — ⏱️ ${named.transport[0].duration}` : ""}. 🌲 ${named.whyVisit[0]} 👨‍👩‍👧 ${named.family.level} with kids. 🗓️ Suggested: ${named.duration}. ⚠️ Confirm current road/transport conditions before you go.`,
      cards: [placeToCard(named)],
      sourceNote: named.sources[0]?.name,
    };
  }
  const cards = dayTripIds.map((id) => placeToCard(placeById(id)!));
  return {
    intent: "day_trip",
    text: "📍 These are all outside Istanbul (Sapanca in Sakarya Province, Maşukiye and Kartepe in Kocaeli Province) — not a same-day option without planning around traffic. See /day-trips for the full picture.",
    cards,
  };
}

function islandAnswer(query: string): AIResponse {
  const q = query.toLowerCase();
  const named = islandIds.map((id) => placeById(id)).find((p) => p && q.includes(p.name.toLowerCase()));
  if (named) {
    return { intent: "island_plan", text: `${named.name}: ${named.summary}`, cards: [placeToCard(named), ...named.nearby.slice(0, 3).map((id) => placeToCard(placeById(id)!)).filter((c) => c)] };
  }
  const cards = islandIds.map((id) => placeToCard(placeById(id)!));
  return {
    intent: "island_plan",
    text: "The four Princes' Islands with regular ferry service — no private cars on any of them. See /islands for a factual comparison (none ranked as \"best\").",
    cards,
  };
}

const areaPlanStops: Record<RegionGroup, { time: string; id: string }[]> = {
  asia: [
    { time: "Morning", id: "uskudar" },
    { time: "Midday", id: "kuzguncuk" },
    { time: "Afternoon", id: "beylerbeyi" },
    { time: "Evening", id: "moda" },
  ],
  europe: [
    { time: "Morning", id: "hagia-sophia" },
    { time: "Midday", id: "grand-bazaar" },
    { time: "Afternoon", id: "galata-tower" },
    { time: "Evening", id: "istiklal-street" },
  ],
  bosphorus: [
    { time: "Morning", id: "ortakoy" },
    { time: "Midday", id: "bebek" },
    { time: "Afternoon", id: "kanlica" },
    { time: "Evening", id: "cengelkoy" },
  ],
  islands: [],
  nature: [
    { time: "Morning", id: "belgrad-forest" },
    { time: "Midday", id: "emirgan-park" },
    { time: "Afternoon", id: "yildiz-park" },
  ],
  "day-trip": [],
};

function areaPlanAnswer(query: string): AIResponse {
  const q = query.toLowerCase();
  const key: RegionGroup = /asian side/.test(q) ? "asia" : /european side/.test(q) ? "europe" : "bosphorus";
  const stops = areaPlanStops[key].map((s) => ({ ...s, place: placeById(s.id) })).filter((s) => s.place);
  return {
    intent: "area_plan",
    text: `A geographically sensible day on the ${regionGroups[key].label}:`,
    cards: stops.map((s) => ({ ...placeToCard(s.place!), subtitle: `${s.time} · ${s.place!.area}` })),
    sourceNote: "Route built from this guide's own verified places and their real transport links.",
  };
}

function findPlacesAnswer(query: string, context: AIContext): AIResponse {
  const matches = matchPlaces(query);
  if (matches.length === 0) {
    return {
      intent: "find_places",
      text: "I couldn't find a verified match in the guide for that. Try a place name, neighborhood, or category (history, family, bosphorus, market).",
      cards: [],
    };
  }
  return {
    intent: "find_places",
    text: `Found ${matches.length} match${matches.length === 1 ? "" : "es"}:`,
    cards: matches.slice(0, 6).map((p) => placeToCard(p, context.userCoords && p.coordinates ? haversineKm(context.userCoords, p.coordinates) : undefined)),
  };
}

export function askIstanbulAI(query: string, context: AIContext = {}): AIResponse {
  const trimmed = query.trim();
  if (!trimmed) return { intent: "unknown", text: "Ask me anything about places, family activities, transport, prices, history, or Turkish phrases.", cards: [] };

  // Simple context awareness: "Which is easier with a stroller?" after a list
  // of place results scopes the answer to that previous list instead of the
  // whole database.
  const isFollowUp = /\b(which|these|those|them|it)\b/i.test(trimmed);
  const previousPlaces = context.lastCards?.filter((c) => c.kind === "place").map((c) => c.id) ?? [];
  if (isFollowUp && previousPlaces.length > 0) {
    const pool = places.filter((p) => previousPlaces.includes(p.id));
    const sorted = [...pool].sort((a, b) => {
      const rank = { easy: 0, moderate: 1, difficult: 2 } as const;
      return rank[a.family.level] - rank[b.family.level];
    });
    return {
      intent: "family_places",
      text: "From your last results, easiest for a family first:",
      cards: sorted.map((p) => placeToCard(p)),
    };
  }

  const intent = detectIntent(trimmed);
  switch (intent) {
    case "day_trip":
      return dayTripAnswer(trimmed);
    case "island_plan":
      return islandAnswer(trimmed);
    case "area_plan":
      return areaPlanAnswer(trimmed);
    case "create_mini_plan":
      return miniPlan(trimmed);
    case "turkish_phrase":
      return turkishAnswer(trimmed);
    case "price":
      return priceAnswer(trimmed);
    case "transport":
      return transportAnswer(trimmed);
    case "family_places":
      return familyAnswer(trimmed, context);
    case "nearby_places":
      return nearbyAnswer(trimmed, context);
    case "find_stays":
      return staysAnswer(trimmed);
    case "find_activities":
      return activitiesAnswer();
    case "history":
      return historyAnswer(trimmed);
    default: {
      const areaMatch = areas.find((a) => trimmed.toLowerCase().includes(a.name.toLowerCase()));
      if (areaMatch) {
        return {
          intent: "find_places",
          text: `${areaMatch.name}: ${areaMatch.whyFamilies}`,
          cards: areaMatch.attractions.slice(0, 6).map((id) => {
            const p = places.find((pl) => pl.id === id)!;
            return placeToCard(p);
          }),
        };
      }
      return findPlacesAnswer(trimmed, context);
    }
  }
}

export const quickPrompts = [
  { label: "📍 Near Me", query: "What's near me right now?" },
  { label: "👨‍👩‍👧 Family", query: "Find family-friendly places" },
  { label: "🏛️ Places", query: "Show me historical places" },
  { label: "🏝️ Islands", query: "Which Princes' Island should we visit?" },
  { label: "🚋 Transport", query: "How do I use Istanbulkart?" },
  { label: "🎟️ Prices", query: "How much is Topkapı Palace?" },
  { label: "🇹🇷 Turkish", query: "How do I say thank you in Turkish?" },
  { label: "⏱️ 2-Hour Plan", query: "We have two hours, what should we do?" },
];
