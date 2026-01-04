import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useTheme } from "@hooks/useTheme";
import ThemedText from "@themedComponents/ThemedText";
import CloseIcon from "@icons/close.svg"

interface StockWarningCardProps {
  message: string;
  type: "warning" | "error";
  onDismiss?: () => void;
}

export default function StockWarningCard({ message, type, onDismiss }: StockWarningCardProps) {
  const theme = useTheme();
  
  const backgroundColor = (type === "error" ? theme.brand.errorLight : theme.brand.accentLight) + "60";
  const borderColor = (type === "error" ? theme.brand.errorLight : theme.brand.accentLight) + "A0";
  const textColor = type === "error" ? (theme.isDark ? theme.brand.errorLight : theme.brand.error) : (theme.isDark ? theme.brand.accentLight : theme.brand.accent);

  return (
    <View style={[styles.container, { backgroundColor, borderColor, borderWidth: 1 }]}>
      <ThemedText style={[styles.message, { color: textColor }]}>
        {message}
      </ThemedText>
      {onDismiss && (
        <TouchableOpacity onPress={onDismiss} style={styles.closeButton}>
          <CloseIcon width={20} height={20} color={textColor} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  message: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    marginRight: 8,
  },
  closeButton: {
    padding: 4,
  },
});