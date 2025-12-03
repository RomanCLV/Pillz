import { LanguageSet } from "../types";

const de: LanguageSet = {
  tabBar: {
    daily: "Täglich",
    pills: "Medikamente",
    history: "Verlauf",
    settings: "Einstellungen",
  },

  navigation: {
    back: "Zurück",
  },

  home: {
    welcome: "Willkommen",
  },

  pills: {
    home: {
      welcome: "Ihre Medikamente",
      edit: "Bearbeiten",
    },
    edit: {
      welcome: "Medikament bearbeiten",
    },
  },

  followUp: {
    welcome: "Verfolgung",
  },

  settings: {
    title: "Einstellungen",

    notification: {
      title: "Benachrichtigungen",
      pushNotification: "Push-Benachrichtigungen",
    },

    preferences: {
      title: "Einstellungen",
      theme: "Thema",
      language: "Sprache",
    },

    help: {
      title: "Hilfe",
      contactUs: "Kontaktieren Sie uns",
    },

    version: "Version {version}",
  },

  settings_theme: {
    title: "Thema auswählen",
    system: "System",
    light: "Hell",
    dark: "Dunkel",
    systemDescription: "Passt sich automatisch dem Systemthema an.",
    lightDescription: "Die App verwendet immer das helle Thema.",
    darkDescription: "Die App verwendet immer das dunkle Thema.",
  },

  settings_language: {
    title: "Sprache auswählen",
    description: "Wählen Sie die Anzeigesprache der App.",
    fr: "Französisch",
    en: "Englisch",
    es: "Spanisch",
    de: "Deutsch",
    it: "Italienisch",
  }
};

export default de;
