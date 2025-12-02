// app/(tabs)/_layout.tsx
import React from "react";
import { Tabs } from "expo-router";

import CalendarIcon from "@assets/icons/calendar.svg";
import PillsIcon from "@assets/icons/pills.svg";
import SettingsIcon from "@assets/icons/settings.svg";
import TimeIcon from "@assets/icons/time.svg";
import { useTheme } from "@hooks/useTheme";

export default function TabsLayout() {
  const theme = useTheme();
  
  return (
    <Tabs
      screenOptions={{
        sceneStyle: {backgroundColor: theme.background.primary, },
        tabBarInactiveTintColor: theme.text.secondary,
        tabBarActiveTintColor: theme.brand.secondary,
        tabBarStyle: { 
          backgroundColor: theme.background.secondary,
          borderTopWidth: 0,
        },
        headerShown: false,
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Quotidien",
          tabBarIcon: ({ color, size }) => <TimeIcon width={size-2} height={size-2} color={color} />,
        }}
      />
      <Tabs.Screen
        name="pills"
        options={{
          title: "Médicaments",
          tabBarIcon: ({ color, size }) => <PillsIcon width={size} height={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "Suivi",
          tabBarIcon: ({ color, size }) => <CalendarIcon width={size} height={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Paramètres",
          tabBarIcon: ({ color, size }) => <SettingsIcon width={size} height={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
