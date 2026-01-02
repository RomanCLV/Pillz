import { LanguageSet } from "../types";

const en: LanguageSet = {
  tabBar: {
    daily: "Daily",
    pills: "Medications",
    history: "History",
    settings: "Settings",
  },

  navigation: {
    back: "Back"
  },

  global: {
    confirm: "Confirm",
    cancel: "Cancel",
    delete: "Delete",
    success: "Success",
    error: "Error",
    ok: "OK",
    select: "Select",
    close: "Close",
    chooseDate: "Choose a date",
    selectDate: "Select a date",
    modifySchedule: "Modify schedule",
    deleteData: "Delete data",
  },

  itemSelection: {
    noSelection: "No selection",
    nSelected: {
      one: "{n} item selected",
      other: "{n} items selected",
    }
  },

  hours: {
    hh: "{h}h",
    hhmm: "{h}h{m}",
    hh2dmm: "{h}:{m}",
  },

  calendar: {
    monthNames: {
      january: "January",
      february: "February",
      march: "March",
      april: "April",
      may: "May",
      june: "June",
      july: "July",
      august: "August",
      september: "September",
      octember: "October",
      november: "November",
      december: "December",
    },
    monthShortNames: {
      january: "Jan.",
      february: "Feb.",
      march: "Mar.",
      april: "Apr.",
      may: "May",
      june: "Jun.",
      july: "Jul.",
      august: "Aug.",
      september: "Sep.",
      octember: "Oct.",
      november: "Nov.",
      december: "Dec.",
    },
    dayNames: {
      sunday: "Sunday",
      monday: "Monday",
      tuesday: "Tuesday",
      wednesday: "Wednesday",
      thursday: "Thursday",
      friday: "Friday",
      saturday: "Saturday",
    },
    dayShortNames: {
      sunday: "Sun.",
      monday: "Mon.",
      tuesday: "Tue.",
      wednesday: "Wed.",
      thursday: "Thu.",
      friday: "Fri.",
      saturday: "Sat.",
    },
    today: "Today",
  },

  notifications: {
    title: "Taking medication",
    timeToTake: "💊 Time to take",
    reminder: "⏰ Reminder",
    pillIn15Minutes: "{name} in 15 minutes.",
    pillSoonExpired: "⏰ Only 30 minutes left to pick up your {name}.",
  },

  home: {
    title: "Welcome",
    noIntakes: "No intake scheduled today",
    intake : {
      taken: "Taken",
      skipped: "Skipped",
      take: "To take",
      takeSoon: "Soon",
    },
  },

  pills: {
    title: "My medications",
    noPills: "No medication registered",
    addPill: "Add a medication",
    modificationsWillApply: "Changes to medications will take effect tomorrow.",
  },

  pills_edit: {
    titleNew: "New medication",
    titleEdit: "Edit medication",
    pillName: "Medication name",
    pillNameExample: "E.g.: Aspirin",
    dosage: "Dosage",
    unity: "Unit",
    schedules: "Intake schedules",
    intakeWindow: "Time to take the medication",
    timeBetweenIntakes: "Minimum time between intakes",
    treatmentDuration: "Treatment duration",
    treatmentDurationLimited: "Limited duration treatment",
    treatmentFrom: "From",
    treatmentTo: "To",
    stockManagement: "Stock management",
    enableStockManagement: "Enable stock management",
    quantityInStock: "Quantity in stock",
    alertThreshold: "Alert threshold",
    deletePill: "Delete this medication",
    deletePillConfirmation: 'Are you sure you want to delete "{name}"? This action is irreversible.',
    pleaseInputName: "Please enter a medication name.",
    pleaseAddSchudule: "Please add at least one intake schedule.",
    invalidSchedules: "Schedules do not respect the minimum interval of {h}h.",
    pillAlreadyExists: "A medication with this name already exists.",
    scheduleAlreadyExists: "This schedule already exists.",
    pillUpdatedSuccess: "Medication updated successfully.",
    pillCreatedSuccess: "Medication added successfully.",
    cantDeletePillInCreation: "You cannot delete a medication being created.",
    errorWhileSaving: "An error occurred while saving.",
    errorWhileDeleting: "An error occurred while deleting.",
    canNotAddSchedule: "Unable to add a new schedule. The minimum interval of {h}h is not respected.",
  },

  pills_select: {
    deleteTitle: {
      one: "Delete this medication",
      other: "Delete these medications",
    },
    deleteConfirm: {
      one: "Are you sure you want to delete this medication? This action is irreversible.",
      other: "Are you sure you want to delete these {n} medications? This action is irreversible.",
    },
  },

  history: {
    title: "Tracking",
    taken: "Taken",
    skipped: "Skipped",
    pending: "Pending",
    noPills: "No medication on that day",
    noHistory: "No history available",
  },

  settings: {
    title: "Settings",

    notifications: {
      title: "Notifications",
      pushNotifications: "Push notifications",
    },

    preferences: {
      title: "Preferences",
      theme: "Theme",
      language: "Language",
    },

    data: {
      title: "Data",
      history: "History",
    },

    help: {
      title: "Help & Support",
      contactUs: "Contact us",
    },

    version: "Version {version}",
  },

  settings_theme: {
    title: "Choose theme",
    system: "System",
    light: "Light",
    dark: "Dark",
    systemDescription: "Automatically adapts to the system theme.",
    lightDescription: "The app will always use the light theme.",
    darkDescription: "The app will always use the dark theme.",
  },

  settings_language: {
    title: "Choose language",
    description: "The selected language will be applied throughout the app.",
    fr: "French",
    en: "English",
    es: "Spanish",
    de: "German",
    it: "Italian",
  },

  settings_history: {
    deleteData: "Delete",
    deleteDataText: "Delete history data.",
    deleteDataModal: "Are you sure you want to delete history data? Warning, this action is irreversible.",
  },

  pill: {
    // Units
    unit: {
      mg: "mg",
      ml: "ml",
      tablespoon: "tbsp",
      teaspoon: "tsp",
      pill: "pill",
      sachet: "sachet",
    },
    // Usage
    usage: {
      mg: { one: "{n} mg", other: "{n} mg" },
      ml: { one: "{n} ml", other: "{n} ml" },
      tablespoon: { one: "{n} tbsp", other: "{n} tbsp" },
      teaspoon: { one: "{n} tsp", other: "{n} tsp" },
      pill: { one: "{n} pill", other: "{n} pills" },
      sachet: { one: "{n} sachet", other: "{n} sachets" },
    },
    
    // Labels
    schedules: "Intake schedules",
    stock: "Stock",
    minInterval: "Min. interval",
    until: "Until",
    from: "From",
  }
};

export default en;
