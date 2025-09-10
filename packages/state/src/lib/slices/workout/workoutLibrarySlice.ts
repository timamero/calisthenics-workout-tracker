import { StateCreator } from 'zustand';
import { produce } from 'immer';

import type {
  WorkoutLog,
  WorkoutBuild,
  WorkoutBuildRequest,
  WorkoutBuildResponse,
} from '@cwt/schema/workouts';

import { StoreState } from '../../store';
import { Mode } from './workoutDraftSlice';

export interface WorkoutLibrarySlice {
  masterWorkoutLogs: WorkoutLog[];
  masterWorkoutBuilds: WorkoutBuildRequest[] | WorkoutBuildResponse[];
  displayedWorkoutBuilds: WorkoutBuildRequest[] | WorkoutBuildResponse[];
  setWorkouts: (logs: WorkoutLog[], builds: WorkoutBuild[]) => void;
  // addWorkout: (mode: Mode, workout: WorkoutLog | WorkoutBuildRequest) => void;
  addWorkout: () => void;
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
  // addWorkout: (mode, workout) =>
  addWorkout: () =>
    set(
      produce((state) => {
        // TODO: only add workout if successfully saved to database
        if (state.mode === 'build') {
          state.displayedWorkoutBuilds = [
            ...state.displayedWorkoutBuilds,
            {
              workout_data: state.workoutData,
              title: state.workoutTitle || 'Untitled workout',
              status: 'draft',
              source: 'manual',
            },
          ];
        } else {
          state.masterWorkoutLogs = [
            ...state.masterWorkoutLogs,
            {
              workout_data: state.workoutData,
              title: state.workoutTitle || 'Untitled workout',
              status: 'draft',
              source: 'manual',
            },
          ];
        }
      }),
    ),
  completeWorkout: () => {
    // const mode = get().mode;
    // const workoutData = get().workoutData;
    // const title = get().workoutTitle;
    // if (mode) {
    get().addWorkout();
    get().resetWorkout();
    //   }
  },
});
