import { useNavigationStore } from '../../stores/navigationStore'
import { PetSection } from '../sections/PetSection/PetSection'
import { AboutSection } from '../sections/AboutSection/AboutSection'

export const ContentArea = () => {
  const activeSection = useNavigationStore((state) => state.activeSection)

  return (
    <div className="p-4 md:p-8">
      {activeSection === 'pet' && <PetSection />}
      {activeSection === 'about' && <AboutSection />}
    </div>
  )
}
