import React from "react";
import { StyleSheet } from "react-native";
import { useAppTheme, ThemePreference } from "../context/ThemeContext";
import ThemedView from "../components/themedComponents/ThemedView";
import ThemedButton from "../components/themedComponents/ThemedButton";

const OPTION_LABELS: Record<ThemePreference, string> = {
  system: "System",
  light: "Light",
  dark: "Dark",
};

export default function SettingsScreen() {
  const { preference, setPreference, theme } = useAppTheme();
  const options: ThemePreference[] = ["system", "light", "dark"];

  return (
    <ThemedView
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: theme.background.primary,
      }}
    >
      {options.map((opt) => (
        <ThemedButton
          key={opt}
          variant={preference === opt ? "primary" : "ghost"}
          alignment="left"
          onPress={() => setPreference(opt)}
          style={[
            styles.button,
            preference !== opt && {
              backgroundColor: theme.background.secondary,
            },
          ]}
        >
          {OPTION_LABELS[opt]}
        </ThemedButton>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 12,
  },
});