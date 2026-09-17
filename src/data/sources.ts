import { SourceRef } from "./types";

export interface SourceDirectoryEntry extends SourceRef {
  id: string;
  description: string;
}

// Official / reputable sources used throughout the app. URLs verified to be the
// correct official domains as of the last research pass; live fetching of these
// domains was blocked in this build environment, so prices/fares quoted in the
// app were cross-checked against multiple independent, current (2026) travel-
// information sources rather than scraped directly from these pages. Always
// confirm time-sensitive numbers at the links below before you travel.
export const sourceDirectory: SourceDirectoryEntry[] = [
  {
    id: "istanbulkart",
    name: "Istanbulkart (official)",
    url: "https://istanbulkart.istanbul/",
    type: "official",
    description: "Official Istanbulkart site: card purchase, top-up, and usage rules.",
  },
  {
    id: "istanbulkart-centers",
    name: "Istanbulkart Application Centers",
    url: "https://www.istanbulkart.istanbul/applicationCenters",
    type: "official",
    description: "Official list of Istanbulkart service/application centers.",
  },
  {
    id: "metro-istanbul",
    name: "Metro İstanbul",
    url: "https://www.metro.istanbul/",
    type: "official",
    description: "Official metro operator: lines, maps, and fare rules.",
  },
  {
    id: "iett",
    name: "İETT (Istanbul buses & tram operator)",
    url: "https://iett.istanbul/",
    type: "official",
    description: "Official bus/tram operator: current fare tariff.",
  },
  {
    id: "sehirhatlari",
    name: "Şehir Hatları (public ferries)",
    url: "https://www.sehirhatlari.istanbul/",
    type: "official",
    description: "Official public ferry operator: routes, timetables, fares.",
  },
  {
    id: "goturkiye",
    name: "Go Türkiye — Istanbul",
    url: "https://goturkiye.com/istanbul",
    type: "official",
    description: "Turkey Ministry of Culture and Tourism's official travel portal.",
  },
  {
    id: "millisaraylar",
    name: "Milli Saraylar (National Palaces)",
    url: "https://millisaraylar.gov.tr/",
    type: "official",
    description: "Official operator of Topkapı, Dolmabahçe and other imperial palaces/museums.",
  },
  {
    id: "muze",
    name: "Ministry of Culture & Tourism — Museums / Museum Pass",
    url: "https://muze.gov.tr/",
    type: "official",
    description: "Official state museums authority; issues Müzekart and Museum Pass Istanbul.",
  },
  {
    id: "kulturportali",
    name: "Kültür Portalı",
    url: "https://kulturportali.gov.tr/",
    type: "official",
    description: "Ministry of Culture and Tourism heritage/culture portal.",
  },
  {
    id: "google-maps",
    name: "Google Maps",
    url: "https://maps.google.com/",
    type: "reputable",
    description: "Used for directions and map links throughout the app.",
  },
  {
    id: "yerebatan",
    name: "Basilica Cistern (official)",
    url: "https://yerebatan.com/",
    type: "official",
    description: "Official ticketing site for the Basilica Cistern (Yerebatan Sarnıcı).",
  },
  {
    id: "hagiasophia",
    name: "Hagia Sophia — visitor information",
    url: "https://www.hagiasophia.com/",
    type: "reputable",
    description: "Visitor hours, prayer-time closures, and ticket information.",
  },
  {
    id: "galatatower",
    name: "Galata Tower (official ticketing)",
    url: "https://galatatower.com/en",
    type: "official",
    description: "Official Galata Tower ticketing and visitor information.",
  },
  {
    id: "rmk-museum",
    name: "Rahmi M. Koç Museum",
    url: "http://www.rmk-museum.org.tr/istanbul/en/visit-us/hours-and-prices",
    type: "official",
    description: "Official hours and prices for the industrial/transport museum.",
  },
  {
    id: "booking",
    name: "Booking.com",
    url: "https://www.booking.com/",
    type: "reputable",
    description: "Independent guest ratings used for the Family Stays section — never combined or re-scored by this app.",
  },
];

export const sourceById = (id: string) => sourceDirectory.find((s) => s.id === id);
