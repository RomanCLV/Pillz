// app/_layout.tsx

// Désactive l'auto enregistrement des push tokens (Expo Go SDK >=53)
(globalThis as any).__expo_push_token_auto_registration_disabled = true;

import React, { useEffect } from "react";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, useAppTheme } from "@context/ThemeContext";
import { LanguageProvider, useLanguage } from "@context/LanguageContext";
import { SettingsProvider } from "@context/SettingsContext";
import { DataProvider } from "@context/DataContext";
import { initNotifications } from "@services/notifications.service";

const RootLayoutContent = () => {
  const { theme } = useAppTheme();
  const { language } = useLanguage();

  useEffect(() => {
    initNotifications(language);
  }, [language]);

  return (
    <>
      <StatusBar style={theme.isDark ? "light" : "dark"} />
      <Slot /> 
    </>
  );
};

export default function RootLayout() {
  return (
    <SettingsProvider>
      <DataProvider>
        <ThemeProvider>
          <LanguageProvider>
            <RootLayoutContent />
          </LanguageProvider>
        </ThemeProvider>
      </DataProvider>
    </SettingsProvider>
  );
}
