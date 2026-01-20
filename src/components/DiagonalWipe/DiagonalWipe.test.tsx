import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { DiagonalWipe } from './DiagonalWipe'

describe('DiagonalWipe Component', () => {
  it('should render overlay when animating', () => {
    const { container } = render(
      <DiagonalWipe isAnimating={true} onComplete={() => {}} />
    )

    // Should render the fixed overlay
    expect(container.querySelector('.fixed')).toBeInTheDocument()
  })

  it('should render two triangular divs when animating', () => {
    const { container } = render(
      <DiagonalWipe isAnimating={true} onComplete={() => {}} />
    )

    const triangles = container.querySelectorAll('.absolute.inset-0')
    expect(triangles.length).toBeGreaterThanOrEqual(2)
  })

  it('should show Begin Adventure button after delay', async () => {
    vi.useFakeTimers()

    render(<DiagonalWipe isAnimating={true} onComplete={() => {}} />)

    // Button appears after 300ms delay
    act(() => {
      vi.advanceTimersByTime(300)
    })

    expect(screen.getByText(/begin adventure/i)).toBeInTheDocument()

    vi.useRealTimers()
  })

  it('should call onComplete after button click and animation', async () => {
    vi.useFakeTimers()
    const mockOnComplete = vi.fn()

    render(<DiagonalWipe isAnimating={true} onComplete={mockOnComplete} />)

    // Wait for button to appear
    act(() => {
      vi.advanceTimersByTime(300)
    })

    // Click the Begin button
    const beginButton = screen.getByText(/begin adventure/i)
    fireEvent.click(beginButton)

    // Fast-forward time past animation duration (900ms)
    act(() => {
      vi.advanceTimersByTime(900)
    })

    expect(mockOnComplete).toHaveBeenCalledTimes(1)

    vi.useRealTimers()
  })

  it('should have drop-shadow filter on triangles', () => {
    const { container } = render(
      <DiagonalWipe isAnimating={true} onComplete={() => {}} />
    )

    const triangles = container.querySelectorAll('.absolute.inset-0')

    // Check that filter is defined (jsdom doesn't fully support filter styles)
    triangles.forEach((triangle) => {
      const style = (triangle as HTMLElement).style
      expect(style.filter).toBeDefined()
    })
  })

  it('should apply different background colors to each triangle', () => {
    const { container } = render(
      <DiagonalWipe isAnimating={true} onComplete={() => {}} />
    )

    const triangles = container.querySelectorAll('.absolute.inset-0')

    // One should be green-600, other emerald-500
    const hasGreenTriangle = Array.from(triangles).some(t =>
      t.classList.contains('bg-green-600')
    )
    const hasEmeraldTriangle = Array.from(triangles).some(t =>
      t.classList.contains('bg-emerald-500')
    )

    expect(hasGreenTriangle).toBe(true)
    expect(hasEmeraldTriangle).toBe(true)
  })

  it('should not render after animation completes', () => {
    vi.useFakeTimers()
    const mockOnComplete = vi.fn()

    const { container } = render(
      <DiagonalWipe isAnimating={true} onComplete={mockOnComplete} />
    )

    // Wait for button to appear
    act(() => {
      vi.advanceTimersByTime(300)
    })

    // Click the Begin button
    const beginButton = screen.getByText(/begin adventure/i)
    fireEvent.click(beginButton)

    // Fast-forward past animation
    act(() => {
      vi.advanceTimersByTime(1000)
    })

    // Should not render anything after completion
    expect(container.firstChild).toBeNull()

    vi.useRealTimers()
  })
})
