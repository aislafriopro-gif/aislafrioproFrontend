"use client";

import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const safeDelay = Math.max(0, delay);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(value);
    }, safeDelay);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [value, safeDelay]);

  return debouncedValue;
}