import { create } from "zustand";
import {
  createExercisesSlice,
  ExercisesSlice,
} from "./slices/library/exercisesSlice";
import {
  createExercisesFilterSlice,
  ExercisesFilterSlice,
} from "./slices/library/exercisesFilterSlice";
import {
  createWorkoutsSlice,
  WorkoutsSlice,
} from "./slices/workout/workoutsSlice";
import {
  createWorkoutDraftSlice,
  WorkoutDraftSlice,
} from "./slices/workout/workoutDraftSlice";
import {
  createWorkoutsAndBuildLogSlice,
  WorkoutsAndBuildLogSlice,
} from "./slices/workout/workoutsAndBuildLogSlice";
import {
  createStopwatchSlice,
  StopwatchSlice,
} from "./slices/workout/stopwatchSlice";

export type StoreState = ExercisesSlice &
  ExercisesFilterSlice &
  WorkoutsSlice &
  WorkoutDraftSlice &
  WorkoutsAndBuildLogSlice &
  StopwatchSlice;
export const useStore = create<StoreState>((...a) => ({
  ...createExercisesSlice(...a),
  ...createExercisesFilterSlice(...a),
  ...createWorkoutsSlice(...a),
  ...createWorkoutDraftSlice(...a),
  ...createWorkoutsAndBuildLogSlice(...a),
  ...createStopwatchSlice(...a),
}));
