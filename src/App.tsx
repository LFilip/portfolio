import { useState, useEffect } from 'react'
import { Pet } from './components/Pet/Pet'
import { ActionButtons } from './components/ActionButtons/ActionButtons'
import { IntroScreen } from './components/IntroScreen/IntroScreen'
import { DiagonalWipe } from './components/DiagonalWipe/DiagonalWipe'
import { usePetStore } from './stores/petStore'
import { useGameLoop } from './hooks/useGameLoop'

function App() {
  const pet = usePetStore((state) => state.pet)
  const createPet = usePetStore((state) => state.createPet)

  // Show intro if no pet exists
  const [showIntro, setShowIntro] = useState(!pet)
  const [isAnimating, setIsAnimating] = useState(false)

  // Start game loop when pet exists
  useGameLoop()

  const handleStart = (data: { name: string; emoji: string }) => {
    // Create the pet in the store
    createPet(data.name, data.emoji)

    // IMMEDIATELY hide intro screen and start animation
    setShowIntro(false)
    setIsAnimating(true)
  }

  const handleAnimationComplete = () => {
    // After animation completes, stop animating
    setIsAnimating(false)
  }

  const handleReset = () => {
    // Confirm before resetting
    const confirmed = window.confirm(
      "Are you sure you want to choose a different pet? Your current pet's progress will be lost."
    )

    if (confirmed) {
      // Clear the pet and show intro screen
      usePetStore.setState({ pet: null })
      setShowIntro(true)
      setIsAnimating(false)
    }
  }

  // Game screen component
  const gameScreen = (
    <div className="fixed inset-0 bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100 overflow-y-auto">
      <div className="min-h-screen flex flex-col items-center justify-center py-8 px-4">
        {/* Header with reset button */}
        <div className="w-full max-w-3xl mx-auto mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-green-800">
            LocalPet 🌿
          </h1>

          <button
            onClick={handleReset}
            className="bg-white/80 hover:bg-white border-2 border-green-300 hover:border-green-500 text-green-700 font-semibold px-4 py-2 rounded-xl transition-all hover:shadow-lg"
          >
            Choose Different Pet
          </button>
        </div>

        <div className="w-full max-w-3xl mx-auto">
          <Pet />

          <div className="mt-8">
            <ActionButtons />
          </div>
        </div>
      </div>
    </div>
  )

  // Show intro screen before pet is selected
  if (showIntro) {
    return <IntroScreen onStart={handleStart} />
  }

  // After pet is selected, show game screen with diagonal wipe animation
  return (
    <>
      {gameScreen}
      {/* DiagonalWipe covers screen initially, then slides open like elevator doors */}
      <DiagonalWipe isAnimating={isAnimating} onComplete={handleAnimationComplete} />
    </>
  )
}

export default App
