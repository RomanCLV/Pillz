import fr from "./languages/fr";
import en from "./languages/en";
import es from "./languages/es";
import de from "./languages/de";
import it from "./languages/it";

import type { LanguageCode, LanguageSet } from "./types";

export const translations: Record<LanguageCode, LanguageSet> = {
  fr,
  en,
  es,
  de,
  it,
};
