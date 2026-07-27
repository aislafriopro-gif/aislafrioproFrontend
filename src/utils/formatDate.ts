export type DateValue = Date | string | number;

const DEFAULT_DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
};

function createDate(value: DateValue): Date {
  if (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(value)
  ) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  return value instanceof Date ? value : new Date(value);
}

export function formatDate(
  value: DateValue,
  options: Intl.DateTimeFormatOptions = DEFAULT_DATE_OPTIONS,
  locale = "es-PE",
): string {
  const date = createDate(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat(locale, options).format(date);
}