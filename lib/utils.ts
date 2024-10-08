import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDateString(input: Date | undefined) {
  if (typeof input == 'undefined') input = new Date();

  let yearString = input.getFullYear().toString();
  let monthString = '0' + (input.getMonth() + 1).toString();
  let dayString = '0' + input.getDate().toString();

  monthString = monthString.slice(monthString.length - 2, monthString.length);
  dayString = dayString.slice(dayString.length - 2, dayString.length);
  return yearString + '-' + monthString + '-' + dayString;
}
