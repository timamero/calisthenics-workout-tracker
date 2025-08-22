import { create } from 'zustand';
import { createExercisesSlice, ExercisesSlice } from './slices/library/exercisesSlice';
import { createExercisesFilterSlice, ExercisesFilterSlice } from './slices/library/exercisesFilterSlice';
import { createWorkoutsSlice, WorkoutsSlice } from './slices/workout/workoutsSlice';
import { createWorkoutBuildAndLogSlice, WorkoutBuildAndLogSlice } from './slices/workout/workoutBuildAndLogSlice';
import { createStopwatchSlice, StopwatchSlice } from './slices/workout/stopwatchSlice';

export type StoreState = ExercisesSlice & ExercisesFilterSlice & WorkoutsSlice & WorkoutBuildAndLogSlice & StopwatchSlice
export const useStore = create<StoreState>((...a) => ({
  ...createExercisesSlice(...a),
  ...createExercisesFilterSlice(...a),
  ...createWorkoutsSlice(...a),
  ...createWorkoutBuildAndLogSlice(...a),
  ...createStopwatchSlice(...a)
}))
