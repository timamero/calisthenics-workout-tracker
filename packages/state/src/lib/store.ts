import { create } from 'zustand';
import { createExercisesSlice, ExercisesSlice } from './slices/library/exercisesSlice';
import { createExercisesFilterSlice, ExercisesFilterSlice } from './slices/library/exercisesFilterSlice';
import { createWorkoutsSlice, WorkoutsSlice } from './slices/workout/workoutsSlice';
import { createWorkoutBuildAndLogSlice, WorkoutBuildAndLogSlice } from './slices/workout/workoutBuildAndLogSlice';

export type StoreState = ExercisesSlice & ExercisesFilterSlice & WorkoutsSlice & WorkoutBuildAndLogSlice
export const useStore = create<StoreState>((...a) => ({
  ...createExercisesSlice(...a),
  ...createExercisesFilterSlice(...a),
  ...createWorkoutsSlice(...a),
  ...createWorkoutBuildAndLogSlice(...a)
}))
