import { translations } from "@i18n/index";
import { useCurrentLanguage } from "@hooks/useCurrentLanguage";

export const t = (
  path: string,
  vars: Record<string, string | number> = {},
  pluralize: boolean = false
) => {
  const lang = useCurrentLanguage();
  const parts = path.split(".");

  let value: any = translations[lang];

  // Navigate to the translation node
  for (const p of parts) {
    if (value[p] === undefined) return path;
    value = value[p];
  }

  // Handle pluralization if requested
  if (pluralize) {
    const n = Number(vars["n"]);
    if (isNaN(n)) {
      console.warn(`t("${path}") called with pluralize=true but vars.n is missing or invalid.`);
      return path;
    }

    if (typeof value !== "object" || value.one === undefined || value.other === undefined) {
      console.warn(`t("${path}") called with pluralize=true but value is not a plural object.`);
      return path;
    }

    // Pick the right form
    value = n <= 1 ? value.one : value.other;
  }

  // Replace interpolations {key}
  if (typeof value === "string") {
    return value.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ""));
  }

  return path;
};
