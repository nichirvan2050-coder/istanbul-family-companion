// Localized versions of Istanbul AI's own generated sentences (the fixed
// phrasing the rule-based engine wraps around live data), separate from
// ./aiPlace data and from src/locales/translations.ts (static UI chrome).
// These need parameter interpolation, so each entry is a function rather
// than a plain string. Values plugged in here (place names/summaries/etc.)
// are already localized by the caller via localizePlace() before being
// passed in — this file only supplies the assistant's own wording.
//
// Scope note: transport mode names/notes, Istanbulkart's descriptive text,
// and fare-table labels are now translated too (see
// ./transportTranslations.ts) — only the cited numeric/sourced facts
// (fare values, card fee, source names) stay as published. museumPass and
// area.whyFamilies are still English-only, the same "deep content stays
// English" boundary documented in ./placeTranslations.ts. The assistant's
// own sentences around all of this are fully localized either way.
import { Locale } from "@/locales/translations";
import { RegionGroup } from "@/data/types";

export interface AIStrings {
  askPrompt: string;
  emptyQuery: string;
  followUpEasiest: string;
  miniPlan: (hours: number, easy: boolean) => string;
  miniPlanNoData: string;
  turkishNoMatch: string;
  turkishMatch: (turkish: string, meaning: string) => string;
  priceFree: (name: string) => string;
  priceKnown: (name: string, value: string, sourceName: string, date: string) => string;
  priceUnverified: (name: string) => string;
  museumPass: (value: string, validity: string, sourceName: string, date: string) => string;
  priceGeneric: string;
  istanbulkart: (whatIsIt: string, feeValue: string, sourceName: string, date: string) => string;
  transportToPlace: (name: string, mode: string, line: string | undefined, to: string | undefined, duration: string | undefined) => string;
  transportFareRow: (transport: string, fare: string, fareType: string, sourceName: string) => string;
  transportGeneric: string;
  familyOptions: string;
  familyNoMatch: string;
  nearbyLocationOff: string;
  nearbyStationsOnly: string;
  nearbyStationsNote: string;
  nearbyBoth: string;
  nearbyBothNote: string;
  staysIntro: string;
  staysRatingUnverified: string;
  activitiesIntro: string;
  historyPrompt: string;
  dayTripNamed: (district: string, transportDetail: string, duration: string | undefined, whyVisit: string, familyLevel: string, suggestedDuration: string) => string;
  dayTripGeneric: string;
  islandNamed: (name: string, summary: string) => string;
  islandGeneric: string;
  areaPlanText: (regionLabel: string) => string;
  areaPlanSourceNote: string;
  findPlacesNoMatch: string;
  findPlacesFound: (count: number) => string;
  areaMatchText: (name: string, whyFamilies: string) => string;
  voiceNotSupported: string;
  sourceLabel: string;
  free: string;
  paid: string;
  familyLevel: (level: "easy" | "moderate" | "difficult") => string;
  walkingLevel: (level: "light" | "moderate" | "heavy") => string;
  morning: string;
  midday: string;
  afternoon: string;
  evening: string;
}

