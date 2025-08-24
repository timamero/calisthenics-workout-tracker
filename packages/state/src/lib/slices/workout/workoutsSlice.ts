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
  masterWorkoutLogs: [], // TODO: Check that the max number returned is 20
  masterWorkoutBuilds: [], // TODO: Check that the max number returned is 10
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
