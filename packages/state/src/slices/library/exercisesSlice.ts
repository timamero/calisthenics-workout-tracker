import { create, StateCreator } from 'zustand';

import { Exercise, Muscles, Equipment, Emphasis, Difficulty, Selection } from '@cwt/schema/exerciseSchema';
import { FilterCheckbox } from '../../types';
import { StoreState } from '../../store';


// export type Filter = { muscle: Muscles; equipment: Equipment; emphasis: Emphasis[]; difficulty: Difficulty[]}

export interface ExercisesSlice {
  masterExercises: Exercise[]
  displayedExercises: Exercise[]
  isFilterApplied: boolean
  isFilterBySearchApplied: boolean
  exerciseSearch: string
  setExercises: (exercises: Exercise[]) => void
  filterDisplayedExercises: () => void
  setExerciseSearch: (search: string) => void
  filterDisplayedExercisesBySearch: () => void
  resetDisplayedExerciseBySearch: () => void
  resetDisplayedExercises: () => void
}

export const createExercisesSlice: StateCreator<StoreState, [], [], ExercisesSlice> = (set, get) => ({
  masterExercises: [],
  displayedExercises: [],
  isFilterApplied: false,
  isFilterBySearchApplied: false,
  exerciseSearch: "",
  setExercises: (exercises) => set(() => {
    const sortedExercises = exercises.sort((a, b) => a.name.localeCompare(b.name))
    return {
      masterExercises: sortedExercises,
      displayedExercises: sortedExercises,
    }
  }),
  filterDisplayedExercises: () => set((state) => {
    const appliedFilters = get().appliedFilterSelections

    if (appliedFilters.length === 0) return {
      isFilterApplied: false
    }

    const exercisesToFilter = state.isFilterBySearchApplied ? state.displayedExercises : state.masterExercises

    const appliedFilterGroupNames = appliedFilters.map((obj) => obj.group);
    const uniqueAppliedFilterGroupNames = Array.from(new Set(appliedFilterGroupNames));
    const appliedFilterSelections: Selection[] = appliedFilters.map((obj) => obj.selection)
    const filteredExercises = exercisesToFilter.filter((obj) => {
      const conditionals: boolean[] = []
      uniqueAppliedFilterGroupNames.forEach((group) => {
        if (typeof obj[group] === "string") {
          if (appliedFilterSelections.includes(obj[group])) {
            conditionals.push(true)
          } else {
            conditionals.push(false)
          }
        } else if (Array.isArray(obj[group])) {
          const arrayConditionals: boolean[] = []
          obj[group].forEach((item) => {
            if (appliedFilterSelections.includes(item)) {
              arrayConditionals.push(true)
            } else {
              arrayConditionals.push(false)
            }
          })

          conditionals.push(arrayConditionals.some((con) => con))
        }
      })

      return conditionals.every((con) => con)
    })
    return {
      isFilterApplied: true,
      displayedExercises: filteredExercises
    }
  }),
  setExerciseSearch: (search) => set(() => ({exerciseSearch: search})),
  filterDisplayedExercisesBySearch: () => set((state) => {
    const filteredExercises = state.displayedExercises.filter((obj) => obj.name.toLowerCase().includes(state.exerciseSearch.toLowerCase()))
    return {
      displayedExercises: filteredExercises,
      isFilterBySearchApplied: true,
    }
  }),
  resetDisplayedExerciseBySearch: () => set((state) => {
    if (!state.isFilterApplied) {
      return {
        displayedExercises: state.masterExercises,
        isFilterBySearchApplied: false,
        exerciseSearch: '',
      }
    }

    return { isFilterBySearchApplied: false, exerciseSearch: ''}
  }),
  resetDisplayedExercises: () => set((state) => {
    const appliedFilters = get().appliedFilterSelections

    if (appliedFilters.length === 0) return {
      isFilterApplied: false
    }

    return {
      displayedExercises: state.masterExercises,
      isFilterApplied: false
    }
  })
})
