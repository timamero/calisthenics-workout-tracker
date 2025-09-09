import { StateCreator } from 'zustand';
import { produce } from 'immer';

import type { WorkoutLog, WorkoutBuild } from '@cwt/schema/workouts';

import { StoreState } from '../../store';
import { Mode } from './workoutDraftSlice';

export interface WorkoutLibrarySlice {
  masterWorkoutLogs: WorkoutLog[];
  masterWorkoutBuilds: WorkoutBuild[];
  displayedWorkoutBuilds: WorkoutBuild[];
  setWorkouts: (logs: WorkoutLog[], builds: WorkoutBuild[]) => void;
  addWorkout: (mode: Mode, workout: WorkoutLog | WorkoutBuild) => void;
  completeWorkout: () => void;
}

export const createWorkoutLibrarySlice: StateCreator<
  StoreState,
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
  addWorkout: (mode, workout) =>
    set(
      produce((state) => {
        // TODO: only add workout if successfully saved to database
        if (mode === 'build') {
          state.displayedWorkoutBuilds = [
            ...state.displayedWorkoutBuilds,
            workout,
          ];
        } else {
          state.masterWorkoutLogs = [...state.masterWorkoutLogs, workout];
        }
      }),
    ),
  completeWorkout: () => {
    const mode = get().mode;
    const workout = get().workout;
    const title = get().workoutTitle;
    if (mode && workout) {
      get().addWorkout(mode, { ...workout, title: title } as
        | WorkoutLog
        | WorkoutBuild);
      get().resetWorkout();
    }
  },
});
