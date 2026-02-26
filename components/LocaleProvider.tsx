"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Locale = "es" | "en";

interface Translations {
  nav: {
    home: string;
    about: string;
    portfolio: string;
    contact: string;
  };
  hero: {
    greeting: string;
    description: string;
    viewProjects: string;
    downloadCV: string;
    contactMe: string;
    professionalPhoto: string;
  };
  about: {
    title: string;
    subtitle: string;
    description1: string;
    description2: string;
    networks: string;
    auth: string;
    webDev: string;
    networksAuth: string;
    yourPhoto: string;
  };
  projects: {
    title: string;
    demo: string;
    github: string;
  };
  skills: {
    title: string;
    frontend: string;
    backend: string;
    tools: string;
  };
  certificates: {
    title: string;
  };
  contact: {
    title: string;
    subtitle: string;
    description: string;
    send: string;
    name: string;
    email: string;
    message: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
  };
  footer: {
    rights: string;
  };
}

import esTranslations from "../messages/es.json";
import enTranslations from "../messages/en.json";

const translations: Record<Locale, Translations> = {
  es: esTranslations as Translations,
  en: enTranslations as Translations,
};

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const defaultContext: LocaleContextType = {
  locale: "es",
  setLocale: () => {},
  t: translations.es,
};

const LocaleContext = createContext<LocaleContextType>(defaultContext);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("es");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") as Locale;
    if (savedLocale && (savedLocale === "es" || savedLocale === "en")) {
      setLocale(savedLocale);
    }
    setIsInitialized(true);
  }, []);

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  if (!isInitialized) {
    return (
      <LocaleContext.Provider value={{ locale: "es", setLocale: handleSetLocale, t: translations.es }}>
        {children}
      </LocaleContext.Provider>
    );
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale: handleSetLocale, t: translations[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
}
