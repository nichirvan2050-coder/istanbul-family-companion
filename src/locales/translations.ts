export type Locale = "en" | "ar" | "ku";

export const localeMeta: Record<Locale, { label: string; dir: "ltr" | "rtl" }> = {
  en: { label: "English", dir: "ltr" },
  ar: { label: "العربية", dir: "rtl" },
  ku: { label: "کوردی", dir: "rtl" },
};

type Dict = Record<string, string>;

// Scope note: this covers the app's navigation, homepage, and every page's
// title/intro — the chrome a family actually navigates by. Deep content
// (place history, itinerary detail, Turkish phrase data) stays English in
// this pass; translating ~35 place records is a larger follow-up.
const en: Dict = {
  nav_home: "Home",
  nav_plan: "Plan",
  nav_places: "Places",
  nav_transport: "Transport",
  nav_saved: "Saved",

  home_kicker: "A family trip companion",
  home_title: "ISTANBUL",
  home_subtitle: "See the city. Understand its story.",
  home_tags: "10 Days • Family • History • Transport • AI",
  home_cta: "Start Exploring",
  explore_title: "🧭 Explore Istanbul",
  explore_subtitle: "150+ places across the European side, Asian side, Bosphorus, Princes' Islands, nature, and day trips.",
  explore_cta: "Start Exploring",
  home_ai_title: "✨ Ask Istanbul AI",
  home_ai_example: "“What can we visit near here with our daughter?”",
  home_ai_speak: "🎙️ Tap to Speak",
  home_ai_ask: "⌨️ Ask anything",
  home_family_title: "Traveling with Family?",
  home_family_places: "Family Places",
  home_family_stays: "Family Stays",
  home_family_parks: "Parks",
  home_family_kids: "Kids Activities",
  home_istanbulkart_title: "Istanbulkart",
  home_istanbulkart_subtitle: "Get set up on transport",
  home_turkish_title: "Turkish for Your Trip",
  home_turkish_subtitle: "Practical phrases + audio",

  places_title: "📍 Places",
  places_subtitle: "Curated places — not the whole city, just what's worth your time.",
  plan_title: "🗓️ 10-Day Istanbul Plan",
  plan_subtitle: "Geographically sensible days — no unnecessary crisscrossing the city.",
  transport_title: "🚋 Istanbul Transport",
  family_title: "👨‍👩‍👧 Family",
  turkish_title: "🇹🇷 Turkish for Your Trip",
  turkish_subtitle: "Practical travel Turkish, not a language course.",
  saved_title: "❤️ Saved",
  about_title: "About My Istanbul",
  sources_title: "Official Source Directory",
  beforeYouGo_title: "Before Istanbul",
  prices_title: "🎟️ Tickets & Prices",

  common_save: "Save",
  common_saved: "Saved",
  common_share: "Share",
  common_listen: "Listen",
  common_free: "Free",
  common_paid: "Paid",
};

const ar: Dict = {
  nav_home: "الرئيسية",
  nav_plan: "الخطة",
  nav_places: "الأماكن",
  nav_transport: "المواصلات",
  nav_saved: "المحفوظات",

  home_kicker: "رفيق رحلة العائلة",
  home_title: "إسطنبول",
  home_subtitle: "شاهد المدينة. افهم قصتها.",
  home_tags: "١٠ أيام • العائلة • التاريخ • المواصلات • الذكاء الاصطناعي",
  home_cta: "ابدأ الاستكشاف",

  explore_title: "🧭 استكشف إسطنبول",
  explore_subtitle: "أكثر من ١٥٠ مكانًا في الجانب الأوروبي والآسيوي والبوسفور وجزر الأمراء والطبيعة والرحلات اليومية.",
  explore_cta: "ابدأ الاستكشاف",

  home_ai_title: "✨ اسأل ذكاء إسطنبول",
  home_ai_example: "«ما الذي يمكننا زيارته بالقرب من هنا مع ابنتنا؟»",
  home_ai_speak: "🎙️ اضغط للتحدث",
  home_ai_ask: "⌨️ اسأل أي شيء",
  home_family_title: "تسافرون مع العائلة؟",
  home_family_places: "أماكن عائلية",
  home_family_stays: "إقامات عائلية",
  home_family_parks: "الحدائق",
  home_family_kids: "أنشطة للأطفال",
  home_istanbulkart_title: "بطاقة إسطنبول",
  home_istanbulkart_subtitle: "جهّز نفسك للمواصلات",
  home_turkish_title: "التركية لرحلتك",
  home_turkish_subtitle: "عبارات عملية + صوت",

  places_title: "📍 الأماكن",
  places_subtitle: "أماكن مختارة بعناية — تستحق وقتك.",
  plan_title: "🗓️ خطة إسطنبول لعشرة أيام",
  plan_subtitle: "أيام منظمة جغرافيًا — دون تنقل غير ضروري في المدينة.",
  transport_title: "🚋 مواصلات إسطنبول",
  family_title: "👨‍👩‍👧 العائلة",
  turkish_title: "🇹🇷 التركية لرحلتك",
  turkish_subtitle: "تركية عملية للسفر، وليست دورة لغة.",
  saved_title: "❤️ المحفوظات",
  about_title: "عن تطبيق إسطنبولي",
  sources_title: "دليل المصادر الرسمية",
  beforeYouGo_title: "قبل إسطنبول",
  prices_title: "🎟️ التذاكر والأسعار",

  common_save: "حفظ",
  common_saved: "محفوظ",
  common_share: "مشاركة",
  common_listen: "استماع",
  common_free: "مجاني",
  common_paid: "مدفوع",
};

