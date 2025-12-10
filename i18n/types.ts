//export const LANGUAGE_CODES = ["fr", "en", "es", "de", "it"] as const;
export const LANGUAGE_CODES = ["fr"] as const;
export type LanguageCode = typeof LANGUAGE_CODES[number];

export const LANGUAGE_FLAGS: Record<LanguageCode, string> = {
  fr: "🇫🇷",
  //en: "🇬🇧",
  //es: "🇪🇸",
  //de: "🇩🇪",
  //it: "🇮🇹",
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
    title: string,
    noPills: string,
    addPill: string,
  },
  pills_edit: {
    welcome: string
  },
  history: {
    welcome: string,
  },
  settings: {
    title: string,
    notifications: {
      title: string,
      pushNotifications: string
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
  },
  pill: {
    // Unités
    unit: {
      mg: string,
      ml: string,
      tablespoon: string,
      teaspoon: string,
      pill: string,
      sachet: string,
    },
    // Usage
    usage: {
      mg: { one: string, other: string },
      ml: { one: string, other: string },
      tablespoon: { one: string, other: string },
      teaspoon: { one: string, other: string },
      pill: { one: string, other: string },
      sachet: { one: string, other: string },
    },
    // Labels
    schedules: string,
    stock: string,
    minInterval: string,
    until: string,
  }
};
