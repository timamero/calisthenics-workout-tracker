import { create } from 'zustand';

import { AuthSlice, createAuthSlice } from '../slices/authSlice';

export const useExercisesSearchStore = create<AuthSlice>((...a) => ({
  ...createAuthSlice(...a),
}));
