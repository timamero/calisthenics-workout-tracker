import { StateCreator } from 'zustand';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';

import type {
  SetFields,
  WorkoutBuildRequest,
  WorkoutLogRequest,
  WorkoutData,
  Mode,
} from '@cwt/schema/workouts';
import type { Tracking } from '@cwt/schema/exercises';

import {
  INITIAL_WORKOUT_LOG_TITLE,
  INITIAL_WORKOUT_BUILD_TITLE,
  INITIALIZED_SET,
  INITIALIZED_WORKOUT_BUILD_TO_SAVE,
  DEFAULT_REP_SET,
  DEFAULT_TIME_SET,
  INITIALIZED_WORKOUT_LOG_TO_SAVE,
} from './workoutDefaults';

interface WorkoutDraftState {
  mode: Mode | null;
  workoutData: WorkoutData;
  workoutTitle: string | null;
  selectedExerciseIDToAdd: number | null;
  selectedSetIndexToMod: number | null;
  selectedExerciseIndexToMod: number | null;
  isWorkoutSavePending: boolean;
  workoutToSave: WorkoutBuildRequest | WorkoutLogRequest | null;
}

interface WorkoutDraftAction {
  initializeWorkout: (mode: Mode) => void;
  setMode: (mode: Mode) => void;
  setWorkoutTitle: (title: string) => void;
  setSelectedExerciseIDToAdd: (exerciseID: number | null) => void;
  setSelectedSetIndexToMod: (setIndex: number | null) => void;
  setSelectedExerciseIndexToMod: (exerciseIndex: number | null) => void;
  addExercise: (tracking: Tracking[]) => void;
  removeExercise: (exerciseIndex: number) => void;
  addSet: (exerciseIndex: number) => void;
  deleteSet: (exerciseIndex: number) => void;
  updateField: (
    exerciseIndex: number,
    updatedField: Partial<SetFields>,
  ) => void;
  toggleCompleted: (
    exerciseIndex: number,
    setIndex: number,
    value: boolean,
  ) => void;
  initializeWorkoutToSave: () => void;
  addUserIDToWorkoutToSave: (userID: string) => void;
  addDurationToWorkoutToSave: (duration: string) => void;
  resetWorkout: () => void;
}

export type WorkoutDraftSlice = WorkoutDraftState & WorkoutDraftAction;

export const createWorkoutDraftSlice: StateCreator<
  WorkoutDraftSlice,
  [['zustand/immer', never]],
  [],
  WorkoutDraftSlice
> = (set, get) => ({
  mode: null,
  workoutData: { exercises: [] },
  workoutTitle: null,
  selectedExerciseIDToAdd: null,
  selectedSetIndexToMod: null,
  selectedExerciseIndexToMod: null,
  isWorkoutSavePending: false,
  workoutToSave: null,

  initializeWorkout: (mode) =>
    set((state) => {
      state.mode = mode;
      state.workoutTitle =
        mode === 'build'
          ? INITIAL_WORKOUT_BUILD_TITLE
          : INITIAL_WORKOUT_LOG_TITLE;
    }),
  setMode: (mode) =>
    set((state) => {
      state.mode = mode;
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
  setSelectedExerciseIndexToMod: (exerciseIndex) =>
    set((state) => {
      state.selectedExerciseIndexToMod = exerciseIndex;
    }),
  addExercise: (tracking) =>
    set(
      produce((state) => {
        const exerciseID = state.selectedExerciseIDToAdd;
        if (exerciseID == null) {
          console.error('No exerciseID provided');
          return;
        }
        if (state.mode === 'edit' || state.mode === 'build') {
          let fields: SetFields = {};
          if (tracking.includes('reps')) {
            fields = DEFAULT_REP_SET;
          } else if (tracking.includes('time')) {
            fields = DEFAULT_TIME_SET;
          }

          state.workoutData.exercises.push({
            sets: [{ ...INITIALIZED_SET, id: uuidv4(), fields: fields }],
            exercise_id: exerciseID,
            tracked: tracking,
            id: uuidv4(),
          });
        } else {
          console.error('Cannot add exercise in log mode');
        }
      }),
    ),
  removeExercise: (exerciseIndex) =>
    set((state) => {
      if (state.mode === 'edit' || state.mode === 'build') {
        state.workoutData.exercises.splice(exerciseIndex, 1);
      } else {
        console.error('Cannot remove exercise in log mode');
      }
    }),
  addSet: (exerciseIndex) =>
    set((state) => {
      if (exerciseIndex === undefined) {
        console.error('Exercise index not provided');
        return;
      }
      if (state.mode === 'edit' || state.mode === 'build') {
        const tracking = state.workoutData.exercises[exerciseIndex].tracked;
        let fields: SetFields = {};
        if (tracking.includes('reps')) {
          fields = DEFAULT_REP_SET;
        } else if (tracking.includes('time')) {
          fields = DEFAULT_TIME_SET;
        }
        state.workoutData.exercises[exerciseIndex].sets.push({
          ...INITIALIZED_SET,
          id: uuidv4(),
          fields: fields,
        });
      } else {
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
      if (setIndex === undefined || setIndex == null) {
        console.error('Invalid set index');
        return;
      }
      if (state.mode === 'edit' || state.mode === 'build') {
        state.workoutData.exercises[exerciseIndex].sets.splice(setIndex, 1);
      } else {
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
      const set = state.workoutData.exercises[exerciseIndex].sets[setIndex];
      state.workoutData.exercises[exerciseIndex].sets[setIndex] = {
        ...set,
        fields: { ...set.fields, ...updatedField },
      };
    }),
  toggleCompleted: (exerciseIndex, setIndex, value) =>
    set((state) => {
      if (state.mode === 'log') {
        state.workoutData.exercises[exerciseIndex].sets[setIndex].completed =
          value;

        if (value === true) {
          state.workoutData.exercises[exerciseIndex].sets[
            setIndex
          ].completed_at = new Date().toISOString();
        } else {
          state.workoutData.exercises[exerciseIndex].sets[
            setIndex
          ].completed_at = null;
        }
      } else {
        console.error(
          'Cannot updated completed checkbox in edit or build mode',
        );
      }
    }),
  initializeWorkoutToSave: () =>
    set((state) => {
      if (state.mode === 'build') {
        state.workoutToSave = {
          ...INITIALIZED_WORKOUT_BUILD_TO_SAVE,
          workout_data: state.workoutData,
          title: state.workoutTitle || 'Untitled workout',
        };
      } else {
        state.workoutToSave = {
          ...INITIALIZED_WORKOUT_LOG_TO_SAVE,
          workout_data: state.workoutData,
          title: state.workoutTitle || 'Untitled workout',
          date: new Date().toISOString(),
        };
      }

      state.isWorkoutSavePending = true;
    }),
  addUserIDToWorkoutToSave: (userID) =>
    set((state) => {
      if (state.workoutToSave) {
        state.workoutToSave.user_id = userID;
      } else {
        console.error('workoutToSave is null, cannot add userID');
      }
    }),
  addDurationToWorkoutToSave: (duration) =>
    set((state) => {
      if (
        state.workoutToSave &&
        state.mode !== 'build' &&
        'duration' in state.workoutToSave
      ) {
        state.workoutToSave.duration = duration;
      } else {
        console.error('workoutToSave is null, cannot add userID');
      }
    }),
  resetWorkout: () =>
    set(() => ({
      workoutData: { exercises: [] },
      mode: null,
      workoutToSave: null,
      isWorkoutSavePending: false,
    })),
});
