import { useState } from 'react'
import { CreatePetModal } from '../CreatePetModal/CreatePetModal'

interface IntroScreenProps {
  onStart: (data: { name: string; emoji: string }) => void
}

// Default pet options for quick start
const DEFAULT_PETS = [
  { name: 'Buddy', emoji: '🐱' },
  { name: 'Max', emoji: '🐶' },
  { name: 'Chirpy', emoji: '🐦' },
]

export const IntroScreen = ({ onStart }: IntroScreenProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleQuickStart = (pet: { name: string; emoji: string }) => {
    onStart(pet)
  }

  const handleCustomCreate = (pet: { name: string; emoji: string }) => {
    setIsModalOpen(false)
    onStart(pet)
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100 flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-4xl w-full mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-bold mb-4 text-green-800">
            Welcome to LocalPet! 🌿
          </h1>
          <p className="text-green-700 text-xl md:text-2xl">
            Choose your companion to start your adventure
          </p>
        </div>

        {/* Pet Selection Bubbles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {/* Default Pet Options */}
          {DEFAULT_PETS.map((pet) => (
            <button
              key={pet.name}
              onClick={() => handleQuickStart(pet)}
              className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border-4 border-green-200 hover:border-green-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95"
            >
              <div className="text-center">
                <div className="text-8xl mb-4 group-hover:animate-bounce">
                  {pet.emoji}
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">
                  {pet.name}
                </h3>
                <p className="text-green-600 text-sm">
                  Click to start!
                </p>
              </div>
            </button>
          ))}

          {/* Create New Pet Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="group bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border-4 border-green-300 border-dashed hover:border-green-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95"
          >
            <div className="text-center flex flex-col items-center justify-center h-full">
              <div className="text-8xl mb-4 text-green-500 group-hover:rotate-90 transition-transform duration-300">
                +
              </div>
              <h3 className="text-2xl font-bold text-green-800 mb-2">
                Create New
              </h3>
              <p className="text-green-600 text-sm">
                Customize your pet
              </p>
            </div>
          </button>
        </div>

        {/* Footer */}
        <p className="text-center mt-8 text-green-700/70">
          Your adventure begins here 🌱
        </p>
      </div>

      {/* Create Pet Modal */}
      <CreatePetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleCustomCreate}
      />
    </div>
  )
}
