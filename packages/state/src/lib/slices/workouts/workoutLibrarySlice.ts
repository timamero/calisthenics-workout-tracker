import { StateCreator } from 'zustand';
import { produce } from 'immer';

import type {
  // WorkoutLogRequest,
  WorkoutLogResponse,
  WorkoutBuildRequest,
  WorkoutBuildResponse,
  Mode,
} from '@cwt/schema/workouts';

export interface WorkoutLibrarySlice {
  loading: boolean;
  masterWorkoutLogs: Array<WorkoutLogResponse>;
  masterWorkoutBuilds: Array<WorkoutBuildResponse | WorkoutBuildResponse>;
  displayedWorkoutBuilds: Array<WorkoutBuildResponse | WorkoutBuildResponse>;
  displayedWorkoutLogs: Array<WorkoutLogResponse>;
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
    workout: WorkoutBuildResponse | WorkoutLogResponse,
    mode: Mode,
  ) => void;
  deleteWorkout: (workoutId: number) => void;
  completeWorkout: (
    workout: WorkoutBuildResponse | WorkoutLogResponse,
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
            workout as WorkoutBuildResponse,
            ...state.displayedWorkoutBuilds,
          ];
        } else {
          state.displayedWorkoutLogs = [
            workout as WorkoutLogResponse,
            ...state.displayedWorkoutLogs,
          ];
        }
      }),
    ),
  deleteWorkout: (workoutId) =>
    set((state) => {
      state.masterWorkoutLogs = state.masterWorkoutLogs.filter(
        (item) => item.id !== workoutId,
      );
      state.displayedWorkoutLogs = state.displayedWorkoutLogs.filter(
        (item) => item.id !== workoutId,
      );
    }),
  completeWorkout: (workout, mode) => {
    get().addWorkout(workout, mode);
  },
});
