import { LanguageSet } from "../types";

const it: LanguageSet = {
  tabBar: {
    daily: "Quotidiano",
    pills: "Farmaci",
    history: "Cronologia",
    settings: "Impostazioni",
  },

  navigation: {
    back: "Indietro"
  },

  global: {
    confirm: "Conferma",
    cancel: "Annulla",
    delete: "Elimina",
    success: "Successo",
    error: "Errore",
    ok: "OK",
    select: "Seleziona",
    close: "Chiudi",
    chooseDate: "Scegli una data",
    selectDate: "Seleziona una data",
    modifySchedule: "Modifica orario",
  },

  hours: {
    hh: "{h}h",
    hhmm: "{h}h{m}",
    hh2dmm: "{h}:{m}",
  },

  home: {
    title: "Benvenuto",
  },

  pills: {
    title: "I Miei Farmaci",
    noPills: "Nessun farmaco registrato",
    addPill: "Aggiungi un farmaco",
  },

  pills_edit: {
    titleNew: "Nuovo Farmaco",
    titleEdit: "Modifica Farmaco",
    pillName: "Nome del farmaco",
    pillNameExample: "Es: Tachipirina",
    dosage: "Dosaggio",
    unity: "Unità",
    schedules: "Orari di assunzione",
    intakeWindow: "Finestra temporale per assumere il farmaco",
    timeBetweenIntakes: "Tempo minimo tra le assunzioni",
    treatmentDuration: "Durata del Trattamento",
    treatmentDurationLimited: "Trattamento a durata limitata",
    stockManagement: "Gestione delle Scorte",
    enableStockManagement: "Attiva gestione delle scorte",
    quantityInStock: "Quantità in magazzino",
    alertThreshold: "Soglia di allerta",
    deletePill: "Elimina questo farmaco",
    deletePillConfirmation: 'Sei sicuro di voler eliminare "{name}"? Questa azione è irreversibile.',
    pleaseInputName: "Si prega di inserire un nome del farmaco.",
    pleaseAddSchudule: "Si prega di aggiungere almeno un orario di assunzione.",
    invalidSchedules: "Gli orari non rispettano l'intervallo minimo di {h}h.",
    pillAlreadyExists: "Esiste già un farmaco con questo nome.",
    scheduleAlreadyExists: "Questo orario esiste già.",
    pillUpdatedSuccess: "Farmaco aggiornato con successo.",
    pillCreatedSuccess: "Farmaco aggiunto con successo.",
    cantDeletePillInCreation: "Non è possibile eliminare un farmaco in fase di creazione.",
    errorWhileSaving: "Si è verificato un errore durante il salvataggio.",
    errorWhileDeleting: "Si è verificato un errore durante l'eliminazione.",
    canNotAddSchedule: "Impossibile aggiungere un nuovo orario. L'intervallo minimo di {h}h non è rispettato.",
  },

  history: {
    title: "Monitoraggio",
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
      title: "Aiuto e Supporto",
      contactUs: "Contattaci",
    },

    version: "Versione {version}",
  },

  settings_theme: {
    title: "Scegli il Tema",
    system: "Sistema",
    light: "Chiaro",
    dark: "Scuro",
    systemDescription: "Si adatta automaticamente al tema del sistema.",
    lightDescription: "L'app utilizzerà sempre il tema chiaro.",
    darkDescription: "L'app utilizzerà sempre il tema scuro.",
  },

  settings_language: {
    title: "Scegli la Lingua",
    description: "La lingua selezionata verrà applicata all'intera applicazione.",
    fr: "Francese",
    en: "Inglese",
    es: "Spagnolo",
    de: "Tedesco",
    it: "Italiano",
  },

  pill: {
    // Unità
    unit: {
      mg: "mg",
      ml: "ml",
      tablespoon: "cucchiaio",
      teaspoon: "cucchiaino",
      pill: "compressa",
      sachet: "bustina",
    },
    // Uso
    usage: {
      mg: { one: "{n} mg", other: "{n} mg" },
      ml: { one: "{n} ml", other: "{n} ml" },
      tablespoon: { one: "{n} cucchiaio", other: "{n} cucchiai" },
      teaspoon: { one: "{n} cucchiaino", other: "{n} cucchiaini" },
      pill: { one: "{n} compressa", other: "{n} compresse" },
      sachet: { one: "{n} bustina", other: "{n} bustine" },
    },
    
    // Etichette
    schedules: "Orari di assunzione",
    stock: "Scorte",
    minInterval: "Intervallo min.",
    until: "Fino al",
  }
};

export default it;