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
  createStopwatchSlice,
  StopwatchSlice,
} from './slices/workout/stopwatchSlice';

export type StoreState = ExercisesSlice & ExercisesFilterSlice & StopwatchSlice;
export const useStore = create<StoreState>()(
  immer((...a) => ({
    ...createExercisesSlice(...a),
    ...createExercisesFilterSlice(...a),
    ...createStopwatchSlice(...a),
  })),
);
