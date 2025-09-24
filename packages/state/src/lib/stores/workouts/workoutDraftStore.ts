import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import {
  WorkoutDraftSlice,
  createWorkoutDraftSlice,
} from '../../slices/workouts/workoutDraftSlice';

export const useWorkoutDraftStore = create<WorkoutDraftSlice>()(
  immer((...a) => ({
    ...createWorkoutDraftSlice(...a),
  })),
);
