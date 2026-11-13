"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

type Locale = "es" | "en";
type TranslationFn = (key: string) => string;

interface LangContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationFn;
}

const LangContext = createContext<LangContextType | undefined>(undefined);

// Static translations to avoid async import issues during build
const translations: Record<Locale, Record<string, unknown>> = {
  es: {},
  en: {},
};

export function LangProvider({ children, defaultLocale }: { children: React.ReactNode; defaultLocale: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [loadedTranslations, setLoadedTranslations] = useState<Record<string, unknown>>({});

  useEffect(() => {
    const path = window.location.pathname;
    const match = path.match(/\/(\w{2})\//);
    if (match && (match[1] === "es" || match[1] === "en")) {
      setLocaleState(match[1] as Locale);
    }
  }, []);

  useEffect(() => {
    // Load translations dynamically
    import(`../content/config/translations/${locale}`).then((mod) => {
      const key = locale === "es" ? "es" : "en";
      setLoadedTranslations(mod[key]);
    });
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
  }, []);

  const t = useCallback((key: string): string => {
    const dict = loadedTranslations;
    const parts = key.split(".");
    let val: unknown = dict;
    for (const part of parts) {
      if (val == null || typeof val !== "object") return key;
      val = (val as Record<string, unknown>)[part];
    }
    return typeof val === "string" ? val : key;
  }, [loadedTranslations]);

  return (
    <LangContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within a LangProvider");
  return ctx;
}
