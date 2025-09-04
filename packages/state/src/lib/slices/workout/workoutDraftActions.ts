import { Set, WorkoutExercise, SetFields } from '@cwt/schema/workouts';
import { Tracking } from '@cwt/schema/exercises';

import { WorkoutBuildDraft, WorkoutLogDraft } from './workoutDraftSlice';
import {
  INITIALIZED_SET,
  DEFAULT_DURATION_SET,
  DEFAULT_REP_SET,
} from './workoutDefaults';

export function exerciseAtIndex(
  index: number,
  workout: WorkoutBuildDraft | WorkoutLogDraft,
): WorkoutExercise {
  return workout.workout_data.exercises[index];
}

export function addExercise(
  exercise_id: number,
  default_tracking: Tracking[],
  workout: WorkoutBuildDraft | WorkoutLogDraft,
): WorkoutExercise[] {
  let fields: SetFields = {};
  if (default_tracking.includes('reps')) {
    fields = DEFAULT_REP_SET;
  } else if (default_tracking.includes('duration')) {
    fields = DEFAULT_DURATION_SET;
  }
  return [
    ...(workout.workout_data.exercises as WorkoutExercise[]),
    {
      sets: [{ ...INITIALIZED_SET, fields: fields }],
      exercise_id: exercise_id,
      tracked: default_tracking,
    },
  ];
}

export function addSetToExercise(
  exerciseToUpdate: WorkoutExercise,
): WorkoutExercise {
  let fields: SetFields = {};
  if (exerciseToUpdate.tracked.includes('reps')) {
    fields = DEFAULT_REP_SET;
  } else if (exerciseToUpdate.tracked.includes('duration')) {
    fields = DEFAULT_DURATION_SET;
  }
  return {
    ...exerciseToUpdate,
    sets: [...exerciseToUpdate.sets, { ...INITIALIZED_SET, fields: fields }],
  };
}

export function deleteSetInExercise(
  exerciseToUpdate: WorkoutExercise,
  index: number | undefined,
): WorkoutExercise {
  return {
    ...exerciseToUpdate,
    sets: [...exerciseToUpdate.sets.filter((set, ind) => ind !== index)],
  };
}

export function updateSetInExercise(
  exerciseToUpdate: WorkoutExercise,
  index: number | undefined,
  updatedSet?: Set | undefined,
): WorkoutExercise {
  if (updatedSet) {
    return {
      ...exerciseToUpdate,
      sets: [
        ...exerciseToUpdate.sets.map((set, ind) => {
          if (ind === index) {
            return updatedSet;
          }
          return set;
        }),
      ],
    };
  }
  return { ...exerciseToUpdate };
}

export function updateExercisesAtIndex(
  index: number,
  workout: WorkoutBuildDraft | WorkoutLogDraft,
  updatedExercise?: WorkoutExercise,
): WorkoutExercise[] {
  return [
    ...workout.workout_data.exercises.map((ex, ind) => {
      if (ind === index) {
        return updatedExercise;
      }
      return ex;
    }),
  ] as WorkoutExercise[];
}

export function removeExerciseAtIndex(
  index: number,
  workout: WorkoutBuildDraft | WorkoutLogDraft,
): WorkoutExercise[] {
  return [...workout.workout_data.exercises.filter((ex, ind) => ind !== index)];
}

export function updateExercise(
  exercise: WorkoutExercise,
  setIndex: number | null,
  exerciseUpdater: (
    exercise: WorkoutExercise,
    setIndex?: number,
    updatedSet?: Set,
  ) => WorkoutExercise,
  updatedSet?: Set,
): WorkoutExercise {
  if (updatedSet && setIndex) {
    return exerciseUpdater(exercise, setIndex, updatedSet);
  }
  if (setIndex) {
    return exerciseUpdater(exercise, setIndex);
  }
  return exerciseUpdater(exercise);
}

export function addExerciseToWorkout(
  workout: WorkoutBuildDraft | WorkoutLogDraft,
  exerciseID: number,
  default_tracking: Tracking[],
): WorkoutBuildDraft | WorkoutLogDraft {
  return {
    ...workout,
    workout_data: {
      exercises: addExercise(exerciseID, default_tracking, workout),
    },
  };
}

export function applyExerciseUpdateAtIndex(
  index: number | null,
  workout: WorkoutBuildDraft | WorkoutLogDraft,
  updatedExercise: WorkoutExercise | null,
  exercisesUpdater: (
    index: number,
    workout: WorkoutBuildDraft | WorkoutLogDraft,
    updatedExercise?: WorkoutExercise,
  ) => WorkoutExercise[],
): WorkoutBuildDraft | WorkoutLogDraft {
  if (updatedExercise && index !== null) {
    return {
      ...workout,
      workout_data: {
        exercises: exercisesUpdater(index, workout, updatedExercise),
      },
    };
  }
  if (index !== null && index >= 0) {
    return {
      ...workout,
      workout_data: {
        exercises: exercisesUpdater(index, workout),
      },
    };
  }
  console.log('returning workout without changes');
  return {
    ...workout,
  };
}
