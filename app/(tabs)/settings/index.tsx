// app/(tabs)/settings/index.tsx
import React, { useState } from "react";
import { StyleSheet, ScrollView, View, Linking } from "react-native";
import { useRouter } from "expo-router";
import SafeTopAreaThemedView from "@components/themedComponents/SafeTopAreaThemedView";
import ThemedText from "@themedComponents/ThemedText";
import SettingsSection from "@components/settings/SettingsSection";
import SettingsItem from "@components/settings/SettingsItem";
import { useTheme } from "@hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen() {
  const router = useRouter();
  const theme = useTheme();
  const [notifications, setNotifications] = useState(true);

  const handleContactPress = () => {
    Linking.openURL("mailto:roman.clavier.2001@gmail.com");
  };

  return (
    <SafeTopAreaThemedView style={{ flex: 1 }}>
      <ScrollView style={[styles.container, { backgroundColor: theme.background.primary }]}>
        {/* Section Notifications */}
        <SettingsSection title="NOTIFICATIONS">
          <SettingsItem
            icon={({color, size}) => <Ionicons name="notifications-outline" color={color} size={size} />}
            label="Notifications push"
            rightElement="switch"
            switchValue={notifications}
            onSwitchChange={setNotifications}
          />
        </SettingsSection>

        {/* Section Préférences */}
        <SettingsSection title="PRÉFÉRENCES">
          <SettingsItem
            icon={({color, size}) => <Ionicons name="contrast-outline" color={color} size={size} />}
            label="Thème"
            rightElement="value"
            value="Système"
            onPress={() => router.push("settings/theme")}
          />
          <SettingsItem
            icon={({color, size}) => <Ionicons name="language-outline" color={color} size={size} />}
            label="Langue"
            rightElement="value"
            value="Français"
            onPress={() => router.push("settings/language")}
          />
        </SettingsSection>

        {/* Section Aide & Support */}
        <SettingsSection title="AIDE & SUPPORT">
          <SettingsItem
            icon={({color, size}) => <Ionicons name="chatbubble-outline" color={color} size={size} />}
            label="Nous contacter"
            rightElement="chevron"
            onPress={handleContactPress}
          />
        </SettingsSection>

        {/* Version */}
        <View style={styles.versionContainer}>
          <ThemedText variant="tertiary" style={styles.versionText}>
            Version 1.0.0
          </ThemedText>
        </View>
      </ScrollView>
    </SafeTopAreaThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  versionContainer: {
    alignItems: "center",
    paddingVertical: 30,
  },
  versionText: {
    fontSize: 12,
  },
});
