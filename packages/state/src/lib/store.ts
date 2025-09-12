// import { create } from 'zustand';
// import { immer } from 'zustand/middleware/immer';

// import {
//   createExercisesSlice,
//   ExercisesSlice,
// } from './slices/exercises/exercisesSlice';
// import {
//   createExercisesFilterSlice,
//   ExercisesFilterSlice,
// } from './slices/exercises/exercisesFilterSliceSuperseded';
// import {
//   createStopwatchSlice,
//   StopwatchSlice,
// } from './slices/workouts/stopwatchSlice';

// export type StoreState = ExercisesSlice & ExercisesFilterSlice & StopwatchSlice;
// export const useStore = create<StoreState>()(
//   immer((...a) => ({
//     ...createExercisesSlice(...a),
//     ...createExercisesFilterSlice(...a),
//     ...createStopwatchSlice(...a),
//   })),
// );
