import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import {
  ExerciseLibrarySlice,
  createExerciseLibrarySlice,
} from '../../slices/exercises/exerciseLibrarySlice';

export const useExerciseLibraryStore = create<ExerciseLibrarySlice>()(
  immer((...a) => ({
    ...createExerciseLibrarySlice(...a),
  })),
);
