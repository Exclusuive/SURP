import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimestamp(ms?: number): string {
  if (!ms || !Number.isFinite(ms)) return "—";
  try {
    const date = new Date(ms);
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  } catch {
    return "—";
  }
}

export function formatAmount(amount?: number): string {
  if (amount == null || !Number.isFinite(amount)) return "—";
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 6 }).format(
    amount
  );
}

export function toNumberOrUndefined(value: string | null): number | undefined {
  if (value == null) return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}
