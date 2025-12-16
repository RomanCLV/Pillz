import { translate } from "@i18n/t";
import { useCurrentLanguage } from "./useCurrentLanguage";

export const useT = () => {
  const lang = useCurrentLanguage();
  return (path: string, vars: Record<string, string | number> = {}, pluralize: boolean = false) =>
    translate(lang, path, vars, pluralize);
};