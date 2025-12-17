// utils/dataStorage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pill, TreatmentDuration } from "types/pill";
import { DailySummary } from "types/dailySummary";

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
 * Charge tous les récapitulatifs quotidiens (limité aux 7 derniers jours)
 */
export async function loadDailySummaries(): Promise<DailySummary[]> {
  try {
    const json = await AsyncStorage.getItem(SUMMARIES_KEY);
    const summaries: DailySummary[] = json ? JSON.parse(json) : [];
    
    // Nettoyer automatiquement les données > 7 jours
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const cutoffDate = sevenDaysAgo.toISOString().split("T")[0];
    
    return summaries.filter(s => s.date >= cutoffDate);
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
 * Récupère le récapitulatif d'une journée spécifique
 */
export async function getDailySummary(date: string): Promise<DailySummary | null> {
  const summaries = await loadDailySummaries();
  return summaries.find(s => s.date === date) || null;
}

/**
 * Met à jour ou crée le récapitulatif d'une journée
 */
export async function updateDailySummary(summary: DailySummary): Promise<void> {
  const summaries = await loadDailySummaries();
  const index = summaries.findIndex(s => s.date === summary.date);
  
  if (index >= 0) {
    summaries[index] = summary;
  } 
  else {
    summaries.push(summary);
  }
  
  await saveDailySummaries(summaries);
}
