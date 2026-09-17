export const appName = "My Istanbul";

export const languages = [
  { code: "en", label: "English", dir: "ltr" },
  { code: "ku", label: "کوردی", dir: "rtl" },
  { code: "ar", label: "العربية", dir: "rtl" },
  { code: "tr", label: "Türkçe", dir: "ltr" },
] as const;

export type LanguageCode = (typeof languages)[number]["code"];

export const navItems = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/plan", label: "Plan", icon: "🗓️" },
  { href: "/places", label: "Places", icon: "📍" },
  { href: "/transport", label: "Transport", icon: "🚋" },
  { href: "/saved", label: "Saved", icon: "❤️" },
] as const;

export const dataFreshnessPolicyDays = {
  transportFares: 14,
  openingHours: 14,
  attractionPrices: 30,
  hotelRatings: 14,
};
