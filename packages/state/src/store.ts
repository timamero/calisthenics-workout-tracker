import { create } from 'zustand';
import { createExercisesSlice, ExercisesSlice } from './slices/library/exercisesSlice';
import { createExercisesFilterSlice, ExercisesFilterSlice } from './slices/library/exercisesFilterSlice';

export const useStore = create<ExercisesSlice & ExercisesFilterSlice>((...a) => ({
  ...createExercisesSlice(...a),
  ...createExercisesFilterSlice(...a)
}))