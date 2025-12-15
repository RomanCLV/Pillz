import React from "react"
import { StyleSheet, ViewStyle } from "react-native"
import ThemedButton from "@themedComponents/ThemedButton"

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
    containerStyle={{ width: 40 }}
    buttonStyle={{ paddingHorizontal: 0 }}
  >
    {icon}
  </ThemedButton>
}

export default HeaderButton;
