import { StateCreator } from "zustand";

import { Exercise, ExerciseAttributes } from "@cwt/schema/exercises";

import { StoreState } from "../../store";
import { filterExercises } from "./exercisesActions";

export interface ExercisesSlice {
  masterExercises: Exercise[];
  displayedExercises: Exercise[];
  isFilterApplied: boolean;
  isFilterBySearchApplied: boolean;
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
  isFilterApplied: false,
  isFilterBySearchApplied: false,
  exerciseSearch: "",
  setExercises: (exercises) =>
    set(() => {
      const sortedExercises = exercises.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      return {
        masterExercises: sortedExercises,
        displayedExercises: sortedExercises,
      };
    }),
  filterDisplayedExercises: () =>
    set((state) => {
      const appliedFilters = get().appliedFilterSelections;

      if (appliedFilters.length === 0)
        return {
          isFilterApplied: false,
        };

      const exercisesToFilter = state.isFilterBySearchApplied
        ? state.displayedExercises
        : state.masterExercises;

      const filteredExercises = filterExercises(
        exercisesToFilter,
        appliedFilters
      );

      return {
        isFilterApplied: true,
        displayedExercises: filteredExercises,
      };
    }),
  setExerciseSearch: (search) => set(() => ({ exerciseSearch: search })),
  filterDisplayedExercisesBySearch: () =>
    set((state) => {
      const filteredExercises = state.displayedExercises.filter((obj) =>
        obj.name.toLowerCase().includes(state.exerciseSearch.toLowerCase())
      );
      return {
        displayedExercises: filteredExercises,
        isFilterBySearchApplied: true,
      };
    }),
  resetDisplayedExerciseBySearch: () =>
    set((state) => {
      if (!state.isFilterApplied) {
        return {
          displayedExercises: state.masterExercises,
          isFilterBySearchApplied: false,
          exerciseSearch: "",
        };
      }

      return { isFilterBySearchApplied: false, exerciseSearch: "" };
    }),
  resetDisplayedExercises: () =>
    set((state) => {
      const appliedFilters = get().appliedFilterSelections;

      if (appliedFilters.length === 0)
        return {
          isFilterApplied: false,
        };

      return {
        displayedExercises: state.masterExercises,
        isFilterApplied: false,
      };
    }),
});
