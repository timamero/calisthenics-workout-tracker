import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

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
export const useStore = create<StoreState>()(
  immer((...a) => ({
    ...createExercisesSlice(...a),
    ...createExercisesFilterSlice(...a),
    ...createWorkoutLibrarySlice(...a),
    ...createWorkoutDraftSlice(...a),
    ...createStopwatchSlice(...a),
  })),
);
