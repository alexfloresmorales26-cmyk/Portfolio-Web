"use client";

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";

type Locale = "es" | "en";
type TranslationFn = (key: string) => string;

interface LangContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationFn;
}

const LangContext = createContext<LangContextType | undefined>(undefined);

// Pre-load translations at module level for SSR
const translationModules = {
  es: () => import("../i18n/translations/es").then((m) => m.es),
  en: () => import("../i18n/translations/en").then((m) => m.en),
};

export function LangProvider({
  children,
  defaultLocale: _defaultLocale,
  locale: forcedLocale,
}: {
  children: React.ReactNode;
  defaultLocale?: Locale;
  locale: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(forcedLocale);
  const [loadedTranslations, setLoadedTranslations] = useState<Record<string, unknown>>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setLocaleState(forcedLocale);
  }, [forcedLocale]);

  useEffect(() => {
    translationModules[locale]().then((translations) => {
      setLoadedTranslations(translations);
    });
  }, [locale]);

  const setLocale = useCallback(
    (next: Locale) => {
      if (isClient) {
        setLocaleState(next);
        const currentPath = window.location.pathname.replace(/^\/(es|en)/, "") || "/";
        window.location.href = `/${next}${currentPath === "/" ? "/" : currentPath}`;
      }
    },
    [isClient]
  );

  const t = useCallback(
    (key: string): string => {
      const dict = loadedTranslations;
      const parts = key.split(".");
      let val: unknown = dict;
      for (const part of parts) {
        if (val == null || typeof val !== "object") return key;
        val = (val as Record<string, unknown>)[part];
      }
      return typeof val === "string" ? val : key;
    },
    [loadedTranslations]
  );

  const fallbackT = useCallback((key: string): string => key, []);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: loadedTranslations && Object.keys(loadedTranslations).length > 0 ? t : fallbackT,
    }),
    [locale, setLocale, t, loadedTranslations, fallbackT]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) {
    return {
      locale: "es" as Locale,
      setLocale: () => {},
      t: (key: string) => key,
    };
  }
  return ctx;
}
