import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useGameLoop } from './useGameLoop'
import { usePetStore } from '../stores/petStore'

describe('useGameLoop Hook', () => {
  beforeEach(() => {
    // Reset store and clear timers
    usePetStore.getState().reset()
    localStorage.clear()
    vi.clearAllTimers()
  })

  it('should drain stats over time', () => {
    vi.useFakeTimers()

    // Create a pet with full stats
    usePetStore.getState().createPet('TestPet', '🐱')

    // Render the hook
    renderHook(() => useGameLoop())

    const initialStats = usePetStore.getState().pet?.stats

    // Fast-forward 10 seconds
    vi.advanceTimersByTime(10000)

    const newStats = usePetStore.getState().pet?.stats

    // Stats should have decreased
    expect(newStats?.hunger).toBeLessThan(initialStats?.hunger || 100)
    expect(newStats?.happiness).toBeLessThan(initialStats?.happiness || 100)
    expect(newStats?.energy).toBeLessThan(initialStats?.energy || 100)

    vi.useRealTimers()
  })

  it('should drain hunger by 3 points every 10 seconds', () => {
    vi.useFakeTimers()

    usePetStore.getState().createPet('TestPet', '🐱')
    renderHook(() => useGameLoop())

    const initialHunger = usePetStore.getState().pet?.stats.hunger || 0

    vi.advanceTimersByTime(10000)

    const newHunger = usePetStore.getState().pet?.stats.hunger || 0

    expect(newHunger).toBe(initialHunger - 3)

    vi.useRealTimers()
  })

  it('should drain happiness by 2 points every 10 seconds', () => {
    vi.useFakeTimers()

    usePetStore.getState().createPet('TestPet', '🐱')
    renderHook(() => useGameLoop())

    const initialHappiness = usePetStore.getState().pet?.stats.happiness || 0

    vi.advanceTimersByTime(10000)

    const newHappiness = usePetStore.getState().pet?.stats.happiness || 0

    expect(newHappiness).toBe(initialHappiness - 2)

    vi.useRealTimers()
  })

  it('should drain energy by 1 point every 10 seconds', () => {
    vi.useFakeTimers()

    usePetStore.getState().createPet('TestPet', '🐱')
    renderHook(() => useGameLoop())

    const initialEnergy = usePetStore.getState().pet?.stats.energy || 0

    vi.advanceTimersByTime(10000)

    const newEnergy = usePetStore.getState().pet?.stats.energy || 0

    expect(newEnergy).toBe(initialEnergy - 1)

    vi.useRealTimers()
  })

  it('should not drain stats below 0', () => {
    vi.useFakeTimers()

    // Create pet with low stats
    usePetStore.getState().createPet('TestPet', '🐱')
    const state = usePetStore.getState()
    if (state.pet) {
      usePetStore.setState({
        pet: {
          ...state.pet,
          stats: { hunger: 2, happiness: 1, energy: 0 }
        }
      })
    }

    renderHook(() => useGameLoop())

    // Fast-forward multiple intervals
    vi.advanceTimersByTime(30000) // 3 intervals

    const finalStats = usePetStore.getState().pet?.stats

    expect(finalStats?.hunger).toBeGreaterThanOrEqual(0)
    expect(finalStats?.happiness).toBeGreaterThanOrEqual(0)
    expect(finalStats?.energy).toBeGreaterThanOrEqual(0)

    vi.useRealTimers()
  })

  it('should drain happiness faster when pet is neglected for 30+ seconds', () => {
    vi.useFakeTimers()

    usePetStore.getState().createPet('TestPet', '🐱')

    // Set lastInteraction to 40 seconds ago
    const state = usePetStore.getState()
    if (state.pet) {
      usePetStore.setState({
        pet: {
          ...state.pet,
          lastInteraction: Date.now() - 40000
        }
      })
    }

    renderHook(() => useGameLoop())

    const initialHappiness = usePetStore.getState().pet?.stats.happiness || 0

    vi.advanceTimersByTime(10000)

    const newHappiness = usePetStore.getState().pet?.stats.happiness || 0

    // Should drain by 2 (normal) + 2 (loneliness penalty) = 4 total
    expect(newHappiness).toBe(initialHappiness - 4)

    vi.useRealTimers()
  })

  it('should not run if no pet exists', () => {
    vi.useFakeTimers()

    // No pet created
    usePetStore.setState({ pet: null })

    renderHook(() => useGameLoop())

    // Fast-forward time
    vi.advanceTimersByTime(10000)

    // Nothing should happen (no pet to drain stats from)
    expect(usePetStore.getState().pet).toBeNull()

    vi.useRealTimers()
  })

  it('should cleanup interval on unmount', () => {
    vi.useFakeTimers()
    const clearIntervalSpy = vi.spyOn(global, 'clearInterval')

    usePetStore.getState().createPet('TestPet', '🐱')

    const { unmount } = renderHook(() => useGameLoop())

    unmount()

    expect(clearIntervalSpy).toHaveBeenCalled()

    clearIntervalSpy.mockRestore()
    vi.useRealTimers()
  })
})
