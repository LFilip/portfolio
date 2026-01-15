import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { usePetStore } from './stores/petStore'

// Mock the useGameLoop hook since we don't want the interval running in tests
vi.mock('./hooks/useGameLoop', () => ({
  useGameLoop: () => {}
}))

describe('App Component', () => {
  beforeEach(() => {
    // Clear store and localStorage
    usePetStore.setState({ pet: null })
    localStorage.clear()
  })

  it('should render IntroScreen when no pet exists', () => {
    render(<App />)

    // Should show welcome message
    expect(screen.getByText(/welcome/i)).toBeInTheDocument()
  })

  it('should show default pet options on intro screen', () => {
    render(<App />)

    expect(screen.getByText(/Buddy/i)).toBeInTheDocument()
    expect(screen.getByText(/Max/i)).toBeInTheDocument()
    expect(screen.getByText(/Chirpy/i)).toBeInTheDocument()
  })

  it('should transition to game screen when pet is selected', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Click on Buddy
    const buddyButton = screen.getByText(/Buddy/i).closest('button')
    await user.click(buddyButton!)

    // Should show game screen elements
    expect(await screen.findByText(/LocalPet/i)).toBeInTheDocument()

    // Pet should be created in store
    const pet = usePetStore.getState().pet
    expect(pet?.name).toBe('Buddy')
    expect(pet?.emoji).toBe('🐱')
  })

  it('should show Pet component in game screen', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Select a pet
    const maxButton = screen.getByText(/Max/i).closest('button')
    await user.click(maxButton!)

    // Should show pet emoji
    expect(await screen.findByText('🐶')).toBeInTheDocument()

    // Should show pet name in bubble
    expect(screen.getByText(/Max/i)).toBeInTheDocument()
  })

  it('should show ActionButtons in game screen', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Select a pet
    const buddyButton = screen.getByText(/Buddy/i).closest('button')
    await user.click(buddyButton!)

    // Should show action buttons (use more specific queries)
    expect(await screen.findByRole('button', { name: /feed/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument()

    // Find the Pet action button specifically (has ❤️ emoji)
    const buttons = screen.getAllByRole('button')
    const petActionButton = buttons.find(btn => btn.textContent?.includes('❤️') && btn.textContent?.includes('Pet'))
    expect(petActionButton).toBeInTheDocument()
  })

  it('should show "Choose Different Pet" button in game screen', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Select a pet
    const buddyButton = screen.getByText(/Buddy/i).closest('button')
    await user.click(buddyButton!)

    // Should show reset button
    expect(await screen.findByText(/choose different pet/i)).toBeInTheDocument()
  })

  it('should show confirmation dialog when resetting pet', async () => {
    const user = userEvent.setup()
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(false)

    render(<App />)

    // Select a pet
    const buddyButton = screen.getByText(/Buddy/i).closest('button')
    await user.click(buddyButton!)

    // Click reset button
    const resetButton = await screen.findByText(/choose different pet/i)
    await user.click(resetButton)

    // Should show confirmation
    expect(confirmSpy).toHaveBeenCalledWith(
      expect.stringContaining('Are you sure')
    )

    confirmSpy.mockRestore()
  })

  it('should return to intro screen when reset is confirmed', async () => {
    const user = userEvent.setup()
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true)

    render(<App />)

    // Select a pet
    const buddyButton = screen.getByText(/Buddy/i).closest('button')
    await user.click(buddyButton!)

    // Wait for game screen
    await screen.findByText(/choose different pet/i)

    // Click reset and confirm
    const resetButton = screen.getByText(/choose different pet/i)
    await user.click(resetButton)

    // Should return to intro screen
    expect(await screen.findByText(/create new/i)).toBeInTheDocument()

    // Pet should be cleared from store
    expect(usePetStore.getState().pet).toBeNull()

    confirmSpy.mockRestore()
  })

  it('should not reset when confirmation is cancelled', async () => {
    const user = userEvent.setup()
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(false)

    render(<App />)

    // Select a pet
    const buddyButton = screen.getByText(/Buddy/i).closest('button')
    await user.click(buddyButton!)

    // Wait for game screen
    await screen.findByText(/choose different pet/i)

    // Click reset but cancel
    const resetButton = screen.getByText(/choose different pet/i)
    await user.click(resetButton)

    // Should stay on game screen
    expect(screen.queryByText(/create new/i)).not.toBeInTheDocument()

    // Pet should still exist
    expect(usePetStore.getState().pet).not.toBeNull()

    confirmSpy.mockRestore()
  })

  it('should load existing pet from localStorage', () => {
    // Pre-populate store with a pet
    usePetStore.getState().createPet('SavedPet', '🐰')

    // Render app (should skip intro)
    render(<App />)

    // Should show game screen with saved pet
    expect(screen.queryByText(/welcome/i)).not.toBeInTheDocument()
    expect(screen.getByText(/SavedPet/i)).toBeInTheDocument()
  })

  it('should allow creating custom pet through modal', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Click create new
    const createButton = screen.getByText(/create new/i)
    await user.click(createButton)

    // Fill in custom details
    const nameInput = screen.getByLabelText(/pet name/i)
    await user.type(nameInput, 'CustomPet')

    // Select emoji
    const emojiButton = screen.getByRole('button', { name: /🦊/ })
    await user.click(emojiButton)

    // Create pet
    const confirmButton = screen.getByText(/create pet/i)
    await user.click(confirmButton)

    // Should show game screen with custom pet
    expect(await screen.findByText(/CustomPet/i)).toBeInTheDocument()
    expect(screen.getByText('🦊')).toBeInTheDocument()
  })
})
