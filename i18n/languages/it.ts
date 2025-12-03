import { LanguageSet } from "../types";

const it: LanguageSet = {
  tabBar: {
    daily: "Quotidiano",
    pills: "Farmaci",
    history: "Storico",
    settings: "Impostazioni",
  },

  navigation: {
    back: "Indietro",
  },

  home: {
    welcome: "Benvenuto",
  },

  pills: {
    home: {
      welcome: "I tuoi farmaci",
      edit: "Modifica",
    },
    edit: {
      welcome: "Modifica farmaco",
    },
  },

  followUp: {
    welcome: "Monitoraggio",
  },

  settings: {
    title: "Impostazioni",

    notification: {
      title: "Notifiche",
      pushNotification: "Notifiche push",
    },

    preferences: {
      title: "Preferenze",
      theme: "Tema",
      language: "Lingua",
    },

    help: {
      title: "Aiuto",
      contactUs: "Contattaci",
    },

    version: "Versione {version}",
  },

  settings_theme: {
    title: "Scegli un tema",
    system: "Sistema",
    light: "Chiaro",
    dark: "Scuro",
    systemDescription: "Si adatta automaticamente al tema di sistema.",
    lightDescription: "L'app utilizzerà sempre il tema chiaro.",
    darkDescription: "L'app utilizzerà sempre il tema scuro.",
  },

  settings_language: {
    title: "Scegli la lingua",
    description: "Seleziona la lingua dell'app.",
    fr: "Francese",
    en: "Inglese",
    es: "Spagnolo",
    de: "Tedesco",
    it: "Italiano",
  }
};

export default it;
