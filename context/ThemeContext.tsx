import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Theme, Themes } from "../constants/colors";
import { useColorSchemeSafe } from "../hooks/useColorSchemeSafe";

export type ThemePreference = "system" | "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  preference: ThemePreference;
  setPreference: (value: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemScheme = useColorSchemeSafe();
  const [preference, setPreferenceState] = useState<ThemePreference>("system");
  const [isReady, setIsReady] = useState(false);

  const theme = Themes[preference === "system" ? systemScheme : preference];

  // Charger la préférence stockée au démarrage
  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem("theme-preference");
      if (stored === "light" || stored === "dark" || stored === "system") {
        setPreferenceState(stored);
      }
      setIsReady(true);
    })();
  }, []);

  const setPreference = async (value: ThemePreference) => {
    if (value === preference) return;
    setPreferenceState(value);
    await AsyncStorage.setItem("theme-preference", value);
  };

  return isReady ? (
    <ThemeContext.Provider value={{ theme, preference, setPreference }}>
      {children}
    </ThemeContext.Provider>
  ) : null;
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useAppTheme must be used inside ThemeProvider");
  return context;
};
