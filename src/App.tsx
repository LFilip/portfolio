import { useState, useEffect } from 'react'
import { IntroScreen } from './components/IntroScreen/IntroScreen'
import { DiagonalWipe } from './components/DiagonalWipe/DiagonalWipe'
import { Header } from './components/Header/Header'
import { PetSidebar } from './components/PetSidebar/PetSidebar'
import { ContentArea } from './components/ContentArea/ContentArea'
import { Navigation } from './components/Navigation/Navigation'
import { usePetStore } from './stores/petStore'
import { useThemeStore } from './stores/themeStore'
import { useGameLoop } from './hooks/useGameLoop'

function App() {
  const pet = usePetStore((state) => state.pet)
  const createPet = usePetStore((state) => state.createPet)
  const theme = useThemeStore((state) => state.theme)

  // Show intro if no pet exists
  const [showIntro, setShowIntro] = useState(!pet)
  const [isAnimating, setIsAnimating] = useState(true)

  // Start game loop when pet exists
  useGameLoop()

  // Apply dark mode class to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

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

  // Main app layout with navigation
  const mainLayout = (
    <div className="fixed inset-0 flex flex-col bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <Header onReset={handleReset} />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Pet Sidebar (Desktop only) */}
        <PetSidebar />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Mobile Navigation */}
          <div className="md:hidden p-4">
            <Navigation />
          </div>

          {/* Content Area */}
          <ContentArea />
        </main>
      </div>
    </div>
  )

  // Show intro screen before pet is selected
  if (showIntro) {
    return <IntroScreen onStart={handleStart} />
  }

  // After pet is selected, show main layout with diagonal wipe animation
  return (
    <>
      {mainLayout}
      {/* DiagonalWipe covers screen initially, then slides open like elevator doors */}
      <DiagonalWipe isAnimating={isAnimating} onComplete={handleAnimationComplete} />
    </>
  )
}

export default App
