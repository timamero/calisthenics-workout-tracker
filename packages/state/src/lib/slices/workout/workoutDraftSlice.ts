import { StateCreator } from 'zustand';

import type { WorkoutBuild, WorkoutLog } from '@cwt/schema/workouts';

import { StoreState } from '../../store';
import {
  addSetToExercise,
  deleteSetInExercise, // TODO: Update this action
  exerciseAtIndex,
  removeExerciseAtIndex,
  updateExercise,
  updateExercisesAtIndex, // TODO: Update this action
  updateSetInExercise, // TODO: Update this action
  addExerciseToWorkout,
  applyExerciseUpdateAtIndex,
} from './workoutDraftActions';
import { Tracking } from '@cwt/schema/exercises';

import {
  INITIALIZED_WORKOUT_LOG,
  INITIALIZED_WORKOUT_BUILD,
} from './workoutDefaults';

export type Mode = 'build' | 'edit' | 'log';

export type WorkoutBuildDraft = Pick<
  WorkoutBuild,
  'title' | 'workout_data' | 'status' | 'source'
>;
export type WorkoutLogDraft = Pick<
  WorkoutLog,
  'title' | 'workout_data' | 'status' | 'date'
>;

interface WorkoutDraftState {
  mode: Mode | null;
  workout: WorkoutBuildDraft | WorkoutLogDraft | null;
  workoutTitle: string | null;
  selectedExerciseIDToAdd: number | null;
  selectedSetIndexToMod: number | null;
}

interface WorkoutDraftAction {
  setMode: (mode: Mode) => void;
  initializeWorkout: () => void;
  setWorkoutTitle: (title: string) => void;
  setSelectedExerciseIDToAdd: (exerciseID: number | null) => void;
  setSelectedSetIndexToMod: (setIndex: number | null) => void;
  addExercise: () => void;
  removeExercise: (exerciseIndex: number) => void;
  addSet: (exerciseIndex: number) => void;
  deleteSet: (exerciseIndex: number) => void;
  updateField: (
    exerciseIndex: number,
    updatedField: {
      reps?: number | undefined;
      weight?: number | undefined;
      time?: string | undefined;
      rest?: string | undefined;
    },
  ) => void;
  resetWorkout: () => void;
}

export type WorkoutDraftSlice = WorkoutDraftState & WorkoutDraftAction;

// const INITIALIZED_WORKOUT_LOG: Omit<WorkoutLogDraft, 'date'> = {
//   title: 'New workout log',
//   workout_data: { exercises: [] },
//   status: 'draft',
// };

// const INITIALIZED_WORKOUT_BUILD: WorkoutBuildDraft = {
//   title: 'New workout template',
//   workout_data: { exercises: [] },
//   status: 'draft',
//   source: 'manual',
// };

export const createWorkoutDraftSlice: StateCreator<
  StoreState,
  [['zustand/immer', never]],
  [],
  WorkoutDraftSlice
> = (set, get) => ({
  mode: null,
  workout: null,
  workoutTitle: null,
  selectedExerciseIDToAdd: null,
  selectedSetIndexToMod: null,
  setMode: (mode) => set(() => ({ mode: mode })),
  initializeWorkout: () =>
    set((state) => {
      const mode = state.mode;
      if (mode === 'build') {
        return {
          workout: INITIALIZED_WORKOUT_BUILD as WorkoutBuild,
          mode: mode,
        };
      }

      return {
        workout: { ...INITIALIZED_WORKOUT_LOG, date: new Date() } as WorkoutLog,
        mode: mode,
      };
    }),
  setWorkoutTitle: (title) =>
    set((state) => {
      state.workoutTitle = title;
    }),
  setSelectedExerciseIDToAdd: (exerciseID) =>
    set((state) => {
      state.selectedExerciseIDToAdd = exerciseID;
    }),
  setSelectedSetIndexToMod: (setIndex) =>
    set((state) => {
      state.selectedSetIndexToMod = setIndex;
    }),
  addExercise: () =>
    set((state) => {
      const exerciseID = state.selectedExerciseIDToAdd;
      if (exerciseID == null) {
        console.error('No exerciseID provided');
        return;
      }
      if ((state.mode === 'edit' || state.mode === 'build') && state.workout) {
        const tracking: Tracking[] =
          get().getExerciseByID(exerciseID).default_tracking_type;
        state.workout = addExerciseToWorkout(
          state.workout,
          exerciseID,
          tracking,
        );
      } else if (!state.workout) {
        console.error('No workout to add exercise to');
      } else if (state.mode !== 'edit' && state.mode !== 'build') {
        console.error('Cannot add exercise in log mode');
      }
    }),
  removeExercise: (exerciseIndex) =>
    set((state) => {
      if ((state.mode === 'edit' || state.mode === 'build') && state.workout) {
        state.workout = applyExerciseUpdateAtIndex(
          exerciseIndex,
          state.workout,
          null,
          removeExerciseAtIndex,
        );
      } else if (!state.workout) {
        console.error('No workout to remove exercise from');
      } else if (state.mode !== 'edit' && state.mode !== 'build') {
        console.error('Cannot remove exercise in log mode');
      }
    }),
  addSet: (exerciseIndex) =>
    set((state) => {
      if (exerciseIndex === undefined) {
        console.error('Exercise index not provided');
        return;
      }
      if ((state.mode === 'edit' || state.mode === 'build') && state.workout) {
        const exercise = exerciseAtIndex(exerciseIndex, state.workout);
        state.workout.workout_data.exercises[exerciseIndex] = updateExercise(
          exercise,
          null,
          addSetToExercise,
        );
      } else if (!state.workout) {
        console.error('No workout to add set to');
      } else if (state.mode !== 'edit' && state.mode !== 'build') {
        console.error('Cannot add set in log mode');
      }
    }),
  deleteSet: (exerciseIndex) =>
    set((state) => {
      if (exerciseIndex === undefined) {
        console.error('Invalid exercise index');
        return;
      }

      const setIndex = state.selectedSetIndexToMod;
      if (setIndex === undefined) {
        console.error('Invalid set index');
        return;
      }
      if ((state.mode === 'edit' || state.mode === 'build') && state.workout) {
        const sets = exerciseAtIndex(exerciseIndex, state.workout).sets;
        state.workout.workout_data.exercises[exerciseIndex].sets = [
          ...sets.filter((_, ind) => ind !== setIndex),
        ]; // TODO: Look into using splice
      } else if (!state.workout) {
        console.error('No workout to add set to');
      } else if (state.mode !== 'edit' && state.mode !== 'build') {
        console.error('Cannot add set in log mode');
      }
    }),
  updateField: (exerciseIndex, updatedField) =>
    set((state) => {
      if (exerciseIndex === undefined) {
        console.error('Invalid exercise index');
        return;
      }

      const setIndex = get().selectedSetIndexToMod;
      if (setIndex === undefined || setIndex == null) {
        console.error('Invalid set index');
        return;
      }
      if ((state.mode === 'edit' || state.mode === 'build') && state.workout) {
        const set = exerciseAtIndex(exerciseIndex, state.workout).sets[
          setIndex
        ];
        state.workout.workout_data.exercises[exerciseIndex].sets[setIndex] = {
          ...set,
          fields: { ...set.fields, ...updatedField },
        };
      } else if (!state.workout) {
        console.error('No workout to update field for');
      } else if (state.mode !== 'edit' && state.mode !== 'build') {
        console.error('Cannot update field in log mode');
      }
    }),
  resetWorkout: () => set(() => ({ workout: null, mode: null })),
});
