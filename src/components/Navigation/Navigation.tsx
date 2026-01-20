import { useNavigationStore } from '../../stores/navigationStore'
import type { NavigationTab } from '../../types/navigation'

const NAVIGATION_TABS: NavigationTab[] = [
  {
    id: 'pet',
    label: 'Pet Game',
    icon: '🎮',
    description: 'Play with your virtual pet'
  },
  {
    id: 'about',
    label: 'About Me',
    icon: '👋',
    description: 'Learn about me'
  },
]

export const Navigation = () => {
  const activeSection = useNavigationStore((state) => state.activeSection)
  const setActiveSection = useNavigationStore((state) => state.setActiveSection)

  return (
    <nav className="mb-6">
      {/* Mobile: Horizontal tabs */}
      <div className="flex md:hidden gap-2 overflow-x-auto pb-2">
        {NAVIGATION_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            className={`
              flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm
              whitespace-nowrap transition-all duration-200
              ${activeSection === tab.id
                ? 'bg-green-600 dark:bg-green-700 text-white shadow-lg scale-105'
                : 'bg-white dark:bg-gray-700 text-green-700 dark:text-green-300 border-2 border-green-200 dark:border-green-600 hover:border-green-400 dark:hover:border-green-500 hover:shadow-md'
              }
            `}
            aria-label={tab.description}
            aria-current={activeSection === tab.id ? 'page' : undefined}
          >
            <span className="text-xl">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Desktop: Vertical tabs (rendered in PetSidebar area) - hidden on mobile */}
      <div className="hidden md:flex flex-col gap-2">
        {NAVIGATION_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-xl font-semibold
              transition-all duration-200
              ${activeSection === tab.id
                ? 'bg-green-600 dark:bg-green-700 text-white shadow-lg scale-105'
                : 'bg-white/80 dark:bg-gray-700/80 text-green-700 dark:text-green-300 border-2 border-green-200 dark:border-green-600 hover:border-green-400 dark:hover:border-green-500 hover:shadow-md hover:scale-102'
              }
            `}
            aria-label={tab.description}
            aria-current={activeSection === tab.id ? 'page' : undefined}
          >
            <span className="text-2xl">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
