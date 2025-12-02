import React from "react";
import { Stack } from "expo-router";
import { useTheme } from "@hooks/useTheme";

export default function PillsLayout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="edit" />
    </Stack>
  );
}
