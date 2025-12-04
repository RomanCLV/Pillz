// app/(tabs)/settings/index.tsx
import React, { useState } from "react";
import { StyleSheet, ScrollView, View, Linking } from "react-native";
import { useRouter } from "expo-router";
import SafeTopAreaThemedView from "@components/themedComponents/SafeTopAreaThemedView";
import SettingsSection from "@components/settings/SettingsSection";
import SettingsItem from "@components/settings/SettingsItem";
import SettingsHeader from "@components/settings/SettingsHeader";
import ThemedText from "@themedComponents/ThemedText";
import { useTheme } from "@hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { t } from "@i18n/t";
import Spacer from "@components/Spacer";

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
        <SettingsHeader title={t("settings.title")} showBack={false}/>
        <Spacer height={24}/>

        {/* Section Notifications */}
        <SettingsSection title={t("settings.notifications.title").toUpperCase()}>
          <SettingsItem
            icon={({color, size}) => <Ionicons name="notifications-outline" color={color} size={size} />}
            label={t("settings.notifications.pushNotifications")}
            rightElement="switch"
            switchValue={notifications}
            onSwitchChange={setNotifications}
          />
        </SettingsSection>
        <Spacer height={20}/>

        {/* Section Préférences */}
        <SettingsSection title={t("settings.preferences.title").toUpperCase()}>
          <SettingsItem
            icon={({color, size}) => <Ionicons name="contrast-outline" color={color} size={size} />}
            label={t("settings.preferences.theme")}
            rightElement="value"
            value={t("settings_theme.system")} // a rendre dynamique
            onPress={() => router.push("settings/theme")}
          />
          <SettingsItem
            icon={({color, size}) => <Ionicons name="language-outline" color={color} size={size} />}
            label={t("settings.preferences.language")}
            rightElement="value"
            value={t("settings_language.fr")} // a rendre dynamique
            onPress={() => router.push("settings/language")}
          />
        </SettingsSection>
        <Spacer height={20}/>

        {/* Section Aide & Support */}
        <SettingsSection title={t("settings.help.title").toUpperCase()}>
          <SettingsItem
            icon={({color, size}) => <Ionicons name="chatbubble-outline" color={color} size={size} />}
            label={t("settings.help.contactUs")}
            rightElement="chevron"
            onPress={handleContactPress}
          />
        </SettingsSection>

        {/* Version */}
        <View style={styles.versionContainer}>
          <ThemedText variant="tertiary" style={styles.versionText}>
            {t("settings.version", { version: "1.0.0" })}
          </ThemedText>
        </View>
      </ScrollView>
    </SafeTopAreaThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  versionContainer: {
    alignItems: "center",
    paddingVertical: 30,
  },
  versionText: {
    fontSize: 12,
  },
});
