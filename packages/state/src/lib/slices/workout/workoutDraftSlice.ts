import { StateCreator } from 'zustand';

import type {
  WorkoutBuild,
  WorkoutLog,
  Set,
  WorkoutExercise,
} from '@cwt/schema/workouts';

import { StoreState } from '../../store';
import {
  // addExercise,
  addSetToExercise,
  deleteSetInExercise,
  exerciseAtIndex,
  removeExerciseAtIndex,
  updateExercise,
  updateExercisesAtIndex,
  updateSetInExercise,
  addExerciseToWorkout,
  applyExerciseUpdateAtIndex,
} from './workoutDraftActions';
import { Tracking } from '@cwt/schema/exercises';

export type Mode = 'build' | 'edit' | 'log';

export type WorkoutBuildDraft = Pick<
  WorkoutBuild,
  'title' | 'workout_data' | 'status' | 'source'
>;
export type WorkoutLogDraft = Pick<
  WorkoutLog,
  'title' | 'workout_data' | 'status' | 'date'
>;

export interface WorkoutDraftSlice {
  mode: Mode | null;
  workout: WorkoutBuildDraft | WorkoutLogDraft | null;
  setMode: (mode: Mode) => void;
  initializeWorkout: () => void;
  addExercise: (exerciseID: number) => void;
  removeExercise: (exerciseIndex: number) => void;
  addSet: (exerciseIndex: number) => void;
  deleteSet: (exerciseIndex: number, setIndex: number) => void;
  updateSet: (exerciseIndex: number, setIndex: number, updatedSet: Set) => void;
  resetWorkout: () => void;
}

const INITIALIZED_WORKOUT_LOG: Omit<WorkoutLogDraft, 'date'> = {
  title: 'New workout log',
  workout_data: { exercises: [] },
  status: 'draft',
};

const INITIALIZED_WORKOUT_BUILD: WorkoutBuildDraft = {
  title: 'New workout template',
  workout_data: { exercises: [] },
  status: 'draft',
  source: 'manual',
};

export const createWorkoutDraftSlice: StateCreator<
  StoreState,
  [['zustand/immer', never]],
  [],
  WorkoutDraftSlice
> = (set, get) => ({
  mode: null,
  workout: null,
  setMode: (mode) => set(() => ({ mode: mode })),
  initializeWorkout: () =>
    set(() => {
      const mode = get().mode;
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
  addExercise: (exerciseID) =>
    set((state) => {
      if (state.mode === 'edit' || state.mode === 'build') {
        let updatedWorkout = {};
        const tracking: Tracking[] =
          get().getExerciseByID(exerciseID).default_tracking_type;
        if (exerciseID && state.workout) {
          updatedWorkout = addExerciseToWorkout(
            state.workout,
            exerciseID,
            tracking,
          );
        }
        return {
          workout: updatedWorkout as WorkoutBuildDraft | WorkoutLogDraft,
        };
      }
      return {
        ...state,
      };
    }),
  removeExercise: (exerciseIndex) =>
    set((state) => {
      if (state.mode === 'edit' || state.mode === 'build') {
        let updatedWorkout = {};
        if (exerciseIndex !== undefined && state.workout) {
          updatedWorkout = applyExerciseUpdateAtIndex(
            exerciseIndex,
            state.workout,
            null,
            removeExerciseAtIndex,
          );
        }
        return {
          workout: updatedWorkout as WorkoutBuildDraft | WorkoutLogDraft,
        };
      }
      return {
        ...state,
      };
    }),
  addSet: (exerciseIndex) =>
    set((state) => {
      if (state.mode === 'edit' || state.mode === 'build') {
        let updatedWorkout = {};
        let updatedExercise: WorkoutExercise;
        if (exerciseIndex !== undefined && state.workout) {
          const exercise = exerciseAtIndex(exerciseIndex, state.workout);
          updatedExercise = updateExercise(exercise, null, addSetToExercise);

          updatedWorkout = applyExerciseUpdateAtIndex(
            exerciseIndex,
            state.workout,
            updatedExercise,
            updateExercisesAtIndex,
          );
        }
        return {
          workout: updatedWorkout as WorkoutBuildDraft | WorkoutLogDraft,
        };
      }
      return {
        ...state,
      };
    }),
  deleteSet: (exerciseIndex, setIndex) =>
    set((state) => {
      if (state.mode === 'edit' || state.mode === 'build') {
        let updatedWorkout = {};
        let updatedExercise: WorkoutExercise;
        if (
          exerciseIndex !== undefined &&
          setIndex !== undefined &&
          state.workout
        ) {
          const exercise = exerciseAtIndex(exerciseIndex, state.workout);
          updatedExercise = updateExercise(
            exercise,
            setIndex,
            deleteSetInExercise,
          );

          updatedWorkout = applyExerciseUpdateAtIndex(
            exerciseIndex,
            state.workout,
            updatedExercise,
            updateExercisesAtIndex,
          );
        }
        return {
          workout: updatedWorkout as WorkoutBuildDraft | WorkoutLogDraft,
        };
      }
      return {
        ...state,
      };
    }),
  updateSet: (exerciseIndex, setIndex, updatedSet) =>
    set((state) => {
      if (state.mode === 'edit' || state.mode === 'build') {
        let updatedWorkout = {};
        let updatedExercise: WorkoutExercise;
        if (
          exerciseIndex !== undefined &&
          setIndex !== undefined &&
          state.workout
        ) {
          const exercise = exerciseAtIndex(exerciseIndex, state.workout);
          updatedExercise = updateExercise(
            exercise,
            setIndex,
            updateSetInExercise,
            updatedSet,
          );

          updatedWorkout = applyExerciseUpdateAtIndex(
            exerciseIndex,
            state.workout,
            updatedExercise,
            updateExercisesAtIndex,
          );
        }
        return {
          workout: updatedWorkout as WorkoutBuildDraft | WorkoutLogDraft,
        };
      }
      return {
        ...state,
      };
    }),
  resetWorkout: () => set(() => ({ workout: null, mode: null })),
});
