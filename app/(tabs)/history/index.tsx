import React from "react";

import SafeTopAreaThemedView from "@components/themedComponents/SafeTopAreaThemedView";
import ThemedText from "@themedComponents/ThemedText";
import {GlobalStyles} from "@constants/global-styles";
import { useT } from "@i18n/useT";

export default function index () {
  const t = useT();
  return (
    <SafeTopAreaThemedView style={[GlobalStyles.container, {justifyContent: "center", alignItems: "center"}]}>
      <ThemedText>{t("history.welcome")}</ThemedText>
    </SafeTopAreaThemedView>
  );
};
