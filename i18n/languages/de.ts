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
  },

  hours: {
    hh: "{h}h",
    hhmm: "{h}h{m}",
    hh2dmm: "{h}:{m}",
  },

  home: {
    title: "Willkommen",
  },

  pills: {
    title: "Meine Medikamente",
    noPills: "Keine Medikamente erfasst",
    addPill: "Medikament hinzufügen",
  },

  pills_edit: {
    titleNew: "Neues Medikament",
    titleEdit: "Medikament bearbeiten",
    pillName: "Medikamentenname",
    pillNameExample: "Bsp: Ibuprofen",
    dosage: "Dosierung",
    unity: "Einheit",
    schedules: "Einnahmezeiten",
    intakeWindow: "Zeitfenster für die Medikamenteneinnahme",
    timeBetweenIntakes: "Mindestzeit zwischen Einnahmen",
    treatmentDuration: "Behandlungsdauer",
    treatmentDurationLimited: "Behandlung mit begrenzter Dauer",
    stockManagement: "Bestandsverwaltung",
    enableStockManagement: "Bestandsverwaltung aktivieren",
    quantityInStock: "Menge auf Lager",
    alertThreshold: "Warnschwelle",
    deletePill: "Dieses Medikament löschen",
    deletePillConfirmation: 'Sind Sie sicher, dass Sie "{name}" löschen möchten? Diese Aktion ist unwiderruflich.',
    pleaseInputName: "Bitte geben Sie einen Medikamentennamen ein.",
    pleaseAddSchudule: "Bitte fügen Sie mindestens eine Einnahmezeit hinzu.",
    invalidSchedules: "Die Zeitpläne entsprechen nicht dem Mindestintervall von {h}h.",
    pillAlreadyExists: "Ein Medikament mit diesem Namen existiert bereits.",
    scheduleAlreadyExists: "Dieser Zeitplan existiert bereits.",
    pillUpdatedSuccess: "Medikament erfolgreich aktualisiert.",
    pillCreatedSuccess: "Medikament erfolgreich hinzugefügt.",
    cantDeletePillInCreation: "Sie können ein Medikament, das gerade erstellt wird, nicht löschen.",
    errorWhileSaving: "Beim Speichern ist ein Fehler aufgetreten.",
    errorWhileDeleting: "Beim Löschen ist ein Fehler aufgetreten.",
    canNotAddSchedule: "Neuer Zeitplan kann nicht hinzugefügt werden. Das Mindestintervall von {h}h wird nicht eingehalten.",
  },

  history: {
    title: "Verfolgung",
  },

  settings: {
    title: "Einstellungen",

    notifications: {
      title: "Benachrichtigungen",
      pushNotifications: "Push-Benachrichtigungen",
    },

    preferences: {
      title: "Präferenzen",
      theme: "Design",
      language: "Sprache",
    },

    help: {
      title: "Hilfe & Support",
      contactUs: "Kontaktieren Sie uns",
    },

    version: "Version {version}",
  },

  settings_theme: {
    title: "Design wählen",
    system: "System",
    light: "Hell",
    dark: "Dunkel",
    systemDescription: "Passt sich automatisch an das Systemdesign an.",
    lightDescription: "Die App wird immer das helle Design verwenden.",
    darkDescription: "Die App wird immer das dunkle Design verwenden.",
  },

  settings_language: {
    title: "Sprache wählen",
    description: "Die ausgewählte Sprache wird auf die gesamte Anwendung angewendet.",
    fr: "Französisch",
    en: "Englisch",
    es: "Spanisch",
    de: "Deutsch",
    it: "Italienisch",
  },

  pill: {
    // Einheiten
    unit: {
      mg: "mg",
      ml: "ml",
      tablespoon: "EL",
      teaspoon: "TL",
      pill: "Tablette",
      sachet: "Beutel",
    },
    // Verwendung
    usage: {
      mg: { one: "{n} mg", other: "{n} mg" },
      ml: { one: "{n} ml", other: "{n} ml" },
      tablespoon: { one: "{n} EL", other: "{n} EL" },
      teaspoon: { one: "{n} TL", other: "{n} TL" },
      pill: { one: "{n} Tablette", other: "{n} Tabletten" },
      sachet: { one: "{n} Beutel", other: "{n} Beutel" },
    },
    
    // Beschriftungen
    schedules: "Einnahmezeiten",
    stock: "Bestand",
    minInterval: "Min. Intervall",
    until: "Bis zum",
  }
};

export default de;