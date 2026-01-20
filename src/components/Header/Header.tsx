import { usePetStore } from '../../stores/petStore'
import { useThemeStore } from '../../stores/themeStore'

interface HeaderProps {
  onReset: () => void
}

export const Header = ({ onReset }: HeaderProps) => {
  const pet = usePetStore((state) => state.pet)
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)

  return (
    <header className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-b-2 border-green-200 dark:border-green-700 px-3 py-2 md:px-6 md:py-4">
      <div className="flex items-center justify-between gap-2">
        {/* Logo/Branding - Shorter on mobile */}
        <div className="flex items-center gap-1 md:gap-2 min-w-0 flex-shrink">
          <h1 className="text-base md:text-2xl font-bold text-green-800 dark:text-green-400 truncate">
            <span className="hidden sm:inline">LocalPet Portfolio 🌿</span>
            <span className="sm:hidden">LocalPet 🌿</span>
          </h1>
        </div>

        {/* Center Section: Pet Status (mobile only) */}
        {pet && (
          <div className="md:hidden flex items-center gap-1 text-xs flex-shrink-0">
            <span className="text-xl">{pet.emoji}</span>
            <div className="flex flex-col gap-0 leading-tight">
              <span title="Energy" className="whitespace-nowrap">⚡{pet.stats.energy}</span>
              <span title="Happiness" className="whitespace-nowrap">❤️{pet.stats.happiness}</span>
            </div>
          </div>
        )}

        {/* Right Section: Dark Mode + Reset */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-600 border-2 border-green-300 dark:border-green-600 hover:border-green-500 dark:hover:border-green-400 text-green-700 dark:text-green-300 font-semibold p-2 rounded-lg transition-all hover:shadow-lg text-xl"
            aria-label="Toggle dark mode"
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* Reset Button */}
          <button
            onClick={onReset}
            className="bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-600 border-2 border-green-300 dark:border-green-600 hover:border-green-500 dark:hover:border-green-400 text-green-700 dark:text-green-300 font-semibold px-2 py-2 md:px-4 md:py-2 rounded-lg transition-all hover:shadow-lg text-xs md:text-base whitespace-nowrap"
            aria-label="Choose a different pet"
          >
            <span className="hidden md:inline">Choose Different Pet</span>
            <span className="md:hidden">Reset</span>
          </button>
        </div>
      </div>
    </header>
  )
}
