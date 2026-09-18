// Arabic / Kurdish Sorani translations for the Family Stays data. Hotel
// names, ratings, prices, and sources stay as published everywhere; only
// the descriptive familyFeatures/transport sentences are translated, same
// boundary as ./placeTranslations.ts.
import { Locale } from "@/locales/translations";
import { Stay } from "./types";

export interface StayTranslation {
  familyFeatures: string[];
  transport: string[];
}

type NonEnglishLocale = Exclude<Locale, "en">;

// Aligned by array index/order to stays in ./stays.ts.
export const stayTranslations: Record<string, Record<NonEnglishLocale, StayTranslation>> = {
  "sura-hagia-sophia-hotel": {
    ar: {
      familyFeatures: ["الأطفال حتى سن 5 سنوات يقيمون مجانًا باستخدام الأسرّة الموجودة", "مسبح خارجي", "فناء حديقة", "قريب من الترام"],
      transport: ["مسافة دقيقتين سيرًا إلى محطة ترام T1 في السلطان أحمد"],
    },
    ku: {
      familyFeatures: ["منداڵانی تا تەمەنی 5 ساڵ بەخۆڕایی دەمێننەوە بە بەکارهێنانی نوێنی ئامادە", "مەلەوانگەی دەرەوە", "حەوشەی باخچە", "نزیک لە ترام"],
      transport: ["پیاسەیەکی 2 خولەک بۆ وێستگەی ترامی T1 لە سوڵتان ئەحمەد"],
    },
  },
  "seven-hills-hotel": {
    ar: {
      familyFeatures: ["سرير أطفال مجاني عند الطلب", "خيارات غرف متصلة", "تراس على السطح"],
      transport: ["مسافة قصيرة سيرًا إلى محطة ترام T1 في السلطان أحمد"],
    },
    ku: {
      familyFeatures: ["جێگای منداڵی بەخۆڕایی بە داواکردن", "هەڵبژاردەی ژووری پەیوەستکراو", "تەراسی سەربان"],
      transport: ["پیاسەیەکی کورت بۆ وێستگەی ترامی T1 لە سوڵتان ئەحمەد"],
    },
  },
  "karakoy-aparts-hotel": {
    ar: {
      familyFeatures: ["مطبخ صغير في كل وحدة", "غرف عائلية", "حمام/ساونا في الموقع"],
      transport: ["قريب من محطة ترام T1 في قره كوي", "على مسافة مشي من جسر غالاتا والعبّارات"],
    },
    ku: {
      familyFeatures: ["چێشتخانەیەکی بچووک لە هەر یەکەیەکدا", "ژووری خێزانی", "حەمام/ساونا لە شوێنەکەدا"],
      transport: ["نزیک لە وێستگەی ترامی T1 لە قەرەکۆی", "لە دووری پیادەڕۆییەوە لە پردی گالاتا و کەشتییەکان"],
    },
  },
};

export function localizeStay(stay: Stay, locale: Locale): Stay {
  if (locale === "en") return stay;
  const tr = stayTranslations[stay.id]?.[locale];
  if (!tr) return stay;
  return {
    ...stay,
    familyFeatures: tr.familyFeatures,
    transport: tr.transport,
  };
}
