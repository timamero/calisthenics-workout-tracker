import { create } from 'zustand';

import {
  LeveragesAssistsSlice,
  createLeveragesAssistsSlice,
} from '../slices/leveragesAssistsSlice';

export const useLeveragesAssistsStore = create<LeveragesAssistsSlice>(
  (...a) => ({
    ...createLeveragesAssistsSlice(...a),
  }),
);
