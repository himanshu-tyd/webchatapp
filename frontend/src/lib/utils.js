import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function extractYear(){
  let date=new Date()
  return date.getFullYear()
}
