import React from "react";

import ThemedView from "@themedComponents/ThemedView";
import ThemedText from "@themedComponents/ThemedText";
import {GlobalStyles} from "@constants/global-styles";

export default function index () {
  return (
    <ThemedView style={GlobalStyles.container}>
      <ThemedText>This is the pills page.</ThemedText>
    </ThemedView>
  );
};
