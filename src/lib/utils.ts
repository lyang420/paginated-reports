import { clsx, type ClassValue } from "clsx";
import { isValid, parse } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export function tryParseDateString(dateStr: string): Date | null {
   const formats = [
      "yyyy-MM-dd",
      "MM/dd/yyyy",
      "M/d/yyyy",
      "MM-dd-yyyy",
      "M-d-yyyy"
   ];
   for (const formatStr of formats) {
      try {
         const parsedDate = parse(dateStr, formatStr, new Date());
         if (isValid(parsedDate)) {
            return parsedDate;
         }
      } catch {
         continue;
      }
   }
   const fallbackDate = new Date(dateStr);
   if (isValid(fallbackDate)) {
      return fallbackDate;
   }
   return null;
}

export function parseDateString(dateStr: string): Date {
   const parsedDate = tryParseDateString(dateStr);
   if (parsedDate === null) {
      throw new Error(`Invalid date string: ${dateStr}`);
   }
   return parsedDate;
}
