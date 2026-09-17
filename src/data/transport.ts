import { Sourced } from "./types";

const TODAY = "2026-09-17";

export interface TransportLine {
  name: string;
  usefulFor: string;
  keyStops?: string[];
}

export interface TransportMode {
  id: "tram" | "metro" | "marmaray" | "ferry" | "funicular" | "bus" | "taxi";
  title: string;
  icon: string;
  summary: string;
  lines?: TransportLine[];
  notes: string[];
}

export const transportModes: TransportMode[] = [
  {
    id: "tram",
    title: "Tram",
    icon: "🚋",
    summary: "The T1 tram is the single most useful line for sightseeing — it runs right through the historic peninsula.",
    lines: [
      {
        name: "T1 (Kabataş ↔ Bağcılar)",
        usefulFor: "Sultanahmet sightseeing, Eminönü ferries, Karaköy, and Kabataş (funicular to Taksim)",
        keyStops: ["Kabataş", "Karaköy", "Eminönü", "Sultanahmet", "Beyazıt-Kapalıçarşı"],
      },
    ],
    notes: [
      "Trams get very crowded at rush hour and around midday in high season.",
      "A historic nostalgic tram also runs along İstiklal Street between Tünel and Taksim, mainly for the ride itself rather than as practical transport.",
    ],
  },
  {
    id: "metro",
    title: "Metro",
    icon: "🚇",
    summary: "Fast, air-conditioned, and useful for reaching Taksim/Beyoğlu and the airports, less central to the historic peninsula itself.",
    lines: [
      { name: "M2 (Yenikapı ↔ Hacıosman)", usefulFor: "Taksim and Şişli; connects to Yenikapı for Marmaray/other lines", keyStops: ["Taksim", "Şişhane (for Galata)", "Osmanbey", "Yenikapı"] },
      { name: "M4 (Kadıköy ↔ Sabiha Gökçen Airport)", usefulFor: "Kadıköy and the Asian side south toward Kartal/Pendik and Sabiha Gökçen Airport", keyStops: ["Kadıköy"] },
      { name: "M5 (Üsküdar ↔ Çekmeköy)", usefulFor: "Üsküdar and inland Asian-side districts (Altunizade, Ümraniye)", keyStops: ["Üsküdar"] },
      { name: "M11", usefulFor: "Istanbul Airport (IST) connection", keyStops: ["Istanbul Airport", "Gayrettepe (interchange)"] },
    ],
    notes: [
      "The historic peninsula (Sultanahmet, Eminönü) is not directly served by metro — use the T1 tram or Marmaray instead.",
      "M4 and M5 are separate Asian-side lines that don't physically connect to the European-side M2/M11 network — cross via Marmaray or ferry, not by staying on the metro.",
      "Interchange stations can involve a fair amount of walking between platforms.",
    ],
  },
  {
    id: "funicular",
    title: "Funicular",
    icon: "🚡",
    summary: "Short, steep-hill shortcuts — mainly useful for skipping the climb between Karaköy/Kabataş and Beyoğlu/Taksim.",
    lines: [
      { name: "F2 / Tünel (Karaköy ↔ Beyoğlu)", usefulFor: "Skipping the steep walk up from Karaköy to İstiklal Street", keyStops: ["Karaköy", "Tünel Square"] },
      { name: "F1 (Kabataş ↔ Taksim)", usefulFor: "Connecting the T1 tram at Kabataş to the M2 metro and Taksim Square", keyStops: ["Kabataş", "Taksim"] },
      { name: "F4 (Boğaziçi Üniversitesi/Hisarüstü ↔ Aşiyan)", usefulFor: "Reaching the Bebek/Rumeli Fortress area from the hilltop Boğaziçi University campus", keyStops: ["Aşiyan"] },
    ],
    notes: [
      "F2/Tünel, opened in 1875, is the second-oldest underground urban rail line in the world after London's.",
      "F1 is a modern addition (2006), distinct from the historic Tünel.",
    ],
  },
  {
    id: "marmaray",
    title: "Marmaray",
    icon: "🚆",
    summary: "An undersea commuter rail line connecting the European and Asian shores directly beneath the Bosphorus.",
    lines: [
      { name: "Marmaray (Halkalı ↔ Gebze)", usefulFor: "Fast Europe ↔ Asia crossing, e.g. Sirkeci ↔ Üsküdar", keyStops: ["Sirkeci", "Üsküdar", "Ayrılık Çeşmesi"] },
    ],
    notes: [
      "The Sirkeci–Üsküdar crossing takes only a few minutes and runs entirely underground/undersea — there is no view of the Bosphorus from the train.",
      "Marmaray fares are distance-based rather than the flat city fare used on bus/tram/metro.",
    ],
  },
  {
    id: "ferry",
    title: "Ferry",
    icon: "⛴️",
    summary: "The most scenic way to cross the Bosphorus or Golden Horn, and often faster than road traffic at busy times.",
    lines: [
      { name: "Eminönü ↔ Üsküdar", usefulFor: "Quick, classic Europe–Asia crossing" },
      { name: "Eminönü / Karaköy ↔ Kadıköy", usefulFor: "Reaching Kadıköy and Moda on the Asian side" },
      { name: "Beşiktaş ↔ Üsküdar / Kadıköy", usefulFor: "Crossing from the Bosphorus-shore neighborhoods" },
    ],
    notes: [
      "Operated by the public operator Şehir Hatları — Istanbulkart works on these ferries just like buses and trams.",
      "Timetables shift by season; treat any specific departure time as approximate and check the day of travel rather than relying on a fixed schedule.",
    ],
  },
  {
    id: "bus",
    title: "Bus",
    icon: "🚌",
    summary: "Extensive network covering areas the tram and metro don't reach, especially along the Bosphorus shore (e.g. to Ortaköy, Bebek, Emirgan).",
    notes: [
      "Very useful for Bosphorus-shore neighborhoods without a direct rail/ferry stop.",
      "Subject to Istanbul's heavy road traffic — journey times can vary a great deal depending on time of day.",
    ],
  },
  {
    id: "taxi",
    title: "Taxi",
    icon: "🚕",
    summary: "Widely available (yellow cabs), useful late at night or with a tired child, but traffic-dependent and metered.",
    notes: [
      "Insist the driver runs the meter (\"taksimetre\"); this app does not display a current tariff since official per-km rates change and were not verified for this build.",
      "Ride-hailing/booking apps are common in Istanbul; verify current availability and terms locally rather than assuming any single app.",
      "Traffic can make a short-distance trip slower than the tram, metro, or ferry at peak times.",
    ],
  },
];

