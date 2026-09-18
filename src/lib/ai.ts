// Istanbul AI's "brain": a rule-based intent + search engine that runs
// entirely over this app's own structured data (src/data/*). It never calls
// an external language model and never invents a place, price, or fact — it
// can only surface records that already exist in the data files, each
// carrying its own source. If nothing matches, it says so rather than
// guessing. This keeps the assistant fast, free to run, privacy-friendly,
// and impossible to hallucinate with — the trade-off (documented in the
// implementation report) is that it understands patterns, not open-ended
// natural language, the way a hosted LLM would.
//
// Localization note: the assistant's own sentences are localized via
// ./aiStrings.ts, and any place data plugged into them is localized via
// ./placeTranslations.ts's localizePlace(). Intent DETECTION (matching what
// the user typed) still runs on English keywords/place names only — a
// free-text query typed in Arabic or Kurdish won't be understood, only the
// *response* comes back in the selected language. Quick-prompt buttons work
// around this by keeping an internal English query string with a translated
// label.

import { places, placeById } from "@/data/places";
import { areas } from "@/data/areas";
import { activities } from "@/data/activities";
import { stays } from "@/data/stays";
import { stations } from "@/data/stations";
import { turkishPhrases, needThisNowIds } from "@/data/turkish";
import { fareTable } from "@/data/transport";
import { paidAttractions, museumPass } from "@/data/prices";
import { Place, Station, TurkishPhrase, RegionGroup } from "@/data/types";
import { haversineKm } from "@/lib/geo";
import { localizePlace } from "@/data/placeTranslations";
import { localizeIstanbulkart, localizeFareTable } from "@/data/transportTranslations";
import { Locale } from "@/locales/translations";
import { aiStrings, regionGroupLabels } from "@/lib/aiStrings";

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

function placeToCard(p: Place, locale: Locale, distanceKm?: number): AICard {
  const lp = localizePlace(p, locale);
  const s = aiStrings[locale];
  return {
    id: p.id,
    kind: "place",
    title: lp.name,
    subtitle: lp.area,
    detail: lp.summary,
    href: `/places/${p.id}`,
    familyLevel: s.familyLevel(p.family.level),
    price: p.ticket.free ? s.free : s.paid,
    distanceKm,
  };
}

function phraseMeaning(ph: TurkishPhrase, locale: Locale): string {
  if (locale === "ar") return ph.arabic;
  if (locale === "ku") return ph.kurdish;
  return ph.english;
}

function timeLabel(time: string, locale: Locale): string {
  const s = aiStrings[locale];
  switch (time) {
    case "Morning":
      return s.morning;
    case "Midday":
      return s.midday;
    case "Afternoon":
      return s.afternoon;
    case "Evening":
      return s.evening;
    default:
      return time;
  }
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

function miniPlan(query: string, locale: Locale): AIResponse {
  const s = aiStrings[locale];
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
  const cards = picks.map((p) => placeToCard(p, locale));
  const text = picks.length > 0 ? s.miniPlan(hours, wantsEasy) : s.miniPlanNoData;
  return { intent: "create_mini_plan", text, cards, sourceNote: "Built only from places already verified in this guide." };
}

function turkishAnswer(query: string, locale: Locale): AIResponse {
  const s = aiStrings[locale];
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
      text: s.turkishNoMatch,
      cards: needThisNowIds.map((id) => {
        const ph = turkishPhrases.find((p) => p.id === id)!;
        return { id: ph.id, kind: "phrase" as const, title: ph.turkish, subtitle: phraseMeaning(ph, locale), href: "/turkish" };
      }),
    };
  }
  const top = scored.slice(0, 4).map(({ ph }) => ({ id: ph.id, kind: "phrase" as const, title: ph.turkish, subtitle: phraseMeaning(ph, locale), detail: ph.pronunciation, href: "/turkish" }));
  return { intent: "turkish_phrase", text: s.turkishMatch(scored[0].ph.turkish, phraseMeaning(scored[0].ph, locale)), cards: top };
}

