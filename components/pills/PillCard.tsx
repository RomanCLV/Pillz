import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import ThemedText from "@components/themedComponents/ThemedText";
import ThemedCard from "@components/themedComponents/ThemedCard";
import { useTheme } from "@hooks/useTheme";
import { t } from "@i18n/t";
import { Pill } from "types/pill";
import { ScheduleChip } from "./ScheduleChip";
import { Chip } from "@components/Chip";
import { InfoRow } from "@components/InfoRow";

interface PillCardProps {
  pill: Pill;
  onPress?: () => void;
}

export function PillCard({ pill, onPress }: PillCardProps) {
  const theme = useTheme();

  // Vérifier si le stock est bas
  const isLowStock = pill.stockQuantity <= pill.reminderThreshold;

  // Vérifier si le traitement est limité dans le temps
  const hasEndDate = pill.treatmentDuration.endDate !== null;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <ThemedCard style={styles.card}>
        {/* En-tête avec nom et dosage */}
        <View style={styles.header}>
          <ThemedText style={styles.name}>{pill.name}</ThemedText>
          <Chip variant="highlight">{t(`pill.usage.${pill.unit}`, {n: pill.dosage}, true )}</Chip>
        </View>

        {/* Horaires de prise */}
        {pill.schedules.length > 0 && (
          <View style={styles.section}>
            <ThemedText style={[styles.sectionTitle, { color: theme.text.tertiary }]}>
              {t("pill.schedules")}
            </ThemedText>
            <View style={styles.schedulesContainer}>
              {pill.schedules.map((schedule, index) => (
                <ScheduleChip key={index} schedule={schedule} variant="primary" intensity="light"  />
              ))}
            </View>
          </View>
        )}

        {/* Informations supplémentaires */}
        <View style={[styles.footer, { borderTopColor: theme.border.light, borderTopWidth: 1 }]}>
          {/* Stock */}
          <InfoRow label={t("pill.stock")} value={pill.stockQuantity} valueStyle={isLowStock ? {color: theme.text.error} : {}} />
          {/* Durée minimale entre prises */}
          <InfoRow label={t("pill.minInterval")} value={pill.minHoursBetweenIntakes} />
          {/* Durée du traitement */}
          {hasEndDate && <InfoRow label={t("pill.until")} value={pill.treatmentDuration.endDate?.toLocaleDateString()} />}
        </View>
      </ThemedCard>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    flex: 1,
  },
  dosageBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dosage: {
    fontSize: 14,
    fontWeight: "600",
  },
  section: {
    marginBottom: 12,
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
  footer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    paddingTop: 12,
    marginTop: 4,
  },
});
