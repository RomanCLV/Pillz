// components/settings/SettingsSection.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import ThemedView from "@themedComponents/ThemedView";
import ThemedText from "@themedComponents/ThemedText";
import { useTheme } from "@hooks/useTheme";

type SettingsSectionProps = {
  title: string;
  children: React.ReactNode;
};

const SettingsSection: React.FC<SettingsSectionProps> = ({ title, children }) => {
  const theme = useTheme();

  return (
    <ThemedView style={[styles.section, { backgroundColor: theme.background.card }]}>
      <View style={[styles.sectionHeader, { backgroundColor: theme.background.secondary }]}>
        <ThemedText variant="tertiary" style={styles.sectionTitle}>
          {title}
        </ThemedText>
      </View>
      {children}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  section: {
    marginTop: 20,
    borderRadius: 12,
    marginHorizontal: 16,
    overflow: "hidden",
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },
});

export default SettingsSection;
