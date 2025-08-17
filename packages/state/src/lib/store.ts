import { create } from 'zustand';
import { createExercisesSlice, ExercisesSlice } from './slices/library/exercisesSlice';
import { createExercisesFilterSlice, ExercisesFilterSlice } from './slices/library/exercisesFilterSlice';

export type StoreState = ExercisesSlice & ExercisesFilterSlice
export const useStore = create<StoreState>((...a) => ({
  ...createExercisesSlice(...a),
  ...createExercisesFilterSlice(...a)
}))