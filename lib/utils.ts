import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addCommas(x: number | string): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
