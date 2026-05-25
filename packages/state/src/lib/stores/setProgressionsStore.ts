import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import {
  SetProgressionsSlice,
  createSetProgressionsSlice,
} from '../slices/setProgressionsSlice';

export const useSetProgressionsStore = create<SetProgressionsSlice>()(
  immer((...a) => ({
    ...createSetProgressionsSlice(...a),
  })),
);
