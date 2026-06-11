import { StateCreator } from 'zustand';
import { produce } from 'immer';

import type {
  WorkoutLogRequest,
  WorkoutLogResponse,
  WorkoutBuildRequest,
  WorkoutBuildResponse,
  Mode,
} from '@cwt/schema/workouts';

export interface WorkoutLibrarySlice {
  loading: boolean;
  masterWorkoutLogs: Array<WorkoutLogRequest | WorkoutLogResponse>;
  masterWorkoutBuilds: Array<WorkoutBuildRequest | WorkoutBuildResponse>;
  displayedWorkoutBuilds: Array<WorkoutBuildRequest | WorkoutBuildResponse>;
  displayedWorkoutLogs: Array<WorkoutLogRequest | WorkoutLogResponse>;
  setLoading: (loading: boolean) => void;
  sortWorkoutLogsByDate: (
    logs: Array<WorkoutLogResponse>,
  ) => Array<WorkoutLogResponse>;
  sortWorkoutBuildsByCreationDate: (
    builds: Array<WorkoutBuildResponse>,
  ) => Array<WorkoutBuildResponse>;
  setWorkouts: (
    logs: Array<WorkoutLogResponse>,
    builds: Array<WorkoutBuildResponse>,
  ) => void;
  addWorkout: (
    workout: WorkoutBuildRequest | WorkoutLogRequest,
    mode: Mode,
  ) => void;
  deleteWorkout: (workoutId: number) => void;
  completeWorkout: (
    workout: WorkoutBuildRequest | WorkoutLogRequest,
    mode: Mode,
  ) => void;
}

export const createWorkoutLibrarySlice: StateCreator<
  WorkoutLibrarySlice,
  [['zustand/immer', never]],
  [],
  WorkoutLibrarySlice
> = (set, get) => ({
  loading: true,
  masterWorkoutLogs: [], // TODO: Check that the max number returned is 20
  masterWorkoutBuilds: [], // TODO: Check that the max number returned is 10
  displayedWorkoutBuilds: [],
  displayedWorkoutLogs: [],
  setLoading: (loading) => set({ loading }),
  sortWorkoutLogsByDate: (logs) => {
    return [...logs].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  },
  sortWorkoutBuildsByCreationDate: (builds) => {
    return [...builds].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  },
  setWorkouts: (logs, builds) => {
    set(() => ({
      masterWorkoutLogs: logs,
      masterWorkoutBuilds: builds,
      displayedWorkoutBuilds: get().sortWorkoutBuildsByCreationDate(builds),
      displayedWorkoutLogs: get().sortWorkoutLogsByDate(logs),
    }));
  },
  addWorkout: (workout, mode) =>
    set(
      produce((state: WorkoutLibrarySlice) => {
        if (mode === 'build') {
          state.displayedWorkoutBuilds = [
            workout as WorkoutBuildRequest | WorkoutBuildResponse,
            ...state.displayedWorkoutBuilds,
          ];
        } else {
          state.displayedWorkoutLogs = [
            workout as WorkoutLogRequest | WorkoutLogResponse,
            ...state.displayedWorkoutLogs,
          ];
        }
      }),
    ),
  deleteWorkout: (workoutId) =>
    set((state) => {
      // Filter out logs that have an `id` matching the provided workoutId.
      // Some log types (requests) may not have `id`, so keep those.
      state.masterWorkoutLogs = state.masterWorkoutLogs.filter((item) =>
        typeof (item as WorkoutLogResponse).id === 'number'
          ? (item as WorkoutLogResponse).id !== workoutId
          : true,
      );
      // Also remove from displayed logs
      state.displayedWorkoutLogs = state.displayedWorkoutLogs.filter((item) =>
        typeof (item as WorkoutLogResponse).id === 'number'
          ? (item as WorkoutLogResponse).id !== workoutId
          : true,
      );
    }),
  completeWorkout: (workout, mode) => {
    get().addWorkout(workout, mode);
  },
});