const en: AIStrings = {
  askPrompt: "Ask about places, family activities, transport, prices, history, or Turkish phrases. Answers come only from this guide's own verified data.",
  emptyQuery: "Ask me anything about places, family activities, transport, prices, history, or Turkish phrases.",
  followUpEasiest: "From your last results, easiest for a family first:",
  miniPlan: (hours, easy) => `Here's a realistic ${hours}-hour plan using verified places from the guide${easy ? ", kept to easy/family-friendly stops" : ""}. Times are approximate — adjust for crowds and breaks.`,
  miniPlanNoData: `I couldn't build a plan from the current data — try naming an area (e.g. "2 hours near Sultanahmet").`,
  turkishNoMatch: "I don't have a verified Turkish phrase that matches that exactly. Here are the most commonly needed phrases instead:",
  turkishMatch: (turkish, meaning) => `Turkish: "${turkish}" — ${meaning}`,
  priceFree: (name) => `${name} is free to enter.`,
  priceKnown: (name, value, sourceName, date) => `${name}: ${value}. Source: ${sourceName}, checked ${date}.`,
  priceUnverified: (name) => `I don't have a verified current price for ${name}.`,
  museumPass: (value, validity, sourceName, date) => `Museum Pass Istanbul: ${value}, valid ${validity}. Source: ${sourceName}, checked ${date}. See /prices for what's included and excluded.`,
  priceGeneric: `Name a specific place (e.g. "How much is Topkapı?") and I'll give you the verified price and source, or see the full Prices page.`,
  istanbulkart: (whatIsIt, feeValue, sourceName, date) => `Istanbulkart: ${whatIsIt} ${feeValue} (source: ${sourceName}, checked ${date}).`,
  transportToPlace: (name, mode, line, to, duration) => `To reach ${name}: ${mode}${line ? ` (${line})` : ""}${to ? ` to ${to}` : ""}${duration ? `, ${duration}` : ""}.`,
  transportFareRow: (transport, fare, fareType, sourceName) => `${transport}: ${fare} (${fareType}). Source: ${sourceName}, checked — see /transport for details.`,
  transportGeneric: `See /transport for tram, metro, Marmaray, ferry, bus, and Istanbulkart details, or ask about a specific place (e.g. "How do I get to Kadıköy?").`,
  familyOptions: "Family-friendly options, easiest first:",
  familyNoMatch: "I couldn't find a verified family-friendly match — try /family for the full list.",
  nearbyLocationOff: `Location access is off. Search by area instead, or enable location to use "Near Me."`,
  nearbyStationsOnly: "Closest transit stations to your current location:",
  nearbyStationsNote: "Station coordinates are approximate (street-block accuracy) — confirm exact platform/exit locally.",
  nearbyBoth: "Closest verified places to your current location, plus the nearest transit:",
  nearbyBothNote: "Station coordinates are approximate (street-block accuracy) — confirm exact platform/exit locally. See /near-me for the full sorted list.",
  staysIntro: "Family Stays only shows areas and verified guest ratings — it is not a booking platform, and hotels are never ranked against each other.",
  staysRatingUnverified: "Rating not verified",
  activitiesIntro: "Verified family activities:",
  historyPrompt: `Name a place (e.g. "Tell me about Hagia Sophia") and I'll pull its verified history.`,
  dayTripNamed: (district, transportDetail, duration, whyVisit, familyLevel, suggestedDuration) =>
    `📍 Outside Istanbul (${district}). 🚗 ${transportDetail}${duration ? ` — ⏱️ ${duration}` : ""}. 🌲 ${whyVisit} 👨‍👩‍👧 ${familyLevel} with kids. 🗓️ Suggested: ${suggestedDuration}. ⚠️ Confirm current road/transport conditions before you go.`,
  dayTripGeneric: "📍 These are all outside Istanbul (Sapanca in Sakarya Province, Maşukiye and Kartepe in Kocaeli Province) — not a same-day option without planning around traffic. See /day-trips for the full picture.",
  islandNamed: (name, summary) => `${name}: ${summary}`,
  islandGeneric: `The four Princes' Islands with regular ferry service — no private cars on any of them. See /islands for a factual comparison (none ranked as "best").`,
  areaPlanText: (regionLabel) => `A geographically sensible day on the ${regionLabel}:`,
  areaPlanSourceNote: "Route built from this guide's own verified places and their real transport links.",
  findPlacesNoMatch: "I couldn't find a verified match in the guide for that. Try a place name, neighborhood, or category (history, family, bosphorus, market).",
  findPlacesFound: (count) => `Found ${count} match${count === 1 ? "" : "es"}:`,
  areaMatchText: (name, whyFamilies) => `${name}: ${whyFamilies}`,
  voiceNotSupported: "Voice input isn't supported in this browser — try typing instead.",
  sourceLabel: "Source:",
  free: "Free",
  paid: "Paid",
  familyLevel: (level) => level,
  walkingLevel: (level) => level,
  morning: "Morning",
  midday: "Midday",
  afternoon: "Afternoon",
  evening: "Evening",
};

