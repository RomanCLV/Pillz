// components/themedComponents/ThemedSwitch.tsx
import React from "react";
import { Switch, SwitchProps } from "react-native";
import { useTheme } from "../../hooks/useTheme";

type ThemedSwitchProps = SwitchProps;

const ThemedSwitch: React.FC<ThemedSwitchProps> = ({ ...props }) => {
  const theme = useTheme();

  return (
    <Switch
      {...props}
      trackColor={{
        false: theme.border.light,
        true: theme.brand.primary,
      }}
      thumbColor={theme.isDark ? theme.background.inverse : theme.background.surface}
      ios_backgroundColor={theme.border.light}
    />
  );
};

export default ThemedSwitch;
