import React from "react";
import { View, StyleSheet, ViewStyle, TouchableOpacity } from "react-native";
import ThemedText from "@components/themedComponents/ThemedText";

interface GenericHeaderProps {
  title: string;
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  style?: ViewStyle;
}

export default function GenericHeader({
  title,
  leftButton,
  rightButton,
  onLeftPress,
  onRightPress,
  style,
}: GenericHeaderProps) {

  return (
    <View style={[styles.header, style]}>
      {/* Icône gauche */}
      <View style={styles.iconContainer}>
        {leftButton && onLeftPress ? (
          <TouchableOpacity onPress={onLeftPress} activeOpacity={0.7}>
            {leftButton}
          </TouchableOpacity>
        ) : leftButton ? leftButton : <View style={styles.placeholder} />}
      </View>

      {/* Titre */}
      <ThemedText style={styles.title}>{title}</ThemedText>

      {/* Icône droite */}
      <View style={styles.iconContainer}>
        {rightButton && onRightPress ? (
          <TouchableOpacity onPress={onRightPress} activeOpacity={0.7}>
            {rightButton}
          </TouchableOpacity>
        ) : rightButton ? rightButton : <View style={styles.placeholder} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 40
  },
  iconContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  placeholder: {
    width: 40,
  },
});
