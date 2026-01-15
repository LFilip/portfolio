import { usePetStore } from '../../stores/petStore'

export const Pet = () => {
  const pet = usePetStore((state) => state.pet)

  if (!pet) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-400 text-lg">No pet yet! Create one to get started.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 relative">
      {/* Name bubble - positioned above and to the right */}
      <div className="relative mb-4 self-end mr-12">
        <div className="bg-white border-2 border-gray-800 rounded-2xl px-4 py-2 shadow-lg relative">
          <p className="text-gray-800 font-semibold text-sm whitespace-nowrap">
            {pet.name} 💭
          </p>
          {/* Speech bubble tail */}
          <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white border-r-2 border-b-2 border-gray-800 transform rotate-45"></div>
        </div>
      </div>

      {/* Pet emoji - large and centered */}
      <div className="text-9xl select-none animate-bounce hover:animate-pulse cursor-pointer transition-transform hover:scale-110">
        {pet.emoji}
      </div>

      {/* Stats display */}
      <div className="mt-8 w-full max-w-xs space-y-3">
        {/* Energy stat */}
        <div className="flex items-center justify-between bg-yellow-50 border-2 border-yellow-400 rounded-lg px-4 py-2">
          <span className="font-semibold text-yellow-800">⚡ Energy</span>
          <span className="text-yellow-900 font-bold">{pet.stats.energy}</span>
        </div>

        {/* Hunger stat */}
        <div className="flex items-center justify-between bg-orange-50 border-2 border-orange-400 rounded-lg px-4 py-2">
          <span className="font-semibold text-orange-800">🍕 Hunger</span>
          <span className="text-orange-900 font-bold">{pet.stats.hunger}</span>
        </div>

        {/* Happiness stat */}
        <div className="flex items-center justify-between bg-pink-50 border-2 border-pink-400 rounded-lg px-4 py-2">
          <span className="font-semibold text-pink-800">❤️ Happiness</span>
          <span className="text-pink-900 font-bold">{pet.stats.happiness}</span>
        </div>
      </div>
    </div>
  )
}
