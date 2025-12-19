// hooks/useSummaries.ts
import { useData } from "../context/DataContext";
import { DailySummary, IntakeStatus } from "types/dailySummary";

/**
 * Hook pour gérer les récapitulatifs quotidiens (suivi des 7 derniers jours)
 */
export const useSummaries = () => {
  const { summaries, setSummaries, loaded } = useData();

  /**
   * Récupère le récapitulatif d'une date spécifique
   */
  const getSummaryByDate = (date: string): DailySummary | undefined => {
    return summaries.find((s) => s.date === date);
  };

  /**
   * Récupère le récapitulatif du jour
   */
  const getTodaySummary = (): DailySummary | undefined => {
    const today = new Date().toISOString().split("T")[0];
    return getSummaryByDate(today);
  };

  /**
   * Met à jour ou crée un récapitulatif pour une date donnée
   */
  const updateSummary = async (summary: DailySummary) => {
    const index = summaries.findIndex((s) => s.date === summary.date);

    if (index >= 0) {
      const newSummaries = [...summaries];
      newSummaries[index] = summary;
      await setSummaries(newSummaries);
    } 
    else {
      await setSummaries([...summaries, summary]);
    }
  };

  const clearSummaries = async () => {
    await setSummaries([]);
  }

  /**
   * Marque une prise comme effectuée
   */
  const markIntakeAsTaken = async (
    date: string,
    pillName: string,
    hour: number,
    minute: number
  ) => {
    const summary = getSummaryByDate(date);
    if (!summary) return;

    const pillIndex = summary.pills.findIndex((p) => p.name === pillName);
    if (pillIndex < 0) return;

    const intakeIndex = summary.pills[pillIndex].intakes.findIndex(
      (i) => i.schedule.hour === hour && i.schedule.minute === minute
    );
    if (intakeIndex < 0) return;

    const updatedSummary = { ...summary };
    updatedSummary.pills[pillIndex].intakes[intakeIndex] = {
      ...updatedSummary.pills[pillIndex].intakes[intakeIndex],
      status: IntakeStatus.TAKEN,
      takenAt: new Date().toISOString(),
    };

    await updateSummary(updatedSummary);
  };

  /**
   * Marque une prise comme sautée
   */
  const markIntakeAsSkipped = async (
    date: string,
    pillName: string,
    hour: number,
    minute: number
  ) => {
    const summary = getSummaryByDate(date);
    if (!summary) return;

    const pillIndex = summary.pills.findIndex((p) => p.name === pillName);
    if (pillIndex < 0) return;

    const intakeIndex = summary.pills[pillIndex].intakes.findIndex(
      (i) => i.schedule.hour === hour && i.schedule.minute === minute
    );
    if (intakeIndex < 0) return;

    const updatedSummary = { ...summary };
    updatedSummary.pills[pillIndex].intakes[intakeIndex] = {
      ...updatedSummary.pills[pillIndex].intakes[intakeIndex],
      status: IntakeStatus.SKIPPED,
      takenAt: undefined,
    };

    await updateSummary(updatedSummary);
  };

  /**
   * Remplace tous les récapitulatifs
   */
  const saveAllSummaries = async (newSummaries: DailySummary[]) => {
    await setSummaries(newSummaries);
  };

  /**
   * Récupère les 7 derniers jours de récapitulatifs (triés du plus récent au plus ancien)
   */
  const getLastSevenDays = (): DailySummary[] => {
    return [...summaries].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 7);
  };

  /**
   * Calcule les statistiques pour une journée donnée
   */
  const getDayStats = (date: string) => {
    const summary = getSummaryByDate(date);
    if (!summary) return { total: 0, taken: 0, skipped: 0, pending: 0 };

    let total = 0;
    let taken = 0;
    let skipped = 0;
    let pending = 0;

    summary.pills.forEach((pill) => {
      pill.intakes.forEach((intake) => {
        total++;
        if (intake.status === IntakeStatus.TAKEN) taken++;
        else if (intake.status === IntakeStatus.SKIPPED) skipped++;
        else if (intake.status === IntakeStatus.PENDING) pending++;
      });
    });

    return { total, taken, skipped, pending };
  };

  return {
    summaries,
    loaded,
    getSummaryByDate,
    getTodaySummary,
    updateSummary,
    clearSummaries,
    markIntakeAsTaken,
    markIntakeAsSkipped,
    saveAllSummaries,
    getLastSevenDays,
    getDayStats,
  };
};