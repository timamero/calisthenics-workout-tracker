import { create } from 'zustand';

import {
  ExercisesSearchSlice,
  createExercisesSearchSlice,
} from '../../slices/exercises/exercisesSearchSlice';

export const useExercisesSearchStore = create<ExercisesSearchSlice>((...a) => ({
  ...createExercisesSearchSlice(...a),
}));
