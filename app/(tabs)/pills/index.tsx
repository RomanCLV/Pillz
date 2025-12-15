import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import { useTheme } from "@hooks/useTheme";
import { usePills } from "@hooks/usePills";
import { PillCard } from "@components/pills/PillCard";
import TitlePage from "@components/TitlePage";
import SafeTopAreaThemedView from "@themedComponents/SafeTopAreaThemedView";
import ThemedButton from "@themedComponents/ThemedButton";
import ThemedText from "@themedComponents/ThemedText";
import { t } from "@i18n/t";
import AddIcon from "@icons/add.svg"
import NoPillsIcon from "@assets/icons/no-pills.svg"

export default function index () {
  const router = useRouter();
  const theme = useTheme();
  const { pills } = usePills();

  const handleAddPill = () => {
    router.push("/pills/edit");
  };

  const handlePillPress = (pillId: number) => {
    router.push(`/pills/edit?id=${pillId}`);
  };

  return (
    <SafeTopAreaThemedView style={styles.container}>
      {/* En-tête */}
      <View style={styles.header}>
        <TitlePage title={t("pills.title")} />
      </View>

      {/* Liste des médicaments */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent]}
        showsVerticalScrollIndicator={false}
      >
        {pills.length === 0 ? (
          <View style={styles.emptyState}>
            <NoPillsIcon width={128} height={128} color={theme.text.tertiary} opacity={0.5} />
            <ThemedText style={styles.emptyText}>
              {t("pills.noPills")}
            </ThemedText>
          </View>
        ) : (
          pills.map((pill, index) => (
            <PillCard
              key={index}
              pill={pill}
              onPress={() => handlePillPress(index)}
            />
          ))
        )}
        <ThemedButton
          onPress={handleAddPill}
          containerStyle={styles.addButton}
          icon={<AddIcon width={24} height={24} color={theme.text.onBrand} />}
        >
          {t("pills.addPill")}
        </ThemedButton>
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
  addButton: {
    marginTop: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
    padding: 16,
    paddingTop: 0,
    gap: 16,
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
