import { StateCreator } from 'zustand';

export interface ExercisesSearchSlice {
  exerciseSearch: string;
  appliedExerciseSearch: string;
  setExerciseSearch: (search: string) => void;
  setAppliedExerciseSearch: (search: string) => void;
}

export const createExercisesSearchSlice: StateCreator<
  ExercisesSearchSlice,
  [],
  [],
  ExercisesSearchSlice
> = (set, get) => ({
  exerciseSearch: '',
  appliedExerciseSearch: '',
  setExerciseSearch: (search) => set(() => ({ exerciseSearch: search })),
  setAppliedExerciseSearch: (search) =>
    set(() => ({ appliedExerciseSearch: search })),
});

export const selectHasSearch = (state: ExercisesSearchSlice): boolean =>
  Boolean(state.appliedExerciseSearch);
