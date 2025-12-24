import { LanguageSet } from "../types";

const it: LanguageSet = {
  tabBar: {
    daily: "Quotidiano",
    pills: "Farmaci",
    history: "Storico",
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
    modifySchedule: "Modifica l'orario",
    deleteData: "Elimina i dati",
  },

  itemSelection: {
    noSelection: "Nessuna selezione",
    nSelected: {
      one: "{n} elemento selezionato",
      other: "{n} elementi selezionati",
    }
  },

  hours: {
    hh: "{h}h",
    hhmm: "{h}h{m}",
    hh2dmm: "{h}:{m}",
  },

  calendar: {
    monthNames: {
      january: "Gennaio",
      february: "Febbraio",
      march: "Marzo",
      april: "Aprile",
      may: "Maggio",
      june: "Giugno",
      july: "Luglio",
      august: "Agosto",
      september: "Settembre",
      octember: "Ottobre",
      november: "Novembre",
      december: "Dicembre",
    },
    monthShortNames: {
      january: "Gen.",
      february: "Feb.",
      march: "Mar.",
      april: "Apr.",
      may: "Mag.",
      june: "Giu.",
      july: "Lug.",
      august: "Ago.",
      september: "Set.",
      octember: "Ott.",
      november: "Nov.",
      december: "Dic.",
    },
    dayNames: {
      sunday: "Domenica",
      monday: "Lunedì",
      tuesday: "Martedì",
      wednesday: "Mercoledì",
      thursday: "Giovedì",
      friday: "Venerdì",
      saturday: "Sabato",
    },
    dayShortNames: {
      sunday: "Dom.",
      monday: "Lun.",
      tuesday: "Mar.",
      wednesday: "Mer.",
      thursday: "Gio.",
      friday: "Ven.",
      saturday: "Sab.",
    },
    today: "Oggi",
  },

  home: {
    title: "Benvenuto",
    noIntakes: "Nessuna assunzione prevista oggi",
    intake : {
      taken: "Assunto",
      skipped: "Dimenticato",
      take: "Da assumere",
      takeSoon: "Presto",
    },
  },

  pills: {
    title: "I miei farmaci",
    noPills: "Nessun farmaco registrato",
    addPill: "Aggiungi un farmaco",
    modificationsWillApply: "Le modifiche ai farmaci saranno applicate da domani.",
  },

  pills_edit: {
    titleNew: "Nuovo farmaco",
    titleEdit: "Modifica il farmaco",
    pillName: "Nome del farmaco",
    pillNameExample: "Es: Tachipirina",
    dosage: "Dosaggio",
    unity: "Unità",
    schedules: "Orari di assunzione",
    intakeWindow: "Tempo per assumere il farmaco",
    timeBetweenIntakes: "Tempo minimo tra le assunzioni",
    treatmentDuration: "Durata del trattamento",
    treatmentDurationLimited: "Trattamento a durata limitata",
    treatmentFrom: "Dal",
    treatmentTo: "Al",
    stockManagement: "Gestione delle scorte",
    enableStockManagement: "Attiva la gestione delle scorte",
    quantityInStock: "Quantità in magazzino",
    alertThreshold: "Soglia di allerta",
    deletePill: "Elimina questo farmaco",
    deletePillConfirmation: 'Sei sicuro di voler eliminare "{name}"? Questa azione è irreversibile.',
    pleaseInputName: "Inserisci un nome del farmaco.",
    pleaseAddSchudule: "Aggiungi almeno un orario di assunzione.",
    invalidSchedules: "Gli orari non rispettano l'intervallo minimo di {h}h.",
    pillAlreadyExists: "Esiste già un farmaco con questo nome.",
    scheduleAlreadyExists: "Questo orario esiste già.",
    pillUpdatedSuccess: "Farmaco modificato con successo.",
    pillCreatedSuccess: "Farmaco aggiunto con successo.",
    cantDeletePillInCreation: "Non puoi eliminare un farmaco in fase di creazione.",
    errorWhileSaving: "Si è verificato un errore durante il salvataggio.",
    errorWhileDeleting: "Si è verificato un errore durante l'eliminazione.",
    canNotAddSchedule: "Impossibile aggiungere un nuovo orario. L'intervallo minimo di {h}h non è rispettato.",
  },

  pills_select: {
    deleteTitle: {
      one: "Elimina questo farmaco",
      other: "Elimina questi farmaci",
    },
    deleteConfirm: {
      one: "Sei sicuro di voler eliminare questo farmaco? Questa azione è irreversibile.",
      other: "Sei sicuro di voler eliminare questi {n} farmaci? Questa azione è irreversibile.",
    },
  },

  history: {
    title: "Monitoraggio",
    taken: "Assunti",
    skipped: "Dimenticati",
    pending: "In attesa",
    noPills: "Nessun farmaco quel giorno",
    noHistory: "Nessuno storico disponibile",
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

    data: {
      title: "Dati",
      history: "Storico",
    },

    help: {
      title: "Aiuto e Supporto",
      contactUs: "Contattaci",
    },

    version: "Versione {version}",
  },

  settings_theme: {
    title: "Scegli il tema",
    system: "Sistema",
    light: "Chiaro",
    dark: "Scuro",
    systemDescription: "Si adatta automaticamente al tema del sistema.",
    lightDescription: "L'applicazione userà sempre il tema chiaro.",
    darkDescription: "L'applicazione userà sempre il tema scuro.",
  },

  settings_language: {
    title: "Scegli la lingua",
    description: "La lingua selezionata sarà applicata a tutta l'applicazione.",
    fr: "Francese",
    en: "Inglese",
    es: "Spagnolo",
    de: "Tedesco",
    it: "Italiano",
  },

  settings_history: {
    deleteData: "Elimina",
    deleteDataText: "Elimina i dati dello storico.",
    deleteDataModal: "Sei sicuro di voler eliminare i dati dello storico? Attenzione, questa azione è irreversibile.",
  },

  pill: {
    // Units
    unit: {
      mg: "mg",
      ml: "ml",
      tablespoon: "cucch. da tavola",
      teaspoon: "cucch. da caffè",
      pill: "compressa",
      sachet: "bustina",
    },
    // Usage
    usage: {
      mg: { one: "{n} mg", other: "{n} mg" },
      ml: { one: "{n} ml", other: "{n} ml" },
      tablespoon: { one: "{n} cucch. da tavola", other: "{n} cucch. da tavola" },
      teaspoon: { one: "{n} cucch. da caffè", other: "{n} cucch. da caffè" },
      pill: { one: "{n} compressa", other: "{n} compresse" },
      sachet: { one: "{n} bustina", other: "{n} bustine" },
    },
    
    // Labels
    schedules: "Orari di assunzione",
    stock: "Scorte",
    minInterval: "Intervallo min.",
    until: "Fino al",
    from: "A partire dal",
  }
};

export default it;
