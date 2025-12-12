import React from "react"
import { StyleSheet, ViewStyle } from "react-native"
import { useRouter } from "expo-router"
import ThemedButton from "@components/themedComponents/ThemedButton"

type HeaderButtonProps = {
    icon: React.ReactNode;
    style?: ViewStyle;
    onPress?: () => void;
}

const HeaderButton: React.FC<HeaderButtonProps> = ({
    icon,
    style,
    onPress,
}) => {
  return <ThemedButton
    variant="ghost"
    size="small"
    onPress={onPress}
    style={[styles.backButton, style]}
  >
    {icon}
  </ThemedButton>
}

export default HeaderButton;

const styles = StyleSheet.create({
  backButton: {
    width: 40,
    paddingHorizontal: 0,
  },
});
