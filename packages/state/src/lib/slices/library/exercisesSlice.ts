import { StateCreator } from "zustand";

import { Exercise } from "@cwt/schema/exercises";

import { StoreState } from "../../store";
import {
  filterExercises,
  filterExercisesBySearch,
  sortExercises,
} from "./exercisesActions";

export interface ExercisesSlice {
  masterExercises: Exercise[];
  displayedExercises: Exercise[];
  exerciseSearch: string;
  setExercises: (exercises: Exercise[]) => void;
  setExerciseSearch: (search: string) => void;
  applyFiltersAndSearch: () => void;
  refreshDisplayedExercises: () => void;
}

export const createExercisesSlice: StateCreator<
  StoreState,
  [],
  [],
  ExercisesSlice
> = (set, get) => ({
  masterExercises: [],
  displayedExercises: [],
  exerciseSearch: "",
  setExercises: (exercises) =>
    set(() => {
      const sortedExercises = sortExercises(exercises);
      return {
        masterExercises: sortedExercises,
        displayedExercises: sortedExercises,
      };
  }),
  applyFiltersAndSearch: () =>
    set((state) => {
      let result = state.masterExercises;

      if (state.appliedFilterSelections.length > 0) {
        result = filterExercises(result, state.appliedFilterSelections);
      }

      if (state.exerciseSearch) {
        result = filterExercisesBySearch(result, state.exerciseSearch);
      }

      return {
        displayedExercises: result
      }
    }),
  setExerciseSearch: (search) => set(() => ({ exerciseSearch: search })),
  refreshDisplayedExercises: () =>
    set((state) => {
      if (!state.appliedFilterSelections.length && !state.exerciseSearch) {
        return {
          displayedExercises: state.masterExercises,
          exerciseSearch: "",
        };
      }
      
      get().applyFiltersAndSearch();
      return {}
    }),
});

export const selectHasFilters = (state: StoreState): boolean => 
  state.appliedFilterSelections.length > 0;

export const selectHasSearch = (state: StoreState): boolean =>
  Boolean(state.exerciseSearch);