// This slice will contain shared functionality between workout builds and logs
// Create combined action to set mode and initialize workout log/build

// Will put all the functionality of workout building and logging state here to prevent duplication
import { StateCreator } from "zustand";

import type { WorkoutBuild, WorkoutLog, SetFieldsSchema } from "@cwt/schema/workouts";

import { StoreState } from "../../store";

export enum Mode {
  Build = 'BUILD',
  Log = 'LOG',
  Edit = 'EDIT'
}

enum Action {
  AddExercise = 'ADD_EXERCISE',
  DeleteExercise = 'DELETE_EXERCISE',
  AddSet = 'ADD_SET',
  DeleteSet = 'DELETE_SET',
  UpdateField = 'UPDATE_FIELD'
}

type WorkoutBuildDraft = Pick<WorkoutBuild, "title" | "workout_data" | "status" | "source">
type WorkoutLogDraft = Pick<WorkoutLog, "title"| "workout_data" | "status" | "date" | "duration">

export interface WorkoutBuildAndLogSlice {
  mode: Mode | null;
  workout: WorkoutBuildDraft | WorkoutLogDraft | null;
  initializeWorkout: (mode: Mode) => void;
  updateWorkout: (action: Action, exerciseIndex: number, setIndex: number, fields?: Partial<SetFieldsSchema>) => void;
  resetWorkout: () => void;
}

const INITIALIZED_WORKOUT_LOG: WorkoutLogDraft = {
  title: "New workout log",
  workout_data: {exercises: []},
  status: "draft",
  date: new Date(),
  duration: null,
}

const INITIALIZED_WORKOUT_BUILD: WorkoutBuildDraft = {
  title: "New workout template",
  workout_data: {exercises: []},
  status: "draft",
  source: "manual"
}

export const createWorkoutBuildAndLogSlice: StateCreator<
  StoreState,
  [],
  [],
  WorkoutBuildAndLogSlice
> = (set, get, store) => ({
  mode: null,
  workout: null,
  initializeWorkout: (mode) => set(() => {
    if (mode === Mode.Build) {
      return {
        workout: INITIALIZED_WORKOUT_BUILD,
        mode: mode,
      }
    }

    return {
      workout: INITIALIZED_WORKOUT_LOG,
      mode: mode,
    }
  }),
  updateWorkout: (action, exerciceIndex, setIndex, fields) => set((state) => {
    switch (action) {
      case Action.AddExercise:
        // add exercise
        break;
      case Action.DeleteExercise:
        // delete exercise
        break;
      case Action.AddSet:
        // add set
        break;
      case Action.DeleteSet:
        // delete set
        break;
      case Action.UpdateField:
        // update field
        break;
    }

    return {
      ...state
    }
  }),
  resetWorkout: () => set(store.getInitialState())
})