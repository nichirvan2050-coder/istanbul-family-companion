"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Locale, localeMeta, translations, TranslationKey } from "@/locales/translations";

const KEY = "my-istanbul:locale";

interface LocaleContextValue {
  locale: Locale;
  dir: "ltr" | "rtl";
  setLocale: (l: Locale) => void;
  t: (key: TranslationKey) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function applyDocumentLocale(locale: Locale) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = locale;
  document.documentElement.dir = localeMeta[locale].dir;
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  // Always starts "en" to match server-rendered HTML; upgraded from
  // localStorage after mount, same pattern as saved places / trip date.
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(KEY) as Locale | null;
      if (stored && stored in translations) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- locale preference is client-only (localStorage)
        setLocaleState(stored);
        applyDocumentLocale(stored);
      }
    } catch {
      // ignore
    }
  }, []);

  function setLocale(l: Locale) {
    setLocaleState(l);
    applyDocumentLocale(l);
    try {
      window.localStorage.setItem(KEY, l);
    } catch {
      // ignore
    }
  }

  function t(key: TranslationKey): string {
    return translations[locale][key] ?? translations.en[key] ?? key;
  }

  return (
    <LocaleContext.Provider value={{ locale, dir: localeMeta[locale].dir, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
