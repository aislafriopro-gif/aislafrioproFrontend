export function isRequired(value: unknown): boolean {
  if (typeof value === "string") {
    return value.trim().length > 0;
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return value !== null && value !== undefined;
}

export function isValidEmail(value: string): boolean {
  const normalizedEmail = value.trim();

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);
}

export function isValidPhone(value: string): boolean {
  const normalizedPhone = value.replace(/[\s()-]/g, "");

  return /^\+?\d{7,15}$/.test(normalizedPhone);
}

export function hasMinLength(
  value: string,
  minLength: number,
): boolean {
  return value.trim().length >= Math.max(0, minLength);
}