import { translations } from "@i18n/index";
import { useCurrentLanguage } from "@hooks/useCurrentLanguage";

export const t = (path: string, vars: Record<string, string | number> = {}) => {
  const lang = useCurrentLanguage();
  const parts = path.split(".");

  let value: any = translations[lang];

  for (const p of parts) {
    if (value[p] === undefined) return path;
    value = value[p];
  }

  if (typeof value === "string") {
    return value.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ""));
  }

  return path;
};
