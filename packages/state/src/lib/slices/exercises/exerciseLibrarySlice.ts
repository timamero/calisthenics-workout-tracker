import { StateCreator } from 'zustand';

import { ExerciseResponse, FilterCheckbox } from '@cwt/schema/exercises';

import {
  filterExercises,
  filterExercisesBySearch,
  sortExercises,
} from './exercisesActions';

export interface ExerciseLibrarySlice {
  masterExercises: ExerciseResponse[] | null;
  displayedExercises: ExerciseResponse[] | null;
  loading: boolean;
  isExercisesFetched: boolean;
  setLoading: (loading: boolean) => void;
  setIsExercisesFetched: (isFetched: boolean) => void;
  setExercises: (exercises: ExerciseResponse[]) => void;
  refreshDisplayedExercises: (
    appliedFilterSelections: FilterCheckbox[],
    appliedExerciseSearch: string,
    exerciseSearch: string,
  ) => void;
  getExerciseByID: (id: number) => ExerciseResponse;
  getExerciseNameByID: (id: number) => string;
}

export const createExerciseLibrarySlice: StateCreator<
  ExerciseLibrarySlice,
  [['zustand/immer', never]],
  [],
  ExerciseLibrarySlice
> = (set, get) => ({
  masterExercises: null,
  displayedExercises: null,
  loading: false,
  isExercisesFetched: false,
  setLoading: (loading) => set({ loading }),
  setIsExercisesFetched: (isFetched) =>
    set((state) => {
      state.isExercisesFetched = isFetched;
    }),
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
      let result = state.masterExercises as ExerciseResponse[];

      if (appliedFilterSelections.length > 0) {
        result = filterExercises(result, appliedFilterSelections);
      }

      if (appliedExerciseSearch) {
        result = filterExercisesBySearch(result, exerciseSearch);
      }

      state.displayedExercises = result;
    }),
  getExerciseByID: (id) => {
    return get().masterExercises!.find(
      (exercise) => exercise.id === id,
    ) as ExerciseResponse;
  },
  getExerciseNameByID: (id) => {
    return get().masterExercises!.find((exercise) => exercise.id === id)
      ?.name as string;
  },
});
