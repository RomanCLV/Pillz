import { LanguageSet } from "../types";

const en: LanguageSet = {
  tabBar: {
    daily: "Daily",
    pills: "Medication",
    history: "History",
    settings: "Settings",
  },

  navigation: {
    back: "Back",
  },

  home: {
    welcome: "Welcome",
  },

  pills: {
    home: {
      welcome: "Your medication",
      edit: "Edit",
    },
    edit: {
      welcome: "Edit medication",
    },
  },

  followUp: {
    welcome: "Follow-up",
  },

  settings: {
    title: "Settings",

    notification: {
      title: "Notifications",
      pushNotification: "Push notifications",
    },

    preferences: {
      title: "Preferences",
      theme: "Theme",
      language: "Language",
    },

    help: {
      title: "Help",
      contactUs: "Contact us",
    },

    version: "Version {version}",
  },

  settings_theme: {
    title: "Choose a theme",
    system: "System",
    light: "Light",
    dark: "Dark",
    systemDescription: "Automatically adapts to the system theme.",
    lightDescription: "The app will always use the light theme.",
    darkDescription: "The app will always use the dark theme.",
  },

  settings_language: {
    title: "Choose a language",
    description: "Select the display language of the app.",
    fr: "French",
    en: "English",
    es: "Spanish",
    de: "German",
    it: "Italian",
  }
};

export default en;
