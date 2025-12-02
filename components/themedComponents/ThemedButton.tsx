import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useTheme } from "../../hooks/useTheme";

type ButtonVariant = "primary" | "secondary" | "accent" | "outline" | "ghost" | "error";
type ButtonSize = "small" | "medium" | "large";
type TextAlignment = "center" | "left" | "right";

type ThemedButtonProps = TouchableOpacityProps & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  alignment?: TextAlignment;
  loading?: boolean;
  children: React.ReactNode;
};

const ThemedButton: React.FC<ThemedButtonProps> = ({
  variant = "primary",
  size = "medium",
  alignment = "center",
  loading = false,
  disabled = false,
  style,
  children,
  ...props
}) => {
  const theme = useTheme();

  // Styles selon la variante
  const getVariantStyles = (): { container: ViewStyle; text: TextStyle } => {
    if (disabled) {
      return {
        container: {
          backgroundColor: theme.button.disabled.background,
        },
        text: {
          color: theme.button.disabled.text,
        },
      };
    }

    switch (variant) {
      case "primary":
        return {
          container: {
            backgroundColor: theme.button.primary.background,
          },
          text: {
            color: theme.button.primary.text,
          },
        };

      case "secondary":
        return {
          container: {
            backgroundColor: theme.button.secondary.background,
          },
          text: {
            color: theme.button.secondary.text,
          },
        };

      case "accent":
        return {
          container: {
            backgroundColor: theme.button.accent.background,
          },
          text: {
            color: theme.button.accent.text,
          },
        };

      case "error":
        return {
          container: {
            backgroundColor: theme.button.error.background,
          },
          text: {
            color: theme.button.error.text,
          },
        };

      case "outline":
        return {
          container: {
            backgroundColor: "transparent",
            borderWidth: 2,
            borderColor: theme.brand.primary,
          },
          text: {
            color: theme.brand.primary,
          },
        };

      case "ghost":
        return {
          container: {
            backgroundColor: "transparent",
          },
          text: {
            color: theme.text.primary,
          },
        };

      default:
        return {
          container: {
            backgroundColor: theme.button.primary.background,
          },
          text: {
            color: theme.button.primary.text,
          },
        };
    }
  };

  // Styles selon la taille
  const getSizeStyles = (): { container: ViewStyle; text: TextStyle } => {
    switch (size) {
      case "small":
        return {
          container: {
            paddingVertical: 8,
            paddingHorizontal: 16,
          },
          text: {
            fontSize: 14,
          },
        };

      case "medium":
        return {
          container: {
            paddingVertical: 12,
            paddingHorizontal: 24,
          },
          text: {
            fontSize: 16,
          },
        };

      case "large":
        return {
          container: {
            paddingVertical: 16,
            paddingHorizontal: 32,
          },
          text: {
            fontSize: 18,
          },
        };
    }
  };

  // Styles selon l'alignement du texte
  const getAlignmentStyle = (): ViewStyle  => {
    switch (alignment) {
      case "left":
        return  { justifyContent: "flex-start" } ;
      case "right":
        return  { justifyContent: "flex-end" } ;
      case "center":
      default:
        return  { justifyContent: "center" } ;
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();
  const alignmentStyle = getAlignmentStyle();

  return (
    <TouchableOpacity
      {...props}
      disabled={disabled || loading}
      style={[
        styles.container,
        variantStyles.container,
        sizeStyles.container,
        alignmentStyle,
        (disabled || loading) && styles.disabled,
        style,
      ]}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variantStyles.text.color}
          size={size === "small" ? "small" : "small"}
        />
      ) : (
        <Text
          style={[
            //styles.text,
            variantStyles.text,
            sizeStyles.text,
          ]}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    alignItems: "center",
    //justifyContent: "center",
    flexDirection: "row",
  },
  //text: {
  //  fontWeight: "600",
  //  textAlign: "center",
  //},
  disabled: {
    opacity: 0.6,
  },
});

export default ThemedButton;