import { es } from "./translations/es";
import { en } from "./translations/en";

export type Locale = "es" | "en";

export const translations: Record<Locale, Record<string, any>> = {
  es,
  en,
};

export const defaultLocale: Locale = "es";
export const locales: Locale[] = ["es", "en"];
