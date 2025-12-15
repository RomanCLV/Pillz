import { DosageUnit, PillSchedule } from "./pill";

/**
 * Statut de prise d'un médicament
 */
export enum IntakeStatus {
  TAKEN = "taken", // Pris
  SKIPPED = "skipped", // Sauté
  PENDING = "pending", // En attente
}

/**
 * Détail d'une prise pour un horaire donné
 */
export interface ScheduleIntake {
  schedule: PillSchedule;
  status: IntakeStatus;
  takenAt?: string; // ISO string du moment exact de la prise
}

/**
 * Récapitulatif quotidien d'un médicament
 */
export interface DailyPillSummary {
  name: string;
  dosage: number;
  unit: DosageUnit;
  intakes: ScheduleIntake[]; // Un item par horaire prévu
}

/**
 * Récapitulatif complet d'une journée
 */
export interface DailySummary {
  date: string; // Format YYYY-MM-DD pour faciliter les clés
  pills: DailyPillSummary[];
}

/**
 * Historique des 7 derniers jours
 */
export type WeeklySummary = DailySummary[];