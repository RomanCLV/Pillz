// components/settings/SettingsHeader.tsx
import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ThemedText from "@themedComponents/ThemedText";
import ThemedButton from "@themedComponents/ThemedButton";
import { useTheme } from "@hooks/useTheme";

type SettingsHeaderProps = {
  title: string;
  showBack?: boolean;
  style?: ViewStyle;
};

const SettingsHeader: React.FC<SettingsHeaderProps> = ({ 
  title, 
  showBack = true,
  style
}) => {
  const router = useRouter();
  const theme = useTheme();

  return (
    <View style={[styles.header, !showBack && {paddingVertical: 7}, style]}>
      {showBack ? (
        <ThemedButton
          variant="ghost"
          size="small"
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color={theme.text.primary} />
        </ThemedButton>
      ) : (
        <View style={styles.placeholder} />
      )}
      <ThemedText variant="primary" style={styles.title}>
        {title}
      </ThemedText>
      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
    paddingHorizontal: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  placeholder: {
    width: 40,
  },
});

export default SettingsHeader;
