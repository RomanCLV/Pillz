// utils/dataStorage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pill, TreatmentDuration } from "types/pill";
import { DailySummary, IntakeStatus } from "types/dailySummary";

const PILLS_KEY = "app-pills";
const SUMMARIES_KEY = "app-daily-summaries";

// ==================== PILLS ====================

// Helper pour transformer les dates
function reviveTreatmentDuration(obj: any): TreatmentDuration {
  return {
    startDate: obj.startDate ? new Date(obj.startDate) : new Date(),
    endDate: obj.endDate ? new Date(obj.endDate) : null,
  };
}

export async function loadPills(): Promise<Pill[]> {
  try {
    const json = await AsyncStorage.getItem(PILLS_KEY);
    if (!json) return [];

    const parsed: any[] = JSON.parse(json);

    // On transforme les dates
    return parsed.map(pill => ({
      ...pill,
      treatmentDuration: reviveTreatmentDuration(pill.treatmentDuration),
    })) as Pill[];
  } 
  catch (error) {
    console.error("Error loading pills:", error);
    return [];
  }
}

export async function savePills(pills: Pill[]): Promise<void> {
  try {
    await AsyncStorage.setItem(PILLS_KEY, JSON.stringify(pills));
  }
  catch (error) {
    console.error("Error saving pills:", error);
  }
}

// ==================== DAILY SUMMARIES ====================

/**
 * Charge les récapitulatifs bruts sans traitement
 */
export async function loadDailySummaries(): Promise<DailySummary[]> {
  try {
    const json = await AsyncStorage.getItem(SUMMARIES_KEY);
    return json ? JSON.parse(json) : [];
  } 
  catch (error) {
    console.error("Error loading daily summaries:", error);
    return [];
  }
}

export async function saveDailySummaries(summaries: DailySummary[]): Promise<void> {
  try {
    await AsyncStorage.setItem(SUMMARIES_KEY, JSON.stringify(summaries));
  }
  catch (error) {
    console.error("Error saving daily summaries:", error);
  }
}

/**
 * Nettoie les summaries de plus de 7 jours et trie par date
 * À appeler une seule fois au démarrage
 */
export function cleanAndSortSummaries(summaries: DailySummary[]): DailySummary[] {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const cutoffDate = sevenDaysAgo.toISOString().split("T")[0];
  
  const sortedSummaries = summaries
    .filter(s => s.date >= cutoffDate)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // pour tous les summaries avant aujourd'hui
  const todayStr = new Date().toISOString().split("T")[0];
  sortedSummaries.forEach(summary => { 
    if (summary.date < todayStr) {
      // marquer tous les pills pending en oubliés
      summary.pills.forEach(pillSummary => {
        pillSummary.intakes.forEach(intake => {
          if (intake.status === IntakeStatus.PENDING) {
            intake.status = IntakeStatus.SKIPPED;
          }
        }); 
      });
    }
  });
  return sortedSummaries;
}
