/**
 * Retourne le premier jour de la semaine pour une locale
 * 0 = dimanche, 1 = lundi
 */
export const getFirstDayOfWeek = (locale: string): number => {
  try {
    // API moderne
    // @ts-ignore – weekInfo peut ne pas être encore typé partout
    const weekInfo = new Intl.Locale(locale).weekInfo;
    if (weekInfo?.firstDay !== undefined) {
      return weekInfo.firstDay;
    }
  }
  catch {
    // ignore
  }

  // ─────────────────────────────────────────────
  // Fallback simple et sûr
  // ─────────────────────────────────────────────

  if (locale.startsWith("en-US") || locale.startsWith("en-CA")) {
    return 0; // dimanche
  }

  return 1; // lundi par défaut (Europe, monde)
};
