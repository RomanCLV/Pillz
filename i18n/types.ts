export const LANGUAGE_CODES = ["fr", "en", "es", "de", "it"] as const;
export type LanguageCode = typeof LANGUAGE_CODES[number];

export const LANGUAGE_FLAGS: Record<LanguageCode, string> = {
  fr: "🇫🇷",
  en: "🇬🇧",
  es: "🇪🇸",
  de: "🇩🇪",
  it: "🇮🇹",
} as const;

export type LanguageSet = {
  tabBar: {
    daily: string,
    pills: string,
    history: string,
    settings: string,
  },
  navigation: {
    back: string,
  },
  home: {
    welcome: string,
  },
  pills: {
    home: {
      welcome: string,
      edit: string,
    },
    edit: {
      welcome: string
    },
  },
  followUp: {
    welcome: string,
  },
  settings: {
    title: string,
    notification: {
      title: string,
      pushNotification: string
    },
    preferences: {
      title: string,
      theme: string,
      language: string,
    },
    help: {
      title: string,
      contactUs: string,
    },
    version: string,
  },
  settings_theme: {
    title: string,
    system: string,
    light: string,
    dark: string,
    systemDescription: string,
    lightDescription: string,
    darkDescription: string,
  },
  settings_language: {
    title: string,
    description: string,
    fr: string,
    en: string,
    es: string,
    de: string,
    it: string,
  }
};
