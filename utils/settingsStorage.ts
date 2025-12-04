import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "app-settings";

export type SettingsData = {
  pushNotifications: boolean;
};

const DEFAULT_SETTINGS: SettingsData = {
  pushNotifications: true,
};

export async function loadSettings(): Promise<SettingsData> {
  try {
    const json = await AsyncStorage.getItem(KEY);
    return json ? JSON.parse(json) : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(data: SettingsData): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(data));
  } catch {}
}
