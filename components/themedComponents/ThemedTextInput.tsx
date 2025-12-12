import React, { useState } from "react";
import { TextInput, TextInputProps, StyleSheet } from "react-native";
import { useTheme } from "@hooks/useTheme";

interface ThemedTextInputProps extends Omit<TextInputProps, "onChangeText"> {
  value: string;
  onChangeText: (text: string) => void;
  type?: "text" | "number";
}

export default function ThemedTextInput({
  value,
  onChangeText,
  type = "text",
  style,
  ...props
}: ThemedTextInputProps) {
  const theme = useTheme();
  const [localValue, setLocalValue] = useState(value);

  // Gestion locale pour éviter les re-renders du parent
  const handleChangeText = (text: string) => {
    setLocalValue(text);
  };

  // Mise à jour du parent uniquement sur blur
  const handleBlur = () => {
    if (type === "number") {
      // Pour les nombres, on accepte la chaîne vide
      if (localValue === "") {
        onChangeText("");
      } 
      else {
        const num = parseFloat(localValue);
        if (!isNaN(num) && num >= 0) {
          onChangeText(localValue);
        } 
        else {
          // Si invalide, on restaure la valeur précédente
          setLocalValue(value);
        }
      }
    } 
    else {
      onChangeText(localValue);
    }
  };

  // Synchroniser localValue avec value (changement externe)
  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <TextInput
      {...props}
      value={localValue}
      onChangeText={handleChangeText}
      onBlur={handleBlur}
      style={[
        styles.input,
        {
          backgroundColor: theme.background.surface,
          color: theme.text.primary,
          borderColor: theme.border.light,
        },
        style,
      ]}
      placeholderTextColor={theme.text.tertiary}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
});