const ku: Dict = {
  nav_home: "ماڵەوە",
  nav_plan: "پلان",
  nav_places: "شوێنەکان",
  nav_transport: "گواستنەوە",
  nav_saved: "هەڵگیراوەکان",

  home_kicker: "هاوڕێی گەشتی خێزانی",
  home_title: "ئیستەنبوڵ",
  home_subtitle: "شارەکە ببینە. چیرۆکەکەی تێبگە.",
  home_tags: "١٠ ڕۆژ • خێزان • مێژوو • گواستنەوە • زیرەکی دەستکرد",
  home_cta: "دەستپێبکە بە گەڕان",

  explore_title: "🧭 گەشتی ئیستەنبوڵ بکە",
  explore_subtitle: "زیاتر لە ١٥٠ شوێن لە لای ئەورووپی و ئاسیایی و بۆسفۆر و دوورگەکانی میران و سروشت و گەشتی ڕۆژانە.",
  explore_cta: "دەستپێبکە بە گەڕان",

  home_ai_title: "✨ پرسیار لە زیرەکی ئیستەنبوڵ بکە",
  home_ai_example: "«لەگەڵ کچەکەمان چی دەتوانین لێرە نزیک سەردانی بکەین؟»",
  home_ai_speak: "🎙️ دەست لێبدە بۆ قسەکردن",
  home_ai_ask: "⌨️ هەر پرسیارێک بکە",
  home_family_title: "گەشت لەگەڵ خێزان دەکەیت؟",
  home_family_places: "شوێنی خێزانی",
  home_family_stays: "نیشتەجێبوونی خێزانی",
  home_family_parks: "پارکەکان",
  home_family_kids: "چالاکی بۆ منداڵان",
  home_istanbulkart_title: "ئیستەنبوڵکارت",
  home_istanbulkart_subtitle: "ئامادەبە بۆ گواستنەوە",
  home_turkish_title: "تورکی بۆ گەشتەکەت",
  home_turkish_subtitle: "دەستەواژەی کاریگەر + دەنگ",

  places_title: "📍 شوێنەکان",
  places_subtitle: "شوێنی هەڵبژێردراو کە شایانی کاتەکەتن.",
  plan_title: "🗓️ پلانی ١٠ ڕۆژەی ئیستەنبوڵ",
  plan_subtitle: "ڕۆژانێکی ڕێکخراو بەگوێرەی جوگرافیا — بێ جووڵەی زیادە بەناو شاردا.",
  transport_title: "🚋 گواستنەوەی ئیستەنبوڵ",
  family_title: "👨‍👩‍👧 خێزان",
  turkish_title: "🇹🇷 تورکی بۆ گەشتەکەت",
  turkish_subtitle: "تورکیی کاریگەر بۆ گەشتکردن، نەک کۆرسی زمان.",
  saved_title: "❤️ هەڵگیراوەکان",
  about_title: "دەربارەی ئیستەنبوڵی من",
  sources_title: "ڕێنمایی سەرچاوە فەرمییەکان",
  beforeYouGo_title: "پێش ئیستەنبوڵ",
  prices_title: "🎟️ بلیت و نرخەکان",

  common_save: "هەڵگرتن",
  common_saved: "هەڵگیراوە",
  common_share: "هاوبەشکردن",
  common_listen: "گوێگرتن",
  common_free: "بەخۆڕایی",
  common_paid: "بەپارە",
};

export const translations: Record<Locale, Dict> = { en, ar, ku };
export type TranslationKey = keyof typeof en;
