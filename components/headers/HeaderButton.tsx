import React from "react"
import { StyleSheet, ViewStyle } from "react-native"
import { useRouter } from "expo-router"
import ThemedButton from "@components/themedComponents/ThemedButton"

type HeaderButtonProps = {
    icon: React.ReactNode,
    style?: ViewStyle
}

const HeaderButton: React.FC<HeaderButtonProps> = ({
    icon,
    style,
}) => {
  const router = useRouter()

  return <ThemedButton
    variant="ghost"
    size="small"
    onPress={() => router.back()}
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