export const istanbulkart = {
  whatIsIt:
    "Istanbulkart is Istanbul's contactless smart card for public transport — used on trams, the metro, Marmaray, public buses, and Şehir Hatları ferries. It also unlocks a small discount versus paying cash/single-journey tokens, and gives a discount on transfers between different modes within a set time window.",
  whereToGet:
    "Yellow 'Biletmatik' vending machines at metro/tram/ferry stations and the airports, official Istanbulkart application/service centers, and some kiosks and shops that display the Istanbulkart sign.",
  howToLoad: "Top up with cash or card at the yellow Biletmatik machines, at kiosks/shops offering the service, or via the official Istanbulkart mobile app for NFC-enabled phones.",
  howToUse: "Tap the card on the reader when boarding each mode of transport; a second tap is required on some ferries and buses.",
  cardFee: {
    value: "≈ 165 TRY for a blank, anonymous card (non-refundable card fee, separate from travel credit)",
    sourceName: "Istanbulkart (via current travel-info sources)",
    sourceUrl: "https://istanbulkart.istanbul/",
    sourceType: "reputable",
    lastVerified: TODAY,
    status: "check",
  } as Sourced<string>,
  familyNote:
    "Do not assume a young child travels free or at a fixed discount — child/student eligibility and age thresholds are set by the transport authorities and can change. Confirm current rules for your child's age at an Istanbulkart application center or the official site before relying on a discounted or free fare.",
  officialUrl: "https://istanbulkart.istanbul/",
  centersUrl: "https://www.istanbulkart.istanbul/applicationCenters",
};

