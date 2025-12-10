import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { useTheme } from "@hooks/useTheme";

type ColorVariant = "primary" | "secondary" | "accent" | "error" | "highlight";
type IntensityVariant = "light" | "solid";

interface ChipIconProps {
  icon: (props: { color: string; size: number }) => React.ReactNode;
  variant?: ColorVariant;
  intensity?: IntensityVariant;
  size?: number;
  style?: ViewStyle;
  onPress?: () => void;
}

export function ChipIcon({
  icon,
  variant = "primary",
  intensity = "light",
  size = 40,
  style,
  onPress,
}: ChipIconProps) {
  const theme = useTheme();

  const getColors = () => {
    // Intensité "solid" : couleur pleine avec icône blanche
    if (intensity === "solid") {
      switch (variant) {
        case "primary":
          return {
            background: theme.brand.primary,
            icon: theme.text.onBrand,
          };
        case "secondary":
          return {
            background: theme.brand.secondary,
            icon: theme.text.onBrand,
          };
        case "accent":
          return {
            background: theme.brand.accent,
            icon: theme.text.onBrand,
          };
        case "error":
          return {
            background: theme.brand.error,
            icon: theme.text.onBrand,
          };
        case "highlight":
          return {
            background: theme.background.highlight,
            icon: theme.text.primary,
          };
        default:
          return {
            background: theme.brand.primary,
            icon: theme.text.onBrand,
          };
      }
    }

    // Intensité "light" : couleur transparente avec icône colorée
    switch (variant) {
      case "primary":
        return {
          background: theme.brand.primary + "15",
          icon: theme.brand.primary,
        };
      case "secondary":
        return {
          background: theme.brand.secondary + "15",
          icon: theme.brand.secondary,
        };
      case "accent":
        return {
          background: theme.brand.accent + "15",
          icon: theme.brand.accent,
        };
      case "error":
        return {
          background: theme.brand.error + "15",
          icon: theme.brand.error,
        };
      case "highlight":
        return {
          background: theme.isDark
            ? theme.background.highlight + "40"
            : theme.background.highlight + "60",
          icon: theme.text.secondary,
        };
      default:
        return {
          background: theme.brand.primary + "15",
          icon: theme.brand.primary,
        };
    }
  };

  const colors = getColors();
  const iconSize = size * 0.5; // L"icône fait 50% de la taille du cercle

  const chipContent = (
    <View
      style={[
        styles.chip,
        {
          backgroundColor: colors.background,
          width: size,
          height: size,
          borderRadius: size / 2, // Cercle parfait
        },
        style,
      ]}
    >
      {icon({ color: colors.icon, size: iconSize })}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {chipContent}
      </TouchableOpacity>
    );
  }

  return chipContent;
}

const styles = StyleSheet.create({
  chip: {
    justifyContent: "center",
    alignItems: "center",
  },
});
