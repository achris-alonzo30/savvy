import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertAmtFromMilUnits(amount: number) {
  return amount / 1000;
}

export function convertAmtToMilUnits(amount: number) {
  return Math.round(amount * 1000)
}