const ar: AIStrings = {
  askPrompt: "اسأل عن الأماكن، الأنشطة العائلية، المواصلات، الأسعار، التاريخ، أو العبارات التركية. الإجابات تأتي فقط من البيانات الموثقة في هذا الدليل.",
  emptyQuery: "اسألني عن أي شيء يخص الأماكن، الأنشطة العائلية، المواصلات، الأسعار، التاريخ، أو العبارات التركية.",
  followUpEasiest: "من نتائجك الأخيرة، الأسهل للعائلة أولاً:",
  miniPlan: (hours, easy) => `إليك خطة واقعية لمدة ${hours} ساعة باستخدام أماكن موثقة من الدليل${easy ? "، مقتصرة على المحطات السهلة والمناسبة للعائلة" : ""}. الأوقات تقريبية — عدّلها حسب الازدحام والاستراحات.`,
  miniPlanNoData: `لم أتمكن من بناء خطة من البيانات الحالية — جرّب ذكر منطقة (مثلاً "ساعتان بالقرب من السلطان أحمد").`,
  turkishNoMatch: "ليس لدي عبارة تركية موثقة تطابق ذلك تمامًا. إليك العبارات الأكثر احتياجًا بدلاً من ذلك:",
  turkishMatch: (turkish, meaning) => `التركية: "${turkish}" — ${meaning}`,
  priceFree: (name) => `${name} مجاني الدخول.`,
  priceKnown: (name, value, sourceName, date) => `${name}: ${value}. المصدر: ${sourceName}، تم التحقق في ${date}.`,
  priceUnverified: (name) => `ليس لدي سعر موثّق حاليًا لـ ${name}.`,
  museumPass: (value, validity, sourceName, date) => `بطاقة متاحف إسطنبول: ${value}، صالحة ${validity}. المصدر: ${sourceName}، تم التحقق في ${date}. راجع صفحة الأسعار لمعرفة ما هو مشمول وما هو غير مشمول.`,
  priceGeneric: `اذكر مكانًا محددًا (مثلاً "كم سعر دخول توبكابي؟") وسأعطيك السعر الموثّق ومصدره، أو راجع صفحة الأسعار الكاملة.`,
  istanbulkart: (whatIsIt, feeValue, sourceName, date) => `إسطنبول كارت: ${whatIsIt} ${feeValue} (المصدر: ${sourceName}، تم التحقق في ${date}).`,
  transportToPlace: (name, mode, line, to, duration) => `للوصول إلى ${name}: ${mode}${line ? ` (${line})` : ""}${to ? ` إلى ${to}` : ""}${duration ? `، ${duration}` : ""}.`,
  transportFareRow: (transport, fare, fareType, sourceName) => `${transport}: ${fare} (${fareType}). المصدر: ${sourceName} — راجع صفحة المواصلات للتفاصيل.`,
  transportGeneric: `راجع صفحة المواصلات لمعرفة تفاصيل الترام والمترو ومارماراي والعبّارات والحافلات وإسطنبول كارت، أو اسأل عن مكان محدد (مثلاً "كيف أصل إلى قاضي كوي؟").`,
  familyOptions: "خيارات مناسبة للعائلة، الأسهل أولاً:",
  familyNoMatch: "لم أجد نتيجة موثقة مناسبة للعائلة — جرّب صفحة العائلة لرؤية القائمة الكاملة.",
  nearbyLocationOff: `الوصول إلى الموقع مغلق. ابحث حسب المنطقة بدلاً من ذلك، أو فعّل تحديد الموقع لاستخدام "بالقرب مني".`,
  nearbyStationsOnly: "أقرب محطات المواصلات إلى موقعك الحالي:",
  nearbyStationsNote: "إحداثيات المحطات تقريبية (بدقة مستوى الحي) — تأكد من المخرج أو الرصيف الدقيق عند الوصول.",
  nearbyBoth: "أقرب الأماكن الموثقة إلى موقعك الحالي، بالإضافة إلى أقرب وسيلة مواصلات:",
  nearbyBothNote: "إحداثيات المحطات تقريبية (بدقة مستوى الحي) — تأكد من المخرج أو الرصيف الدقيق عند الوصول. راجع صفحة بالقرب مني للقائمة الكاملة المرتبة.",
  staysIntro: "قسم الإقامات العائلية يعرض فقط المناطق والتقييمات الموثقة للنزلاء — وهو ليس منصة حجز، والفنادق لا تُصنَّف أبدًا مقابل بعضها.",
  staysRatingUnverified: "التقييم غير موثّق",
  activitiesIntro: "الأنشطة العائلية الموثقة:",
  historyPrompt: `اذكر اسم مكان (مثلاً "أخبرني عن آيا صوفيا") وسأحضر لك تاريخه الموثّق.`,
  dayTripNamed: (district, transportDetail, duration, whyVisit, familyLevel, suggestedDuration) =>
    `📍 خارج إسطنبول (${district}). 🚗 ${transportDetail}${duration ? ` — ⏱️ ${duration}` : ""}. 🌲 ${whyVisit} 👨‍👩‍👧 ${familyLevel} مع الأطفال. 🗓️ المدة المقترحة: ${suggestedDuration}. ⚠️ تأكد من حالة الطريق أو المواصلات الحالية قبل الذهاب.`,
  dayTripGeneric: "📍 كل هذه الأماكن خارج إسطنبول (سابانجا في محافظة سكاريا، وماشوكيه وكارتيبه في محافظة كوجالي) — وليست خيارًا ليوم واحد دون التخطيط لحركة المرور. راجع صفحة الرحلات اليومية للصورة الكاملة.",
  islandNamed: (name, summary) => `${name}: ${summary}`,
  islandGeneric: `جزر الأمراء الأربع التي تخدمها العبّارات بانتظام — لا سيارات خاصة على أي منها. راجع صفحة الجزر لمقارنة موضوعية (لا تصنيف لأي منها كـ"الأفضل").`,
  areaPlanText: (regionLabel) => `يوم منظم جغرافيًا في ${regionLabel}:`,
  areaPlanSourceNote: "المسار مبني من أماكن هذا الدليل الموثقة وروابط المواصلات الحقيقية بينها.",
  findPlacesNoMatch: "لم أجد نتيجة موثقة في الدليل لذلك. جرّب اسم مكان، أو حيًا، أو فئة (تاريخ، عائلة، بوسفور، سوق).",
  findPlacesFound: (count) => (count === 1 ? "تم العثور على نتيجة واحدة:" : count === 2 ? "تم العثور على نتيجتين:" : `تم العثور على ${count} نتيجة:`),
  areaMatchText: (name, whyFamilies) => `${name}: ${whyFamilies}`,
  voiceNotSupported: "التعرف على الصوت غير مدعوم في هذا المتصفح — جرّب الكتابة بدلاً من ذلك.",
  sourceLabel: "المصدر:",
  free: "مجاني",
  paid: "مدفوع",
  familyLevel: (level) => (level === "easy" ? "سهل" : level === "moderate" ? "متوسط" : "صعب"),
  walkingLevel: (level) => (level === "light" ? "خفيف" : level === "moderate" ? "متوسط" : "شاق"),
  morning: "الصباح",
  midday: "الظهيرة",
  afternoon: "بعد الظهر",
  evening: "المساء",
};

