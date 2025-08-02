import { create } from 'zustand';
import { Exercise, Muscles, Equipment, Emphasis, Difficulty } from '@cwt/schema/exerciseSchema';

import { Selection } from '@cwt/schema/exerciseSchema';
export type Filter = { muscle: Muscles; equipment: Equipment; emphasis: Emphasis[]; difficulty: Difficulty[]}
export type FilterKey = keyof Filter;
export const filterKeys: FilterKey[] = ["muscle", "equipment", "emphasis", "difficulty"];

interface ExercisesState {
  masterExercises: Exercise[];
  displayedExercises: Exercise[];
  appliedFilters: Filter;
  selectedFilters: Filter;
  search: string;
  setExercises: (exercises: Exercise[]) => void;
  resetDisplayedExercises: () => void;
  applyFilters: (filter: Filter) => void;
  updateSelectedFilters: ({key, selection}: {key: FilterKey; selection: Selection;}) => void;
  resetSelectedFilters: () => void;
  clearFilters: () => void;
  searchDisplayedExercises: (search: string) => void;
  setSearch: (search: string) => void;
}

const clearedFilters = {muscle: [], equipment: [], emphasis: [], difficulty: []}

export const useExercisesStore = create<ExercisesState>((set) => ({
  masterExercises: [],
  displayedExercises: [],
  appliedFilters: clearedFilters,
  selectedFilters: clearedFilters,
  search: "",
  setExercises: (exercises) => set(() => {
    const sortedExercises = exercises.sort((a, b) => a.name.localeCompare(b.name))
    return {
      masterExercises: sortedExercises,
      displayedExercises: sortedExercises,
    }
  }),
  resetDisplayedExercises: () => set((state) => ({
    displayedExercises: state.masterExercises
  })),
  applyFilters: (filter) => set((state) => {
    const exercises = state.masterExercises

    if (Object.values(filter).every((f) => f.length == 0)) {
      return {
        displayedExercises: exercises
      }
    }

    const filteredExercises = exercises.filter((ex) => {
      const conditions: boolean[] = []

      if (filter.muscle.length > 0) {
        conditions.push(filter.muscle.some((mus) => ex.target_muscles.includes(mus)))
      } 
      if (filter.equipment.length > 0 && ex.required_equipment != null) {
        conditions.push(filter.equipment.some((eq) => ex.required_equipment?.includes(eq)))
      }
      if (filter.emphasis.length > 0) {
        conditions.push(filter.emphasis.some((emp) => ex.emphasis == emp))
      } 
      if (filter.difficulty.length > 0) {
        conditions.push(filter.difficulty.some((dif) => ex.difficulty == dif))
      } 

      return conditions.some((con) => con)
    })

    return {
      displayedExercises: filteredExercises
    }
  }),
  updateSelectedFilters: ({key, selection}) => set((state) => {
    const updatedFilter = {...state.selectedFilters, [key]: state.selectedFilters[key].push(selection)}
    return {
      selectedFilters: updatedFilter
    }
  }),
  resetSelectedFilters: () => set((state) => ({
    displayedExercises: state.masterExercises
  })),
  clearFilters: () => set((state) => ({
    appliedFilters: clearedFilters,
    selectedFilters: clearedFilters
  })),
  searchDisplayedExercises: (search) => set((state) => {
    const exercises = state.displayedExercises

    const matchedExercises = exercises.filter((ex) => ex.name.toLowerCase().includes(search))

    return {
      displayedExercises: matchedExercises
    }
  }),
  // setFilter: (partial) => set((state) => ({
  //   filter: { ...state.filter, ...partial}
  // })),
  setSearch: (search) => set({ search })
}));