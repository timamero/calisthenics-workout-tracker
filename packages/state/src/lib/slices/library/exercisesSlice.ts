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
  resetDisplayedExercises: () => void;
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
  resetDisplayedExercises: () =>
    set((state) => {
      if (!(state.appliedFilterSelections.length > 0) && !state.exerciseSearch) {
        return {
          displayedExercises: state.masterExercises,
          exerciseSearch: "",
        };
      }
      if (state.appliedFilterSelections.length > 0) {
        const filteredExercises = filterExercises(
        state.masterExercises,
        state.appliedFilterSelections
      );
        return {
          displayedExercises: state.exerciseSearch ? filterExercisesBySearch(filteredExercises, state.exerciseSearch) : filteredExercises
        }
      } else {
       return {
        displayedExercises: state.masterExercises,
      }};
    }),
});

export const selectHasFilters = (state: StoreState): boolean => 
  state.appliedFilterSelections.length > 0;

export const selectHasSearch = (state: StoreState): boolean =>
  Boolean(state.exerciseSearch);