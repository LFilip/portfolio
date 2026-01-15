import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock localStorage for Zustand persist
// Vitest runs in Node.js which doesn't have browser APIs like localStorage.
// Zustand's persist middleware needs localStorage to save state, so we create a fake one.
const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

globalThis.localStorage = localStorageMock as Storage