import React from "react";
import { StyleSheet, View } from "react-native";
import * as Localization from "expo-localization";

import { useCurrentLanguage } from "@hooks/useCurrentLanguage";
import { useTheme } from "@hooks/useTheme";
import { useT } from "@i18n/useT";
import { LOCALE_MAP } from "@i18n/types";
import { Pill } from "types/pill";
import ScheduleChip from "./ScheduleChip";
import Chip from "@components/Chip";
import InfoRow from "@components/InfoRow";
import ThemedText from "@themedComponents/ThemedText";
import ThemedCard from "@themedComponents/ThemedCard";

interface PillCardProps {
  pill: Pill;
  onPress?: () => void;
}

export default function PillCard({ pill, onPress }: PillCardProps) {
  const theme = useTheme();
  const t = useT();
  const currentLang = useCurrentLanguage(); // "fr", "en", etc.
    const userLocale = 
      (currentLang ? LOCALE_MAP[currentLang] : null) ?? 
      Localization.getLocales()[0]?.languageTag ?? 
      "en-US"; // ex: "fr-FR"

  // Vérifier si le stock est bas
  const isLowStock = pill.stockQuantity <= pill.reminderThreshold;

  // Vérifier si le traitement est limité dans le temps
  const hasEndDate = pill.treatmentDuration.endDate !== null;

  return (
    <ThemedCard 
      pressable={!!onPress} 
      onPress={onPress}
      pressedOpacity={0.8}
    >
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
              <ScheduleChip key={index} schedule={schedule} variant="primary" intensity="light" />
            ))}
          </View>
        </View>
      )}
      {/* Informations supplémentaires */}
      <View style={[styles.footer, { borderTopColor: theme.border.light, borderTopWidth: 1 }]}>
        {/* Stock */}
        <InfoRow label={t("pill.stock")} value={pill.stockQuantity} valueStyle={isLowStock ? {color: theme.text.error} : {}} />
        {/* Durée minimale entre prises */}
        <InfoRow label={t("pill.minInterval")} value={`${pill.minHoursBetweenIntakes}h`} />
        {/* Durée du traitement */}
        {hasEndDate && <InfoRow label={t("pill.until")} value={pill.treatmentDuration.endDate?.toLocaleDateString(userLocale)} />}
      </View>
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
  },
});
