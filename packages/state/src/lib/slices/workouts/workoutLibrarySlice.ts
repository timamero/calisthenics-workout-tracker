import { StateCreator } from 'zustand';
import { produce } from 'immer';

import type {
  WorkoutLog,
  WorkoutBuildRequest,
  WorkoutBuildResponse,
} from '@cwt/schema/workouts';

import type { Mode } from './workoutDraftSlice';

export interface WorkoutLibrarySlice {
  masterWorkoutLogs: WorkoutLog[];
  masterWorkoutBuilds: WorkoutBuildRequest[] | WorkoutBuildResponse[];
  displayedWorkoutBuilds: WorkoutBuildRequest[] | WorkoutBuildResponse[];
  setWorkouts: (
    logs: WorkoutLog[],
    builds: WorkoutBuildRequest[] | WorkoutBuildResponse[],
  ) => void;
  addWorkout: (workout: WorkoutBuildRequest, mode: Mode) => void;
  completeWorkout: (workout: WorkoutBuildRequest, mode: Mode) => void;
}

export const createWorkoutLibrarySlice: StateCreator<
  WorkoutLibrarySlice,
  [['zustand/immer', never]],
  [],
  WorkoutLibrarySlice
> = (set, get) => ({
  masterWorkoutLogs: [], // TODO: Check that the max number returned is 20
  masterWorkoutBuilds: [], // TODO: Check that the max number returned is 10
  displayedWorkoutBuilds: [],
  // TODO: Create action function to sort logs by date and builds by creation date
  setWorkouts: (logs, builds) =>
    set(() => ({
      masterWorkoutLogs: logs,
      masterWorkoutBuilds: builds,
      displayedWorkoutBuilds: builds,
    })),
  addWorkout: (workout, mode) =>
    set(
      produce((state) => {
        if (mode === 'build') {
          state.displayedWorkoutBuilds = [
            ...state.displayedWorkoutBuilds,
            workout,
          ];
        } else {
          state.masterWorkoutLogs = [
            ...state.masterWorkoutLogs,
            {
              workout_data: workout.workout_data,
              title: workout.title || 'Untitled workout',
              status: 'draft',
              source: 'manual',
            },
          ];
        }
      }),
    ),
  completeWorkout: (workout, mode) => {
    get().addWorkout(workout, mode);
  },
});
