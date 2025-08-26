import { create } from 'zustand';
import {
  createExercisesSlice,
  ExercisesSlice,
} from './slices/library/exercisesSlice';
import {
  createExercisesFilterSlice,
  ExercisesFilterSlice,
} from './slices/library/exercisesFilterSlice';
import {
  createWorkoutLibrarySlice,
  WorkoutLibrarySlice,
} from './slices/workout/workoutLibrarySlice';
import {
  createWorkoutDraftSlice,
  WorkoutDraftSlice,
} from './slices/workout/workoutDraftSlice';
import {
  createStopwatchSlice,
  StopwatchSlice,
} from './slices/workout/stopwatchSlice';

export type StoreState = ExercisesSlice &
  ExercisesFilterSlice &
  WorkoutLibrarySlice &
  WorkoutDraftSlice &
  StopwatchSlice;
export const useStore = create<StoreState>((...a) => ({
  ...createExercisesSlice(...a),
  ...createExercisesFilterSlice(...a),
  ...createWorkoutLibrarySlice(...a),
  ...createWorkoutDraftSlice(...a),
  ...createStopwatchSlice(...a),
}));
