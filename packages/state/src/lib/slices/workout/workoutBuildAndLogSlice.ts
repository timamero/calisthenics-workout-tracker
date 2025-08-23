// This slice will contain shared functionality between workout builds and logs
// Create combined action to set mode and initialize workout log/build

// Will put all the functionality of workout building and logging state here to prevent duplication
import { StateCreator } from "zustand";

import type {
  WorkoutBuild,
  WorkoutLog,
  Set,
  WorkoutExercise,
} from "@cwt/schema/workouts";

import { StoreState } from "../../store";
import {
  addSetToExercise,
  exerciseAtIndex,
  removeExerciseAtIndex,
  updateExercisesAtIndex,
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

const INITIALIZED_WORKOUT_LOG: WorkoutLogDraft = {
  title: "New workout log",
  workout_data: { exercises: [] },
  status: "draft",
  date: new Date(),
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
        workout: INITIALIZED_WORKOUT_LOG,
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
                  ...(state.workout?.workout_data
                    .exercises as WorkoutExercise[]),
                  INITIALIZED_EXERCISE,
                ],
              },
            } as WorkoutBuildDraft | WorkoutLogDraft;
            break;
          case Action.DeleteExercise:
            if (exerciseIndex && state.workout) {
              updatedWorkout = {
                ...state.workout,
                workout_data: {
                  exercises: removeExerciseAtIndex(
                    exerciseIndex,
                    state.workout
                  ),
                },
              } as WorkoutBuildDraft | WorkoutLogDraft;
            }
            break;
          case Action.AddSet:
            if (exerciseIndex && state.workout) {
              const exercise = exerciseAtIndex(exerciseIndex, state.workout);

              updatedExercise = addSetToExercise(exercise);

              updatedWorkout = updateWorkoutAtExerciseIndex(
                exerciseIndex,
                state.workout,
                updatedExercise,
                updateExercisesAtIndex
              );
            }

            break;
          case Action.DeleteSet:
            if (exerciseIndex && state.workout) {
              const exercise = exerciseAtIndex(exerciseIndex, state.workout);
              updatedExercise = {
                ...exercise,
                sets: [...exercise.sets.filter((set, ind) => ind !== setIndex)],
              } as WorkoutExercise;

              updatedWorkout = {
                ...state.workout,
                workout_data: {
                  exercises: [
                    ...state.workout.workout_data.exercises.map((ex, ind) => {
                      if (ind === exerciseIndex) {
                        return updatedExercise;
                      }
                      return ex;
                    }),
                  ],
                },
              } as WorkoutBuildDraft | WorkoutLogDraft;
            }

            break;
          case Action.UpdateSet:
            if (exerciseIndex && state.workout) {
              const exercise = exerciseAtIndex(exerciseIndex, state.workout);
              updatedExercise = {
                ...exercise,
                sets: [
                  ...exercise.sets.map((set, ind) => {
                    if (ind === setIndex) {
                      return updatedSet;
                    }
                    return set;
                  }),
                ],
              } as WorkoutExercise;

              updatedWorkout = {
                ...state.workout,
                workout_data: {
                  exercises: [
                    ...state.workout.workout_data.exercises.map((ex, ind) => {
                      if (ind === exerciseIndex) {
                        return updatedExercise;
                      }
                      return ex;
                    }),
                  ],
                },
              } as WorkoutBuildDraft | WorkoutLogDraft;
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
  resetWorkout: () => set(store.getInitialState()),
});
