import React from "react";

import SafeTopAreaThemedView from "@components/themedComponents/SafeTopAreaThemedView";
import ThemedText from "@themedComponents/ThemedText";
import {GlobalStyles} from "@constants/global-styles";
import { t } from "@i18n/t";

export default function index () {
  return (
    <SafeTopAreaThemedView style={[GlobalStyles.container, {justifyContent: "center", alignItems: "center"}]}>
      <ThemedText>{t("home.welcome")}</ThemedText>
    </SafeTopAreaThemedView>
  );
};