function priceAnswer(query: string, locale: Locale): AIResponse {
  const s = aiStrings[locale];
  const named = findNamedPlace(query);
  if (named) {
    const lp = localizePlace(named, locale);
    if (named.ticket.free) {
      return { intent: "price", text: s.priceFree(lp.name), cards: [placeToCard(named, locale)] };
    }
    const p = named.ticket.price;
    return {
      intent: "price",
      text: p ? s.priceKnown(lp.name, p.value, p.sourceName, p.lastVerified) : s.priceUnverified(lp.name),
      cards: [placeToCard(named, locale)],
      sourceNote: p ? `${p.sourceName} — ${p.sourceUrl}` : undefined,
    };
  }
  if (/museum pass/.test(query.toLowerCase())) {
    return {
      intent: "price",
      text: s.museumPass(museumPass.price.value, museumPass.price.validity, museumPass.price.sourceName, museumPass.price.lastVerified),
      cards: [],
    };
  }
  return {
    intent: "price",
    text: s.priceGeneric,
    cards: paidAttractions.slice(0, 4).map((a) => ({ id: a.placeId ?? a.name, kind: "place" as const, title: a.name, subtitle: a.price, href: a.placeId ? `/places/${a.placeId}` : "/prices" })),
  };
}

function transportAnswer(query: string, locale: Locale): AIResponse {
  const s = aiStrings[locale];
  const q = query.toLowerCase();
  if (/istanbulkart/.test(q)) {
    const ik = localizeIstanbulkart(locale);
    return { intent: "transport", text: s.istanbulkart(ik.whatIsIt, ik.cardFee.value, ik.cardFee.sourceName, ik.cardFee.lastVerified), cards: [] };
  }
  const named = findNamedPlace(query);
  if (named && named.transport.length > 0) {
    const lp = localizePlace(named, locale);
    const t = named.transport[0];
    return {
      intent: "transport",
      text: s.transportToPlace(lp.name, t.mode, t.line, t.to, t.duration),
      cards: [placeToCard(named, locale)],
    };
  }
  // Matched against the original English fare labels (so keyword search
  // keeps working regardless of locale), then displayed via the localized row.
  const rowIndex = fareTable.findIndex((f) => q.includes(f.transport.toLowerCase().split(" ")[0]));
  if (rowIndex !== -1) {
    const row = localizeFareTable(fareTable, locale)[rowIndex];
    return { intent: "transport", text: s.transportFareRow(row.transport, row.fare, row.fareType, row.sourceName), cards: [] };
  }
  return { intent: "transport", text: s.transportGeneric, cards: [] };
}

function familyAnswer(query: string, context: AIContext, locale: Locale): AIResponse {
  const s = aiStrings[locale];
  const base = matchPlaces(query);
  const pool = (base.length > 0 ? base : places).filter((p) => p.family.level !== "difficult");
  const sorted = [...pool].sort((a, b) => (a.family.level === "easy" ? -1 : 0) - (b.family.level === "easy" ? -1 : 0));
  const cards = sorted.slice(0, 6).map((p) => placeToCard(p, locale, context.userCoords && p.coordinates ? haversineKm(context.userCoords, p.coordinates) : undefined));
  return {
    intent: "family_places",
    text: cards.length > 0 ? s.familyOptions : s.familyNoMatch,
    cards,
  };
}

function nearbyAnswer(query: string, context: AIContext, locale: Locale): AIResponse {
  const s = aiStrings[locale];
  if (!context.userCoords) {
    return { intent: "nearby_places", text: s.nearbyLocationOff, cards: [] };
  }
  const q = query.toLowerCase();
  const wantsStationOnly = /\bstation\b|\btransit\b|\btram stop\b|\bmetro stop\b|\bferry (pier|dock)\b/.test(q);

  const nearestPlaces = places
    .filter((p) => p.coordinates)
    .map((p) => ({ p, d: haversineKm(context.userCoords!, p.coordinates!) }))
    .sort((a, b) => a.d - b.d);
  const nearestStations = stations
    .map((st) => ({ st, d: haversineKm(context.userCoords!, st.coordinates) }))
    .sort((a, b) => a.d - b.d);

  if (wantsStationOnly) {
    return {
      intent: "nearby_places",
      text: s.nearbyStationsOnly,
      cards: nearestStations.slice(0, 6).map(({ st, d }) => stationToCard(st, d)),
      sourceNote: s.nearbyStationsNote,
    };
  }

  const placeCards = nearestPlaces.slice(0, 5).map(({ p, d }) => placeToCard(p, locale, d));
  const stationCards = nearestStations.slice(0, 3).map(({ st, d }) => stationToCard(st, d));
  return {
    intent: "nearby_places",
    text: s.nearbyBoth,
    cards: [...placeCards, ...stationCards],
    sourceNote: s.nearbyBothNote,
  };
}

