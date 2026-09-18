// Arabic / Kurdish Sorani translations for the Family Activities data.
// Prices/sources stay as published everywhere; only descriptive text is
// translated, same boundary as ./placeTranslations.ts.
import { Locale } from "@/locales/translations";
import { Activity } from "./types";

export interface ActivityTranslation {
  ageSuitability: string;
  duration: string;
  strollerSuitability: string;
  toilets?: string;
  nearbyFood?: string;
}

type NonEnglishLocale = Exclude<Locale, "en">;

export const activityTranslations: Record<string, Record<NonEnglishLocale, ActivityTranslation>> = {
  miniaturk: {
    ar: {
      ageSuitability: "مناسب تقريبًا للأعمار 3-12 — النماذج المصغرة جذابة للأطفال الصغار دون نصوص تاريخية ثقيلة.",
      duration: "1.5-2.5 ساعة",
      strollerSuitability: "ممتاز — حديقة خارجية مستوية ومرصوفة من النماذج المصغرة.",
      toilets: "متوفرة في الموقع.",
      nearbyFood: "مقهى في الموقع؛ خيارات أكثر باتجاه إمينونو.",
    },
    ku: {
      ageSuitability: "بۆ تەمەنی نزیکەی 3-12 ساڵ باشە — مۆدێلە بچووکەکان سەرنجی منداڵانی بچووک ڕادەکێشن بەبێ دەقی مێژووی قورس.",
      duration: "1.5-2.5 کاتژمێر",
      strollerSuitability: "زۆر باش — پارکێکی دەرەوەی تەخت و ڕێچکەداری مۆدێلە بچووکەکان.",
      toilets: "لە شوێنەکەدا بەردەستە.",
      nearbyFood: "کافێ لە شوێنەکەدا هەیە؛ هەڵبژاردەی زیاتر بەرەو ئیمینۆنو.",
    },
  },
  "rahmi-koc-museum": {
    ar: {
      ageSuitability: "مناسب تقريبًا للأعمار 4-14 — معروضات تفاعلية للمواصلات والصناعة والعلوم بما في ذلك غواصة حقيقية.",
      duration: "2-3 ساعات",
      strollerSuitability: "جيد — قاعات عرض داخلية/خارجية مستوية في الغالب.",
      toilets: "متوفرة في الموقع.",
      nearbyFood: "مقهى في الموقع.",
    },
    ku: {
      ageSuitability: "بۆ تەمەنی نزیکەی 4-14 ساڵ باشە — پیشاندانی دەستکاریکراوی گواستنەوە، پیشەسازی، و زانست، لەگەڵ ژێردەریاییەکی ڕاستەقینە.",
      duration: "2-3 کاتژمێر",
      strollerSuitability: "باشە — زۆربەی هۆڵەکانی پیشاندان لە ژوورەوە/دەرەوە تەختن.",
      toilets: "لە شوێنەکەدا بەردەستە.",
      nearbyFood: "کافێ لە شوێنەکەدا هەیە.",
    },
  },
  "istanbul-aquarium": {
    ar: {
      ageSuitability: "مناسب لجميع الأعمار، وجذاب بشكل خاص للأطفال الصغار.",
      duration: "1.5-2.5 ساعة",
      strollerSuitability: "جيد — داخلي، مستوٍ، ومجاور لمركز تسوق (أكوا فلوريا).",
      toilets: "متوفرة في الموقع (مركز التسوق).",
      nearbyFood: "ساحة طعام في مركز التسوق الملحق.",
    },
    ku: {
      ageSuitability: "بۆ هەموو تەمەنێک باشە، بەتایبەت بۆ منداڵانی بچووکتر سەرنجڕاکێشترە.",
      duration: "1.5-2.5 کاتژمێر",
      strollerSuitability: "باشە — لە ژوورەوە، تەخت، و لەتەنیشت مۆڵێکەوەیە (ئاکوا فلۆریا).",
      toilets: "لە شوێنەکەدا بەردەستە (مۆڵی بازاڕکردن).",
      nearbyFood: "گۆڕەپانی خواردنی مۆڵی پەیوەستکراو.",
    },
  },
};

export function localizeActivity(activity: Activity, locale: Locale): Activity {
  if (locale === "en") return activity;
  const tr = activityTranslations[activity.id]?.[locale];
  if (!tr) return activity;
  return {
    ...activity,
    ageSuitability: tr.ageSuitability,
    duration: tr.duration,
    strollerSuitability: tr.strollerSuitability,
    toilets: tr.toilets ?? activity.toilets,
    nearbyFood: tr.nearbyFood ?? activity.nearbyFood,
  };
}
