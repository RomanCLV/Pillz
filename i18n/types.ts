//export const LANGUAGE_CODES = ["fr", "en", "es", "de", "it"] as const;
export const LANGUAGE_CODES = ["fr"] as const;
export type LanguageCode = typeof LANGUAGE_CODES[number];

export const DEFAULT_LANGUAGE_CODE = "fr";
export const DEFAULT_LANGUAGE_TAG = "fr-FR";

export const LANGUAGE_FLAGS: Record<LanguageCode, string> = {
  fr: "🇫🇷",
  //en: "🇬🇧",
  //es: "🇪🇸",
  //de: "🇩🇪",
  //it: "🇮🇹",
} as const;

export const LOCALE_MAP: Record<LanguageCode, string> = {
  fr: "fr-FR",
  //en: "en-US",
  //es: "es-ES",
  //de: "de-DE",
  //it: "it-IT",
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
  global: {
    confirm: string,
    cancel: string,
    delete: string,
    success: string,
    error: string,
    ok: string,
    select: string,
    close: string,
    chooseDate: string,
    selectDate: string,
    modifySchedule: string,
    deleteData: string,
  },
  itemSelection: {
    noSelection: string,
    nSelected: {
      one: string,
      other: string,
    }
  },
  hours: {
    hh: string,
    hhmm: string,
    hh2dmm: string,
  },
  home: {
    title: string,
    noIntakes: string,
    intake : {
      taken: string,
      skipped: string,
      take: string,
      takeSoon: string,
    },
  },
  pills: {
    title: string,
    noPills: string,
    addPill: string,
    modificationsWillApply: string,
  },
  pills_edit: {
    titleNew: string,
    titleEdit: string,
    pillName: string,
    pillNameExample: string,
    dosage: string,
    unity: string,
    schedules: string,
    intakeWindow: string,
    timeBetweenIntakes: string,
    treatmentDuration: string,
    treatmentDurationLimited: string,
    treatmentFrom: string,
    treatmentTo: string,
    stockManagement: string,
    enableStockManagement: string,
    quantityInStock: string,
    alertThreshold: string,
    deletePill: string,
    deletePillConfirmation: string,
    pleaseInputName: string,
    pleaseAddSchudule: string,
    invalidSchedules: string,
    pillAlreadyExists: string,
    scheduleAlreadyExists: string,
    pillUpdatedSuccess: string,
    pillCreatedSuccess: string,
    cantDeletePillInCreation: string,
    errorWhileSaving: string,
    errorWhileDeleting: string,
    canNotAddSchedule: string,
  },
  pills_select: {
    deleteTitle: {
      one: string,
      other: string,
    }
    deleteConfirm: {
      one: string,
      other: string,
    },
  },
  history: {
    title: string,
    taken: string,
    skipped: string,
    pending: string,
    noPills: string,
    noHistory: string,
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
    data: {
      title: string,
      history: string,
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
  settings_history: {
    deleteData: string,
    deleteDataText: string,
    deleteDataModal: string,
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
