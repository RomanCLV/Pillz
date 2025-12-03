import { LanguageSet } from "../types";

const fr: LanguageSet = {
  tabBar: {
    daily: "Quotidien",
    pills: "Médicaments",
    history: "Historique",
    settings: "Réglages",
  },

  navigation: {
    back: "Retour"
  },

  home: {
    welcome: "Bienvenue",
  },

  pills: {
    home: {
      welcome: "Vos médicaments",
      edit: "Modifier",
    },
    edit: {
      welcome: "Modifier le médicament",
    },
  },

  followUp: {
    welcome: "Suivi",
  },

  settings: {
    title: "Paramètres",

    notification: {
      title: "Notifications",
      pushNotification: "Notifications push",
    },

    preferences: {
      title: "Préférences",
      theme: "Thème",
      language: "Langue",
    },

    help: {
      title: "Aide",
      contactUs: "Nous contacter",
    },

    version: "Version {version}",
  },

  settings_theme: {
    title: "Choisir le thème",
    system: "Système",
    light: "Clair",
    dark: "Sombre",
    systemDescription: "S'adapte automatiquement au thème du système.",
    lightDescription: "L'application utilisera toujours le thème clair.",
    darkDescription: "L'application utilisera toujours le thème sombre.",
  },

  settings_language: {
    title: "Choisir la langue",
    description: "Sélectionnez la langue d'affichage de l'application.",
    fr: "Français",
    en: "Anglais",
    es: "Espagnol",
    de: "Allemand",
    it: "Italien",
  }
};

export default fr;
