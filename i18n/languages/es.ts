import { LanguageSet } from "../types";

const es: LanguageSet = {
  tabBar: {
    daily: "Diario",
    pills: "Medicación",
    history: "Historial",
    settings: "Ajustes",
  },

  navigation: {
    back: "Volver",
  },

  home: {
    welcome: "Bienvenido",
  },

  pills: {
    home: {
      welcome: "Tus medicamentos",
      edit: "Editar",
    },
    edit: {
      welcome: "Editar medicamento",
    },
  },

  followUp: {
    welcome: "Seguimiento",
  },

  settings: {
    title: "Ajustes",

    notification: {
      title: "Notificaciones",
      pushNotification: "Notificaciones push",
    },

    preferences: {
      title: "Preferencias",
      theme: "Tema",
      language: "Idioma",
    },

    help: {
      title: "Ayuda",
      contactUs: "Contáctanos",
    },

    version: "Versión {version}",
  },

  settings_theme: {
    title: "Elegir tema",
    system: "Sistema",
    light: "Claro",
    dark: "Oscuro",
    systemDescription: "Se adapta automáticamente al tema del sistema.",
    lightDescription: "La app siempre usará el tema claro.",
    darkDescription: "La app siempre usará el tema oscuro.",
  },

  settings_language: {
    title: "Elegir idioma",
    description: "Selecciona el idioma de la aplicación.",
    fr: "Francés",
    en: "Inglés",
    es: "Español",
    de: "Alemán",
    it: "Italiano",
  }
};

export default es;
