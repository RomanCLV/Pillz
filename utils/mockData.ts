// utils/mockData.ts
import { Pill, DosageUnit } from "types/pill";
import { DailySummary, IntakeStatus } from "types/dailySummary";

/**
 * Données de test pour les médicaments
 */
export const MOCK_PILLS: Pill[] = [
  {
    name: "Doliprane",
    dosage: 1000,
    unit: DosageUnit.MG,
    schedules: [
      { hour: 8, minute: 0 },
      { hour: 14, minute: 0 },
      { hour: 20, minute: 0 },
    ],
    treatmentDuration: {
      startDate: new Date("2024-12-01"),
      endDate: null, // Pas de limite
    },
    minHoursBetweenIntakes: 4,
    intakeWindowMinutes: 60,
    stockGesture: false,
    stockQuantity: 24,
    reminderThreshold: 5,
  },
  {
    name: "Ibuprofène",
    dosage: 400,
    unit: DosageUnit.MG,
    schedules: [
      { hour: 9, minute: 0 },
      { hour: 21, minute: 0 },
    ],
    treatmentDuration: {
      startDate: new Date("2024-12-10"),
      endDate: new Date("2024-12-25"),
    },
    minHoursBetweenIntakes: 6,
    intakeWindowMinutes: 30,
    stockGesture: true,
    stockQuantity: 15,
    reminderThreshold: 3,
  },
  {
    name: "Vitamine D",
    dosage: 1,
    unit: DosageUnit.PILL,
    schedules: [{ hour: 8, minute: 30 }],
    treatmentDuration: {
      startDate: new Date("2024-11-01"),
      endDate: null,
    },
    minHoursBetweenIntakes: 24,
    intakeWindowMinutes: 120,
    stockGesture: true,
    stockQuantity: 45,
    reminderThreshold: 10,
  },
  {
    name: "Sirop contre la toux",
    dosage: 1,
    unit: DosageUnit.TABLESPOON,
    schedules: [
      { hour: 7, minute: 30 },
      { hour: 13, minute: 30 },
      { hour: 19, minute: 30 },
    ],
    treatmentDuration: {
      startDate: new Date("2024-12-05"),
      endDate: new Date("2024-12-12"),
    },
    minHoursBetweenIntakes: 6,
    intakeWindowMinutes: 60,
    stockGesture: false,
    stockQuantity: 3,
    reminderThreshold: 5,
  },
  {
    name: "Probiotiques",
    dosage: 2,
    unit: DosageUnit.SACHET,
    schedules: [
      { hour: 8, minute: 30 },
      { hour: 20, minute: 30 },
    ],
    treatmentDuration: {
      startDate: new Date("2024-12-01"),
      endDate: null,
    },
    minHoursBetweenIntakes: 12,
    intakeWindowMinutes: 60,
    stockGesture: true,
    stockQuantity: 30,
    reminderThreshold: 8,
  },
  {
    name: "Phytoxil",
    dosage: 10,
    unit: DosageUnit.ML,
    schedules: [
      { hour: 8, minute: 30 },
      { hour: 12, minute: 30 },
      { hour: 20, minute: 30 },
    ],
    treatmentDuration: {
      startDate: new Date("2024-12-01"),
      endDate: null,
    },
    minHoursBetweenIntakes: 3,
    intakeWindowMinutes: 60,
    stockGesture: false,
    stockQuantity: 30,
    reminderThreshold: 0,
  },
];

/**
 * Génère un récapitulatif quotidien basé sur les médicaments actuels
 */
export function generateDailySummary(date: string, pills: Pill[]): DailySummary {
  return {
    date,
    pills: pills.map((pill) => ({
      name: pill.name,
      dosage: pill.dosage,
      unit: pill.unit,
      intakes: pill.schedules.map((schedule) => ({
        schedule: schedule,
        status: IntakeStatus.PENDING,
      })),
    })),
  };
}

/**
 * Génère des récapitulatifs pour les 7 derniers jours (pour les tests)
 */
export function generateMockSummaries(pills: Pill[]): DailySummary[] {
  const summaries: DailySummary[] = [];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    
    const summary = generateDailySummary(dateStr, pills);
    
    // Ajouter des statuts aléatoires pour rendre les données plus réalistes
    summary.pills.forEach((pill) => {
      pill.intakes.forEach((intake) => {
        const random = Math.random();
        if (i === 0) {
          // Aujourd'hui : la plupart en attente
          intake.status = random > 0.3 ? IntakeStatus.PENDING : IntakeStatus.TAKEN;
        } else {
          // Jours précédents : la plupart pris
          if (random > 0.8) {
            intake.status = IntakeStatus.SKIPPED;
          } else if (random > 0.1) {
            intake.status = IntakeStatus.TAKEN;
            intake.takenAt = new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate(),
              intake.schedule.hour,
              intake.schedule.minute + Math.floor(Math.random() * 30)
            ).toISOString();
          } else {
            intake.status = IntakeStatus.PENDING;
          }
        }
      });
    });
    
    summaries.push(summary);
  }
  
  return summaries;
}

/**
 * Sauvegarde les données de test et efface les données actuelles
 */
export async function saveMockData(): Promise<void> {
  const { savePills } = await import("./dataStorage");
  const { saveDailySummaries } = await import("./dataStorage");
  
  await savePills(MOCK_PILLS);
  await saveDailySummaries(generateMockSummaries(MOCK_PILLS));
}
