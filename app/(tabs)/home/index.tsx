import React from "react";

import { useT } from "@i18n/useT";
import {GlobalStyles} from "@constants/global-styles";
import SafeTopAreaThemedView from "@themedComponents/SafeTopAreaThemedView";
import ThemedText from "@themedComponents/ThemedText";

export default function index () {
  const t = useT();
  return (
    <SafeTopAreaThemedView style={[GlobalStyles.container, {justifyContent: "center", alignItems: "center"}]}>
      <ThemedText>{t("home.title")}</ThemedText>
    </SafeTopAreaThemedView>
  );
};
