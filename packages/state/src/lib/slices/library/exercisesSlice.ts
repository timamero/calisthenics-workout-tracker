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
  isSearchApplied: boolean;
  setExercises: (exercises: Exercise[]) => void;
  setExerciseSearch: (search: string) => void;
  applySearchStatus: (status: boolean) => void;
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
  isSearchApplied: false,
  setExercises: (exercises) =>
    set(() => {
      const sortedExercises = sortExercises(exercises);
      return {
        masterExercises: sortedExercises,
        displayedExercises: sortedExercises,
      };
    }),
  setExerciseSearch: (search) => set(() => ({ exerciseSearch: search })),
  applySearchStatus: (status) => set(() => ({ isSearchApplied: status })),
  refreshDisplayedExercises: () =>
    set((state) => {
      let result = state.masterExercises;

      if (state.appliedFilterSelections.length > 0) {
        result = filterExercises(result, state.appliedFilterSelections);
      }

      if (state.isSearchApplied) {
        result = filterExercisesBySearch(result, state.exerciseSearch);
      }

      return {
        displayedExercises: result,
        exerciseSearch: state.isSearchApplied ? state.exerciseSearch : "",
        // exerciseSearch:
        //   !state.appliedFilterSelections.length && !state.exerciseSearch
        //     ? ""
        //     : state.exerciseSearch,
      };
    }),
});

export const selectHasFilters = (state: StoreState): boolean =>
  state.appliedFilterSelections.length > 0;

export const selectHasSearch = (state: StoreState): boolean =>
  Boolean(state.exerciseSearch);
