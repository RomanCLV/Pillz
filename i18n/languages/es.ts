import { LanguageSet } from "../types";

const es: LanguageSet = {
  tabBar: {
    daily: "Diario",
    pills: "Medicamentos",
    history: "Historial",
    settings: "Ajustes",
  },

  navigation: {
    back: "Volver"
  },

  global: {
    confirm: "Confirmar",
    cancel: "Cancelar",
    delete: "Eliminar",
    success: "Éxito",
    error: "Error",
    ok: "OK",
    select: "Seleccionar",
    close: "Cerrar",
    chooseDate: "Elegir una fecha",
    selectDate: "Seleccionar una fecha",
    modifySchedule: "Modificar horario",
  },

  hours: {
    hh: "{h}h",
    hhmm: "{h}h{m}",
    hh2dmm: "{h}:{m}",
  },

  home: {
    title: "Bienvenido",
  },

  pills: {
    title: "Mis Medicamentos",
    noPills: "Ningún medicamento registrado",
    addPill: "Añadir un medicamento",
  },

  pills_edit: {
    titleNew: "Nuevo Medicamento",
    titleEdit: "Editar Medicamento",
    pillName: "Nombre del medicamento",
    pillNameExample: "Ej: Paracetamol",
    dosage: "Dosis",
    unity: "Unidad",
    schedules: "Horarios de toma",
    intakeWindow: "Ventana de tiempo para tomar el medicamento",
    timeBetweenIntakes: "Tiempo mínimo entre tomas",
    treatmentDuration: "Duración del Tratamiento",
    treatmentDurationLimited: "Tratamiento de duración limitada",
    stockManagement: "Gestión de Stock",
    enableStockManagement: "Activar gestión de stock",
    quantityInStock: "Cantidad en stock",
    alertThreshold: "Umbral de alerta",
    deletePill: "Eliminar este medicamento",
    deletePillConfirmation: '¿Está seguro de que desea eliminar "{name}"? Esta acción es irreversible.',
    pleaseInputName: "Por favor, introduzca un nombre de medicamento.",
    pleaseAddSchudule: "Por favor, añada al menos un horario de toma.",
    invalidSchedules: "Los horarios no respetan el intervalo mínimo de {h}h.",
    pillAlreadyExists: "Ya existe un medicamento con este nombre.",
    scheduleAlreadyExists: "Este horario ya existe.",
    pillUpdatedSuccess: "Medicamento actualizado con éxito.",
    pillCreatedSuccess: "Medicamento añadido con éxito.",
    cantDeletePillInCreation: "No puede eliminar un medicamento en proceso de creación.",
    errorWhileSaving: "Se produjo un error al guardar.",
    errorWhileDeleting: "Se produjo un error al eliminar.",
    canNotAddSchedule: "No se puede añadir un nuevo horario. No se respeta el intervalo mínimo de {h}h.",
  },

  history: {
    title: "Seguimiento",
  },

  settings: {
    title: "Ajustes",

    notifications: {
      title: "Notificaciones",
      pushNotifications: "Notificaciones push",
    },

    preferences: {
      title: "Preferencias",
      theme: "Tema",
      language: "Idioma",
    },

    help: {
      title: "Ayuda y Soporte",
      contactUs: "Contáctenos",
    },

    version: "Versión {version}",
  },

  settings_theme: {
    title: "Elegir Tema",
    system: "Sistema",
    light: "Claro",
    dark: "Oscuro",
    systemDescription: "Se adapta automáticamente al tema del sistema.",
    lightDescription: "La aplicación siempre usará el tema claro.",
    darkDescription: "La aplicación siempre usará el tema oscuro.",
  },

  settings_language: {
    title: "Elegir Idioma",
    description: "El idioma seleccionado se aplicará a toda la aplicación.",
    fr: "Francés",
    en: "Inglés",
    es: "Español",
    de: "Alemán",
    it: "Italiano",
  },

  pill: {
    // Unidades
    unit: {
      mg: "mg",
      ml: "ml",
      tablespoon: "cdas.",
      teaspoon: "cdtas.",
      pill: "pastilla",
      sachet: "sobre",
    },
    // Uso
    usage: {
      mg: { one: "{n} mg", other: "{n} mg" },
      ml: { one: "{n} ml", other: "{n} ml" },
      tablespoon: { one: "{n} cdas.", other: "{n} cdas." },
      teaspoon: { one: "{n} cdtas.", other: "{n} cdtas." },
      pill: { one: "{n} pastilla", other: "{n} pastillas" },
      sachet: { one: "{n} sobre", other: "{n} sobres" },
    },
    
    // Etiquetas
    schedules: "Horarios de toma",
    stock: "Stock",
    minInterval: "Intervalo mín.",
    until: "Hasta el",
  }
};

export default es;