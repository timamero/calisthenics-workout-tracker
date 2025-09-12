// Disable later
// // Track the duration of workout logging
// // https://chatgpt.com/c/68a64e56-86bc-832a-a4ed-4588244a2c8a
// import { StateCreator } from "zustand";
// import { StoreState } from "../../store";

// export interface StopwatchSlice {
//   running: boolean;
//   startTime: number;
//   elapsedTime: number;
//   start: () => void;
//   stop: () => void;
//   reset: () => void;
//   getTime: () => void;
// }

// export const createStopwatchSlice: StateCreator<
//   StoreState,
//   [['zustand/immer', never]],
//   [],
//   StopwatchSlice
// > = (set, get) => ({
//   running: false,
//   startTime: 0,
//   elapsedTime: 0,
//   start: () => set((state) => {
//     if (state.running) {
//       return {
//         running: true,
//         startTime: Date.now(),
//       }
//     }
//     return {
//       ...state
//     }
//   }),
//   stop: () => set((state) => {
//     const now = Date.now();
//     const elapsed = state.elapsedTime + (now - state.startTime)
//     return {
//       running: false,
//       elapsedTime: elapsed
//     }
//   }),
//   reset: () => set(() => ({running: false, startTime: 0, elapsedTime: 0})),
//   getTime: () => {
//     if (get().running) {
//       return get().elapsedTime + (Date.now() - get().startTime);
//     }
//     return get().elapsedTime
//   }
// })
