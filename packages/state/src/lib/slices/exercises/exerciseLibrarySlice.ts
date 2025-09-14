import { StateCreator } from 'zustand';

import { Exercise, ExerciseFilterCheckbox } from '@cwt/schema/exercises';

import {
  filterExercises,
  filterExercisesBySearch,
  sortExercises,
} from './exercisesActions';

export interface ExerciseLibrarySlice {
  masterExercises: Exercise[];
  displayedExercises: Exercise[];
  setExercises: (exercises: Exercise[]) => void;
  refreshDisplayedExercises: (
    appliedFilterSelections: ExerciseFilterCheckbox[],
    appliedExerciseSearch: string,
    exerciseSearch: string,
  ) => void;
  getExerciseByID: (id: number) => Exercise;
  getExerciseNameByID: (id: number) => string;
}

export const createExerciseLibrarySlice: StateCreator<
  ExerciseLibrarySlice,
  [['zustand/immer', never]],
  [],
  ExerciseLibrarySlice
> = (set, get) => ({
  masterExercises: [],
  displayedExercises: [],
  setExercises: (exercises) =>
    set((state) => {
      state.masterExercises = sortExercises(exercises);
      state.displayedExercises = sortExercises(exercises);
    }),
  refreshDisplayedExercises: (
    appliedFilterSelections,
    appliedExerciseSearch,
    exerciseSearch,
  ) =>
    set((state) => {
      let result = state.masterExercises;

      if (appliedFilterSelections.length > 0) {
        result = filterExercises(result, appliedFilterSelections);
      }

      if (appliedExerciseSearch) {
        result = filterExercisesBySearch(result, exerciseSearch);
      }

      state.displayedExercises = result;
    }),
  getExerciseByID: (id) => {
    return get().masterExercises.find(
      (exercise) => exercise.id === id,
    ) as Exercise;
  },
  getExerciseNameByID: (id) => {
    return get().masterExercises.find((exercise) => exercise.id === id)
      ?.name as string;
  },
});
