import { create } from 'zustand';
import { Exercise, Muscles, Equipment, Emphasis, Difficulty } from '@cwt/schema/exerciseSchema';

type Filter = { muscle: Muscles; equipment: Equipment; emphasis: Emphasis; difficulty: Difficulty}

interface ExercisesState {
  masterExercises: Exercise[];
  displayedExercises: Exercise[];
  filter: Filter;
  search: string;
  setExercises: (exercises: Exercise[]) => void;
  resetDisplayedExercises: () => void;
  filterDisplayedExercises: (filter: Filter) => void;
  searchDisplayedExercises: (search: string) => void;
  setFilter: (filter: Partial<Filter>) => void;
  setSearch: (search: string) => void;
}

export const useExercisesStore = create<ExercisesState>((set) => ({
  masterExercises: [],
  displayedExercises: [],
  filter: {muscle: [], equipment: [], emphasis: "", difficulty: ""},
  search: "",
  setExercises: (exercises) => set({
    masterExercises: exercises,
    displayedExercises: exercises,
  }),
  resetDisplayedExercises: () => set((state) => ({
    displayedExercises: state.masterExercises
  })),
  filterDisplayedExercises: (filter) => set((state) => {
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
      if (filter.emphasis) {
        conditions.push(filter.emphasis == ex.difficulty)
      }
      if (filter.difficulty) {
        conditions.push(filter.difficulty == ex.difficulty)
      }

      return conditions.some((con) => con)
    })

    return {
      displayedExercises: filteredExercises
    }
  }),
  searchDisplayedExercises: (search) => set((state) => {
    const exercises = state.displayedExercises

    const matchedExercises = exercises.filter((ex) => ex.name.toLowerCase().includes(search))

    return {
      displayedExercises: matchedExercises
    }
  }),
  setFilter: (partial) => set((state) => ({
    filter: { ...state.filter, ...partial}
  })),
  setSearch: (search) => set({ search })
}));