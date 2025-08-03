import { create, StateCreator } from 'zustand';

import { Exercise, Muscles, Equipment, Emphasis, Difficulty } from '@cwt/schema/exerciseSchema';


export type Filter = { muscle: Muscles; equipment: Equipment; emphasis: Emphasis[]; difficulty: Difficulty[]}

export interface ExercisesSlice {
  masterExercises: Exercise[]
  displayedExercises: Exercise[]
  setExercises: (exercises: Exercise[]) => void
  filterDisplayedExercises: (filter: Filter) => void
  filterDisplayedExercisesBySearch: (search: string) => void
  resetDisplayedExercises: () => void
}

export const createExercisesSlice: StateCreator<ExercisesSlice, [], [], ExercisesSlice> = (set) => ({
  masterExercises: [],
  displayedExercises: [],
  setExercises: (exercises) => set(() => {
    const sortedExercises = exercises.sort((a, b) => a.name.localeCompare(b.name))
    return {
      masterExercises: sortedExercises,
      displayedExercises: sortedExercises,
    }
  }),
  filterDisplayedExercises: (filter) => set((state) => {
    // code to filter exercises
    return {
      displayedExercises: state.displayedExercises
    }
  }),
  filterDisplayedExercisesBySearch: (search) => set((state) => {
    // code to filter exercises by search
    return {
      displayedExercises: state.displayedExercises
    }
  }),
  resetDisplayedExercises: () => set((state) => ({
    displayedExercises: state.masterExercises
  }))
})
