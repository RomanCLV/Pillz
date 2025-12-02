import React from "react";
import { View, ViewProps, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "../../hooks/useTheme";

type ThemedViewProps = ViewProps & {
  style?: StyleProp<ViewStyle>;
};

const ThemedCard : React.FC<ThemedViewProps> = ({ style, ...props }) => {
  const theme = useTheme();
  return (
    <View
      {...props}
      style={[{
        backgroundColor: theme.background.card,
        marginVertical: 8,
        padding: 16,
        borderRadius: 8,
        boxShadow: `0 2px 4px ${theme.background.shadow}`,
        // iOS
        shadowColor: theme.background.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 4,
        // Android
        elevation: 4,
        },
        style]}
    />
  );
}

export default ThemedCard;
