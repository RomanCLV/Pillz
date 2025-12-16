import React from "react";

import SafeTopAreaThemedView from "@components/themedComponents/SafeTopAreaThemedView";
import { useT } from "@i18n/useT";
import {GlobalStyles} from "@constants/global-styles";
import ThemedText from "@themedComponents/ThemedText";

export default function index () {
  const t = useT();
  return (
    <SafeTopAreaThemedView style={[GlobalStyles.container, {justifyContent: "center", alignItems: "center"}]}>
      <ThemedText>{t("history.title")}</ThemedText>
    </SafeTopAreaThemedView>
  );
};
