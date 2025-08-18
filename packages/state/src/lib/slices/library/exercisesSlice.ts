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
  hasFilters: boolean;
  hasSearch: boolean;
  // isFilterApplied: boolean;
  // isFilterBySearchApplied: boolean;
  exerciseSearch: string;
  setExercises: (exercises: Exercise[]) => void;
  filterDisplayedExercises: () => void;
  setExerciseSearch: (search: string) => void;
  filterDisplayedExercisesBySearch: () => void;
  resetDisplayedExerciseBySearch: () => void;
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
  hasFilters: get().appliedFilterSelections.length > 0,
  hasSearch: Boolean(get().exerciseSearch),
  // isFilterApplied: false,
  // isFilterBySearchApplied: false,
  exerciseSearch: "",
  setExercises: (exercises) =>
    set(() => {
      const sortedExercises = sortExercises(exercises);
      return {
        masterExercises: sortedExercises,
        displayedExercises: sortedExercises,
      };
    }),
  filterDisplayedExercises: () =>
    set((state) => {
      const appliedFilters = get().appliedFilterSelections;

      // if (appliedFilters.length === 0)
      //   return {
      //     isFilterApplied: false,
      //   };

      // const exercisesToFilter = state.isFilterBySearchApplied
      const exercisesToFilter = state.hasSearch
        ? state.displayedExercises
        : state.masterExercises;

      const filteredExercises = filterExercises(
        exercisesToFilter,
        appliedFilters
      );

      return {
        // isFilterApplied: true,
        displayedExercises: filteredExercises,
      };
    }),
  setExerciseSearch: (search) => set(() => ({ exerciseSearch: search })),
  filterDisplayedExercisesBySearch: () =>
    set((state) => {
      const filteredExercises = filterExercisesBySearch(
        state.displayedExercises,
        state.exerciseSearch
      );
      return {
        displayedExercises: filteredExercises,
        // isFilterBySearchApplied: true,
      };
    }),
  resetDisplayedExerciseBySearch: () =>
    set((state) => {
      // if (!state.isFilterApplied) {
      if (!state.hasFilters) {
        return {
          displayedExercises: state.masterExercises,
          // isFilterBySearchApplied: false,
          exerciseSearch: "",
        };
      }

      // return { isFilterBySearchApplied: false, exerciseSearch: "" };
      return { exerciseSearch: "" };
    }),
  resetDisplayedExercises: () =>
    set((state) => {
      const appliedFilters = get().appliedFilterSelections;

      // if (appliedFilters.length === 0)
      //   return {
      //     isFilterApplied: false,
      //   };

      return {
        displayedExercises: state.masterExercises,
        // isFilterApplied: false,
      };
    }),
});
