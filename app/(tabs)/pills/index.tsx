import React from "react";

import SafeTopAreaThemedView from "@components/themedComponents/SafeTopAreaThemedView";
import ThemedButtonLink from "@components/themedComponents/ThemedButtonLink";
import ThemedText from "@themedComponents/ThemedText";
import Spacer from "@components/Spacer";
import {GlobalStyles} from "@constants/global-styles";

export default function index () {
  return (
    <SafeTopAreaThemedView style={[GlobalStyles.container, {justifyContent: "center", alignItems: "center"}]}>
      <ThemedText>This is the pills page.</ThemedText>
      <Spacer />
      <ThemedButtonLink href="pills/edit">
        Edit
      </ThemedButtonLink>
    </SafeTopAreaThemedView>
  );
};
