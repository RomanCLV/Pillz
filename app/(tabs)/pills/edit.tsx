import React from "react";
import { useRouter } from "expo-router";

import SafeTopAreaThemedView from "@components/themedComponents/SafeTopAreaThemedView";
import ThemedText from "@themedComponents/ThemedText";
import Spacer from "@components/Spacer";
import ThemedButton from "@components/themedComponents/ThemedButton";
import {GlobalStyles} from "@constants/global-styles";
import { t } from "@i18n/t";

export default function index () {
  const router = useRouter();
  return (
    <SafeTopAreaThemedView style={[GlobalStyles.container, {justifyContent: "center", alignItems: "center"}]}>
      <ThemedText>{t("pills_edit.welcome")}</ThemedText>
      <Spacer />
      <ThemedButton onPress={() => router.back() }>
        {t("navigation.back")}
      </ThemedButton>
    </SafeTopAreaThemedView>
  );
};
