import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import SafeTopAreaThemedView from "@components/themedComponents/SafeTopAreaThemedView";
import ThemedButton from "@components/themedComponents/ThemedButton";
import ThemedText from "@themedComponents/ThemedText";
import { t } from "@i18n/t";
import { DosageUnit, Pill } from "types/pill";
import { PillCard } from "@components/pills/PillCard";

// Données de test
const MOCK_PILLS: Pill[] = [
  {
    id: "1",
    name: "Doliprane",
    dosage: 1000,
    unit: DosageUnit.MG,
    schedules: [
      { hour: 8, minute: 0 },
      { hour: 14, minute: 0 },
      { hour: 20, minute: 0 },
    ],
    treatmentDuration: {
      startDate: new Date("2024-12-01"),
      endDate: null, // Pas de limite
    },
    minHoursBetweenIntakes: 4,
    stockQuantity: 24,
    reminderThreshold: 5,
  },
  {
    id: "2",
    name: "Vitamine D",
    dosage: 1,
    unit: DosageUnit.PILL,
    schedules: [
      { hour: 9, minute: 0 },
    ],
    treatmentDuration: {
      startDate: new Date("2024-11-15"),
      endDate: new Date("2025-02-15"),
    },
    minHoursBetweenIntakes: 24,
    stockQuantity: 18,
    reminderThreshold: 10,
  },
  {
    id: "3",
    name: "Sirop contre la toux",
    dosage: 1,
    unit: DosageUnit.TABLESPOON,
    schedules: [
      { hour: 7, minute: 30 },
      { hour: 13, minute: 30 },
      { hour: 19, minute: 30 },
    ],
    treatmentDuration: {
      startDate: new Date("2024-12-05"),
      endDate: new Date("2024-12-12"),
    },
    minHoursBetweenIntakes: 6,
    stockQuantity: 3,
    reminderThreshold: 5,
  },
  {
    id: "4",
    name: "Probiotiques",
    dosage: 2,
    unit: DosageUnit.SACHET,
    schedules: [
      { hour: 8, minute: 30 },
      { hour: 20, minute: 30 },
    ],
    treatmentDuration: {
      startDate: new Date("2024-12-01"),
      endDate: null,
    },
    minHoursBetweenIntakes: 12,
    stockQuantity: 30,
    reminderThreshold: 8,
  },
  {
    id: "5",
    name: "Phytoxil",
    dosage: 10,
    unit: DosageUnit.ML,
    schedules: [
      { hour: 8, minute: 30 },
      { hour: 12, minute: 30 },
      { hour: 20, minute: 30 },
    ],
    treatmentDuration: {
      startDate: new Date("2024-12-01"),
      endDate: null,
    },
    minHoursBetweenIntakes: 3,
    stockQuantity: 30,
    reminderThreshold: 0,
  },
];

export default function index () {
  const router = useRouter();

  const handleAddPill = () => {
    router.push("/pills/edit");
  };

  const handlePillPress = (pillId: string) => {
    router.push(`/pills/edit?id=${pillId}`);
  };

  return (
    <SafeTopAreaThemedView style={styles.container}>
      {/* En-tête */}
      <View style={styles.header}>
        <ThemedText style={styles.title}>{t("pills.title")}</ThemedText>
        <ThemedButton
          onPress={handleAddPill}
          style={styles.addButton}
        >
          {t("pills.addPill")}
        </ThemedButton>
      </View>

      {/* Liste des médicaments */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {MOCK_PILLS.length === 0 ? (
          <View style={styles.emptyState}>
            <ThemedText style={styles.emptyText}>
              {t("pills.noPills")}
            </ThemedText>
          </View>
        ) : (
          MOCK_PILLS.map((pill) => (
            <PillCard
              key={pill.id}
              pill={pill}
              onPress={() => handlePillPress(pill.id)}
            />
          ))
        )}
      </ScrollView>
    </SafeTopAreaThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  addButton: {
    alignSelf: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 0,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.5,
    textAlign: "center",
  },
});
