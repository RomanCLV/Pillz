import { LanguageSet } from "../types";

const es: LanguageSet = {
  tabBar: {
    daily: "Diario",
    pills: "Medicamentos",
    history: "Historial",
    settings: "Ajustes",
  },

  navigation: {
    back: "Atrás"
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
    modifySchedule: "Modificar el horario",
    deleteData: "Eliminar los datos",
  },

  itemSelection: {
    noSelection: "Ninguna selección",
    nSelected: {
      one: "{n} elemento seleccionado",
      other: "{n} elementos seleccionados",
    }
  },

  hours: {
    hh: "{h}h",
    hhmm: "{h}h{m}",
    hh2dmm: "{h}:{m}",
  },

  calendar: {
    monthNames: {
      january: "Enero",
      february: "Febrero",
      march: "Marzo",
      april: "Abril",
      may: "Mayo",
      june: "Junio",
      july: "Julio",
      august: "Agosto",
      september: "Septiembre",
      octember: "Octubre",
      november: "Noviembre",
      december: "Diciembre",
    },
    monthShortNames: {
      january: "Ene.",
      february: "Feb.",
      march: "Mar.",
      april: "Abr.",
      may: "May.",
      june: "Jun.",
      july: "Jul.",
      august: "Ago.",
      september: "Sep.",
      octember: "Oct.",
      november: "Nov.",
      december: "Dic.",
    },
    dayNames: {
      sunday: "Domingo",
      monday: "Lunes",
      tuesday: "Martes",
      wednesday: "Miércoles",
      thursday: "Jueves",
      friday: "Viernes",
      saturday: "Sábado",
    },
    dayShortNames: {
      sunday: "Dom.",
      monday: "Lun.",
      tuesday: "Mar.",
      wednesday: "Mié.",
      thursday: "Jue.",
      friday: "Vie.",
      saturday: "Sáb.",
    },
    today: "Hoy",
  },

  home: {
    title: "Bienvenido",
    noIntakes: "Ninguna toma prevista hoy",
    intake : {
      taken: "Tomado",
      skipped: "Olvidado",
      take: "Por tomar",
      takeSoon: "Pronto",
    },
  },

  notifications: {
    timeToTake: "💊 Hora de tomar",
    pillDetails: "{{name}} - {{dosage}}{{unit}}",
    reminder: "⏰ Recordatorio",
    pillIn15Minutes: "{{name}} en 15 minutos",
  },

  pills: {
    title: "Mis medicamentos",
    noPills: "Ningún medicamento registrado",
    addPill: "Añadir un medicamento",
    modificationsWillApply: "Las modificaciones a los medicamentos se aplicarán a partir de mañana.",
  },

  pills_edit: {
    titleNew: "Nuevo medicamento",
    titleEdit: "Modificar el medicamento",
    pillName: "Nombre del medicamento",
    pillNameExample: "Ej: Paracetamol",
    dosage: "Dosificación",
    unity: "Unidad",
    schedules: "Horarios de toma",
    intakeWindow: "Tiempo para tomar el medicamento",
    timeBetweenIntakes: "Tiempo mínimo entre tomas",
    treatmentDuration: "Duración del tratamiento",
    treatmentDurationLimited: "Tratamiento de duración limitada",
    treatmentFrom: "Del",
    treatmentTo: "Al",
    stockManagement: "Gestión del stock",
    enableStockManagement: "Activar la gestión del stock",
    quantityInStock: "Cantidad en stock",
    alertThreshold: "Umbral de alerta",
    deletePill: "Eliminar este medicamento",
    deletePillConfirmation: '¿Está seguro de que desea eliminar "{name}"? Esta acción es irreversible.',
    pleaseInputName: "Por favor, ingrese un nombre de medicamento.",
    pleaseAddSchudule: "Por favor, añada al menos un horario de toma.",
    invalidSchedules: "Los horarios no respetan el intervalo mínimo de {h}h.",
    pillAlreadyExists: "Ya existe un medicamento con este nombre.",
    scheduleAlreadyExists: "Este horario ya existe.",
    pillUpdatedSuccess: "Medicamento modificado con éxito.",
    pillCreatedSuccess: "Medicamento añadido con éxito.",
    cantDeletePillInCreation: "No puede eliminar un medicamento en creación.",
    errorWhileSaving: "Se produjo un error al guardar.",
    errorWhileDeleting: "Se produjo un error al eliminar.",
    canNotAddSchedule: "Imposible añadir un nuevo horario. No se respeta el intervalo mínimo de {h}h.",
  },

  pills_select: {
    deleteTitle: {
      one: "Eliminar este medicamento",
      other: "Eliminar estos medicamentos",
    },
    deleteConfirm: {
      one: "¿Está seguro de que desea eliminar este medicamento? Esta acción es irreversible.",
      other: "¿Está seguro de que desea eliminar estos {n} medicamentos? Esta acción es irreversible.",
    },
  },

  history: {
    title: "Seguimiento",
    taken: "Tomados",
    skipped: "Olvidados",
    pending: "Pendientes",
    noPills: "Ningún medicamento ese día",
    noHistory: "Ningún historial disponible",
  },

  settings: {
    title: "Parámetros",

    notifications: {
      title: "Notificaciones",
      pushNotifications: "Notificaciones push",
    },

    preferences: {
      title: "Preferencias",
      theme: "Tema",
      language: "Idioma",
    },

    data: {
      title: "Datos",
      history: "Historial",
    },

    help: {
      title: "Ayuda y Soporte",
      contactUs: "Contáctenos",
    },

    version: "Versión {version}",
  },

  settings_theme: {
    title: "Elegir el tema",
    system: "Sistema",
    light: "Claro",
    dark: "Oscuro",
    systemDescription: "Se adapta automáticamente al tema del sistema.",
    lightDescription: "La aplicación siempre usará el tema claro.",
    darkDescription: "La aplicación siempre usará el tema oscuro.",
  },

  settings_language: {
    title: "Elegir el idioma",
    description: "El idioma seleccionado se aplicará en toda la aplicación.",
    fr: "Francés",
    en: "Inglés",
    es: "Español",
    de: "Alemán",
    it: "Italiano",
  },

  settings_history: {
    deleteData: "Eliminar",
    deleteDataText: "Eliminar los datos del historial.",
    deleteDataModal: "¿Está seguro de que desea eliminar los datos del historial? Atención, esta acción es irreversible.",
  },

  pill: {
    // Units
    unit: {
      mg: "mg",
      ml: "ml",
      tablespoon: "cdas",
      teaspoon: "cdtas",
      pill: "pastilla",
      sachet: "sobre",
    },
    // Usage
    usage: {
      mg: { one: "{n} mg", other: "{n} mg" },
      ml: { one: "{n} ml", other: "{n} ml" },
      tablespoon: { one: "{n} cda", other: "{n} cdas" },
      teaspoon: { one: "{n} cdta", other: "{n} cdtas" },
      pill: { one: "{n} pastilla", other: "{n} pastillas" },
      sachet: { one: "{n} sobre", other: "{n} sobres" },
    },
    
    // Labels
    schedules: "Horarios de toma",
    stock: "Stock",
    minInterval: "Intervalo mín.",
    until: "Hasta el",
    from: "A partir del",
  }
};

export default es;
