import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const summation = (arr: number[]): number => {
  let sum: number = 0;
  for (let i: number = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
};
