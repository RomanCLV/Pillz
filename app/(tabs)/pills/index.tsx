import React from "react";

import SafeTopAreaThemedView from "@components/themedComponents/SafeTopAreaThemedView";
import ThemedButtonLink from "@components/themedComponents/ThemedButtonLink";
import ThemedText from "@themedComponents/ThemedText";
import Spacer from "@components/Spacer";
import {GlobalStyles} from "@constants/global-styles";
import { t } from "@i18n/t";

export default function index () {
  return (
    <SafeTopAreaThemedView style={[GlobalStyles.container, {justifyContent: "center", alignItems: "center"}]}>
      <ThemedText>{t("pills.welcome")}</ThemedText>
      <Spacer />
      <ThemedButtonLink href="pills/edit">
        {t("pills.edit")}
      </ThemedButtonLink>
    </SafeTopAreaThemedView>
  );
};
