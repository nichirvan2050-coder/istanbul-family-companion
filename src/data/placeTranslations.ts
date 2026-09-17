// Deep place-content translations (Arabic, Kurdish Sorani), layered over the
// English `Place` records in ./places.ts rather than duplicating them. Only
// descriptive/narrative fields are translated here — ticket prices, opening
// hours, sources, and transport steps stay in their original English/source
// form everywhere, since those carry cited facts (currency figures, official
// URLs, verification dates) that must not drift from what was actually
// sourced. A place with no entry here simply falls back to English, same as
// the app's existing "deep content stays English" fallback behavior.
import { Locale } from "@/locales/translations";
import { Place } from "./types";
import { placeTranslationsData } from "./placeTranslationsData";

export interface PlaceFamilyTranslation {
  stroller?: string | null;
  toilets?: string | null;
  seating?: string | null;
  walking?: string | null;
  crowd?: string | null;
  shade?: string | null;
}

export interface PlaceTranslation {
  name?: string;
  summary?: string;
  whatIsIt?: string;
  history?: string;
  whyVisit?: string[];
  duration?: string;
  dontMiss?: string[] | null;
  family?: PlaceFamilyTranslation;
  timeline?: { year: string; label: string }[] | null;
}

type NonEnglishLocale = Exclude<Locale, "en">;

// Translated by AI (not human-checked) from the app's own sourced English
// text — pure translation of existing content, no facts added or changed.
// Covers all ~115 place records; see ./placeTranslationsData.ts.
export const placeTranslations: Record<string, Partial<Record<NonEnglishLocale, PlaceTranslation>>> = placeTranslationsData;

export function localizePlace(place: Place, locale: Locale): Place {
  if (locale === "en") return place;
  const tr = placeTranslations[place.id]?.[locale];
  if (!tr) return place;
  return {
    ...place,
    name: tr.name ?? place.name,
    summary: tr.summary ?? place.summary,
    whatIsIt: tr.whatIsIt ?? place.whatIsIt,
    history: tr.history ?? place.history,
    whyVisit: tr.whyVisit ?? place.whyVisit,
    duration: tr.duration ?? place.duration,
    dontMiss: tr.dontMiss ?? place.dontMiss,
    family: tr.family
      ? {
          ...place.family,
          stroller: tr.family.stroller ?? place.family.stroller,
          toilets: tr.family.toilets ?? place.family.toilets,
          seating: tr.family.seating ?? place.family.seating,
          walking: tr.family.walking ?? place.family.walking,
          crowd: tr.family.crowd ?? place.family.crowd,
          shade: tr.family.shade ?? place.family.shade,
        }
      : place.family,
    timeline: tr.timeline ?? place.timeline,
  };
}
