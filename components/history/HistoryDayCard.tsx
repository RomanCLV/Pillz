import React from "react";
import { StyleSheet, View } from "react-native";

import { useTheme } from "@hooks/useTheme";
import { useT } from "@i18n/useT";
import { DailyPillSummary, IntakeStatus } from "types/dailySummary";
import Chip from "@components/Chip";
import ThemedText from "@themedComponents/ThemedText";
import ThemedCard from "@themedComponents/ThemedCard";
import ScheduleChip from "@components/pills/ScheduleChip";

interface HistoryDayCardProps {
  pill: DailyPillSummary;
}

export default function HistoryDayCard({ pill }: HistoryDayCardProps) {
  const theme = useTheme();
  const t = useT();

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

  return (
    <ThemedCard>
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
          <ThemedText style={[styles.sectionTitle, { color: theme.text.tertiary }]}>
            {t("pill.schedules")}
          </ThemedText>
          <View style={styles.schedulesContainer}>
            {pill.intakes.map((intake, index) => 
            <ScheduleChip
              key={index}
              variant={getScheduleChipVariant(intake.status)}
              intensity="light"
              schedule={intake.schedule}
              />
            )}
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
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  schedulesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
});
