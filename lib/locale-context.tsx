"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { translations, type Locale, type TranslationKey } from "./i18n";

interface LocaleCtx {
  locale:  Locale;
  t:       (key: TranslationKey) => string;
  toggle:  () => void;
}

const Ctx = createContext<LocaleCtx>({
  locale: "en",
  t: (k) => translations.en[k],
  toggle: () => {},
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  const toggle = useCallback(() => {
    setLocale((l) => (l === "th" ? "en" : "th"));
  }, []);

  const t = useCallback(
    (key: TranslationKey) => translations[locale][key],
    [locale]
  );

  return <Ctx.Provider value={{ locale, t, toggle }}>{children}</Ctx.Provider>;
}

export function useLocale() {
  return useContext(Ctx);
}
