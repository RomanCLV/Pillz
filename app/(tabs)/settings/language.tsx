// app/(tabs)/settings/language.tsx
import React from "react";
import { StyleSheet, View } from "react-native";

import SafeTopAreaThemedView from "@components/themedComponents/SafeTopAreaThemedView";
import SelectionList from "@components/settings/SelectionList";
import ThemedText from "@themedComponents/ThemedText";
import { useTheme } from "@hooks/useTheme";
import { useLanguage } from "@context/LanguageContext";
import { LANGUAGE_CODES, LANGUAGE_FLAGS } from "@i18n/types";
import { t } from "@i18n/t";
import Spacer from "@components/Spacer";
import BackHeader from "@components/headers/BackHeader";

export default function LanguageSettingsScreen() {
  const theme = useTheme();
  const {language, setLanguage} = useLanguage();

  const languagesOptions = LANGUAGE_CODES.map((langCode) => ({
    value: langCode,
    label: t(`settings_language.${langCode}`),
    leftContent: (
      <ThemedText style={{fontSize: 24}}>
        {LANGUAGE_FLAGS[langCode]}
      </ThemedText>
    ),
  }));

  return (
    <SafeTopAreaThemedView style={{ flex: 1 }}>
      <View style={[styles.container, { backgroundColor: theme.background.primary }]}>
        <BackHeader title={t("settings_language.title")} />
        <Spacer height={24}/>
        
        <SelectionList
          options={languagesOptions}
          selectedValue={language}
          onSelect={setLanguage}
          showSelectedIcon={false}
        />

        <View style={styles.infoContainer}>
          <ThemedText variant="secondary" style={styles.infoText}>
            {t("settings_language.description")}
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
