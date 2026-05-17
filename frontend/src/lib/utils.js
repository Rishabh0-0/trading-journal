import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes with clsx for conditional class names.
 * This is the standard shadcn/ui utility pattern.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as Indian Rupee currency.
 * @param {number} value — The amount to format.
 * @param {number} [decimals=0] — Maximum fraction digits.
 */
export function formatINR(value, decimals = 0) {
  if (value == null) return '—';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: decimals,
  }).format(value);
}
