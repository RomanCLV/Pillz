import React, { useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import * as Localization from "expo-localization";

import { useCurrentLanguage } from "@hooks/useCurrentLanguage";
import { useSummaries } from "@hooks/useSummaries";
import { useT } from "@i18n/useT";
import { DEFAULT_LANGUAGE_TAG, LOCALE_MAP } from "@i18n/types";
import { useTheme } from "@hooks/useTheme";
import { DailySummary } from "types/dailySummary";
import SafeTopAreaThemedView from "@themedComponents/SafeTopAreaThemedView";
import ThemedText from "@themedComponents/ThemedText";
import SwipeTabs, { SwipeTabItem } from "@components/SwipeTabs";
import HistoryDayCard from "@components/history/HistoryDayCard";

import NoIntakesIcon from "@icons/no-intakes.svg"

export default function index() {
  const t = useT();
  const theme = useTheme();
  const { summaries, getDayStats } = useSummaries();
  
  const currentLang = useCurrentLanguage();
  const userLocale = 
    (currentLang ? LOCALE_MAP[currentLang] : null) ?? 
    Localization.getLocales()[0]?.languageTag ?? DEFAULT_LANGUAGE_TAG;

  // Créer les onglets pour chaque jour
  const tabScreens: SwipeTabItem[] = useMemo(() => {
    if (summaries.length === 0) 
      return [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return summaries.map((summary: DailySummary) => {
      // summary.date attendu au format "YYYY-MM-DD"
      const [y, m, d] = summary.date.split("-").map(Number);
      const date = new Date(y, m - 1, d); // crée minuit local
      date.setHours(0, 0, 0, 0);

      const stats = getDayStats(summary.date);
      // Formater le jour de la semaine (ex: "lun.")
      const dayOfWeek = date.toLocaleDateString(userLocale, { weekday: "short" });
      // Formater la date (ex: "08/12")
      const dayMonth = date.toLocaleDateString(userLocale, { 
        day: "2-digit", 
        month: "2-digit" 
      });
      const isToday = today.getTime() === date.getTime();

      // Déterminer la couleur de l'indicateur en fonction des stats
      let indicatorColor: string = theme.brand.secondary;
      if (stats.total > 0) {
        if (stats.taken === stats.total) {
          indicatorColor = theme.brand.primary; // Tout pris
        }
        else if (stats.skipped > 0) {
          indicatorColor = theme.brand.error; // Au moins un oublié
        }
      }

      return {
        title: `${dayOfWeek}\n${dayMonth}`,
        indicatorStyle: { backgroundColor: indicatorColor },
        component: (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={[styles.contentContainer, summary.pills.length === 0 && { flex: 1 }]}
            showsVerticalScrollIndicator={false}
          >
            {/* Stats du jour */}
            <View style={styles.statsContainer}>
              <View style={[styles.statCard, { backgroundColor: theme.background.card }]}>
                <ThemedText style={[styles.statValue, { color: theme.brand.secondary }]}>
                  {stats.taken}
                </ThemedText>
                <ThemedText style={[styles.statLabel, { color: theme.text.tertiary }]}>
                  {t("history.taken")}
                </ThemedText>
              </View>
              
              <View style={[styles.statCard, { backgroundColor: theme.background.card }]}>
                <ThemedText style={[styles.statValue, { color: theme.brand.error }]}>
                  {stats.skipped}
                </ThemedText>
                <ThemedText style={[styles.statLabel, { color: theme.text.tertiary }]}>
                  {t("history.skipped")}
                </ThemedText>
              </View>
              
              { isToday && (stats.pending > 0) &&
              <View style={[styles.statCard, { backgroundColor: theme.background.card }]}>
                <ThemedText style={[styles.statValue, { color: theme.text.secondary }]}>
                  {stats.pending}
                </ThemedText>
                <ThemedText style={[styles.statLabel, { color: theme.text.tertiary }]}>
                  {t("history.pending")}
                </ThemedText>
              </View>
              }
            </View>

            {/* Liste des médicaments */}
            <View style={styles.pillsList}>
              {summary.pills.map((pill, index) => (
                <HistoryDayCard key={`${pill.name}-${index}`} pill={pill} />
              ))}
            </View>

            {summary.pills.length === 0 && (
              <View style={styles.emptyState}>
                <NoIntakesIcon width={128} height={128} color={theme.text.tertiary} opacity={0.5} />
                <ThemedText style={[styles.emptyText, { color: theme.text.tertiary }]}>
                  {t("history.noPills")}
                </ThemedText>
              </View>
            )}
          </ScrollView>
        ),
      };
    });
  }, [summaries, getDayStats, userLocale, theme, t]);

  if (summaries.length === 0) {
    return (
      <SafeTopAreaThemedView style={[styles.container, styles.emptyContainer]}>
        <ThemedText style={[styles.emptyText, { color: theme.text.tertiary }]}>
          {t("history.noHistory")}
        </ThemedText>
      </SafeTopAreaThemedView>
    );
  }

  return (
    <SafeTopAreaThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>{t("history.title")}</ThemedText>
      </View>
      <SwipeTabs
        screens={tabScreens}
        initialIndex={summaries.length - 1}
        showTabBar={true}
        tabBarPosition="top"
        showSelectedIndicator={true}
        tabBarStyle={{ 
          backgroundColor: theme.background.primary,
          borderBottomColor: theme.border.light 
        }}
        textStyle={{ color: theme.text.secondary }}
        activeTextStyle={{ color: theme.text.primary }}
      />
    </SafeTopAreaThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  pillsList: {
    gap: 12,
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  emptyState: {
    flex: 1,
    paddingVertical: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
  },
});
