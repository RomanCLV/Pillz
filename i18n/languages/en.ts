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
  },

  hours: {
    hh: "{h}h",
    hhmm: "{h}h{m}",
    hh2dmm: "{h}:{m}",
  },

  home: {
    title: "Welcome",
  },

  pills: {
    title: "My Medications",
    noPills: "No medications recorded",
    addPill: "Add a medication",
  },

  pills_edit: {
    titleNew: "New Medication",
    titleEdit: "Edit Medication",
    pillName: "Medication Name",
    pillNameExample: "Ex: Tylenol",
    dosage: "Dosage",
    unity: "Unit",
    schedules: "Intake Schedule",
    intakeWindow: "Time window to take the medication",
    timeBetweenIntakes: "Minimum time between doses",
    treatmentDuration: "Treatment Duration",
    treatmentDurationLimited: "Limited duration treatment",
    stockManagement: "Stock Management",
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
    canNotAddSchedule: "Cannot add a new schedule. The minimum interval of {h}h is not respected.",
  },

  history: {
    title: "Tracking",
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

    help: {
      title: "Help & Support",
      contactUs: "Contact Us",
    },

    version: "Version {version}",
  },

  settings_theme: {
    title: "Choose Theme",
    system: "System",
    light: "Light",
    dark: "Dark",
    systemDescription: "Automatically adapts to the system theme.",
    lightDescription: "The app will always use the light theme.",
    darkDescription: "The app will always use the dark theme.",
  },

  settings_language: {
    title: "Choose Language",
    description: "The selected language will be applied to the entire application.",
    fr: "French",
    en: "English",
    es: "Spanish",
    de: "German",
    it: "Italian",
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
    schedules: "Intake Schedule",
    stock: "Stock",
    minInterval: "Min. interval",
    until: "Until",
  }
};

export default en;