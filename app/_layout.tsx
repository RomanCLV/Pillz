// app/_layout.tsx
import React from "react";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, useAppTheme } from "../context/ThemeContext";

const RootLayoutContent = () => {
  const { theme } = useAppTheme();
  return (
    <>
      <StatusBar style={theme.isDark ? "light" : "dark"} />
      <Slot /> 
    </>
  );
};

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutContent />
    </ThemeProvider>
  );
}
