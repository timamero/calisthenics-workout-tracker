import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import {
  WorkoutLibrarySlice,
  createWorkoutLibrarySlice,
} from '../../slices/workouts/workoutLibrarySlice';

export const useWorkoutLibraryStore = create<WorkoutLibrarySlice>()(
  immer((...a) => ({
    ...createWorkoutLibrarySlice(...a),
  })),
);
