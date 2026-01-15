import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { Pet } from './Pet'
import { usePetStore } from '../../stores/petStore'

describe('Pet Component', () => {
  beforeEach(() => {
    // Reset store before each test
    usePetStore.getState().reset()
    localStorage.clear()
  })

  it('should render the pet emoji', () => {
    // Create a pet with a specific emoji
    usePetStore.getState().createPet('TestPet', '🐱')

    render(<Pet />)

    // Check if the emoji is rendered (it should be in a large display)
    expect(screen.getByText('🐱')).toBeInTheDocument()
  })

  it('should render the pet name', () => {
    usePetStore.getState().createPet('Fluffy', '🐶')

    render(<Pet />)

    // Use regex to match "Fluffy" anywhere in the text
    expect(screen.getByText(/Fluffy/)).toBeInTheDocument()
  })

  it('should display all three stats', () => {
    usePetStore.getState().createPet('TestPet', '🐱')

    render(<Pet />)

    // Should show labels for all stats
    // Using getByText with regex to be flexible about casing/formatting
    expect(screen.getByText(/energy/i)).toBeInTheDocument()
    expect(screen.getByText(/hunger/i)).toBeInTheDocument()
    expect(screen.getByText(/happiness/i)).toBeInTheDocument()
  })

  it('should display stat values', () => {
    usePetStore.getState().createPet('TestPet', '🐱')

    render(<Pet />)

    // New pet should have all stats at 100
    // We'll look for "100" appearing multiple times (for each stat)
    const statValues = screen.getAllByText(/100/)
    expect(statValues.length).toBeGreaterThanOrEqual(3)
  })

  it('should update when stats change', () => {
    usePetStore.getState().createPet('TestPet', '🐱')

    render(<Pet />)

    // Change a stat wrapped in act
    act(() => {
      const state = usePetStore.getState()
      if (state.pet) {
        usePetStore.setState({
          pet: {
            ...state.pet,
            stats: { ...state.pet.stats, happiness: 75 }
          }
        })
      }
    })

    // Should now show the updated value
    expect(screen.getByText(/75/)).toBeInTheDocument()
  })

  it('should show a message when no pet exists', () => {
    // Set pet to null
    usePetStore.setState({ pet: null })

    render(<Pet />)

    expect(screen.getByText(/no pet/i)).toBeInTheDocument()
  })
})
