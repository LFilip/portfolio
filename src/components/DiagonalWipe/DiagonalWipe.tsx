import { useEffect, useState } from 'react'

interface DiagonalWipeProps {
  isAnimating: boolean
  onComplete: () => void
}

export const DiagonalWipe = ({ isAnimating, onComplete }: DiagonalWipeProps) => {
  const [shouldOpen, setShouldOpen] = useState(false)
  const [hasCompleted, setHasCompleted] = useState(false)

  useEffect(() => {
    if (isAnimating && !hasCompleted) {
      // Small delay so triangles render in closed position first
      const openTimer = setTimeout(() => {
        setShouldOpen(true)
      }, 50)

      // Animation duration is 0.8s, call onComplete after
      const completeTimer = setTimeout(() => {
        onComplete()
        setHasCompleted(true)
      }, 900)

      return () => {
        clearTimeout(openTimer)
        clearTimeout(completeTimer)
      }
    }
  }, [isAnimating, hasCompleted, onComplete])

  // Don't render after animation completes
  if (hasCompleted) return null

  // Calculate 45 degree angle movement
  const angle = 45
  const distance = 150 // How far to slide (percentage)

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {/* Top-left triangle - slides toward upper-left like elevator door */}
      <div
        className="absolute inset-0 bg-green-600 transition-transform duration-[800ms] ease-in-out"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 0 100%)',
          filter: 'drop-shadow(4px 4px 12px rgba(0, 0, 0, 0.3))',
          transform: shouldOpen
            ? `translate(${-distance * Math.cos(angle * Math.PI / 180)}%, ${-distance * Math.sin(angle * Math.PI / 180)}%)`
            : 'translate(0, 0)',
        }}
      />

      {/* Bottom-right triangle - slides toward lower-right like elevator door */}
      <div
        className="absolute inset-0 bg-emerald-500 transition-transform duration-[800ms] ease-in-out"
        style={{
          clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
          filter: 'drop-shadow(-4px -4px 12px rgba(0, 0, 0, 0.3))',
          transform: shouldOpen
            ? `translate(${distance * Math.cos(angle * Math.PI / 180)}%, ${distance * Math.sin(angle * Math.PI / 180)}%)`
            : 'translate(0, 0)',
        }}
      />
    </div>
  )
}
