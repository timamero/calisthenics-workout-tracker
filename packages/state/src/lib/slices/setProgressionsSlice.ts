import { StateCreator } from 'zustand';
import type { SetProgressionResponse } from '@cwt/schema/setProgressions';

export interface SetProgressionsSlice {
  setProgressions: SetProgressionResponse[] | null;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setSetProgression: (setProgressions: SetProgressionResponse[]) => void;
  getSetProgressionByID: (id: number) => SetProgressionResponse;
}

export const createSetProgressionsSlice: StateCreator<
  SetProgressionsSlice,
  [['zustand/immer', never]],
  [],
  SetProgressionsSlice
> = (set, get) => ({
  setProgressions: null,
  loading: true,
  setLoading: (loading) => set({ loading }),
  setSetProgression: (setProgressions) =>
    set((state) => {
      state.setProgressions = setProgressions;
    }),
  getSetProgressionByID: (id) => {
    return get().setProgressions!.find(
      (item) => item.id === id,
    ) as SetProgressionResponse;
  },
});