function staysAnswer(query: string, locale: Locale): AIResponse {
  const s = aiStrings[locale];
  const q = query.toLowerCase();
  const filtered = stays.filter((st) => q.includes(st.area.toLowerCase()) || !/[a-z]/.test(q.replace(/hotel|stay|family|near|the|tram/g, "")));
  const list = (filtered.length > 0 ? filtered : stays).slice(0, 4);
  return {
    intent: "find_stays",
    text: s.staysIntro,
    cards: list.map((st) => ({ id: st.id, kind: "stay" as const, title: st.name, subtitle: st.area, detail: st.rating?.value ? `${st.rating.sourceName}: ${st.rating.value}/${st.rating.scale}` : s.staysRatingUnverified, href: `/stays/${st.id}` })),
  };
}

function activitiesAnswer(locale: Locale): AIResponse {
  const s = aiStrings[locale];
  return {
    intent: "find_activities",
    text: s.activitiesIntro,
    cards: activities.map((a) => ({ id: a.id, kind: "activity" as const, title: a.name, subtitle: a.district, detail: a.price?.value, href: `/activities/${a.id}` })),
  };
}

function historyAnswer(query: string, locale: Locale): AIResponse {
  const s = aiStrings[locale];
  const named = findNamedPlace(query) ?? matchPlaces(query)[0];
  if (!named) {
    return { intent: "history", text: s.historyPrompt, cards: [] };
  }
  const lp = localizePlace(named, locale);
  return {
    intent: "history",
    text: lp.history.length > 320 ? lp.history.slice(0, 320) + "…" : lp.history,
    cards: [placeToCard(named, locale)],
  };
}

function dayTripAnswer(query: string, locale: Locale): AIResponse {
  const s = aiStrings[locale];
  const q = query.toLowerCase();
  const named = dayTripIds.map((id) => placeById(id)).find((p) => p && q.includes(p.name.toLowerCase()));
  if (named) {
    const lp = localizePlace(named, locale);
    return {
      intent: "day_trip",
      text: s.dayTripNamed(named.district, named.transport[0]?.detail ?? "Best reached by car", named.transport[0]?.duration, lp.whyVisit[0], s.familyLevel(named.family.level), lp.duration),
      cards: [placeToCard(named, locale)],
      sourceNote: named.sources[0]?.name,
    };
  }
  const cards = dayTripIds.map((id) => placeToCard(placeById(id)!, locale));
  return {
    intent: "day_trip",
    text: s.dayTripGeneric,
    cards,
  };
}

