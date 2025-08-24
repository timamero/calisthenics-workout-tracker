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
  appliedExerciseSearch: string;
  setExercises: (exercises: Exercise[]) => void;
  setExerciseSearch: (search: string) => void;
  setAppliedExerciseSearch: (search: string) => void;
  refreshDisplayedExercises: () => void;
  getExerciseByID: (id: number) => Exercise;
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
  appliedExerciseSearch: "",
  setExercises: (exercises) =>
    set(() => {
      const sortedExercises = sortExercises(exercises);
      return {
        masterExercises: sortedExercises,
        displayedExercises: sortedExercises,
      };
    }),
  setExerciseSearch: (search) => set(() => ({ exerciseSearch: search })),
  setAppliedExerciseSearch: (search) =>
    set(() => ({ appliedExerciseSearch: search })),
  refreshDisplayedExercises: () =>
    set((state) => {
      let result = state.masterExercises;

      if (state.appliedFilterSelections.length > 0) {
        result = filterExercises(result, state.appliedFilterSelections);
      }

      if (state.appliedExerciseSearch) {
        result = filterExercisesBySearch(result, state.exerciseSearch);
      }

      return {
        displayedExercises: result,
        exerciseSearch: state.appliedExerciseSearch
          ? state.appliedExerciseSearch
          : "",
      };
    }),
  getExerciseByID: (id) => {
    return get().masterExercises.find(
      (exercise) => exercise.id === id
    ) as Exercise;
  },
});

export const selectHasFilters = (state: StoreState): boolean =>
  state.appliedFilterSelections.length > 0;

export const selectHasSearch = (state: StoreState): boolean =>
  Boolean(state.appliedExerciseSearch);
