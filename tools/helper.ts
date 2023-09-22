import { twMerge } from 'tailwind-merge'
import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const entries = <T extends object>(obj: T) => {
  const array = []

  for (const key in obj) array.push(key)
  return array
}

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.substring(1)
}
