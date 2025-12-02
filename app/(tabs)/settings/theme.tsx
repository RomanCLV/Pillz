import React from "react";
import { useRouter } from "expo-router";

import SafeTopAreaThemedView from "@components/themedComponents/SafeTopAreaThemedView";
import ThemedText from "@themedComponents/ThemedText";
import Spacer from "@components/Spacer";
import ThemedButton from "@components/themedComponents/ThemedButton";
import {GlobalStyles} from "@constants/global-styles";

export default function index () {
  const router = useRouter();
  return (
    <SafeTopAreaThemedView style={[GlobalStyles.container, {justifyContent: "center", alignItems: "center"}]}>
      <ThemedText>This is the theme page.</ThemedText>
      <Spacer />
      <ThemedButton onPress={() => router.back() }>
        Retour
      </ThemedButton>
    </SafeTopAreaThemedView>
  );
};
