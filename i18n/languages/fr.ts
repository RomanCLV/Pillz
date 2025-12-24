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

  global: {
    confirm: "Confirmer",
    cancel: "Annuler",
    delete: "Supprimer",
    success: "Succès",
    error: "Erreur",
    ok: "OK",
    select: "Sélectionner",
    close: "Fermer",
    chooseDate: "Choisir une date",
    selectDate: "Sélectionner une date",
    modifySchedule: "Modifier l'horaire",
    deleteData: "Supprimer les données",
  },

  itemSelection: {
    noSelection: "Aucune sélection",
    nSelected: {
      one: "{n} élément sélectionné",
      other: "{n} éléments sélectionnés",
    }
  },

  hours: {
    hh: "{h}h",
    hhmm: "{h}h{m}",
    hh2dmm: "{h}:{m}",
  },

  home: {
    title: "Bienvenue",
    noIntakes: "Aucune prise prévue aujourd'hui",
    intake : {
      taken: "Pris",
      skipped: "Oublié",
      take: "À prendre",
      takeSoon: "Bientôt",
    },
  },

  pills: {
    title: "Mes médicaments",
    noPills: "Aucun médicament enregistré",
    addPill: "Ajouter un médicament",
    modificationsWillApply: "Les modifications apportées aux médicaments seront prises en compte dès demain.",
  },

  pills_edit: {
    titleNew: "Nouveau médicament",
    titleEdit: "Modifier le médicament",
    pillName: "Nom du médicament",
    pillNameExample: "Ex: Doliprane",
    dosage: "Dosage",
    unity: "Unité",
    schedules: "Horaires de prise",
    intakeWindow: "Durée pour prendre le médicament",
    timeBetweenIntakes: "Durée minimale entre deux prises",
    treatmentDuration: "Durée du traitement",
    treatmentDurationLimited: "Traitement à durée limitée",
    treatmentFrom: "Du",
    treatmentTo: "Au",
    stockManagement: "Gestion du stock",
    enableStockManagement: "Activer la gestion du stock",
    quantityInStock: "Quantité en stock",
    alertThreshold: "Seuil d'alerte",
    deletePill: "Supprimer ce médicament",
    deletePillConfirmation: 'Êtes-vous sûr de vouloir supprimer "{name}" ? Cette action est irréversible.',
    pleaseInputName: "Veuillez entrer un nom de médicament.",
    pleaseAddSchudule: "Veuillez ajouter au moins un horaire de prise.",
    invalidSchedules: "Les horaires ne respectent pas l'intervalle minimal de {h}h.",
    pillAlreadyExists: "Un médicament avec ce nom existe déjà.",
    scheduleAlreadyExists: "Cet horaire existe déjà.",
    pillUpdatedSuccess: "Médicament modifié avec succès.",
    pillCreatedSuccess: "Médicament ajouté avec succès.",
    cantDeletePillInCreation: "Vous ne pouvez pas supprimer un médicament en cours de création.",
    errorWhileSaving: "Une erreur est survenue lors de la sauvegarde.",
    errorWhileDeleting: "Une erreur est survenue lors de la suppression.",
    canNotAddSchedule: "Impossible d'ajouter un nouvel horaire. L'intervalle minimal de {h}h n'est pas respecté.",
  },

  pills_select: {
    deleteTitle: {
      one: "Supprimer ce médicament",
      other: "Supprimer ces médicaments",
    },
    deleteConfirm: {
      one: "Êtes-vous sûr de vouloir supprimer ce médicament ? Cette action est irréversible.",
      other: "Êtes-vous sûr de vouloir supprimer ces {n} médicaments ? Cette action est irréversible.",
    },
  },

  history: {
    title: "Suivi",
    taken: "Pris",
    skipped: "Oubliés",
    pending: "En attente",
    noPills: "Aucun médicament ce jour-là",
    noHistory: "Aucun historique disponible",
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

    data: {
      title: "Données",
      history: "Historique",
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

  settings_history: {
    deleteData: "Supprimer",
    deleteDataText: "Supprimer les données d'historique.",
    deleteDataModal: "Êtes-vous certain de vouloir supprimer les données d'historique ? Attention, cette action est irréversible.",
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
    minInterval: "Intervalle min.",
    until: "Jusqu'au",
  }
};

export default fr;
