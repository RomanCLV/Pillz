// app/(tabs)/settings/theme.tsx
import React from "react";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SafeTopAreaThemedView from "@components/themedComponents/SafeTopAreaThemedView";
import ThemedText from "@themedComponents/ThemedText";
import SettingsHeader from "@components/settings/SettingsHeader";
import SelectionList, { SelectionOption } from "@components/settings/SelectionList";
import { useAppTheme, ThemePreference } from "@context/ThemeContext";

const THEME_OPTIONS: SelectionOption<ThemePreference>[] = [
  { value: "system", label: "Système", icon: "phone-portrait-outline" },
  { value: "light", label: "Clair", icon: "sunny-outline" },
  { value: "dark", label: "Sombre", icon: "moon-outline" },
];

export default function ThemeSettingsScreen() {
  const { preference, setPreference, theme } = useAppTheme();

  const getDescription = () => {
    switch (preference) {
      case "system":
        return "Le thème s'adaptera automatiquement aux paramètres de votre appareil.";
      case "light":
        return "L'application utilisera toujours le thème clair.";
      case "dark":
        return "L'application utilisera toujours le thème sombre.";
    }
  };

  return (
    <SafeTopAreaThemedView style={{ flex: 1 }}>
      <View style={[styles.container, { backgroundColor: theme.background.primary }]}>
        <SettingsHeader title="Thème" />

        <SelectionList
          options={THEME_OPTIONS}
          selectedValue={preference}
          onSelect={setPreference}
          showSelectedIcon={false}
        />

        <View style={styles.descriptionContainer}>
          <ThemedText variant="secondary" style={styles.description}>
            {getDescription()}
          </ThemedText>
        </View>
      </View>
    </SafeTopAreaThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  descriptionContainer: {
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
});
