import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, useAppTheme } from "../context/ThemeContext";
import { Colors } from "../constants/colors";

const LayoutContent = () => {
  const { theme } = useAppTheme();
  const isDarkBackground = theme.isDark; 

  return (
    <>
      <StatusBar style={isDarkBackground ? "light" : "dark"} /> 
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.background.primary },
          headerTintColor: Colors.brand.primary,
        }}
      >
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="settings" options={{ title: "Theme" }} />
      </Stack>
    </>
  );
};

export default function RootLayout() {
  return (
    <ThemeProvider>
      <LayoutContent />
    </ThemeProvider>
  );
}
