import { create } from 'zustand';
import { createExercisesSlice, ExercisesSlice } from './slices/library/exercisesSlice';

export const useStore = create<ExercisesSlice>((...a) => ({
  ...createExercisesSlice(...a),
}))