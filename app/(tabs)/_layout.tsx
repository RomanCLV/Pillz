// app/(tabs)/_layout.tsx
import React from "react";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import CalendarIcon from "@assets/icons/calendar.svg";
import PillsIcon from "@assets/icons/pills.svg";
import SettingsIcon from "@assets/icons/settings.svg";
import TimeIcon from "@assets/icons/time.svg";
import { useTheme } from "@hooks/useTheme";

import {t} from "@i18n/t";

export default function TabsLayout() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  
  return (
    <Tabs
      screenOptions={{
        sceneStyle: {backgroundColor: theme.background.primary },
        tabBarInactiveTintColor: theme.text.secondary,
        tabBarActiveTintColor: theme.brand.secondary,
        tabBarStyle: { 
          backgroundColor: theme.background.secondary,
          borderTopWidth: 1,
          borderColor: theme.border.light + "10",
        },
        headerShown: false,
        tabBarShowLabel: true,
      }}
      safeAreaInsets={{...insets, bottom: insets.bottom * 1.1}}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: t("tabBar.daily"),
          tabBarIcon: ({ color, size }) => <TimeIcon width={size-2} height={size-2} color={color} />,
        }}
      />
      <Tabs.Screen
        name="pills"
        options={{
          title: t("tabBar.pills"),
          tabBarIcon: ({ color, size }) => <PillsIcon width={size} height={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: t("tabBar.history"),
          tabBarIcon: ({ color, size }) => <CalendarIcon width={size} height={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t("tabBar.settings"),
          tabBarIcon: ({ color, size }) => <SettingsIcon width={size} height={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
