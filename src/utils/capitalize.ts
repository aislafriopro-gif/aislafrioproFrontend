export function capitalize(
  value: string,
  locale = "es-PE",
): string {
  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return "";
  }

  return (
    normalizedValue.charAt(0).toLocaleUpperCase(locale) +
    normalizedValue.slice(1)
  );
}