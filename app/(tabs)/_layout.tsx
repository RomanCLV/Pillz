// app/(tabs)/_layout.tsx
import React from "react";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useAppTheme } from "../../context/ThemeContext";

export default function TabsLayout() {
  const { theme } = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.text.primary,
        tabBarStyle: { backgroundColor: theme.background.secondary, },
        headerStyle: { backgroundColor: theme.background.primary, },
        headerTintColor: theme.text.primary,
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={focused ? "calendar-check" : "calendar-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="pills/index"
        options={{
          title: "Pills",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={"pill"}
              //name={focused ? "capsule" : "pill"}
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="history/index"
        options={{
          title: "History",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={
                focused
                  ? "chart-timeline-variant-shimmer"
                  : "chart-timeline-variant"
              }
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="settings/index"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={focused ? "cog" : "cog-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
