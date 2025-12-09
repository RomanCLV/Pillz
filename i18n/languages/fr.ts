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
    welcome: "Vos médicaments",
    edit: "Modifier",
  },

  pills_edit: {
    welcome: "Modifier le médicament",
  },

  history: {
    welcome: "Suivi",
  },

  settings: {
    title: "Paramètres",

    notifications: {
      title: "Notifications",
      pushNotifications: "Notifications push",
    },

    preferences: {
      title: "Préférences",
      theme: "Thème",
      language: "Langue",
    },

    help: {
      title: "Aide & Support",
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
    description: "La langue sélectionnée sera appliquée à l'ensemble de l'application.",
    fr: "Français",
    en: "Anglais",
    es: "Espagnol",
    de: "Allemand",
    it: "Italien",
  },

  pill: {
    // Unités
    unit: {
      mg: "mg",
      ml: "ml",
      tablespoon: "c. à soupe",
      teaspoon: "c. à café",
      pill: "cachet",
      sachet: "sachet",
    },
    // Usage
    usage: {
      mg: { one: "{n} mg", other: "{n} mg" },
      ml: { one: "{n} ml", other: "{n} ml" },
      tablespoon: { one: "{n} c. à soupe", other: "{n} c. à soupe" },
      teaspoon: { one: "{n} c. à café", other: "{n} c. à café" },
      pill: { one: "{n} cachet", other: "{n} cachets" },
      sachet: { one: "{n} sachet", other: "{n} sachets" },
    },
    
    // Labels
    schedules: "Horaires de prise",
    stock: "Stock",
    minInterval: "Intervalle min",
    until: "Jusqu'au",
    // Page liste
    title: "Mes médicaments",
    noPills: "Aucun médicament enregistré",
    addPill: "Ajouter un médicament",
  }
};

export default fr;
