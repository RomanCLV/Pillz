/**
 * Unités de dosage disponibles pour les médicaments
 */
export enum DosageUnit {
  MG = "mg",
  ML = "ml",
  TEASPOON = "teaspoon", // cuillère à café
  TABLESPOON = "tablespoon", // cuillère à soupe
  PILL = "pill", // cachet
  SACHET = "sachet",
}

/**
 * Horaire de prise d'un médicament
 */
export interface PillSchedule {
  hour: number; // 0-23
  minute: number; // 0-59
}

/**
 * Durée de traitement (optionnelle)
 */
export interface TreatmentDuration {
  startDate: Date;
  endDate: Date | null; // null = pas de limite
}

/**
 * Structure complète d'un médicament
 */
export interface Pill {
  name: string;
  dosage: number;
  unit: DosageUnit;
  schedules: PillSchedule[]; // Liste des horaires de prise
  treatmentDuration: TreatmentDuration;
  minHoursBetweenIntakes: number; // Durée minimale entre deux prises (en heures)
  intakeWindowMinutes: number; // Fenêtre de temps pour prendre le médicament (en minutes)
  stockGesture: boolean;
  stockQuantity: number; // Quantité en stock
  reminderThreshold: number; // Seuil pour rappel de réapprovisionnement
}

/**
 * Fonction utilitaire pour valider que les horaires respectent la durée minimale
 */
export function validateSchedules(
  schedules: PillSchedule[],
  minHoursBetweenIntakes: number
): boolean {
  if (schedules.length <= 1) 
    return true;

  // Trier les horaires par ordre chronologique
  const sorted = [...schedules].sort((a, b) => {
    if (a.hour !== b.hour) return a.hour - b.hour;
    return a.minute - b.minute;
  });

  // Vérifier chaque paire d'horaires consécutifs
  for (let i = 0; i < sorted.length - 1; i++) {
    const current = sorted[i];
    const next = sorted[i + 1];

    const currentMinutes = current.hour * 60 + current.minute;
    const nextMinutes = next.hour * 60 + next.minute;
    const diffMinutes = nextMinutes - currentMinutes;

    if (diffMinutes < minHoursBetweenIntakes * 60) {
      return false;
    }
  }

  // Vérifier aussi entre le dernier et le premier horaire (cycle 24h)
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  const lastMinutes = last.hour * 60 + last.minute;
  const firstMinutes = first.hour * 60 + first.minute;
  const cycleMinutes = 24 * 60 - lastMinutes + firstMinutes;

  return cycleMinutes >= minHoursBetweenIntakes * 60;
}

/**
 * Fonction utilitaire pour formater un horaire
 */
export function formatSchedule(schedule: PillSchedule): string {
  const h = schedule.hour.toString().padStart(2, '0');
  const m = schedule.minute.toString().padStart(2, '0');
  return `${h}:${m}`;
}

/**
 * Fonction utilitaire pour créer un nouveau médicament avec valeurs par défaut
 */
export function createDefaultPill(): Pill {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return {
    name: "",
    dosage: 1,
    unit: DosageUnit.PILL,
    schedules: [],
    treatmentDuration: {
      startDate: today,
      endDate: null,
    },
    minHoursBetweenIntakes: 4,
    intakeWindowMinutes: 60,
    stockGesture: false,
    stockQuantity: 0,
    reminderThreshold: 5,
  };
}

/**
 * Options de fenêtre de prise (en minutes)
 * De 30min à 12h par pas de 30min
 */
export const INTAKE_WINDOW_OPTIONS = Array.from(
  { length: 24 }, // (12 * 60) / 30 = 24 options
  (_, i) => (i + 1) * 30
);