function islandAnswer(query: string, locale: Locale): AIResponse {
  const s = aiStrings[locale];
  const q = query.toLowerCase();
  const named = islandIds.map((id) => placeById(id)).find((p) => p && q.includes(p.name.toLowerCase()));
  if (named) {
    const lp = localizePlace(named, locale);
    return {
      intent: "island_plan",
      text: s.islandNamed(lp.name, lp.summary),
      cards: [placeToCard(named, locale), ...named.nearby.slice(0, 3).map((id) => placeToCard(placeById(id)!, locale)).filter((c) => c)],
    };
  }
  const cards = islandIds.map((id) => placeToCard(placeById(id)!, locale));
  return {
    intent: "island_plan",
    text: s.islandGeneric,
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

function areaPlanAnswer(query: string, locale: Locale): AIResponse {
  const s = aiStrings[locale];
  const q = query.toLowerCase();
  const key: RegionGroup = /asian side/.test(q) ? "asia" : /european side/.test(q) ? "europe" : "bosphorus";
  const stops = areaPlanStops[key].map((st) => ({ ...st, place: placeById(st.id) })).filter((st) => st.place);
  return {
    intent: "area_plan",
    text: s.areaPlanText(regionGroupLabels[locale][key]),
    cards: stops.map((st) => {
      const lp = localizePlace(st.place!, locale);
      return { ...placeToCard(st.place!, locale), subtitle: `${timeLabel(st.time, locale)} · ${lp.area}` };
    }),
    sourceNote: s.areaPlanSourceNote,
  };
}

function findPlacesAnswer(query: string, context: AIContext, locale: Locale): AIResponse {
  const s = aiStrings[locale];
  const matches = matchPlaces(query);
  if (matches.length === 0) {
    return {
      intent: "find_places",
      text: s.findPlacesNoMatch,
      cards: [],
    };
  }
  return {
    intent: "find_places",
    text: s.findPlacesFound(matches.length),
    cards: matches.slice(0, 6).map((p) => placeToCard(p, locale, context.userCoords && p.coordinates ? haversineKm(context.userCoords, p.coordinates) : undefined)),
  };
}

export function askIstanbulAI(query: string, context: AIContext = {}, locale: Locale = "en"): AIResponse {
  const s = aiStrings[locale];
  const trimmed = query.trim();
  if (!trimmed) return { intent: "unknown", text: s.emptyQuery, cards: [] };

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
      text: s.followUpEasiest,
      cards: sorted.map((p) => placeToCard(p, locale)),
    };
  }

  const intent = detectIntent(trimmed);
  switch (intent) {
    case "day_trip":
      return dayTripAnswer(trimmed, locale);
    case "island_plan":
      return islandAnswer(trimmed, locale);
    case "area_plan":
      return areaPlanAnswer(trimmed, locale);
    case "create_mini_plan":
      return miniPlan(trimmed, locale);
    case "turkish_phrase":
      return turkishAnswer(trimmed, locale);
    case "price":
      return priceAnswer(trimmed, locale);
    case "transport":
      return transportAnswer(trimmed, locale);
    case "family_places":
      return familyAnswer(trimmed, context, locale);
    case "nearby_places":
      return nearbyAnswer(trimmed, context, locale);
    case "find_stays":
      return staysAnswer(trimmed, locale);
    case "find_activities":
      return activitiesAnswer(locale);
    case "history":
      return historyAnswer(trimmed, locale);
    default: {
      const areaMatch = areas.find((a) => trimmed.toLowerCase().includes(a.name.toLowerCase()));
      if (areaMatch) {
        return {
          intent: "find_places",
          text: s.areaMatchText(areaMatch.name, areaMatch.whyFamilies),
          cards: areaMatch.attractions.slice(0, 6).map((id) => {
            const p = places.find((pl) => pl.id === id)!;
            return placeToCard(p, locale);
          }),
        };
      }
      return findPlacesAnswer(trimmed, context, locale);
    }
  }
}

export const quickPrompts: { query: string; labels: Record<Locale, string> }[] = [
  { query: "What's near me right now?", labels: { en: "📍 Near Me", ar: "📍 بالقرب مني", ku: "📍 لە نزیکم" } },
  { query: "Find family-friendly places", labels: { en: "👨‍👩‍👧 Family", ar: "👨‍👩‍👧 العائلة", ku: "👨‍👩‍👧 خێزان" } },
  { query: "Show me historical places", labels: { en: "🏛️ Places", ar: "🏛️ الأماكن", ku: "🏛️ شوێنەکان" } },
  { query: "Which Princes' Island should we visit?", labels: { en: "🏝️ Islands", ar: "🏝️ الجزر", ku: "🏝️ دوورگەکان" } },
  { query: "How do I use Istanbulkart?", labels: { en: "🚋 Transport", ar: "🚋 المواصلات", ku: "🚋 گواستنەوە" } },
  { query: "How much is Topkapı Palace?", labels: { en: "🎟️ Prices", ar: "🎟️ الأسعار", ku: "🎟️ نرخەکان" } },
  { query: "How do I say thank you in Turkish?", labels: { en: "🇹🇷 Turkish", ar: "🇹🇷 التركية", ku: "🇹🇷 تورکی" } },
  { query: "We have two hours, what should we do?", labels: { en: "⏱️ 2-Hour Plan", ar: "⏱️ خطة ساعتين", ku: "⏱️ پلانی ٢ کاتژمێر" } },
];
