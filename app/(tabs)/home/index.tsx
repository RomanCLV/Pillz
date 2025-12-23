import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { usePills } from "@hooks/usePills";
import { useSummaries } from "@hooks/useSummaries";
import { useTheme } from "@hooks/useTheme";
import { useT } from "@i18n/useT";
import { GlobalStyles } from "@constants/global-styles";
import { DailyPillSummary, DailySummary, IntakeStatus, ScheduleIntake } from "types/dailySummary";
import { Pill } from "types/pill";
import { DailyIntake } from "types/dailyIntake";
import { useData } from "@context/DataContext";
import SafeTopAreaThemedView from "@themedComponents/SafeTopAreaThemedView";
import ThemedText from "@themedComponents/ThemedText";
import DailyIntakeCard from "@components/home/DailyIntakeCard";

interface IntakeReference {
  pillIndex: number;
  intakeIndex: number;
}

interface SetupIntakesResult {
  intakes: DailyIntake[];
  skippedIntakes: IntakeReference[];
}

function sortDailyIntakes(intakes: DailyIntake[]): DailyIntake[] {
  return [...intakes].sort((a, b) => {
    const timeA =
      a.schedule.schedule.hour * 60 + a.schedule.schedule.minute;
    const timeB =
      b.schedule.schedule.hour * 60 + b.schedule.schedule.minute;
    // 1. Tri par horaire
    if (timeA !== timeB) {
      return timeA - timeB;
    }
    // 2. Tri par nom (alphabétique)
    const nameCompare = a.name.localeCompare(b.name, 'fr', {
      sensitivity: 'base',
    });
    if (nameCompare !== 0) {
      return nameCompare;
    }
    // 3. Tri par dosage
    return a.dosage - b.dosage;
  });
}

export default function index() {
  const t = useT();
  const theme = useTheme();
  const { pills, decrementStock } = usePills();
  const { setSummaries } = useData();
  const { summaries, markIntakeAsSkipped, markIntakeAsTaken } = useSummaries();
  const [dailyIntakes, setDailyIntakes] = useState<DailyIntake[]>([]);

  // Ref pour éviter les doubles appels
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function setup() {
      await setupDailySummaries(summaries, pills);
      const todaySummary = summaries[summaries.length - 1];
      const { intakes, skippedIntakes } = setupIntakesItems(todaySummary.pills);
      
      skippedIntakes.forEach(({ pillIndex, intakeIndex }) => {
        markIntakeAsSkipped(
          todaySummary.date,
          todaySummary.pills[pillIndex].name,
          todaySummary.pills[pillIndex].intakes[intakeIndex].schedule.hour,
          todaySummary.pills[pillIndex].intakes[intakeIndex].schedule.minute
        );
      });
      
      setDailyIntakes(intakes);

      const msSecsBeforeNextMinute = 60000 - (new Date().getSeconds() * 1000 + new Date().getMilliseconds());
      updateTimeoutRef.current = setTimeout(updateStatus, msSecsBeforeNextMinute);
    }
    
    setup();

    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [summaries]);

  const setupDailySummaries = async (dailySummaries: DailySummary[], pills: Pill[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split("T")[0];
    const item = dailySummaries.find(item => item.date == todayStr);

    if (item == null) {
      const newItem: DailySummary = {
        date: todayStr,
        pills: pills
          .filter(pill => {
            if (pill.treatmentDuration.endDate != null) {
              // si la date de fin est passée, ne pas ajouter considérer le médicament
              const endDate = new Date(pill.treatmentDuration.endDate);
              endDate.setHours(0, 0, 0, 0);
            if (today > endDate) {
              return false;
            }
          }
          return true;
        })
        .map(pill => {
          return {
            name: pill.name,
            dosage: pill.dosage,
            unit: pill.unit,
            intakeWindowMinutes: pill.intakeWindowMinutes,
            intakes: pill.schedules.map((pillSchedule) => {
              return {
                schedule: pillSchedule,
                status: IntakeStatus.PENDING,
              } as ScheduleIntake;
            }),
          } as DailyPillSummary;
        }),
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
        const scheduleTime = new Date();
        scheduleTime.setHours(
          scheduleIntake.schedule.hour,
          scheduleIntake.schedule.minute,
          0,
          0
        );

        const timeSinceSchedule = now.getTime() - scheduleTime.getTime();
        const minutesSinceSchedule = timeSinceSchedule / 60000;

        const canTakeNow = minutesSinceSchedule >= 0 && minutesSinceSchedule <= dailyPillSummary.intakeWindowMinutes;

        const remainingMinutes = dailyPillSummary.intakeWindowMinutes - minutesSinceSchedule;
        const timeAlmostDue = canTakeNow && remainingMinutes <= 30;

        const canTakeSoon = minutesSinceSchedule >= -30 && minutesSinceSchedule < 0;

        const isWindowPassed = minutesSinceSchedule > dailyPillSummary.intakeWindowMinutes;
        const shouldBeSkipped = isWindowPassed && scheduleIntake.status === IntakeStatus.PENDING;

        if (shouldBeSkipped) {
          skippedIntakes.push({ pillIndex, intakeIndex });
        }

        const intake: DailyIntake = {
          name: dailyPillSummary.name,
          dosage: dailyPillSummary.dosage,
          unit: dailyPillSummary.unit,
          schedule: scheduleIntake,
          canTakeSoon: canTakeSoon,
          canTakeNow: canTakeNow,
          timeAlmostDue: timeAlmostDue,
        };

        intakes.push(intake);
      });
    });

    return { intakes: sortDailyIntakes(intakes), skippedIntakes };
  };

