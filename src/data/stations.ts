import { Station } from "./types";

// Fixed rail/ferry infrastructure — real, well-documented stations on lines
// that don't move, so coordinates here are reasonably stable even though
// they weren't pulled from a live map API in this build (approximate to
// roughly street-block accuracy; verify exact exits/platforms locally).
// Deliberately excludes bus stops: routes and stop locations change too
// often to hard-code responsibly — see /transport for bus guidance instead.
export const stations: Station[] = [
  // ───────── T1 Tram (Bağcılar ↔ Kabataş) ─────────
  { id: "t1-kabatas", name: "Kabataş", modes: ["tram", "funicular"], lines: ["T1", "F1"], coordinates: { lat: 41.0378, lng: 28.9928 }, district: "Beşiktaş", area: "Kabataş", interchange: ["f1-kabatas", "ferry-kabatas"] },
  { id: "t1-findikli", name: "Fındıklı", modes: ["tram"], lines: ["T1"], coordinates: { lat: 41.0347, lng: 28.9908 }, district: "Beyoğlu", area: "Fındıklı" },
  { id: "t1-tophane", name: "Tophane", modes: ["tram"], lines: ["T1"], coordinates: { lat: 41.0281, lng: 28.9797 }, district: "Beyoğlu", area: "Tophane" },
  { id: "t1-karakoy", name: "Karaköy", modes: ["tram", "funicular"], lines: ["T1", "Tünel"], coordinates: { lat: 41.0247, lng: 28.9764 }, district: "Beyoğlu", area: "Karaköy", interchange: ["tunel-karakoy", "ferry-karakoy"] },
  { id: "t1-eminonu", name: "Eminönü", modes: ["tram"], lines: ["T1"], coordinates: { lat: 41.0175, lng: 28.9707 }, district: "Fatih", area: "Eminönü", interchange: ["ferry-eminonu"] },
  { id: "t1-sirkeci", name: "Sirkeci", modes: ["tram", "marmaray"], lines: ["T1", "Marmaray"], coordinates: { lat: 41.0136, lng: 28.9775 }, district: "Fatih", area: "Sirkeci", interchange: ["marmaray-sirkeci"] },
  { id: "t1-gulhane", name: "Gülhane", modes: ["tram"], lines: ["T1"], coordinates: { lat: 41.0131, lng: 28.9814 }, district: "Fatih", area: "Gülhane" },
  { id: "t1-sultanahmet", name: "Sultanahmet", modes: ["tram"], lines: ["T1"], coordinates: { lat: 41.0058, lng: 28.9769 }, district: "Fatih", area: "Sultanahmet" },
  { id: "t1-cemberlitas", name: "Çemberlitaş", modes: ["tram"], lines: ["T1"], coordinates: { lat: 41.0088, lng: 28.9689 }, district: "Fatih", area: "Çemberlitaş" },
  { id: "t1-beyazit", name: "Beyazıt-Kapalıçarşı", modes: ["tram"], lines: ["T1"], coordinates: { lat: 41.0106, lng: 28.9639 }, district: "Fatih", area: "Beyazıt" },
  { id: "t1-laleli", name: "Laleli-Üniversite", modes: ["tram"], lines: ["T1"], coordinates: { lat: 41.0103, lng: 28.9563 }, district: "Fatih", area: "Laleli" },
  { id: "t1-aksaray", name: "Aksaray", modes: ["tram", "metro"], lines: ["T1", "M1"], coordinates: { lat: 41.0111, lng: 28.9489 }, district: "Fatih", area: "Aksaray", interchange: ["m1-aksaray"] },

  // ───────── M2 Metro (Yenikapı ↔ Hacıosman) ─────────
  { id: "m2-yenikapi", name: "Yenikapı", modes: ["metro", "marmaray"], lines: ["M1", "M2", "Marmaray"], coordinates: { lat: 41.0044, lng: 28.9508 }, district: "Fatih", area: "Yenikapı", interchange: ["m1-yenikapi", "marmaray-yenikapi"] },
  { id: "m2-vezneciler", name: "Vezneciler", modes: ["metro"], lines: ["M2"], coordinates: { lat: 41.0142, lng: 28.96 }, district: "Fatih", area: "Vezneciler" },
  { id: "m2-haliç", name: "Haliç", modes: ["metro"], lines: ["M2"], coordinates: { lat: 41.0244, lng: 28.9575 }, district: "Beyoğlu", area: "Haliç" },
  { id: "m2-sishane", name: "Şişhane", modes: ["metro", "funicular"], lines: ["M2", "Tünel"], coordinates: { lat: 41.0281, lng: 28.9736 }, district: "Beyoğlu", area: "Şişhane", interchange: ["tunel-beyoglu"] },
  { id: "m2-taksim", name: "Taksim", modes: ["metro", "funicular"], lines: ["M2", "F1"], coordinates: { lat: 41.0369, lng: 28.9856 }, district: "Beyoğlu", area: "Taksim", interchange: ["f1-taksim"] },
  { id: "m2-osmanbey", name: "Osmanbey", modes: ["metro"], lines: ["M2"], coordinates: { lat: 41.0489, lng: 28.9878 }, district: "Şişli", area: "Osmanbey" },
  { id: "m2-sisli-mecidiyekoy", name: "Şişli-Mecidiyeköy", modes: ["metro"], lines: ["M2"], coordinates: { lat: 41.0631, lng: 28.9908 }, district: "Şişli", area: "Mecidiyeköy" },
  { id: "m2-gayrettepe", name: "Gayrettepe", modes: ["metro"], lines: ["M2", "M11"], coordinates: { lat: 41.0686, lng: 29.0083 }, district: "Beşiktaş", area: "Gayrettepe" },
  { id: "m2-levent", name: "Levent", modes: ["metro"], lines: ["M2"], coordinates: { lat: 41.0819, lng: 29.0128 }, district: "Beşiktaş", area: "Levent" },
  { id: "m2-hacıosman", name: "Hacıosman", modes: ["metro"], lines: ["M2"], coordinates: { lat: 41.1092, lng: 29.0269 }, district: "Sarıyer", area: "Hacıosman" },

  // ───────── M1 Metro (Yenikapı ↔ Airport/Kirazlı, western districts) ─────────
  { id: "m1-yenikapi", name: "Yenikapı", modes: ["metro"], lines: ["M1"], coordinates: { lat: 41.0044, lng: 28.9508 }, district: "Fatih", area: "Yenikapı" },
  { id: "m1-aksaray", name: "Aksaray", modes: ["metro"], lines: ["M1"], coordinates: { lat: 41.0111, lng: 28.9489 }, district: "Fatih", area: "Aksaray" },
  { id: "m1-zeytinburnu", name: "Zeytinburnu", modes: ["metro", "marmaray"], lines: ["M1", "Marmaray"], coordinates: { lat: 40.9944, lng: 28.9053 }, district: "Zeytinburnu", area: "Zeytinburnu", interchange: ["marmaray-zeytinburnu"] },
  { id: "m1-atakoy-sirinevler", name: "Ataköy-Şirinevler", modes: ["metro"], lines: ["M1"], coordinates: { lat: 40.9836, lng: 28.8394 }, district: "Bakırköy", area: "Ataköy" },
  { id: "m1-bahcelievler", name: "Bahçelievler", modes: ["metro"], lines: ["M1"], coordinates: { lat: 40.9986, lng: 28.8617 }, district: "Bahçelievler", area: "Bahçelievler" },

  // ───────── Marmaray (Halkalı ↔ Gebze, Europe–Asia undersea crossing) ─────────
  { id: "marmaray-sirkeci", name: "Sirkeci", modes: ["marmaray"], lines: ["Marmaray"], coordinates: { lat: 41.0136, lng: 28.9775 }, district: "Fatih", area: "Sirkeci" },
  { id: "marmaray-uskudar", name: "Üsküdar", modes: ["marmaray", "ferry"], lines: ["Marmaray"], coordinates: { lat: 41.0233, lng: 29.0144 }, district: "Üsküdar", area: "Üsküdar", interchange: ["ferry-uskudar"] },
  { id: "marmaray-ayrilikcesmesi", name: "Ayrılık Çeşmesi", modes: ["marmaray"], lines: ["Marmaray"], coordinates: { lat: 41.0, lng: 29.0286 }, district: "Kadıköy", area: "Ayrılık Çeşmesi" },
  { id: "marmaray-yenikapi", name: "Yenikapı", modes: ["marmaray"], lines: ["Marmaray"], coordinates: { lat: 41.0044, lng: 28.9508 }, district: "Fatih", area: "Yenikapı" },
  { id: "marmaray-zeytinburnu", name: "Zeytinburnu", modes: ["marmaray"], lines: ["Marmaray"], coordinates: { lat: 40.9944, lng: 28.9053 }, district: "Zeytinburnu", area: "Zeytinburnu" },
  { id: "marmaray-bakirkoy", name: "Bakırköy", modes: ["marmaray"], lines: ["Marmaray"], coordinates: { lat: 40.9811, lng: 28.8742 }, district: "Bakırköy", area: "Bakırköy" },
  { id: "marmaray-yesilkoy", name: "Yeşilköy", modes: ["marmaray"], lines: ["Marmaray"], coordinates: { lat: 40.9633, lng: 28.8256 }, district: "Bakırköy", area: "Yeşilköy" },
  { id: "marmaray-florya", name: "Florya", modes: ["marmaray"], lines: ["Marmaray"], coordinates: { lat: 40.9761, lng: 28.7889 }, district: "Bakırköy", area: "Florya" },
  { id: "marmaray-bostanci", name: "Bostancı", modes: ["marmaray", "ferry"], lines: ["Marmaray"], coordinates: { lat: 40.9556, lng: 29.0942 }, district: "Kadıköy", area: "Bostancı", interchange: ["ferry-bostanci"] },

  // ───────── Funiculars ─────────
  { id: "tunel-karakoy", name: "Tünel (Karaköy)", modes: ["funicular"], lines: ["Tünel"], coordinates: { lat: 41.0247, lng: 28.9742 }, district: "Beyoğlu", area: "Karaköy" },
  { id: "tunel-beyoglu", name: "Tünel (Beyoğlu)", modes: ["funicular"], lines: ["Tünel"], coordinates: { lat: 41.0281, lng: 28.9744 }, district: "Beyoğlu", area: "Tünel Square" },
  { id: "f1-kabatas", name: "Kabataş (F1)", modes: ["funicular"], lines: ["F1"], coordinates: { lat: 41.0378, lng: 28.9928 }, district: "Beşiktaş", area: "Kabataş" },
  { id: "f1-taksim", name: "Taksim (F1)", modes: ["funicular"], lines: ["F1"], coordinates: { lat: 41.0369, lng: 28.9856 }, district: "Beyoğlu", area: "Taksim" },

  // ───────── Şehir Hatları ferry piers ─────────
  { id: "ferry-eminonu", name: "Eminönü İskelesi", modes: ["ferry"], lines: ["Şehir Hatları"], coordinates: { lat: 41.0176, lng: 28.9738 }, district: "Fatih", area: "Eminönü" },
  { id: "ferry-karakoy", name: "Karaköy İskelesi", modes: ["ferry"], lines: ["Şehir Hatları"], coordinates: { lat: 41.0242, lng: 28.9773 }, district: "Beyoğlu", area: "Karaköy" },
  { id: "ferry-besiktas", name: "Beşiktaş İskelesi", modes: ["ferry"], lines: ["Şehir Hatları"], coordinates: { lat: 41.0422, lng: 29.0075 }, district: "Beşiktaş", area: "Beşiktaş" },
  { id: "ferry-kabatas", name: "Kabataş İskelesi", modes: ["ferry"], lines: ["Şehir Hatları"], coordinates: { lat: 41.0361, lng: 28.9928 }, district: "Beşiktaş", area: "Kabataş" },
  { id: "ferry-uskudar", name: "Üsküdar İskelesi", modes: ["ferry"], lines: ["Şehir Hatları"], coordinates: { lat: 41.0225, lng: 29.0144 }, district: "Üsküdar", area: "Üsküdar" },
  { id: "ferry-kadikoy", name: "Kadıköy İskelesi", modes: ["ferry"], lines: ["Şehir Hatları"], coordinates: { lat: 40.9925, lng: 29.0244 }, district: "Kadıköy", area: "Kadıköy" },
  { id: "ferry-bostanci", name: "Bostancı İskelesi", modes: ["ferry"], lines: ["Şehir Hatları"], coordinates: { lat: 40.9556, lng: 29.0942 }, district: "Kadıköy", area: "Bostancı" },
  { id: "ferry-buyukada", name: "Büyükada İskelesi", modes: ["ferry"], lines: ["Şehir Hatları"], coordinates: { lat: 40.8756, lng: 29.1319 }, district: "Adalar", area: "Büyükada" },
  { id: "ferry-heybeliada", name: "Heybeliada İskelesi", modes: ["ferry"], lines: ["Şehir Hatları"], coordinates: { lat: 40.8794, lng: 29.0942 }, district: "Adalar", area: "Heybeliada" },
  { id: "ferry-burgazada", name: "Burgazada İskelesi", modes: ["ferry"], lines: ["Şehir Hatları"], coordinates: { lat: 40.8797, lng: 29.07 }, district: "Adalar", area: "Burgazada" },
  { id: "ferry-kinaliada", name: "Kınalıada İskelesi", modes: ["ferry"], lines: ["Şehir Hatları"], coordinates: { lat: 40.9186, lng: 29.0522 }, district: "Adalar", area: "Kınalıada" },
  { id: "ferry-sariyer", name: "Sarıyer İskelesi", modes: ["ferry"], lines: ["Şehir Hatları"], coordinates: { lat: 41.1683, lng: 29.0522 }, district: "Sarıyer", area: "Sarıyer" },
];

export const stationById = (id: string) => stations.find((s) => s.id === id);
