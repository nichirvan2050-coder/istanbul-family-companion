import { TurkishPhrase } from "./types";

// Practical travel Turkish only — not a language course. Kurdish (Sorani) and
// Arabic translations aim for natural, everyday phrasing; audio uses the
// device/browser's built-in text-to-speech (see src/lib/speech.ts), so no
// audio files are bundled and phrases still work offline as text.
export const turkishPhrases: TurkishPhrase[] = [
  // Basic
  { id: "hello", category: "basic", turkish: "Merhaba", english: "Hello", kurdish: "سڵاو", arabic: "مرحبا", pronunciation: "mehr-hah-BAH" },
  { id: "thank-you", category: "basic", turkish: "Teşekkür ederim", english: "Thank you", kurdish: "سوپاس", arabic: "شكرًا", pronunciation: "teh-shek-KEUR eh-deh-rim" },
  { id: "please", category: "basic", turkish: "Lütfen", english: "Please", kurdish: "تکایە", arabic: "من فضلك", pronunciation: "LEUT-fen" },
  { id: "yes", category: "basic", turkish: "Evet", english: "Yes", kurdish: "بەڵێ", arabic: "نعم", pronunciation: "eh-VET" },
  { id: "no", category: "basic", turkish: "Hayır", english: "No", kurdish: "نا", arabic: "لا", pronunciation: "hah-YUHR" },
  { id: "excuse-me", category: "basic", turkish: "Affedersiniz", english: "Excuse me", kurdish: "بەبورەیی", arabic: "لو سمحت", pronunciation: "ahf-feh-DEHR-see-niz" },
  { id: "sorry", category: "basic", turkish: "Özür dilerim", english: "Sorry", kurdish: "ببورە", arabic: "آسف", pronunciation: "eu-ZEUR dee-leh-rim" },
  { id: "goodbye", category: "basic", turkish: "Hoşça kalın", english: "Goodbye", kurdish: "بەخێر بچیت", arabic: "مع السلامة", pronunciation: "hosh-CHAH kah-luhn" },

  // Taxi
  { id: "taxi-where", category: "taxi", turkish: "Taksi nerede?", english: "Where is the taxi?", kurdish: "تاکسی لە کوێیە؟", arabic: "أين سيارة الأجرة؟", pronunciation: "TAHK-see NEHR-eh-deh?" },
  { id: "taxi-address", category: "taxi", turkish: "Bu adrese lütfen.", english: "Please take me to this address.", kurdish: "تکایە بمبە ئەم ناونیشانە.", arabic: "خذني إلى هذا العنوان من فضلك.", pronunciation: "boo ah-dreh-SEH leut-fen" },
  { id: "taxi-how-much", category: "taxi", turkish: "Ne kadar?", english: "How much?", kurdish: "چەندە؟", arabic: "كم الثمن؟", pronunciation: "neh kah-DAHR?" },
  { id: "taxi-meter", category: "taxi", turkish: "Lütfen taksimetreyi açın.", english: "Please use the meter.", kurdish: "تکایە کاژێرەکە داخل بکە.", arabic: "من فضلك شغّل العداد.", pronunciation: "leut-fen tahk-see-met-reh-yee ah-CHUN" },
  { id: "taxi-stop-here", category: "taxi", turkish: "Burada durun lütfen.", english: "Stop here, please.", kurdish: "تکایە لێرە ڕابوەستە.", arabic: "توقف هنا من فضلك.", pronunciation: "boo-rah-DAH doo-ROON leut-fen" },
  { id: "taxi-wait", category: "taxi", turkish: "Bekleyebilir misiniz?", english: "Can you wait?", kurdish: "دەتوانیت چاوەڕێ بکەیت؟", arabic: "هل يمكنك الانتظار؟", pronunciation: "behk-leh-yeh-bee-LEER mee-see-niz?" },
  { id: "taxi-small-child", category: "taxi", turkish: "Küçük bir çocuğumuz var, lütfen dikkatli gidin.", english: "We have a small child, please drive carefully.", kurdish: "منداڵێکی بچووکمان هەیە، تکایە بە وریایی بڕۆ.", arabic: "لدينا طفل صغير، من فضلك قد بحذر.", pronunciation: "keu-CHEUK beer choh-joo-oo-MOOZ vahr, leut-fen deek-kaht-LEE gee-DEEN" },

  // Transport
  { id: "transport-tram", category: "transport", turkish: "Tramvay nerede?", english: "Where is the tram?", kurdish: "ترامفای لە کوێیە؟", arabic: "أين الترام؟", pronunciation: "trahm-VIGH NEHR-eh-deh?" },
  { id: "transport-metro", category: "transport", turkish: "Metro nerede?", english: "Where is the metro?", kurdish: "مەترۆ لە کوێیە؟", arabic: "أين المترو؟", pronunciation: "meh-TROH NEHR-eh-deh?" },
  { id: "transport-ferry", category: "transport", turkish: "Vapur nerede?", english: "Where is the ferry?", kurdish: "کەشتی لە کوێیە؟", arabic: "أين العبّارة؟", pronunciation: "vah-POOR NEHR-eh-deh?" },
  { id: "transport-which-direction", category: "transport", turkish: "Hangi yöne?", english: "Which direction?", kurdish: "بەرەو کام لا؟", arabic: "أي اتجاه؟", pronunciation: "HAHN-gee yeu-NEH?" },
  { id: "transport-which-station", category: "transport", turkish: "Hangi istasyon?", english: "Which station?", kurdish: "کام وێستگە؟", arabic: "أي محطة؟", pronunciation: "HAHN-gee ees-tahs-YOHN?" },
  { id: "transport-istanbulkart-where", category: "transport", turkish: "İstanbulkart nereden alabilirim?", english: "Where can I buy an Istanbulkart?", kurdish: "لە کوێ دەتوانم ئیستانبوڵکارت بکڕم؟", arabic: "من أين يمكنني شراء إسطنبول كارت؟", pronunciation: "ees-tahn-bool-KAHRT nehr-eh-DEN ah-lah-bee-lee-RIM?" },
  { id: "transport-uskudar-how", category: "transport", turkish: "Üsküdar'a nasıl gidebilirim?", english: "How can I get to Üsküdar?", kurdish: "چۆن دەتوانم بچمە ئوسکودار؟", arabic: "كيف يمكنني الوصول إلى أسكودار؟", pronunciation: "ews-kew-dahr-AH nah-SUHL gee-deh-bee-lee-RIM?" },

  // Hotel
  { id: "hotel-reservation", category: "hotel", turkish: "Rezervasyonum var.", english: "I have a reservation.", kurdish: "من ڕیزێرڤم هەیە.", arabic: "لدي حجز.", pronunciation: "reh-zehr-vahs-yoh-NOOM vahr" },
  { id: "hotel-reception", category: "hotel", turkish: "Resepsiyon nerede?", english: "Where is reception?", kurdish: "پێشوازیکردن لە کوێیە؟", arabic: "أين الاستقبال؟", pronunciation: "reh-sep-see-YOHN NEHR-eh-deh?" },
  { id: "hotel-breakfast-time", category: "hotel", turkish: "Kahvaltı saat kaçta?", english: "What time is breakfast?", kurdish: "خواردنی بەیانی کەی دەستپێدەکات؟", arabic: "في أي وقت الإفطار؟", pronunciation: "kah-vahl-TUH sah-aht kahch-TAH?" },
  { id: "hotel-elevator", category: "hotel", turkish: "Asansör nerede?", english: "Where is the elevator?", kurdish: "ئاسانسۆر لە کوێیە؟", arabic: "أين المصعد؟", pronunciation: "ah-sahn-SEUR NEHR-eh-deh?" },
  { id: "hotel-crib", category: "hotel", turkish: "Bebek karyolası alabilir miyiz?", english: "Can we have a baby crib?", kurdish: "دەتوانین جێگای منداڵ وەربگرین؟", arabic: "هل يمكننا الحصول على سرير أطفال؟", pronunciation: "beh-BEK kahr-yoh-lah-SUH ah-lah-bee-leer mee-YEEZ?" },
  { id: "hotel-family-room", category: "hotel", turkish: "Aile odası var mı?", english: "Is there a family room?", kurdish: "ژووری خێزانی هەیە؟", arabic: "هل يوجد غرفة عائلية؟", pronunciation: "eye-LEH oh-dah-SUH vahr muh?" },
  { id: "hotel-luggage", category: "hotel", turkish: "Bavullarımızı bırakabilir miyiz?", english: "Can we leave our luggage?", kurdish: "دەتوانین جانتاکانمان بهێڵینەوە؟", arabic: "هل يمكننا ترك أمتعتنا؟", pronunciation: "bah-vool-lah-ruh-muh-ZUH buh-rah-kah-bee-leer mee-YEEZ?" },

  // Restaurant
  { id: "restaurant-menu", category: "restaurant", turkish: "Menü lütfen.", english: "Menu, please.", kurdish: "مینیو تکایە.", arabic: "القائمة من فضلك.", pronunciation: "meh-NEU leut-fen" },
  { id: "restaurant-how-much", category: "restaurant", turkish: "Ne kadar?", english: "How much?", kurdish: "چەندە؟", arabic: "كم الثمن؟", pronunciation: "neh kah-DAHR?" },
  { id: "restaurant-water", category: "restaurant", turkish: "Su lütfen.", english: "Water, please.", kurdish: "ئاو تکایە.", arabic: "ماء من فضلك.", pronunciation: "soo leut-fen" },
  { id: "restaurant-no-spicy", category: "restaurant", turkish: "Acısız olsun.", english: "No spicy, please.", kurdish: "تکایە تیژ نەبێت.", arabic: "بدون حار من فضلك.", pronunciation: "ah-juh-SUHZ ohl-SOON" },
  { id: "restaurant-have-child", category: "restaurant", turkish: "Çocuğumuz var.", english: "We have a child.", kurdish: "منداڵمان هەیە.", arabic: "لدينا طفل.", pronunciation: "choh-joo-oo-MOOZ vahr" },
  { id: "restaurant-sit-here", category: "restaurant", turkish: "Buraya oturabilir miyiz?", english: "Can we sit here?", kurdish: "دەتوانین لێرە دانیشین؟", arabic: "هل يمكننا الجلوس هنا؟", pronunciation: "boo-rah-YAH oh-too-rah-bee-leer mee-YEEZ?" },
  { id: "restaurant-bill", category: "restaurant", turkish: "Hesap lütfen.", english: "The bill, please.", kurdish: "پسوولە تکایە.", arabic: "الفاتورة من فضلك.", pronunciation: "heh-SAHP leut-fen" },

  // Shopping
  { id: "shopping-how-much", category: "shopping", turkish: "Bu ne kadar?", english: "How much is this?", kurdish: "ئەمە چەندە؟", arabic: "بكم هذا؟", pronunciation: "boo neh kah-DAHR?" },
  { id: "shopping-too-expensive", category: "shopping", turkish: "Çok pahalı.", english: "Too expensive.", kurdish: "زۆر گرانە.", arabic: "غالٍ جدًا.", pronunciation: "chohk pah-hah-LUH" },
  { id: "shopping-another-one", category: "shopping", turkish: "Başka bir tane var mı?", english: "Do you have another one?", kurdish: "یەکێکی تر هەیە؟", arabic: "هل لديك واحد آخر؟", pronunciation: "bahsh-KAH beer tah-NEH vahr muh?" },
  { id: "shopping-cards", category: "shopping", turkish: "Kart kabul ediyor musunuz?", english: "Do you accept cards?", kurdish: "کارت وەردەگرن؟", arabic: "هل تقبلون البطاقات؟", pronunciation: "kahrt kah-bool eh-dee-yohr moo-soo-NOOZ?" },

  // Practical
  { id: "practical-toilet", category: "practical", turkish: "Tuvalet nerede?", english: "Where is the toilet?", kurdish: "ئاودەستخانە لە کوێیە؟", arabic: "أين الحمام؟", pronunciation: "too-vah-LET NEHR-eh-deh?" },
  { id: "practical-pharmacy", category: "practical", turkish: "Eczane nerede?", english: "Where is the pharmacy?", kurdish: "دەرمانخانە لە کوێیە؟", arabic: "أين الصيدلية؟", pronunciation: "edj-zah-NEH NEHR-eh-deh?" },
  { id: "practical-hospital", category: "practical", turkish: "Hastane nerede?", english: "Where is the hospital?", kurdish: "نەخۆشخانە لە کوێیە؟", arabic: "أين المستشفى؟", pronunciation: "hahs-tah-NEH NEHR-eh-deh?" },
  { id: "practical-need-help", category: "practical", turkish: "Yardıma ihtiyacım var.", english: "I need help.", kurdish: "پێویستم بە یارمەتییە.", arabic: "أحتاج إلى مساعدة.", pronunciation: "yahr-duh-MAH eeh-tee-yah-JUHM vahr" },
  { id: "practical-no-turkish", category: "practical", turkish: "Türkçe anlamıyorum.", english: "I don't understand Turkish.", kurdish: "من تورکی تێناگەم.", arabic: "لا أفهم التركية.", pronunciation: "teurk-CHEH ahn-lah-muh-yoh-ROOM" },

  // Emergency / "I need this now"
  { id: "emergency-can-you-help", category: "emergency", turkish: "Bana yardım eder misiniz?", english: "Can you help me?", kurdish: "دەتوانیت یارمەتیم بدەیت؟", arabic: "هل يمكنك مساعدتي؟", pronunciation: "bah-NAH yahr-DUHM eh-dehr mee-see-niz?" },
];

