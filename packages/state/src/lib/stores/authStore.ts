import { create } from 'zustand';

import { AuthSlice, createAuthSlice } from '../slices/authSlice';

export const useAuthStore = create<AuthSlice>((...a) => ({
  ...createAuthSlice(...a),
}));
