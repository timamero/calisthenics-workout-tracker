// This slice will contain shared functionality between workout builds and logs
// Create combined action to set mode and initialize workout log/build

// Will put all the functionality of workout building and logging state here to prevent duplication
import { StateCreator } from "zustand";

import type {
  WorkoutBuild,
  WorkoutLog,
  Set,
  SetFields,
  WorkoutExercise,
} from "@cwt/schema/workouts";

import { StoreState } from "../../store";

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

type WorkoutBuildDraft = Pick<
  WorkoutBuild,
  "title" | "workout_data" | "status" | "source"
>;
type WorkoutLogDraft = Pick<
  WorkoutLog,
  "title" | "workout_data" | "status" | "date" | "duration"
>;

export interface WorkoutBuildAndLogSlice {
  mode: Mode | null;
  workout: WorkoutBuildDraft | WorkoutLogDraft | null;
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

const INITIALIZED_WORKOUT_LOG: WorkoutLogDraft = {
  title: "New workout log",
  workout_data: { exercises: [] },
  status: "draft",
  date: new Date(),
  duration: null,
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
> = (set, get, store) => ({
  mode: null,
  workout: null,
  initializeWorkout: (mode) =>
    set(() => {
      if (mode === Mode.Build) {
        return {
          workout: INITIALIZED_WORKOUT_BUILD,
          mode: mode,
        };
      }

      return {
        workout: INITIALIZED_WORKOUT_LOG,
        mode: mode,
      };
    }),
  updateWorkout: (action, exerciseID, exerciseIndex, setIndex, updatedSet) =>
    set((state) => {
      let updatedWorkout: WorkoutBuildDraft | WorkoutLogDraft | null = null;
      let exercise: WorkoutExercise | null = null;
      let updatedExercise: WorkoutExercise;

      if (exerciseIndex) {
        exercise = state.workout?.workout_data.exercises[
          exerciseIndex
        ] as WorkoutExercise;
      }

      switch (action) {
        case Action.AddExercise:
          const INITIALIZED_EXERCISE: WorkoutExercise = {
            exercise_id: exerciseID as number,
            tracked: ["reps"], // TODO: Get default tracking field from exercise object
            sets: [
              {
                fields: { reps: 0, rest: "30S" },
                completed: false,
                completed_at: null,
              },
            ],
          };

          updatedWorkout = {
            ...state.workout,
            workout_data: {
              exercises: [
                ...(state.workout?.workout_data.exercises as WorkoutExercise[]),
                INITIALIZED_EXERCISE,
              ],
            },
          } as WorkoutBuildDraft | WorkoutLogDraft;
          break;
        case Action.DeleteExercise:
          updatedWorkout = {
            ...state.workout,
            workout_data: {
              exercises: [
                ...(state.workout?.workout_data.exercises.filter(
                  (ex, ind) => ind !== exerciseIndex
                ) as WorkoutExercise[]),
              ],
            },
          } as WorkoutBuildDraft | WorkoutLogDraft;
          break;
        case Action.AddSet:
          const INITIALIZED_SET = {
            fields: { reps: 0, rest: "30S" },
            completed: false,
            completed_at: null,
          };

          updatedExercise = {
            ...exercise,
            sets: [...(exercise?.sets as SetFields[]), INITIALIZED_SET],
          } as WorkoutExercise;

          updatedWorkout = {
            ...state.workout,
            workout_data: {
              exercises: [
                ...(state.workout?.workout_data.exercises.map((ex, ind) => {
                  if (ind === exerciseID) {
                    return updatedExercise;
                  }
                  return ex;
                }) as WorkoutExercise[]),
              ],
            },
          } as WorkoutBuildDraft | WorkoutLogDraft;

          break;
        case Action.DeleteSet:
          updatedExercise = {
            ...exercise,
            sets: [
              ...(exercise?.sets.filter(
                (set, ind) => ind !== setIndex
              ) as SetFields[]),
            ],
          } as WorkoutExercise;

          updatedWorkout = {
            ...state.workout,
            workout_data: {
              exercises: [
                ...(state.workout?.workout_data.exercises.map((ex, ind) => {
                  if (ind === exerciseID) {
                    return updatedExercise;
                  }
                  return ex;
                }) as WorkoutExercise[]),
              ],
            },
          } as WorkoutBuildDraft | WorkoutLogDraft;
          break;
        case Action.UpdateSet:
          updatedExercise = {
            ...exercise,
            sets: [
              ...(exercise?.sets.map(
                (set, ind) => {
                  if (ind === setIndex) {
                    return updatedSet
                  }
                  return set
                }
              ) as SetFields[]),
            ],
          } as WorkoutExercise;


         updatedWorkout = {
            ...state.workout,
            workout_data: {
              exercises: [
                ...(state.workout?.workout_data.exercises.map((ex, ind) => {
                  if (ind === exerciseID) {
                    return updatedExercise;
                  }
                  return ex;
                }) as WorkoutExercise[]),
              ],
            },
          } as WorkoutBuildDraft | WorkoutLogDraft;
          break;
      }

      return {
        workout: updatedWorkout,
      };
    }),
  resetWorkout: () => set(store.getInitialState()),
});
