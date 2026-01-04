import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import * as Localization from "expo-localization";

import { usePills } from "@hooks/usePills";
import { useSummaries } from "@hooks/useSummaries";
import { useTheme } from "@hooks/useTheme";
import { useCurrentLanguage } from "@hooks/useCurrentLanguage";
import { useT } from "@i18n/useT";
import { DEFAULT_LANGUAGE_TAG, LOCALE_MAP } from "@i18n/types";
import { DailyPillSummary, DailySummary, IntakeStatus, ScheduleIntake } from "types/dailySummary";
import { Pill } from "types/pill";
import { DailyIntake } from "types/dailyIntake";
import { scheduleDailyNotifications } from "services/notifications.service";
import { useData } from "@context/DataContext";
import SafeTopAreaThemedView from "@themedComponents/SafeTopAreaThemedView";
import ThemedText from "@themedComponents/ThemedText";
import DailyIntakeCard from "@components/home/DailyIntakeCard";
import StockWarningCard from "@components/home/StockWarningCard";

import {toDayKey, createDateAtNoon} from "utils/dateHelper"

import NoIntakesIcon from "@icons/no-intakes.svg"

interface IntakeReference {
  pillIndex: number;
  intakeIndex: number;
}

interface SetupIntakesResult {
  intakes: DailyIntake[];
  skippedIntakes: IntakeReference[];
}

interface StockWarning {
  id: string;
  message: string;
  type: "warning" | "error";
}

function sortDailyIntakes(intakes: DailyIntake[]): DailyIntake[] {
  return [...intakes].sort((a, b) => {
    const priorityDiff = getIntakePriority(a) - getIntakePriority(b);

    if (priorityDiff !== 0) 
      return priorityDiff;

    // même priorité -> tri par heure
    const aTime = a.schedule.schedule.hour * 60 + a.schedule.schedule.minute;
    const bTime = b.schedule.schedule.hour * 60 + b.schedule.schedule.minute;
    return aTime - bTime;
  });
}

function getIntakePriority(intake: DailyIntake): number {
  return intake.canTakeNow ? 0 : (intake.canTakeSoon ? 1 : 2);
}

export default function index() {
  const lang = useCurrentLanguage();
  const t = useT();
  const theme = useTheme();
  const { pills, decrementStock } = usePills();
  const { setSummaries } = useData();
  const { summaries, markIntakeAsSkipped, markIntakeAsTaken } = useSummaries();
  const [dailyIntakes, setDailyIntakes] = useState<DailyIntake[]>([]);
  const [stockWarnings, setStockWarnings] = useState<StockWarning[]>([]);
  const [dismissedWarnings, setDismissedWarnings] = useState<Set<string>>(new Set());

  // Ref pour éviter les doubles appels
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const currentLang = useCurrentLanguage();
    const userLocale =
      (currentLang ? LOCALE_MAP[currentLang] : null) ??
      Localization.getLocales()[0]?.languageTag ??
      DEFAULT_LANGUAGE_TAG;

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

      await scheduleDailyNotifications(todaySummary.pills, currentLang);
    }
    
    setup();

    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [summaries, pills]);

  // Générer les avertissements de stock
  useEffect(() => {
    const warnings: StockWarning[] = [];
    
    pills.forEach(pill => {
      if (pill.stockGesture) {
        const warningId = `stock-${pill.name}`;
        
        // Ne pas afficher si déjà dismissé
        if (dismissedWarnings.has(warningId)) {
          return;
        }

        if (pill.stockQuantity === 0) {
          warnings.push({
            id: warningId,
            message: t("pills.stockWarning.noMorePill", { name: pill.name }),
            type: "error"
          });
        } else if (pill.stockQuantity <= pill.reminderThreshold) {
          warnings.push({
            id: warningId,
            message: t("pills.stockWarning.fewMorePill", { 
              name: pill.name, 
              n: pill.stockQuantity 
            }),
            type: "warning"
          });
        }
      }
    });

    setStockWarnings(warnings);
  }, [pills, dismissedWarnings, lang]);

  const setupDailySummaries = async (dailySummaries: DailySummary[], pills: Pill[]) => {
    const today = createDateAtNoon();
    const todayStr = toDayKey(today);
    const item = dailySummaries.find(item => item.date == todayStr);

    if (item == null || item.pills.length === 0) {
      
      const newItem: DailySummary = {
        date: todayStr,
        pills: pills
          .filter(pill => {
            if (pill.treatmentDuration.endDate != null) {
              // si la date de fin est passée, ne pas ajouter considérer le médicament
              const endDate = createDateAtNoon(pill.treatmentDuration.endDate);
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
      if (item) {
        const index = dailySummaries.indexOf(item);
        dailySummaries[index] = newItem;
      }
      else
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
          canTakeSoon: canTakeSoon && scheduleIntake.status === IntakeStatus.PENDING,
          canTakeNow: canTakeNow && scheduleIntake.status === IntakeStatus.PENDING,
          timeAlmostDue: timeAlmostDue && scheduleIntake.status === IntakeStatus.PENDING,
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
        intake1.name !== intake2.name ||
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

  const handleTakeIntake = async (intake: DailyIntake) => {
    const todaySummary = summaries[summaries.length - 1];

    const pill = pills.find(p => p.name === intake.name && p.dosage === intake.dosage && p.unit === intake.unit);
    if (pill && pill.stockGesture) {
      await decrementStock(pills.indexOf(pill), 1);
    }

    await markIntakeAsTaken(
      todaySummary.date,
      intake.name,
      intake.schedule.schedule.hour,
      intake.schedule.schedule.minute
    );

    await scheduleDailyNotifications(todaySummary.pills, currentLang);
  };

  const handleDismissWarning = (warningId: string) => {
    setDismissedWarnings(prev => new Set([...prev, warningId]));
  };

  return (
    <SafeTopAreaThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.contentContainer, dailyIntakes.length === 0 && { flex: 1 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* En-tête */}
        <View style={styles.header}>
          <ThemedText style={styles.title}>{t("home.title")}</ThemedText>
          <ThemedText style={[styles.subtitle, { color: theme.text.secondary }]}>
            {new Date().toLocaleDateString(userLocale, { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </ThemedText>
        </View>

        {/* Avertissements de stock */}
        {stockWarnings.map(warning => (
          <StockWarningCard
            key={warning.id}
            message={warning.message}
            type={warning.type}
            onDismiss={() => handleDismissWarning(warning.id)}
          />
        ))}

        {/* Liste des prises */}
        {dailyIntakes.length === 0 ? (
          <View style={styles.emptyState}>
            <NoIntakesIcon width={128} height={128} color={theme.text.tertiary} opacity={0.5} />
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
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    // flex: 1, // Empeche la scrollview de scroller
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
