import { StateCreator } from 'zustand';
import type { LeveragesAssistsResponse } from '@cwt/schema/leveragesAssists';

export interface LeveragesAssistsSlice {
  leveragesAssists: LeveragesAssistsResponse[];
  setLeveragesAssists: (leveragesAssists: LeveragesAssistsResponse[]) => void;
}

export const createLeveragesAssistsSlice: StateCreator<
  LeveragesAssistsSlice,
  [['zustand/immer', never]],
  [],
  LeveragesAssistsSlice
> = (set, get) => ({
  leveragesAssists: [],
  setLeveragesAssists: (leveragesAssists) =>
    set((state) => {
      state.leveragesAssists = leveragesAssists;
    }),
});
