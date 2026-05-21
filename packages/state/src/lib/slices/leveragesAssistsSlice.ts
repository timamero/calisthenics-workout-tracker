import { StateCreator } from 'zustand';
import type { LeveragesAssistsResponse } from '@cwt/schema/leveragesAssists';

export interface LeveragesAssistsSlice {
  leveragesAssists: LeveragesAssistsResponse[] | null;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setLeveragesAssists: (leveragesAssists: LeveragesAssistsResponse[]) => void;
  getLeverageOrAssistByID: (id: number) => LeveragesAssistsResponse;
}

export const createLeveragesAssistsSlice: StateCreator<
  LeveragesAssistsSlice,
  [['zustand/immer', never]],
  [],
  LeveragesAssistsSlice
> = (set, get) => ({
  leveragesAssists: null,
  loading: true,
  setLoading: (loading) => set({ loading }),
  setLeveragesAssists: (leveragesAssists) =>
    set((state) => {
      state.leveragesAssists = leveragesAssists;
    }),
  getLeverageOrAssistByID: (id) => {
    return get().leveragesAssists!.find(
      (item) => item.id === id,
    ) as LeveragesAssistsResponse;
  },
});
