import { StateCreator } from "zustand";

import type {
  WorkoutBuild,
  WorkoutLog,
  Set,
  WorkoutExercise,
} from "@cwt/schema/workouts";

import { StoreState } from "../../store";
import {
  addExercise,
  addSetToExercise,
  deleteSetInExercise,
  exerciseAtIndex,
  removeExerciseAtIndex,
  updateExercise,
  updateExercisesAtIndex,
  updateSetInExercise,
  updateWorkoutAtExerciseIndex,
} from "./workoutBuildAndLogActions";

export enum Mode {
  Build = "BUILD",
  Log = "LOG",
  Edit = "EDIT",
}

enum Action {
  AddExercise = "ADD_EXERCISE",
  DeleteExercise = "DELETE_EXERCISE",
  AddSet = "ADD_SET",
  DeleteSet = "DELETE_SET",
  UpdateSet = "UPDATE_SET",
}

export type WorkoutBuildDraft = Pick<
  WorkoutBuild,
  "title" | "workout_data" | "status" | "source"
>;
export type WorkoutLogDraft = Pick<
  WorkoutLog,
  "title" | "workout_data" | "status" | "date"
>;

export interface WorkoutBuildAndLogSlice {
  mode: Mode | null;
  workout: WorkoutBuildDraft | WorkoutLogDraft | null;
  setMode: (mode: Mode.Edit | Mode.Log) => void;
  initializeWorkout: (mode: Mode) => void;
  updateWorkout: (
    action: Action,
    exerciseID?: number,
    exerciseIndex?: number,
    setIndex?: number,
    updatedSet?: Set
  ) => void;
  resetWorkout: () => void;
}

const INITIALIZED_WORKOUT_LOG: Omit<WorkoutLogDraft, "date"> = {
  title: "New workout log",
  workout_data: { exercises: [] },
  status: "draft",
};

const INITIALIZED_WORKOUT_BUILD: WorkoutBuildDraft = {
  title: "New workout template",
  workout_data: { exercises: [] },
  status: "draft",
  source: "manual",
};

export const createWorkoutBuildAndLogSlice: StateCreator<
  StoreState,
  [],
  [],
  WorkoutBuildAndLogSlice
> = (set, get) => ({
  mode: null,
  workout: null,
  setMode: (mode) => set(() => ({ mode: mode })),
  initializeWorkout: (mode) =>
    set(() => {
      if (mode === Mode.Build) {
        return {
          workout: INITIALIZED_WORKOUT_BUILD,
          mode: mode,
        };
      }

      return {
        workout: { ...INITIALIZED_WORKOUT_LOG, date: new Date() },
        mode: mode,
      };
    }),
  updateWorkout: (action, exerciseID, exerciseIndex, setIndex, updatedSet) =>
    set((state) => {
      if (state.mode === Mode.Edit || state.mode === Mode.Build) {
        let updatedWorkout: WorkoutBuildDraft | WorkoutLogDraft | null = null;
        let updatedExercise: WorkoutExercise;

        switch (action) {
          case Action.AddExercise:
            if (state.workout) {
              updatedWorkout = updateWorkoutAtExerciseIndex(
                null,
                state.workout,
                null,
                addExercise,
                exerciseID
              );
            }
            break;
          case Action.DeleteExercise:
            if (exerciseIndex && state.workout) {
              updatedWorkout = updateWorkoutAtExerciseIndex(
                exerciseIndex,
                state.workout,
                null,
                removeExerciseAtIndex
              );
            }
            break;
          case Action.AddSet:
            if (exerciseIndex && state.workout) {
              const exercise = exerciseAtIndex(exerciseIndex, state.workout);
              updatedExercise = updateExercise(
                exercise,
                null,
                addSetToExercise
              );

              updatedWorkout = updateWorkoutAtExerciseIndex(
                exerciseIndex,
                state.workout,
                updatedExercise,
                updateExercisesAtIndex
              );
            }

            break;
          case Action.DeleteSet:
            if (exerciseIndex && setIndex && state.workout) {
              const exercise = exerciseAtIndex(exerciseIndex, state.workout);
              updatedExercise = updateExercise(
                exercise,
                setIndex,
                deleteSetInExercise
              );

              updatedWorkout = updateWorkoutAtExerciseIndex(
                exerciseIndex,
                state.workout,
                updatedExercise,
                updateExercisesAtIndex
              );
            }

            break;
          case Action.UpdateSet:
            if (exerciseIndex && setIndex && state.workout) {
              const exercise = exerciseAtIndex(exerciseIndex, state.workout);
              updatedExercise = updateExercise(
                exercise,
                setIndex,
                updateSetInExercise,
                updatedSet
              );

              updatedWorkout = updateWorkoutAtExerciseIndex(
                exerciseIndex,
                state.workout,
                updatedExercise,
                updateExercisesAtIndex
              );
            }
            break;
        }

        return {
          workout: updatedWorkout,
        };
      }
      return {
        ...state,
      };
    }),
  resetWorkout: () => set(() => ({ workout: null, mode: null })),
});
