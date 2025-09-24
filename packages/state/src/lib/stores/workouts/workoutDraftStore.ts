import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import {
  WorkoutDraftSlice,
  createWorkoutDraftSlice,
} from '../../slices/workouts/workoutDraftSlice';
import {
  StopwatchSlice,
  createStopwatchSlice,
} from '../../slices/workouts/stopwatchSlice';

export type WorkoutDraftStoreState = WorkoutDraftSlice & StopwatchSlice;

export const useWorkoutDraftStore = create<WorkoutDraftStoreState>()(
  immer((...a) => ({
    ...createWorkoutDraftSlice(...a),
    ...createStopwatchSlice(...a),
  })),
);
