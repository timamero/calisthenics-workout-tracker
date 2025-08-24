// ****** Workout builds and logs list
// When user first loads the app, the app will fetch the latest 20 workout logs and all the workout builds (users will have a limit of 10 builds)
// The workout logs and builds are saved to their respective list variables
import { StateCreator } from "zustand";

import type { WorkoutLog, WorkoutBuild } from "@cwt/schema/workouts";

import { StoreState } from "../../store";
import { Mode } from "./workoutBuildAndLogSlice";

export interface WorkoutsSlice {
  masterWorkoutLogs: WorkoutLog[];
  masterWorkoutBuilds: WorkoutBuild[];
  setWorkouts: (logs: WorkoutLog[], builds: WorkoutBuild[]) => void;
  addWorkout: (mode: Mode, workout: WorkoutLog | WorkoutBuild) => void;
}

export const createWorkoutsSlice: StateCreator<
  StoreState,
  [],
  [],
  WorkoutsSlice
> = (set, get) => ({
  masterWorkoutLogs: [],
  masterWorkoutBuilds: [],
  // TODO: Create action function to sort logs by date and builds by creation date
  setWorkouts: (logs, builds) =>
    set(() => ({ masterWorkoutLogs: logs, masterWorkoutBuilds: builds })),
  addWorkout: (mode, workout) =>
    set((state) => {
      // The workout object will be the object returned from the database, not from workout state

      if (mode === Mode.Build) {
        return {
          masterWorkoutBuilds: [
            ...state.masterWorkoutBuilds,
            workout as WorkoutBuild,
          ],
        };
      }

      return {
        masterWorkoutLogs: [...state.masterWorkoutLogs, workout as WorkoutLog],
      };
    }),
});
