import { Stay } from "./types";

const TODAY = "2026-09-17";

// This is not a booking platform. Ratings shown are independent guest ratings
// from the named source only — never combined, re-scored, or ranked against
// each other. Nightly prices change constantly and are intentionally left
// unverified rather than guessed; check the official site/booking channel
// directly before booking.
export const stays: Stay[] = [
  {
    id: "sura-hagia-sophia-hotel",
    name: "Sura Hagia Sophia Hotel",
    area: "Sultanahmet",
    type: "hotel",
    rating: {
      value: 8.2,
      scale: 10,
      sourceName: "Booking.com (aggregated guest score, cross-checked across listings)",
      sourceUrl: "https://www.booking.com/hotel/tr/sura-hagia-sophia.html",
      reviewCount: 4966,
      lastVerified: TODAY,
    },
    price: { value: null, currency: "TRY", lastVerified: TODAY },
    familyFeatures: ["Children up to 5 stay free using existing beds", "Outdoor pool", "Garden courtyard", "Near tram"],
    transport: ["2-minute walk to Sultanahmet T1 tram stop"],
    nearby: ["hagia-sophia", "blue-mosque", "topkapi-palace", "grand-bazaar"],
    officialUrl: "https://www.booking.com/hotel/tr/sura-hagia-sophia.html",
    sources: [{ name: "Booking.com", url: "https://www.booking.com/hotel/tr/sura-hagia-sophia.html", type: "reputable" }],
  },
  {
    id: "seven-hills-hotel",
    name: "Seven Hills Hotel — Special Class",
    area: "Sultanahmet",
    type: "hotel",
    rating: {
      value: 9.6,
      scale: 10,
      sourceName: "Booking.com",
      sourceUrl: "https://www.booking.com/",
      reviewCount: null,
      lastVerified: TODAY,
    },
    price: { value: null, currency: "TRY", lastVerified: TODAY },
    familyFeatures: ["Free crib on request", "Connecting room options", "Rooftop terrace"],
    transport: ["Short walk to Sultanahmet T1 tram stop"],
    nearby: ["hagia-sophia", "blue-mosque", "basilica-cistern"],
    sources: [{ name: "Booking.com", url: "https://www.booking.com/", type: "reputable" }],
  },
  {
    id: "karakoy-aparts-hotel",
    name: "Karaköy Aparts Hotel — Special Category",
    area: "Karaköy",
    type: "apartment",
    rating: {
      value: null,
      scale: 10,
      sourceName: "Booking.com",
      sourceUrl: "https://www.booking.com/hotel/tr/karakoy-aparts.html",
      reviewCount: null,
      lastVerified: TODAY,
    },
    price: { value: null, currency: "TRY", lastVerified: TODAY },
    familyFeatures: ["Kitchenette in every unit", "Family rooms", "Hammam/sauna on site"],
    transport: ["Near Karaköy T1 tram stop", "Walking distance to the Galata Bridge and ferries"],
    nearby: ["galata-bridge", "galata-tower", "karakoy"],
    officialUrl: "https://www.booking.com/hotel/tr/karakoy-aparts.html",
    sources: [{ name: "Booking.com", url: "https://www.booking.com/hotel/tr/karakoy-aparts.html", type: "reputable" }],
  },
];

export const stayById = (id: string) => stays.find((s) => s.id === id);
