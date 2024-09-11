import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, isToday, isYesterday } from "date-fns";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

//CURRENT YEAR EXTACTOR FUNCTION
export default function extractYear() {
  let date = new Date();
  return date.getFullYear();
}

//FUNCTION THAT FORMATE DATA TO HUMAN READABLE FORMAT
export const dateFormat = (date) => {
  if (!date) return "";

  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) return "";

  if (isToday(parsedDate)) {
    return `Today ${format(parsedDate, "p")}`;
  } else if (isYesterday(parsedDate)) {
    return `Yesterday ${format(parsedDate, "p")}`;
  } else if (parsedDate > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
    // Check if the date is within the last 7 days
    return `${format(parsedDate, "EEEE p")}`; // Returns the day of the week with time
  }

  return format(parsedDate, "MM/dd/yyyy p"); // Default format if date is older than 7 days
};


