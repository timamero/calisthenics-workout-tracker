import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import {
  ExercisesFilterSlice,
  createExercisesFilterSlice,
} from '../../slices/exercises/exercisesFilterSlice';

export const useExercisesFilterStore = create<ExercisesFilterSlice>()(
  immer((...a) => ({
    ...createExercisesFilterSlice(...a),
  })),
);
