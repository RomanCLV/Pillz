import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { useTheme } from "@hooks/useTheme";
import ThemedText from "@components/themedComponents/ThemedText";
import CloseIcon from "@icons/close.svg"

type ColorVariant = "primary" | "secondary" | "accent" | "error" | "highlight";
type IntensityVariant = "light" | "solid";

interface ChipProps {
  children: React.ReactNode;
  variant?: ColorVariant;
  intensity?: IntensityVariant;
  style?: ViewStyle;
  onPress?: () => void;
  onClose?: () => void;
}

export default function Chip({ 
  children, 
  variant = "primary", 
  intensity = "light",
  style,
  onPress,
  onClose,
}: ChipProps) {
  const theme = useTheme();

  const getColors = () => {
    // Intensité "solid" : couleur pleine avec texte blanc
    if (intensity === "solid") {
      switch (variant) {
        case "primary":
          return {
            background: theme.brand.primary,
            text: theme.text.onBrand,
          };
        case "secondary":
          return {
            background: theme.brand.secondary,
            text: theme.text.onBrand,
          };
        case "accent":
          return {
            background: theme.brand.accent,
            text: theme.text.onBrand,
          };
        case "error":
          return {
            background: theme.brand.error,
            text: theme.text.onBrand,
          };
        case "highlight":
          return {
            background: theme.background.highlight,
            text: theme.text.primary,
          };
        default:
          return {
            background: theme.brand.primary,
            text: theme.text.onBrand,
          };
      }
    }

    // Intensité "light" : couleur transparente avec texte coloré
    switch (variant) {
      case "primary":
        return {
          background: theme.brand.primary + "15",
          text: theme.brand.primary,
        };
      case "secondary":
        return {
          background: theme.brand.secondary + "15",
          text: theme.brand.secondary,
        };
      case "accent":
        return {
          background: theme.brand.accent + "15",
          text: theme.brand.accent,
        };
      case "error":
        return {
          background: theme.brand.error + "15",
          text: theme.brand.error,
        };
      case "highlight":
        return {
          background: theme.isDark 
            ? theme.background.highlight + "40" 
            : theme.background.highlight + "60",
          text: theme.text.secondary,
        };
      default:
        return {
          background: theme.brand.primary + "15",
          text: theme.brand.primary,
        };
    }
  };

  const colors = getColors();

  const chipContent = (
    <View
      style={[
        styles.chip,
        { backgroundColor: colors.background },
        style,
      ]}
    >
      {typeof children === 'string' || typeof children === 'number' ? (
        <ThemedText style={[styles.text, { color: colors.text }]}>
          {children}
        </ThemedText>
      ) : (
        <View style={styles.content}>
          {children}
        </View>
      )}
      {onClose && (
        <TouchableOpacity
          onPress={onClose}
          style={styles.closeButton}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <CloseIcon width={16} height={16} color={colors.text} />
        </TouchableOpacity>
      )}
    </View>
  );

  return onPress ?
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      {chipContent}
    </TouchableOpacity>
    :
    chipContent;
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  closeButton: {
    marginLeft: 4,
  },
});
