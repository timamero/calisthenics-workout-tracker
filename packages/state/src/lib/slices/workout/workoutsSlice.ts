// ****** Workout builds and logs list
// When user first loads the app, the app will fetch the latest 20 workout logs and all the workout builds (users will have a limit of 10 builds)
// The workout logs and builds are saved to their respective list variables
import { StateCreator } from "zustand";

import type { WorkoutLog, WorkoutBuild } from "@cwt/schema/workouts"

import { StoreState } from '../../store';

export interface WorkoutsSlice {
  masterWorkoutLogs: WorkoutLog[];
  masterWorkoutBuilds: WorkoutBuild[];
  setWorkouts: (logs: WorkoutLog[], builds: WorkoutBuild[]) => void;
}

export const createWorkoutsSlice: StateCreator<StoreState, [], [], WorkoutsSlice> = ( set, get) => ({
  masterWorkoutLogs: [],
  masterWorkoutBuilds: [],
  setWorkouts: (logs, builds) => set(() => ({masterWorkoutLogs: logs, masterWorkoutBuilds: builds}))
})