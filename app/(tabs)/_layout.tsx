// app/(tabs)/_layout.tsx
import React from "react";
import { Tabs } from "expo-router";
import { useAppTheme } from "../../context/ThemeContext";

import CalendarIcon from "@assets/icons/calendar.svg";
import PillsIcon from "@assets/icons/pills.svg";
import SettingsIcon from "@assets/icons/settings.svg";
import TimeIcon from "@assets/icons/time.svg";

export default function TabsLayout() {
  const { theme } = useAppTheme();
  
  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: theme.text.secondary,
        tabBarActiveTintColor: theme.brand.secondary,
        tabBarStyle: { backgroundColor: theme.background.secondary, },
        headerShown: false,
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Quotidien",
          tabBarIcon: ({ color, size }) => <TimeIcon width={size-2} height={size-2} color={color} />,
        }}
      />
      <Tabs.Screen
        name="pills/index"
        options={{
          title: "Médicaments",
          tabBarIcon: ({ color, size }) => <PillsIcon width={size} height={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="history/index"
        options={{
          title: "Suivi",
          tabBarIcon: ({ color, size }) => <CalendarIcon width={size} height={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          title: "Paramètres",
          tabBarIcon: ({ color, size }) => <SettingsIcon width={size} height={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
