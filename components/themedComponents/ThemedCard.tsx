import React, { useRef } from "react";
import { View, ViewProps, StyleProp, ViewStyle, Pressable, Animated } from "react-native";
import { useTheme } from "@hooks/useTheme";

type ThemedCardProps = ViewProps & {
  style?: StyleProp<ViewStyle>;
  /** Rend la card cliquable avec animation */
  pressable?: boolean;
  /** Callback appelé lors du clic */
  onPress?: () => void;
  /** Active l'animation de scale au press (défaut: true) */
  animateScale?: boolean;
  /** Active l'animation d'opacité au press (défaut: true) */
  animateOpacity?: boolean;
  /** Valeur du scale en état pressé (défaut: 0.97) */
  pressedScale?: number;
  /** Valeur de l'opacité en état pressé (défaut: 0.7) */
  pressedOpacity?: number;
};

const ThemedCard: React.FC<ThemedCardProps> = ({ 
  style, 
  pressable = false,
  onPress,
  animateScale = true,
  animateOpacity = true,
  pressedScale = 0.97,
  pressedOpacity = 0.7,
  children,
  ...props 
}) => {
  const theme = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const cardStyle = {
    backgroundColor: theme.background.card,
    padding: 16,
    borderRadius: 8,
    boxShadow: `0 2px 4px ${theme.background.shadow}`,
    // iOS
    shadowColor: theme.background.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
  };

  const handlePressIn = () => {
    const animations = [];
    
    if (animateScale) {
      animations.push(
        Animated.spring(scaleAnim, {
          toValue: pressedScale,
          useNativeDriver: true,
          speed: 50,
          bounciness: 4,
        })
      );
    }
    
    if (animateOpacity) {
      animations.push(
        Animated.timing(opacityAnim, {
          toValue: pressedOpacity,
          duration: 100,
          useNativeDriver: true,
        })
      );
    }

    if (animations.length > 0) {
      Animated.parallel(animations).start();
    }
  };

  const handlePressOut = () => {
    const animations = [];
    
    if (animateScale) {
      animations.push(
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          speed: 50,
          bounciness: 4,
        })
      );
    }
    
    if (animateOpacity) {
      animations.push(
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        })
      );
    }

    if (animations.length > 0) {
      Animated.parallel(animations).start();
    }
  };

  // Card non-pressable (comportement par défaut)
  if (!pressable || !onPress) {
    return (
      <View
        {...props}
        style={[cardStyle, style]}
      >
        {children}
      </View>
    );
  }

  // Card pressable avec animations
  return (
    <Pressable 
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        {...props}
        style={[
          cardStyle,
          {
            transform: animateScale ? [{ scale: scaleAnim }] : undefined,
            opacity: animateOpacity ? opacityAnim : undefined,
          },
          style
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
};

export default ThemedCard;