import { LanguageSet } from "../types";

const de: LanguageSet = {
  tabBar: {
    daily: "Täglich",
    pills: "Medikamente",
    history: "Verlauf",
    settings: "Einstellungen",
  },

  navigation: {
    back: "Zurück"
  },

  global: {
    confirm: "Bestätigen",
    cancel: "Abbrechen",
    delete: "Löschen",
    success: "Erfolg",
    error: "Fehler",
    ok: "OK",
    select: "Auswählen",
    close: "Schließen",
    chooseDate: "Datum wählen",
    selectDate: "Datum auswählen",
    modifySchedule: "Zeitplan ändern",
    deleteData: "Daten löschen",
  },

  itemSelection: {
    noSelection: "Keine Auswahl",
    nSelected: {
      one: "{n} Element ausgewählt",
      other: "{n} Elemente ausgewählt",
    }
  },

  hours: {
    hh: "{h} Uhr",
    hhmm: "{h}:{m}",
    hh2dmm: "{h}:{m}",
  },

  calendar: {
    monthNames: {
      january: "Januar",
      february: "Februar",
      march: "März",
      april: "April",
      may: "Mai",
      june: "Juni",
      july: "Juli",
      august: "August",
      september: "September",
      octember: "Oktober",
      november: "November",
      december: "Dezember",
    },
    monthShortNames: {
      january: "Jan.",
      february: "Feb.",
      march: "Mär.",
      april: "Apr.",
      may: "Mai",
      june: "Jun.",
      july: "Jul.",
      august: "Aug.",
      september: "Sep.",
      octember: "Okt.",
      november: "Nov.",
      december: "Dez.",
    },
    dayNames: {
      sunday: "Sonntag",
      monday: "Montag",
      tuesday: "Dienstag",
      wednesday: "Mittwoch",
      thursday: "Donnerstag",
      friday: "Freitag",
      saturday: "Samstag",
    },
    dayShortNames: {
      sunday: "So.",
      monday: "Mo.",
      tuesday: "Di.",
      wednesday: "Mi.",
      thursday: "Do.",
      friday: "Fr.",
      saturday: "Sa.",
    },
    today: "Heute",
  },

  home: {
    title: "Willkommen",
    noIntakes: "Keine Einnahme heute geplant",
    intake : {
      taken: "Eingenommen",
      skipped: "Vergessen",
      take: "Einzunehmen",
      takeSoon: "Bald",
    },
  },

  notifications: {
    title: "Einnahme von Medikamenten",
    timeToTake: "Aufnahmezeitpunkt",
    reminder: "Erinnerung",
    pillIn15Minutes: "{name} in 15 Minuten.",
    pillSoonExpired: "Nur noch 30 Minuten, bis Sie Ihr {name} einnehmen müssen.",
  },

  pills: {
    title: "Meine Medikamente",
    noPills: "Kein Medikament registriert",
    addPill: "Medikament hinzufügen",
    modificationsWillApply: "Änderungen an Medikamenten werden ab morgen wirksam.",
    stockWarning: {
      fewMorePill: "Sie haben nur noch {n} {name} übrig.",
      noMorePill: "Sie haben kein {name} mehr.",
    },
  },

  pills_edit: {
    titleNew: "Neues Medikament",
    titleEdit: "Medikament bearbeiten",
    pillName: "Medikamentenname",
    pillNameExample: "Z.B.: Aspirin",
    dosage: "Dosierung",
    unity: "Einheit",
    schedules: "Einnahmezeitpunkte",
    intakeWindow: "Zeit zur Einnahme des Medikaments",
    timeBetweenIntakes: "Mindestzeit zwischen Einnahmen",
    treatmentDuration: "Behandlungsdauer",
    treatmentDurationLimited: "Behandlung mit begrenzter Dauer",
    treatmentFrom: "Von",
    treatmentTo: "Bis",
    stockManagement: "Bestandsverwaltung",
    enableStockManagement: "Bestandsverwaltung aktivieren",
    quantityInStock: "Menge auf Lager",
    alertThreshold: "Alarmschwelle",
    deletePill: "Dieses Medikament löschen",
    deletePillConfirmation: 'Sind Sie sicher, dass Sie "{name}" löschen möchten? Diese Aktion ist unwiderruflich.',
    pleaseInputName: "Bitte geben Sie einen Medikamentennamen ein.",
    pleaseAddSchudule: "Bitte fügen Sie mindestens einen Einnahmezeitpunkt hinzu.",
    invalidSchedules: "Die Zeitpunkte entsprechen nicht dem Mindestintervall von {h}h.",
    pillAlreadyExists: "Ein Medikament mit diesem Namen existiert bereits.",
    scheduleAlreadyExists: "Dieser Zeitpunkt existiert bereits.",
    pillUpdatedSuccess: "Medikament erfolgreich aktualisiert.",
    pillCreatedSuccess: "Medikament erfolgreich hinzugefügt.",
    cantDeletePillInCreation: "Sie können ein Medikament in Erstellung nicht löschen.",
    errorWhileSaving: "Beim Speichern ist ein Fehler aufgetreten.",
    errorWhileDeleting: "Beim Löschen ist ein Fehler aufgetreten.",
    canNotAddSchedule: "Neuer Zeitpunkt kann nicht hinzugefügt werden. Das Mindestintervall von {h}h wird nicht eingehalten.",
  },

  pills_select: {
    deleteTitle: {
      one: "Dieses Medikament löschen",
      other: "Diese Medikamente löschen",
    },
    deleteConfirm: {
      one: "Sind Sie sicher, dass Sie dieses Medikament löschen möchten? Diese Aktion ist unwiderruflich.",
      other: "Sind Sie sicher, dass Sie diese {n} Medikamente löschen möchten? Diese Aktion ist unwiderruflich.",
    },
  },

  history: {
    title: "Verfolgung",
    taken: "Eingenommen",
    skipped: "Vergessen",
    pending: "Ausstehend",
    noPills: "Kein Medikament an diesem Tag",
    noHistory: "Kein Verlauf verfügbar",
  },

  settings: {
    title: "Einstellungen",

    notifications: {
      title: "Benachrichtigungen",
      pushNotifications: "Push-Benachrichtigungen",
    },

    preferences: {
      title: "Einstellungen",
      theme: "Thema",
      language: "Sprache",
    },

    data: {
      title: "Daten",
      history: "Verlauf",
    },

    help: {
      title: "Hilfe & Support",
      contactUs: "Kontaktieren Sie uns",
    },

    version: "Version {version}",
  },

  settings_theme: {
    title: "Thema wählen",
    system: "System",
    light: "Hell",
    dark: "Dunkel",
    systemDescription: "Passt sich automatisch dem Systemthema an.",
    lightDescription: "Die App verwendet immer das helle Thema.",
    darkDescription: "Die App verwendet immer das dunkle Thema.",
  },

  settings_language: {
    title: "Sprache wählen",
    description: "Die gewählte Sprache wird in der gesamten App angewendet.",
    fr: "Französisch",
    en: "Englisch",
    es: "Spanisch",
    de: "Deutsch",
    it: "Italienisch",
  },

  settings_history: {
    deleteData: "Löschen",
    deleteDataText: "Verlaufsdaten löschen.",
    deleteDataModal: "Sind Sie sicher, dass Sie die Verlaufsdaten löschen möchten? Achtung, diese Aktion ist unwiderruflich.",
  },

  pill: {
    // Units
    unit: {
      mg: "mg",
      ml: "ml",
      tablespoon: "EL",
      teaspoon: "TL",
      pill: "Tablette",
      sachet: "Beutel",
    },
    // Usage
    usage: {
      mg: { one: "{n} mg", other: "{n} mg" },
      ml: { one: "{n} ml", other: "{n} ml" },
      tablespoon: { one: "{n} EL", other: "{n} EL" },
      teaspoon: { one: "{n} TL", other: "{n} TL" },
      pill: { one: "{n} Tablette", other: "{n} Tabletten" },
      sachet: { one: "{n} Beutel", other: "{n} Beutel" },
    },
    
    // Labels
    schedules: "Einnahmezeitpunkte",
    stock: "Bestand",
    minInterval: "Min. Intervall",
    until: "Bis zum",
    from: "Ab dem",
  }
};

export default de;
