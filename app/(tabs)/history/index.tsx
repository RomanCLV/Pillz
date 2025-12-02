import React from "react";

import SafeTopAreaThemedView from "@components/themedComponents/SafeTopAreaThemedView";
import ThemedText from "@themedComponents/ThemedText";
import {GlobalStyles} from "@constants/global-styles";

export default function index () {
  return (
    <SafeTopAreaThemedView style={[GlobalStyles.container, {justifyContent: "center", alignItems: "center"}]}>
      <ThemedText>This is the history page.</ThemedText>
    </SafeTopAreaThemedView>
  );
};