export interface FareRow {
  transport: string;
  fare: string;
  fareType: string;
  notes: string;
  sourceName: string;
  sourceUrl: string;
  status: "check" | "verified" | "unverified";
}

export const fareTable: FareRow[] = [
  {
    transport: "Bus / Tram / Metro / Metrobüs",
    fare: "≈ 42 TRY",
    fareType: "Standard single-journey electronic fare (Istanbulkart)",
    notes: "Flat city fare regardless of distance; took effect mid-February 2026 per current reporting.",
    sourceName: "İETT (bus/tram operator)",
    sourceUrl: "https://iett.istanbul/",
    status: "check",
  },
  {
    transport: "Transfer (1st)",
    fare: "≈ 31 TRY",
    fareType: "Discounted transfer fare",
    notes: "Applies when switching modes within the transfer time window after the first tap.",
    sourceName: "İETT (bus/tram operator)",
    sourceUrl: "https://iett.istanbul/",
    status: "check",
  },
  {
    transport: "Transfer (2nd)",
    fare: "≈ 24 TRY",
    fareType: "Further discounted transfer fare",
    notes: "Each additional transfer within the window is progressively cheaper.",
    sourceName: "İETT (bus/tram operator)",
    sourceUrl: "https://iett.istanbul/",
    status: "check",
  },
  {
    transport: "Marmaray",
    fare: "Distance-based",
    fareType: "Tiered by distance travelled",
    notes: "A short crossing like Sirkeci–Üsküdar is inexpensive; longer distance-based fares apply further out.",
    sourceName: "TCDD / Marmaray",
    sourceUrl: "https://www.metro.istanbul/",
    status: "check",
  },
  {
    transport: "Ferry — Eminönü ↔ Üsküdar",
    fare: "≈ 44 TRY",
    fareType: "Standard single-journey fare",
    notes: "Discounted fares exist for students/other eligible categories.",
    sourceName: "Şehir Hatları",
    sourceUrl: "https://www.sehirhatlari.istanbul/",
    status: "check",
  },
  {
    transport: "Ferry — Üsküdar ↔ Kadıköy",
    fare: "≈ 47 TRY",
    fareType: "Standard single-journey fare",
    notes: "",
    sourceName: "Şehir Hatları",
    sourceUrl: "https://www.sehirhatlari.istanbul/",
    status: "check",
  },
  {
    transport: "Ferry — Kadıköy ↔ Eminönü",
    fare: "≈ 49 TRY",
    fareType: "Standard single-journey fare",
    notes: "",
    sourceName: "Şehir Hatları",
    sourceUrl: "https://www.sehirhatlari.istanbul/",
    status: "check",
  },
  {
    transport: "Ferry — Beşiktaş ↔ Kadıköy",
    fare: "≈ 39 TRY",
    fareType: "Standard single-journey fare",
    notes: "",
    sourceName: "Şehir Hatları",
    sourceUrl: "https://www.sehirhatlari.istanbul/",
    status: "check",
  },
  {
    transport: "Ferry — Kabataş ↔ Adalar (Princes' Islands)",
    fare: "≈ 206 TRY",
    fareType: "Dedicated island line — NOT a standard city fare",
    notes:
      "Much more expensive than a normal Bosphorus/city ferry crossing — this is a separate, longer scenic line out to the islands, not the short Eminönü/Üsküdar/Kadıköy hops above. Some sources instead list an 'Adakartsız' Adalar-lines fare around 137 TRY, which may reflect a different fare category (e.g. a shorter inter-island hop) rather than the full Kabataş↔Adalar run — treat the exact figure as unconfirmed and check the posted fare board before boarding.",
    sourceName: "Şehir Hatları",
    sourceUrl: "https://www.sehirhatlari.istanbul/",
    status: "check",
  },
  {
    transport: "Taxi",
    fare: "Price not currently verified",
    fareType: "Metered",
    notes: "Always insist the meter (taksimetre) is running; current opening/per-km rates were not independently confirmed for this build.",
    sourceName: "—",
    sourceUrl: "",
    status: "unverified",
  },
];
