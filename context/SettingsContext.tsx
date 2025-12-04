import React, { createContext, useContext, useEffect, useState } from "react";
import { loadSettings, saveSettings, SettingsData } from "../utils/settingsStorage";

type SettingsContextValue = {
  settings: SettingsData | null;
  update: <K extends keyof SettingsData>(key: K, value: SettingsData[K]) => void;
  loaded: boolean; // indique quand tout est chargé
};

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await loadSettings();
      setSettings(data);
      setLoaded(true);
    })();
  }, []);

  const update = <K extends keyof SettingsData>(key: K, value: SettingsData[K]) => {
    if (!settings) return;
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  return (
    <SettingsContext.Provider value={{ settings, update, loaded }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error("useSettings must be used inside SettingsProvider");
  }
  return ctx;
};
