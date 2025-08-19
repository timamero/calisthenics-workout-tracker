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
  filterDisplayedExercises: () => void;
  setExerciseSearch: (search: string) => void;
  filterDisplayedExercisesBySearch: () => void;
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
  filterDisplayedExercises: () =>
    set((state) => {
      const exercisesToFilter = state.exerciseSearch
        ? state.displayedExercises
        : state.masterExercises;

      const filteredExercises = filterExercises(
        exercisesToFilter,
        state.appliedFilterSelections
      );

      return {
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
      };
    }),
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