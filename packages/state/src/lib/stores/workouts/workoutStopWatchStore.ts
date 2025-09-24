import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import {
  WorkoutStopwatchSlice,
  createWorkoutStopwatchSlice,
} from '../../slices/workouts/workoutStopwatchSlice';

export const useWorkoutDraftStore = create<WorkoutStopwatchSlice>()(
  immer((...a) => ({
    ...createWorkoutStopwatchSlice(...a),
  })),
);
