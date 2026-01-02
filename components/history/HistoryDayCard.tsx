import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@hooks/useTheme";
import { useT } from "@i18n/useT";
import { DailyPillSummary, IntakeStatus, ScheduleIntake } from "types/dailySummary";
import Chip from "@components/Chip";
import ThemedText from "@themedComponents/ThemedText";
import ThemedCard from "@themedComponents/ThemedCard";
import ScheduleChip from "@components/pills/ScheduleChip";
import { PillSchedule } from "types/pill";

interface HistoryDayCardProps {
  pill: DailyPillSummary;
}

function recoverPillSchedule(takenAt: string, fallback: PillSchedule): PillSchedule {
  const date = new Date(takenAt);
  return date ? {hour: date.getHours(), minute: date.getMinutes()} : fallback;
}

function getPillSchedule(scheduleIntake: ScheduleIntake, forceTheoretical: boolean = false): PillSchedule {
  if (forceTheoretical) {
    return scheduleIntake.schedule;
  }
  return (scheduleIntake.status === IntakeStatus.TAKEN && scheduleIntake.takenAt) 
    ? recoverPillSchedule(scheduleIntake.takenAt, scheduleIntake.schedule) 
    : scheduleIntake.schedule;
}

export default function HistoryDayCard({ pill }: HistoryDayCardProps) {
  const theme = useTheme();
  const t = useT();
  const [showTheoretical, setShowTheoretical] = useState(false);

  // Obtenir la variante du chip en fonction du statut
  const getScheduleChipVariant = (status: IntakeStatus) => {
    switch (status) {
      case IntakeStatus.TAKEN:
        return "secondary";
      case IntakeStatus.SKIPPED:
        return "error";
      case IntakeStatus.PENDING:
      default:
        return "highlight";
    }
  };

  // Vérifier s'il y a au moins une prise avec un horaire différent du théorique
  const hasDifferentSchedules = pill.intakes.some(
    intake => intake.status === IntakeStatus.TAKEN && intake.takenAt
  );

  const toggleScheduleDisplay = () => {
    if (hasDifferentSchedules) {
      setShowTheoretical(prev => !prev);
    }
  };

  return (
    <ThemedCard
      pressable={hasDifferentSchedules}
      onPress={toggleScheduleDisplay}
      animateScale={hasDifferentSchedules}
      animateOpacity={hasDifferentSchedules}
    >
      {/* En-tête avec nom et dosage */}
      <View style={styles.header}>
        <ThemedText style={styles.name}>{pill.name}</ThemedText>
        <Chip variant="highlight">
          {t(`pill.usage.${pill.unit}`, { n: pill.dosage }, true)}
        </Chip>
      </View>

      {/* Horaires de prise */}
      {pill.intakes.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText style={[styles.sectionTitle, { color: theme.text.tertiary }]}>
              {t("pill.schedules")}
            </ThemedText>
          </View>
          <View style={styles.schedulesContainer}>
            {pill.intakes.map((intake, index) => (
              <ScheduleChip
                key={index}
                variant={getScheduleChipVariant(intake.status)}
                intensity="light"
                schedule={getPillSchedule(intake, showTheoretical)}
              />
            ))}
          </View>
        </View>
      )}
    </ThemedCard>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  section: {
    marginBottom: 0,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  modeIndicator: {
    fontSize: 11,
    fontWeight: "500",
  },
  schedulesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
});
