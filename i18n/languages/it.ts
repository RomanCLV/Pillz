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
    welcome: "I tuoi farmaci",
    edit: "Modifica",
  },

  pills_edit: {
    welcome: "Modifica farmaco",
  },

  history: {
    welcome: "Monitoraggio",
  },

  settings: {
    title: "Impostazioni",

    notifications: {
      title: "Notifiche",
      pushNotifications: "Notifiche push",
    },

    preferences: {
      title: "Preferenze",
      theme: "Tema",
      language: "Lingua",
    },

    help: {
      title: "Aiuto e supporto",
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
    description: "La lingua selezionata verrà applicata all'intera applicazione.",
    fr: "Francese",
    en: "Inglese",
    es: "Spagnolo",
    de: "Tedesco",
    it: "Italiano",
  }
};

export default it;
