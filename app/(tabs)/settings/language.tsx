// app/(tabs)/settings/language.tsx
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import SafeTopAreaThemedView from "@components/themedComponents/SafeTopAreaThemedView";
import ThemedText from "@themedComponents/ThemedText";
import SettingsHeader from "@components/settings/SettingsHeader";
import SelectionList, { SelectionOption } from "@components/settings/SelectionList";
import { useTheme } from "@hooks/useTheme";

type LanguageCode = "fr" | "en" | "es" | "de" | "it";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  flag: {
    fontSize: 24,
  },
  infoContainer: {
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
});

const LANGUAGES: SelectionOption<LanguageCode>[] = [
  { value: "fr", label: "Français", leftContent: <ThemedText style={styles.flag}>🇫🇷</ThemedText> },
  { value: "en", label: "English", leftContent: <ThemedText style={styles.flag}>🇬🇧</ThemedText> },
  { value: "es", label: "Español", leftContent: <ThemedText style={styles.flag}>🇪🇸</ThemedText> },
  { value: "de", label: "Deutsch", leftContent: <ThemedText style={styles.flag}>🇩🇪</ThemedText> },
  { value: "it", label: "Italiano", leftContent: <ThemedText style={styles.flag}>🇮🇹</ThemedText> },
];

export default function LanguageSettingsScreen() {
  const theme = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>("fr");

  return (
    <SafeTopAreaThemedView style={{ flex: 1 }}>
      <View style={[styles.container, { backgroundColor: theme.background.primary }]}>
        <SettingsHeader title="Langue" />

        <SelectionList
          options={LANGUAGES}
          selectedValue={selectedLanguage}
          onSelect={setSelectedLanguage}
          showSelectedIcon={false}
        />

        <View style={styles.infoContainer}>
          <ThemedText variant="secondary" style={styles.infoText}>
            La langue sélectionnée sera appliquée à l'ensemble de l'application.
          </ThemedText>
        </View>
      </View>
    </SafeTopAreaThemedView>
  );
}
