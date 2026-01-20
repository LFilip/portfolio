import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatBar } from './StatBar'

describe('StatBar', () => {
  it('should render the label text', () => {
    render(<StatBar label="Energy" value={75} color="yellow" />)
    expect(screen.getByText('Energy')).toBeInTheDocument()
  })

  it('should render the numeric value', () => {
    render(<StatBar label="Energy" value={75} color="yellow" />)
    expect(screen.getByText('75')).toBeInTheDocument()
  })

  it('should set progress bar width based on value', () => {
    const { container } = render(<StatBar label="Energy" value={60} color="yellow" />)
    const progressBar = container.querySelector('[style*="width"]')
    expect(progressBar).toHaveStyle({ width: '60%' })
  })

  it('should apply yellow color classes for energy stat', () => {
    const { container } = render(<StatBar label="Energy" value={75} color="yellow" />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.className).toContain('bg-yellow-50')
    expect(wrapper.className).toContain('border-yellow-400')
  })

  it('should apply orange color classes for hunger stat', () => {
    const { container } = render(<StatBar label="Hunger" value={75} color="orange" />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.className).toContain('bg-orange-50')
    expect(wrapper.className).toContain('border-orange-400')
  })

  it('should apply pink color classes for happiness stat', () => {
    const { container } = render(<StatBar label="Happiness" value={75} color="pink" />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.className).toContain('bg-pink-50')
    expect(wrapper.className).toContain('border-pink-400')
  })
})
