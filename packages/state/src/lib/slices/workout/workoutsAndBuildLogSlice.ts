import { StateCreator } from "zustand";

import type { WorkoutLog, WorkoutBuild } from "@cwt/schema/workouts";

import { StoreState } from "../../store";
import { Mode } from "./workoutDraftSlice";

export interface WorkoutsAndBuildLogSlice {
  completeWorkout: (mode: Mode, workout: WorkoutLog | WorkoutBuild) => void;
}

export const createWorkoutsAndBuildLogSlice: StateCreator<
  StoreState,
  [],
  [],
  WorkoutsAndBuildLogSlice
> = (set, get) => ({
  completeWorkout: (mode, workout) => {
    get().addWorkout(mode, workout);
    get().resetWorkout();
  },
});
