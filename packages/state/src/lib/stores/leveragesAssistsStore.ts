import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import {
  LeveragesAssistsSlice,
  createLeveragesAssistsSlice,
} from '../slices/leveragesAssistsSlice';

export const useLeveragesAssistsStore = create<LeveragesAssistsSlice>()(
  immer((...a) => ({
    ...createLeveragesAssistsSlice(...a),
  })),
);