const ku: AIStrings = {
  askPrompt: "پرسیار دەربارەی شوێنەکان، چالاکی خێزانی، گواستنەوە، نرخەکان، مێژوو، یان دەستەواژەی تورکی بکە. وەڵامەکان تەنها لە داتای پشتڕاستکراوەی ئەم ڕێنماییە دێن.",
  emptyQuery: "پرسیارم لێ بکە دەربارەی هەر شتێک لەبارەی شوێنەکان، چالاکی خێزانی، گواستنەوە، نرخەکان، مێژوو، یان دەستەواژەی تورکی.",
  followUpEasiest: "لە دەرئەنجامە کۆتاییەکانت، سادەترین بۆ خێزان یەکەم:",
  miniPlan: (hours, easy) => `ئەمە پلانێکی ڕاستەقینەیە بۆ ${hours} کاتژمێر بە بەکارهێنانی شوێنی پشتڕاستکراو لە ڕێنماییەکە${easy ? "، تەنها بۆ شوێنی سادە و گونجاو بۆ خێزان" : ""}. کاتەکان تەخمینین — بەگوێرەی قەرەباڵغی و پشوو ڕێکیبخە.`,
  miniPlanNoData: `نەمتوانی پلانێک لە داتای ئێستاوە دروست بکەم — تکایە ناوی ناوچەیەک بڵێ (بۆ نموونە "دوو کاتژمێر لە نزیک سوڵتان ئەحمەد").`,
  turkishNoMatch: "دەستەواژەیەکی تورکیی پشتڕاستکراوم نییە کە بە تەواوی لەگەڵ ئەوە بگونجێت. لەبری ئەوە، ئەمانە باوترین دەستەواژە پێویستەکانن:",
  turkishMatch: (turkish, meaning) => `تورکی: "${turkish}" — ${meaning}`,
  priceFree: (name) => `${name} بەخۆڕایی دەچیتە ژوورەوە.`,
  priceKnown: (name, value, sourceName, date) => `${name}: ${value}. سەرچاوە: ${sourceName}، پشتڕاستکراوەتەوە لە ${date}.`,
  priceUnverified: (name) => `نرخێکی پشتڕاستکراوی ئێستام نییە بۆ ${name}.`,
  museumPass: (value, validity, sourceName, date) => `کارتی مۆزەخانەی ئیستەنبوڵ: ${value}، بەکاردێت ${validity}. سەرچاوە: ${sourceName}، پشتڕاستکراوەتەوە لە ${date}. سەردانی پەڕەی نرخەکان بکە بۆ زانینی چی لەخۆدەگرێت و چی نا.`,
  priceGeneric: `ناوی شوێنێکی دیاریکراو بڵێ (بۆ نموونە "نرخی چوونەژوورەوەی تۆپقاپی چەندە؟") و نرخی پشتڕاستکراو و سەرچاوەکەی پێدەدەم، یان سەردانی پەڕەی نرخەکان بکە.`,
  istanbulkart: (whatIsIt, feeValue, sourceName, date) => `ئیستەنبوڵکارت: ${whatIsIt} ${feeValue} (سەرچاوە: ${sourceName}، پشتڕاستکراوەتەوە لە ${date}).`,
  transportToPlace: (name, mode, line, to, duration) => `بۆ گەیشتن بە ${name}: ${mode}${line ? ` (${line})` : ""}${to ? ` بۆ ${to}` : ""}${duration ? `، ${duration}` : ""}.`,
  transportFareRow: (transport, fare, fareType, sourceName) => `${transport}: ${fare} (${fareType}). سەرچاوە: ${sourceName} — سەردانی پەڕەی گواستنەوە بکە بۆ وردەکاری.`,
  transportGeneric: `سەردانی پەڕەی گواستنەوە بکە بۆ وردەکاری ترام، مەترۆ، مارمارای، کەشتی، پاس و ئیستەنبوڵکارت، یان پرسیار لەبارەی شوێنێکی دیاریکراو بکە (بۆ نموونە "چۆن دەگەمە قاضیکۆی؟").`,
  familyOptions: "هەڵبژاردەی گونجاو بۆ خێزان، سادەترین یەکەم:",
  familyNoMatch: "هیچ ئەنجامێکی پشتڕاستکراوی گونجاو بۆ خێزانم نەدۆزییەوە — سەردانی پەڕەی خێزان بکە بۆ لیستی تەواو.",
  nearbyLocationOff: `دەستگەیشتن بە شوێن داخراوە. لەبری ئەوە بەگوێرەی ناوچە بگەڕێ، یان شوێننیشاندان چالاک بکە بۆ بەکارهێنانی "لە نزیکم."`,
  nearbyStationsOnly: "نزیکترین وێستگەکانی گواستنەوە لە شوێنی ئێستاتەوە:",
  nearbyStationsNote: "کۆردینەیتی وێستگەکان تەخمینین (بە وردی ئاستی گەڕەک) — کاتێک گەیشتیت دەرگا یان ڕۆشوانی وردی بپشکنە.",
  nearbyBoth: "نزیکترین شوێنە پشتڕاستکراوەکان لە شوێنی ئێستاتەوە، لەگەڵ نزیکترین گواستنەوە:",
  nearbyBothNote: "کۆردینەیتی وێستگەکان تەخمینین (بە وردی ئاستی گەڕەک) — کاتێک گەیشتیت دەرگا یان ڕۆشوانی وردی بپشکنە. سەردانی پەڕەی لە نزیکم بکە بۆ لیستی تەواوی ڕیزکراو.",
  staysIntro: "بەشی نیشتەجێبوونی خێزانی تەنها ناوچە و هەڵسەنگاندنی پشتڕاستکراوی میوانان پیشان دەدات — ئەمە پلاتفۆرمی ڕیزەرڤکردن نییە، و هوتێلەکان هەرگیز بەراورد بە یەکتر ناکرێن.",
  staysRatingUnverified: "هەڵسەنگاندن پشتڕاست نەکراوەتەوە",
  activitiesIntro: "چالاکی خێزانی پشتڕاستکراو:",
  historyPrompt: `ناوی شوێنێک بڵێ (بۆ نموونە "دەربارەی ئایا سۆفیا پێم بڵێ") و مێژووی پشتڕاستکراوی بۆ دەهێنم.`,
  dayTripNamed: (district, transportDetail, duration, whyVisit, familyLevel, suggestedDuration) =>
    `📍 دەرەوەی ئیستەنبوڵ (${district}). 🚗 ${transportDetail}${duration ? ` — ⏱️ ${duration}` : ""}. 🌲 ${whyVisit} 👨‍👩‍👧 ${familyLevel} لەگەڵ منداڵان. 🗓️ پێشنیارکراو: ${suggestedDuration}. ⚠️ پێش ڕۆیشتن دڵنیابەرەوە لە باری ڕێگا یان گواستنەوەی ئێستا.`,
  dayTripGeneric: "📍 هەموو ئەمانە دەرەوەی ئیستەنبوڵن (ساپانجا لە پارێزگای سەکاریا، ماشووکیە و کارتەپە لە پارێزگای کۆجائەلی) — ئەمە هەڵبژاردەیەکی یەک ڕۆژە نییە بێ پلانی هاتووچۆ. سەردانی پەڕەی گەشتی ڕۆژانە بکە بۆ وێنەی تەواو.",
  islandNamed: (name, summary) => `${name}: ${summary}`,
  islandGeneric: `چوار دوورگەی میران بە خزمەتگوزاری بەردەوامی کەشتی — هیچ ئۆتۆمبیلی تایبەتی لەسەریان نییە. سەردانی پەڕەی دوورگەکان بکە بۆ بەراوردێکی ڕاستەقینە (هیچیان وەک "باشترین" ڕیز نەکراون).`,
  areaPlanText: (regionLabel) => `ڕۆژێکی لەڕووی جوگرافیاوە گونجاو لە ${regionLabel}:`,
  areaPlanSourceNote: "ڕێڕەوەکە لە شوێنە پشتڕاستکراوەکانی ئەم ڕێنمایی و بەستنەوە ڕاستەقینەکانی گواستنەوەیان دروستکراوە.",
  findPlacesNoMatch: "هیچ ئەنجامێکی پشتڕاستکراوم لە ڕێنماییەکەدا نەدۆزییەوە بۆ ئەوە. تکایە ناوی شوێنێک، گەڕەک، یان بەش تاقی بکەوە (مێژوو، خێزان، بۆسفۆر، بازاڕ).",
  findPlacesFound: (count) => (count === 1 ? "یەک ئەنجام دۆزرایەوە:" : `${count} ئەنجام دۆزرایەوە:`),
  areaMatchText: (name, whyFamilies) => `${name}: ${whyFamilies}`,
  voiceNotSupported: "دەنگدانان لەم وێبگەڕەدا پشتگیری نەکراوە — لەبری ئەوە بنووسە.",
  sourceLabel: "سەرچاوە:",
  free: "بەخۆڕایی",
  paid: "بەپارە",
  familyLevel: (level) => (level === "easy" ? "سادە" : level === "moderate" ? "مامناوەند" : "قورس"),
  walkingLevel: (level) => (level === "light" ? "سووک" : level === "moderate" ? "مامناوەند" : "قورس"),
  morning: "بەیانی",
  midday: "نیوەڕۆ",
  afternoon: "دوای نیوەڕۆ",
  evening: "ئێوارە",
};

export const aiStrings: Record<Locale, AIStrings> = { en, ar, ku };

export const regionGroupLabels: Record<Locale, Record<RegionGroup, string>> = {
  en: { europe: "European Side", asia: "Asian Side", bosphorus: "Bosphorus", islands: "Princes' Islands", nature: "Nature & Outdoors", "day-trip": "Day Trips" },
  ar: { europe: "الجانب الأوروبي", asia: "الجانب الآسيوي", bosphorus: "البوسفور", islands: "جزر الأمراء", nature: "الطبيعة والأماكن المفتوحة", "day-trip": "الرحلات اليومية" },
  ku: { europe: "لای ئەورووپی", asia: "لای ئاسیایی", bosphorus: "بۆسفۆر", islands: "دوورگەکانی میران", nature: "سروشت و دەرەوە", "day-trip": "گەشتی ڕۆژانە" },
};
