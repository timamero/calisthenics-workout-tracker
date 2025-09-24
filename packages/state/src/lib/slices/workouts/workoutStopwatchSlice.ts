import { StateCreator } from 'zustand';

export interface WorkoutStopwatchSlice {
  running: boolean;
  startTime: number;
  elapsedTime: number;
  start: () => void;
  stop: () => void;
  reset: () => void;
  getTime: () => void;
}

export const createWorkoutStopwatchSlice: StateCreator<
   WorkoutStopwatchSlice,
  [['zustand/immer', never]],
  [],
   WorkoutStopwatchSlice
> = (set, get) => ({
  running: false,
  startTime: 0,
  elapsedTime: 0,
  start: () =>
    set((state) => {
      if (state.running === false) {
        state.running = true;
        state.startTime = Date.now();
      }
    }),
  stop: () =>
    set((state) => {
      const now = Date.now();
      const elapsed = state.elapsedTime + (now - state.startTime);
      return {
        running: false,
        elapsedTime: elapsed,
      };
    }),
  reset: () => set(() => ({ running: false, startTime: 0, elapsedTime: 0 })),
  getTime: () => {
    if (get().running) {
      return get().elapsedTime + (Date.now() - get().startTime);
    }
    return get().elapsedTime;
  },
});
