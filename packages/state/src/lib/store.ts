import { create } from 'zustand';
import { createExercisesSlice, ExercisesSlice } from './slices/library/exercisesSlice';
import { createExercisesFilterSlice, ExercisesFilterSlice } from './slices/library/exercisesFilterSlice';
import { createWorkoutsSlice, WorkoutsSlice } from './slices/workout/workoutsSlice';

export type StoreState = ExercisesSlice & ExercisesFilterSlice & WorkoutsSlice
export const useStore = create<StoreState>((...a) => ({
  ...createExercisesSlice(...a),
  ...createExercisesFilterSlice(...a),
  ...createWorkoutsSlice(...a)
}))