export const phraseById = (id: string) => turkishPhrases.find((p) => p.id === id);

export const phrasesByCategory = (category: TurkishPhrase["category"]) =>
  turkishPhrases.filter((p) => p.category === category);

export const categoryLabels: Record<TurkishPhrase["category"], { en: string; ar: string; ku: string; icon: string }> = {
  basic: { en: "Basic", ar: "أساسيات", ku: "سەرەتایی", icon: "👋" },
  taxi: { en: "Taxi", ar: "تاكسي", ku: "تاکسی", icon: "🚕" },
  transport: { en: "Transport", ar: "المواصلات", ku: "گواستنەوە", icon: "🚋" },
  hotel: { en: "Hotel", ar: "الفندق", ku: "هوتێل", icon: "🏨" },
  restaurant: { en: "Restaurant", ar: "المطعم", ku: "چێشتخانە", icon: "🍴" },
  shopping: { en: "Shopping", ar: "التسوق", ku: "بازاڕکردن", icon: "🛍️" },
  practical: { en: "Practical", ar: "عملي", ku: "کاریگەر", icon: "🚻" },
  emergency: { en: "I Need This Now", ar: "أحتاج هذا الآن", ku: "ئێستا پێویستمە", icon: "🆘" },
};

// "I Need This Now" quick-access set — a curated subset, not a new category.
export const needThisNowIds = [
  "practical-toilet",
  "restaurant-how-much",
  "taxi-where",
  "taxi-address",
  "practical-no-turkish",
  "emergency-can-you-help",
];
