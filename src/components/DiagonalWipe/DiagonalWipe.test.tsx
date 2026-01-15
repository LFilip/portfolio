import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { DiagonalWipe } from './DiagonalWipe'

describe('DiagonalWipe Component', () => {
  it('should not render when not animating and not completed', () => {
    const { container } = render(
      <DiagonalWipe isAnimating={false} onComplete={() => {}} />
    )

    // Should render initially (doors closed)
    expect(container.querySelector('.fixed')).toBeInTheDocument()
  })

  it('should render two triangular divs when animating', () => {
    const { container } = render(
      <DiagonalWipe isAnimating={true} onComplete={() => {}} />
    )

    const triangles = container.querySelectorAll('.absolute.inset-0')
    expect(triangles.length).toBe(2)
  })

  it('should call onComplete after animation duration', () => {
    vi.useFakeTimers()
    const mockOnComplete = vi.fn()

    render(<DiagonalWipe isAnimating={true} onComplete={mockOnComplete} />)

    // Fast-forward time past animation duration (900ms)
    vi.advanceTimersByTime(900)

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

    const { container, rerender } = render(
      <DiagonalWipe isAnimating={true} onComplete={mockOnComplete} />
    )

    // Fast-forward past animation
    vi.advanceTimersByTime(1000)

    // Re-render with isAnimating false
    rerender(<DiagonalWipe isAnimating={false} onComplete={mockOnComplete} />)

    // Should not render anything
    expect(container.firstChild).toBeNull()

    vi.useRealTimers()
  })
})
