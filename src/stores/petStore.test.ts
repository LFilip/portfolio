import { describe, it, expect, beforeEach } from 'vitest'
import { usePetStore } from './petStore'

describe('petStore', () => {
  beforeEach(() => {
    // Clear the store state before each test
    const { reset } = usePetStore.getState()
    reset()
    // Clear localStorage
    localStorage.clear()
  })

  describe('Initial State', () => {
    it('should create a new pet with full stats', () => {
      const { pet } = usePetStore.getState()

      expect(pet).toBeDefined()
      expect(pet?.stats.energy).toBe(100)
      expect(pet?.stats.hunger).toBe(100)
      expect(pet?.stats.happiness).toBe(100)
    })

    it('should have a unique ID and timestamps', () => {
      const { pet } = usePetStore.getState()

      expect(pet?.id).toBeDefined()
      expect(pet?.id).toHaveLength(36) // UUID length
      expect(pet?.createdAt).toBeGreaterThan(0)
      expect(pet?.lastInteraction).toBeGreaterThan(0)
    })

    it('should have a default emoji', () => {
      const { pet } = usePetStore.getState()

      expect(pet?.emoji).toBeDefined()
      expect(typeof pet?.emoji).toBe('string')
    })
  })

  describe('Pet Actions', () => {
    it('should increase hunger when feeding', () => {
      // First, create a pet with low hunger to test feeding
      usePetStore.getState().createPet('Test', '🐱')

      // Manually set hunger to 50 by getting the state and updating it
      const initialState = usePetStore.getState()
      if (initialState.pet) {
        // Create a new pet object with updated hunger
        usePetStore.setState({
          pet: {
            ...initialState.pet,
            stats: { ...initialState.pet.stats, hunger: 50 }
          }
        })
      }

      const beforeFeed = usePetStore.getState().pet?.stats.hunger || 0
      usePetStore.getState().feed()
      const afterFeed = usePetStore.getState().pet?.stats.hunger || 0

      expect(afterFeed).toBeGreaterThan(beforeFeed)
      expect(afterFeed).toBeLessThanOrEqual(100)
    })

    it('should not increase hunger above 100', () => {
      // Set hunger to max
      const initialState = usePetStore.getState()
      if (initialState.pet) {
        usePetStore.setState({
          pet: {
            ...initialState.pet,
            stats: { ...initialState.pet.stats, hunger: 100 }
          }
        })
      }

      usePetStore.getState().feed()
      const afterFeed = usePetStore.getState().pet?.stats.hunger

      expect(afterFeed).toBe(100)
    })

    it('should increase happiness and decrease energy when playing', () => {
      // Set up pet with specific stats
      const initialState = usePetStore.getState()
      if (initialState.pet) {
        usePetStore.setState({
          pet: {
            ...initialState.pet,
            stats: { ...initialState.pet.stats, happiness: 50, energy: 50 }
          }
        })
      }

      const beforePlay = usePetStore.getState().pet?.stats
      usePetStore.getState().play()
      const afterPlay = usePetStore.getState().pet?.stats

      expect(afterPlay?.happiness).toBeGreaterThan(beforePlay?.happiness || 0)
      expect(afterPlay?.energy).toBeLessThan(beforePlay?.energy || 100)
    })

    it('should increase happiness when petting', () => {
      // Set up pet with specific happiness
      const initialState = usePetStore.getState()
      if (initialState.pet) {
        usePetStore.setState({
          pet: {
            ...initialState.pet,
            stats: { ...initialState.pet.stats, happiness: 50 }
          }
        })
      }

      const beforePet = usePetStore.getState().pet?.stats.happiness || 0
      usePetStore.getState().petAction()
      const afterPet = usePetStore.getState().pet?.stats.happiness || 0

      expect(afterPet).toBeGreaterThan(beforePet)
      expect(afterPet).toBeLessThanOrEqual(100)
    })

    it('should update lastInteraction timestamp on any action', async () => {
      const initialTime = usePetStore.getState().pet?.lastInteraction || 0

      // Wait a bit to ensure time difference
      await new Promise(resolve => setTimeout(resolve, 50))

      usePetStore.getState().feed()
      const newTime = usePetStore.getState().pet?.lastInteraction || 0

      expect(newTime).toBeGreaterThan(initialTime)
    })

    it('should not let stats go below 0', () => {
      // Set energy to 5
      const initialState = usePetStore.getState()
      if (initialState.pet) {
        usePetStore.setState({
          pet: {
            ...initialState.pet,
            stats: { ...initialState.pet.stats, energy: 5 }
          }
        })
      }

      // Play multiple times to drain energy
      usePetStore.getState().play()
      usePetStore.getState().play()
      usePetStore.getState().play()

      const finalEnergy = usePetStore.getState().pet?.stats.energy

      expect(finalEnergy).toBeGreaterThanOrEqual(0)
    })
  })

  describe('Pet Creation', () => {
    it('should allow creating a new pet with custom name and emoji', () => {
      usePetStore.getState().createPet('Fluffy', '🐱')

      // Get fresh state after creating pet
      const newPet = usePetStore.getState().pet

      expect(newPet?.name).toBe('Fluffy')
      expect(newPet?.emoji).toBe('🐱')
      expect(newPet?.stats.energy).toBe(100)
      expect(newPet?.stats.happiness).toBe(100)
      expect(newPet?.stats.hunger).toBe(100)
    })
  })

  describe('LocalStorage Persistence', () => {
    it('should persist pet state to localStorage', () => {
      const store = usePetStore.getState()
      store.createPet('TestPet', '=6')

      const stored = localStorage.getItem('pet-storage')
      expect(stored).toBeDefined()

      const parsed = JSON.parse(stored!)
      expect(parsed.state.pet.name).toBe('TestPet')
    })
  })
})
