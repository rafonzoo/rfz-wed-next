import type { State } from '@/type'
import { createContext } from 'react'

export function freezeWindow(freeze = false) {
  ;[document.documentElement, document.body].forEach((el) => {
    el.classList[freeze ? 'add' : 'remove']('overflow-hidden')
  })
}

export function contextCreator<T>(value: T) {
  return {
    context: createContext<State<T>>(undefined!),
    value,
  }
}

export function isObjectEqual(...obj: object[]) {
  const result = []

  for (let i = 0; i < obj.length; i++) {
    if (obj[i + 1]) {
      result.push(JSON.stringify(obj[i]) === JSON.stringify(obj[i + 1]))
    }
  }

  return result.every(Boolean)
}

export const entries = <T extends object>(obj: T) => {
  const array = []

  for (const key in obj) array.push(key)
  return array
}

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.substring(1)
}
