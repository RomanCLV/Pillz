export const pluralize = (
  count: number,
  forms: { one: string; other: string }
) => {
  return count === 1 ? forms.one : forms.other.replace("{n}", String(count));
};
