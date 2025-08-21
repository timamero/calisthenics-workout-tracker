// This slice will contain shared functionality between workout builds and logs
// Create combined action to set mode and initialize workout log/build
import { StateCreator } from "zustand";

import type { WorkoutBuild, WorkoutLog } from "@cwt/schema/workouts";

export interface WorkoutBuildAndLogBaseSlice {
  mode: string;
}