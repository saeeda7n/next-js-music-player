import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSecondToMinutes(time = 0) {
  const minutes = `${~~(time / 60)}`.padStart(2, "0");
  const seconds = `${~~(time - +minutes * 60)}`.padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export async function Sleep(delay = 1000) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}
