import React, { useEffect } from "react";

import { usePills } from "@hooks/usePills";
import { useSummaries } from "@hooks/useSummaries";
import { useT } from "@i18n/useT";
import {GlobalStyles} from "@constants/global-styles";
import { DailyPillSummary, DailySummary, IntakeStatus, ScheduleIntake } from "types/dailySummary";
import { Pill } from "types/pill";
import SafeTopAreaThemedView from "@themedComponents/SafeTopAreaThemedView";
import ThemedText from "@themedComponents/ThemedText";
import { saveDailySummaries } from "@utils/dataStorage";
import { DailyIntake } from "types/dailyIntake";
import { useData } from "@context/DataContext";

interface IntakeReference {
  pillIndex: number;
  intakeIndex: number;
}

interface SetupIntakesResult {
  intakes: DailyIntake[];
  skippedIntakes: IntakeReference[];
}

export default function index () {
  const t = useT();
  const {pills} = usePills();
  const {setSummaries} = useData();
  const {summaries, markIntakeAsSkipped} = useSummaries();

  useEffect(() => {
    async function setup() {
      await setupDailySummaries(summaries, pills);
      const todaySummary = summaries[summaries.length - 1];
      const { intakes, skippedIntakes } = setupIntakesItems(todaySummary.pills);
      console.log('Intakes for today:', intakes.length);
      console.log('Skipped intakes for today:', skippedIntakes.length);

      skippedIntakes.forEach(({ pillIndex, intakeIndex }) => {
        markIntakeAsSkipped(
          todaySummary.date,
          todaySummary.pills[pillIndex].name,
          todaySummary.pills[pillIndex].intakes[intakeIndex].schedule.hour,
          todaySummary.pills[pillIndex].intakes[intakeIndex].schedule.minute
        );
      });
    }
    setup();
  }, [summaries]);

  const setupDailySummaries = async (dailySummaries: DailySummary[], pills: Pill[]) => {
    const today = new Date().toISOString().split("T")[0];
    const item = dailySummaries.find(item => item.date == today);
  
    if (item == null)
    {
      const newItem: DailySummary = {
        date: today,
        pills: pills.map(pill => { return {
          name: pill.name,
          dosage: pill.dosage,
          unit: pill.unit,
          intakeWindowMinutes: pill.intakeWindowMinutes,
          intakes: pill.schedules.map((pillSchedule) => { return {
                schedule: pillSchedule,
                status: IntakeStatus.PENDING,
              } as ScheduleIntake}),
            } as DailyPillSummary} 
          ),
      };
      dailySummaries.push(newItem);
      await setSummaries(dailySummaries);
    }
  };

const setupIntakesItems = (
  dailyPillSummaries: DailyPillSummary[]
): SetupIntakesResult => {
  const intakes: DailyIntake[] = [];
  const skippedIntakes: IntakeReference[] = [];
  
  const now = new Date();
  now.setSeconds(0, 0);

  dailyPillSummaries.forEach((dailyPillSummary, pillIndex) => {
    dailyPillSummary.intakes.forEach((scheduleIntake, intakeIndex) => {
      // Créer l'heure de prise prévue aujourd'hui
      const scheduleTime = new Date();
      scheduleTime.setHours(
        scheduleIntake.schedule.hour, 
        scheduleIntake.schedule.minute, 
        0, 
        0
      );

      // Calculer le temps écoulé depuis l'heure prévue (en millisecondes)
      const timeSinceSchedule = now.getTime() - scheduleTime.getTime();
      const minutesSinceSchedule = timeSinceSchedule / 60000;

      // canTakeNow : on est après l'heure prévue ET dans la fenêtre
      const canTakeNow = minutesSinceSchedule >= 0 && 
                         minutesSinceSchedule <= dailyPillSummary.intakeWindowMinutes;

      // timeAlmostDue : il reste moins de 30 minutes avant la fin de la fenêtre
      const remainingMinutes = dailyPillSummary.intakeWindowMinutes - minutesSinceSchedule;
      const timeAlmostDue = canTakeNow && remainingMinutes <= 30;

      // Détecter si la prise est manquée (fenêtre dépassée + status PENDING)
      const isWindowPassed = minutesSinceSchedule > dailyPillSummary.intakeWindowMinutes;
      const shouldBeSkipped = isWindowPassed && 
                              scheduleIntake.status === IntakeStatus.PENDING;

      if (shouldBeSkipped) {
        skippedIntakes.push({ pillIndex, intakeIndex });
      }

      const intake: DailyIntake = {
        name: dailyPillSummary.name,
        dosage: dailyPillSummary.dosage,
        unit: dailyPillSummary.unit,
        schedule: scheduleIntake,
        canTakeNow: canTakeNow,
        timeAlmostDue: timeAlmostDue,
      };
      
      intakes.push(intake);
    });
  });

  return { intakes, skippedIntakes };
};

  return (
    <SafeTopAreaThemedView style={[GlobalStyles.container, {justifyContent: "center", alignItems: "center"}]}>
      <ThemedText>{t("home.title")}</ThemedText>
    </SafeTopAreaThemedView>
  );
};
