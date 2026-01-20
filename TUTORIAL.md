# LocalPet Development Tutorial

> **A living document tracking the journey of building an interactive portfolio with virtual pet companions**

---

## Table of Contents

1. [Project Vision](#project-vision)
2. [Setup & Foundation](#setup--foundation)
3. [Phase 1: Core Pet Mechanics](#phase-1-core-pet-mechanics)
4. [Architecture Decisions](#architecture-decisions)
5. [Component Breakdown](#component-breakdown)
6. [What We've Built](#what-weve-built)
7. [Next Steps](#next-steps)

---

## Project Vision

**Not just a portfolio - it's an adventure.**

LocalPet is an interactive portfolio where users choose a virtual pet companion that guides them through the developer's work. This isn't a traditional resume site - it's an engaging, memorable experience that showcases technical skills through gameplay.

### Core Features
- Choose or create a virtual pet companion
- Interact with your pet (feed, play, pet)
- Navigate through portfolio sections with your pet by your side
- Track pet stats that persist across sessions
- Smooth animations and delightful UX

---

## Setup & Foundation

### Tech Stack Choices

**Frontend Framework**: React 18 + TypeScript + Vite
- Fast development with HMR
- Type safety throughout
- Modern build tooling

**Styling**: Tailwind CSS v4
- Utility-first approach
- Rapid prototyping
- Consistent design system

**State Management**: Zustand with LocalStorage persistence
- Minimal boilerplate compared to Redux
- Built-in persistence middleware
- TypeScript support out of the box

**Testing**: Vitest + React Testing Library
- Fast unit tests
- Component testing
- TDD approach

### Initial Setup

```bash
# Project initialized with Vite
npm create vite@latest localpet -- --template react-ts

# Dependencies installed
npm install zustand
npm install -D tailwindcss @tailwindcss/postcss autoprefixer
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom
```

### Project Structure

```
src/
├── components/           # React components
│   ├── Pet/             # Pet display & interaction
│   ├── ActionButtons/   # Feed, Play, Pet actions
│   ├── IntroScreen/     # Pet selection screen
│   ├── DiagonalWipe/    # Transition animation
│   ├── Header/          # App header
│   ├── Navigation/      # Section navigation
│   ├── PetSidebar/      # Persistent pet stats
│   ├── ContentArea/     # Main content display
│   └── sections/        # Different portfolio sections
├── stores/              # Zustand state management
├── types/               # TypeScript definitions
├── hooks/               # Custom React hooks
└── test/                # Test utilities
```

---

## Phase 1: Core Pet Mechanics

### Step 1: Pet Store Setup

**File**: `src/stores/petStore.ts`

Created a Zustand store with persistence for managing pet state:

```typescript
interface PetState {
  pet: Pet | null
  feed: () => void
  play: () => void
  petAction: () => void
  createPet: (name: string, emoji: string) => void
  reset: () => void
}
```

**Key Features**:
- Pet stats clamped between 0-100
- LocalStorage persistence using Zustand middleware
- Actions modify stats realistically:
  - **Feed**: +20 hunger, +10 energy
  - **Play**: +15 happiness, -10 energy
  - **Pet**: +10 happiness
- Tracks last interaction timestamp

### Step 2: Pet Type Definitions

**File**: `src/types/pet.ts`

```typescript
interface Pet {
  id: string
  name: string
  emoji: string
  stats: PetStats
  createdAt: number
  lastInteraction: number
}

interface PetStats {
  energy: number
  hunger: number
  happiness: number
}
```

### Step 3: Intro Screen

**File**: `src/components/IntroScreen/IntroScreen.tsx`

- Modal for creating/selecting pets
- Emoji picker for pet avatar
- Name input with validation
- Smooth entrance with "Choose Different Pet" option later

### Step 4: Pet Display Component

**File**: `src/components/Pet/Pet.tsx`

- Large emoji display (8xl size)
- Pet name
- Three stat bars (Energy, Hunger, Happiness)
- Color-coded stat bars:
  - Green (high)
  - Yellow (medium)
  - Red (low)

### Step 5: Action Buttons

**File**: `src/components/ActionButtons/ActionButtons.tsx`

Three interactive buttons with emoji icons:
- 🍎 **Feed** - Restore hunger
- 🎮 **Play** - Increase happiness
- 💚 **Pet** - Show affection

### Step 6: Diagonal Wipe Animation

**File**: `src/components/DiagonalWipe/DiagonalWipe.tsx`

Custom CSS animation that:
- Covers screen like curtains
- Slides open diagonally on pet selection
- Reveals the game screen smoothly
- Completes in 800ms

---

## Architecture Decisions

### Why Zustand?

**Compared to Redux**:
- 70% less boilerplate
- No providers needed
- Middleware support (persistence)
- Simple API

**Compared to Context**:
- Better performance (no re-render cascades)
- Built-in selectors
- DevTools support
- Persistence middleware

### Component Architecture

**Philosophy**: Small, focused, testable

- Each component has a single responsibility
- Props are typed with TypeScript interfaces
- Side effects isolated in custom hooks
- Store access via selectors (not full state)

### State vs Props

**Store (Global State)**:
- Pet data and stats
- Active navigation section
- Anything that persists or is shared

**Props (Local State)**:
- UI state (modals, animations)
- Event handlers
- Component configuration

---

## Component Breakdown

### Core Components (Phase 1)

| Component | Purpose | State Source |
|-----------|---------|--------------|
| `App.tsx` | Main orchestrator | Zustand store |
| `IntroScreen` | Pet creation/selection | Local + Store |
| `Pet` | Pet display + stats | Zustand store |
| `ActionButtons` | User interactions | Zustand store |
| `DiagonalWipe` | Transition animation | Local props |

### Navigation Components (In Progress)

| Component | Purpose | State Source |
|-----------|---------|--------------|
| `Header` | App branding + controls | Navigation store |
| `Navigation` | Section tabs | Navigation store |
| `PetSidebar` | Persistent pet stats | Pet store |
| `ContentArea` | Section content display | Navigation store |

### Section Components

| Section | Purpose | Status |
|---------|---------|--------|
| `PetSection` | Pet interaction area | ✅ Built |
| `AboutSection` | Developer bio/info | 🚧 Placeholder |

---

## What We've Built

### ✅ Complete Features

1. **Pet Creation System**
   - Choose pet emoji
   - Name your pet
   - Instant creation

2. **Pet Interaction**
   - Three actions (Feed, Play, Pet)
   - Real-time stat updates
   - Visual feedback on actions

3. **State Persistence**
   - Pet survives page refresh
   - Stats saved to LocalStorage
   - "Choose Different Pet" to reset

4. **Smooth Animations**
   - Diagonal wipe transition
   - Hover effects on buttons
   - Stat bar animations

5. **Responsive Design**
   - Mobile-first approach
   - Touch-friendly buttons
   - Adaptive layouts

### 🚧 In Progress

1. **Navigation System**
   - Header component created
   - Navigation tabs for sections
   - Pet sidebar for persistent stats
   - Content area for section display

2. **About Section**
   - Basic structure in place
   - Placeholder content
   - **Ready for real resume data**

### 📋 Testing Coverage

- `IntroScreen.test.tsx` - Pet creation flow
- `Pet.test.tsx` - Pet display + stats
- `ActionButtons.test.tsx` - User interactions
- `DiagonalWipe.test.tsx` - Animation behavior

---

## Next Steps

### Immediate Tasks

1. **Integrate Resume Data**
   - Replace placeholder `aboutData.ts`
   - Add real bio, skills, experience
   - Customize interests

2. **Connect Navigation**
   - Wire up Header, Navigation, PetSidebar
   - Update App.tsx to use new layout
   - Test section switching

3. **Enhance About Section**
   - Add skills showcase
   - Include project highlights
   - Link to GitHub/portfolio

### Future Enhancements

- Projects section with filterable grid
- Mini-games for engagement
- Achievement system
- Multiple pet types
- Pet evolution/leveling
- Weather API integration
- Social sharing

---

## Development Philosophy

### TDD Approach
1. Write test describing behavior
2. Implement minimal code to pass
3. Refactor for quality
4. Repeat

### Vertical Slices
- Build complete features end-to-end
- Don't add breadth before depth
- One working feature > three half-done features

### Mobile-First
- Design for smallest screen
- Scale up, not down
- Touch targets 44x44px minimum

---

## Key Files Reference

### State Management
- `src/stores/petStore.ts` - Pet state + actions
- `src/stores/navigationStore.ts` - Section navigation

### Type Definitions
- `src/types/pet.ts` - Pet interfaces
- `src/types/navigation.ts` - Navigation types

### Core Components
- `src/App.tsx` - Main application
- `src/components/IntroScreen/IntroScreen.tsx` - Pet selection
- `src/components/Pet/Pet.tsx` - Pet display
- `src/components/ActionButtons/ActionButtons.tsx` - Interactions

### Portfolio Sections
- `src/components/sections/AboutSection/AboutSection.tsx` - About me
- `src/components/sections/AboutSection/aboutData.ts` - **← Update with real data**

---

## Running the Project

```bash
# Development server
npm run dev

# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Resources

- [Zustand Docs](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [React Testing Library](https://testing-library.com/react)
- [Vitest](https://vitest.dev/)

---

**Last Updated**: 2026-01-15
**Current Phase**: Phase 1 - Core Pet Mechanics (90% complete)
**Next Milestone**: Integrate navigation system + real resume data
