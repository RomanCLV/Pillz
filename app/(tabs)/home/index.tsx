import React from "react";

import { useT } from "@i18n/useT";
import SafeTopAreaThemedView from "@components/themedComponents/SafeTopAreaThemedView";
import ThemedText from "@themedComponents/ThemedText";
import {GlobalStyles} from "@constants/global-styles";

export default function index () {
  const t = useT();
  return (
    <SafeTopAreaThemedView style={[GlobalStyles.container, {justifyContent: "center", alignItems: "center"}]}>
      <ThemedText>{t("home.title")}</ThemedText>
    </SafeTopAreaThemedView>
  );
};
