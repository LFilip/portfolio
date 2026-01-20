import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Navigation } from './Navigation'
import { useNavigationStore } from '../../stores/navigationStore'

describe('Navigation', () => {
  beforeEach(() => {
    useNavigationStore.setState({ activeSection: 'pet' })
  })

  it('should render Pet Game tab', () => {
    render(<Navigation />)
    expect(screen.getAllByText('Pet Game').length).toBeGreaterThan(0)
  })

  it('should render About Me tab', () => {
    render(<Navigation />)
    expect(screen.getAllByText('About Me').length).toBeGreaterThan(0)
  })

  it('should display icons for each tab', () => {
    render(<Navigation />)
    // Icons appear in both mobile and desktop layouts
    expect(screen.getAllByText('🎮').length).toBeGreaterThan(0)
    expect(screen.getAllByText('👋').length).toBeGreaterThan(0)
  })

  it('should mark active tab with aria-current', () => {
    render(<Navigation />)
    const activeButtons = screen.getAllByRole('button', { current: 'page' })
    expect(activeButtons.length).toBeGreaterThan(0)
    expect(activeButtons[0]).toHaveAttribute('aria-label', 'Play with your virtual pet')
  })

  it('should call setActiveSection when About Me tab is clicked', async () => {
    const user = userEvent.setup()
    render(<Navigation />)

    // Click the first About Me button (mobile version)
    const aboutButtons = screen.getAllByRole('button', { name: /learn about me/i })
    await user.click(aboutButtons[0])

    expect(useNavigationStore.getState().activeSection).toBe('about')
  })

  it('should update aria-current after tab switch', async () => {
    const user = userEvent.setup()
    render(<Navigation />)

    const aboutButtons = screen.getAllByRole('button', { name: /learn about me/i })
    await user.click(aboutButtons[0])

    // After click, About Me should be current
    const currentButtons = screen.getAllByRole('button', { current: 'page' })
    expect(currentButtons[0]).toHaveAttribute('aria-label', 'Learn about me')
  })

  it('should have accessible aria-labels on all tabs', () => {
    render(<Navigation />)
    expect(screen.getAllByRole('button', { name: /play with your virtual pet/i }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole('button', { name: /learn about me/i }).length).toBeGreaterThan(0)
  })
})