const updateStatus = () => {
    const todaySummary = summaries[summaries.length - 1];
    if (!todaySummary) return;

    const { intakes, skippedIntakes } = setupIntakesItems(todaySummary.pills);
    
    // Marquer les intakes à skipper
    skippedIntakes.forEach(({ pillIndex, intakeIndex }) => {
      markIntakeAsSkipped(
        todaySummary.date,
        todaySummary.pills[pillIndex].name,
        todaySummary.pills[pillIndex].intakes[intakeIndex].schedule.hour,
        todaySummary.pills[pillIndex].intakes[intakeIndex].schedule.minute
      );
    });

    // Comparer avec l'état actuel pour éviter les re-renders inutiles
    const hasChanged = !areIntakesEqual(dailyIntakes, intakes);
    
    if (hasChanged) {
      setDailyIntakes(intakes);
    }

    // Programmer la prochaine vérification
    const msSecsBeforeNextMinute = 60000 - (new Date().getSeconds() * 1000 + new Date().getMilliseconds());
    updateTimeoutRef.current = setTimeout(updateStatus, msSecsBeforeNextMinute);
  };

  // Fonction pour comparer deux listes d'intakes
  const areIntakesEqual = (intakes1: DailyIntake[], intakes2: DailyIntake[]): boolean => {
    if (intakes1.length !== intakes2.length) return false;

    for (let i = 0; i < intakes1.length; i++) {
      const intake1 = intakes1[i];
      const intake2 = intakes2[i];

      // Comparer uniquement les propriétés qui peuvent changer avec le temps
      if (
        intake1.canTakeSoon !== intake2.canTakeSoon ||
        intake1.canTakeNow !== intake2.canTakeNow ||
        intake1.timeAlmostDue !== intake2.timeAlmostDue ||
        intake1.schedule.status !== intake2.schedule.status
      ) {
        return false;
      }
    }

    return true;
  };

  const handleTakeIntake = (intake: DailyIntake) => {
    const todaySummary = summaries[summaries.length - 1];

    const pill = pills.find(p => p.name === intake.name && p.dosage === intake.dosage && p.unit === intake.unit);
    if (pill && pill.stockGesture) {
      decrementStock(pills.indexOf(pill), 1);
    }

    markIntakeAsTaken(
      todaySummary.date,
      intake.name,
      intake.schedule.schedule.hour,
      intake.schedule.schedule.minute
    );
  };

  return (
    <SafeTopAreaThemedView style={GlobalStyles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* En-tête */}
        <View style={styles.header}>
          <ThemedText style={styles.title}>{t("home.title")}</ThemedText>
          <ThemedText style={[styles.subtitle, { color: theme.text.secondary }]}>
            {new Date().toLocaleDateString(undefined, { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </ThemedText>
        </View>

        {/* Liste des prises */}
        {dailyIntakes.length === 0 ? (
          <View style={styles.emptyState}>
            <ThemedText style={[styles.emptyText, { color: theme.text.tertiary }]}>
              {t("home.noIntakes")}
            </ThemedText>
          </View>
        ) : (
          <View style={styles.intakesList}>
            {dailyIntakes.map((intake, index) => (
              <DailyIntakeCard
                key={index}
                intake={intake}
                onTake={() => handleTakeIntake(intake)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeTopAreaThemedView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  intakesList: {
    gap: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
  },
});
