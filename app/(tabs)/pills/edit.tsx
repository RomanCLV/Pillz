import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

import SafeTopAreaThemedView from "@components/themedComponents/SafeTopAreaThemedView";
import ThemedText from "@themedComponents/ThemedText";
import Spacer from "@components/Spacer";
import ThemedButton from "@components/themedComponents/ThemedButton";
import {GlobalStyles} from "@constants/global-styles";
import { t } from "@i18n/t";

export default function index () {
  const router = useRouter();
  const {id} = useLocalSearchParams();

  return (
    <SafeTopAreaThemedView style={[GlobalStyles.container, {justifyContent: "center", alignItems: "center"}]}>
      <ThemedText>{id ?? "New"}</ThemedText>
      <Spacer />
      <ThemedButton onPress={() => router.back() }>
        {t("navigation.back")}
      </ThemedButton>
    </SafeTopAreaThemedView>
  );
};
