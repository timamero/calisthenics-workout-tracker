import { Set, WorkoutExercise } from "@cwt/schema/workouts";

import { WorkoutBuildDraft, WorkoutLogDraft } from "./workoutDraftSlice";
import { INITIALIZED_EXERCISE, INITIALIZED_SET } from "./workoutDefaults";

export function exerciseAtIndex(
  index: number,
  workout: WorkoutBuildDraft | WorkoutLogDraft
): WorkoutExercise {
  return workout.workout_data.exercises[index];
}

export function addExercise(
  exercise_id: number,
  workout: WorkoutBuildDraft | WorkoutLogDraft
): WorkoutExercise[] {
  return [
    ...(workout.workout_data.exercises as WorkoutExercise[]),
    { ...INITIALIZED_EXERCISE, exercise_id: exercise_id },
  ];
}

export function addSetToExercise(
  exerciseToUpdate: WorkoutExercise
): WorkoutExercise {
  return {
    ...exerciseToUpdate,
    sets: [...exerciseToUpdate.sets, INITIALIZED_SET],
  };
}

export function deleteSetInExercise(
  exerciseToUpdate: WorkoutExercise,
  index: number | undefined
): WorkoutExercise {
  return {
    ...exerciseToUpdate,
    sets: [...exerciseToUpdate.sets.filter((set, ind) => ind !== index)],
  };
}

export function updateSetInExercise(
  exerciseToUpdate: WorkoutExercise,
  index: number | undefined,
  updatedSet?: Set | undefined
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
  updatedExercise?: WorkoutExercise
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
  workout: WorkoutBuildDraft | WorkoutLogDraft
): WorkoutExercise[] {
  return [...workout.workout_data.exercises.filter((ex, ind) => ind !== index)];
}

export function updateExercise(
  exercise: WorkoutExercise,
  setIndex: number | null,
  exerciseUpdater: (
    exercise: WorkoutExercise,
    setIndex?: number,
    updatedSet?: Set
  ) => WorkoutExercise,
  updatedSet?: Set
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
  exercisesUpdater: (
    exercise_id: number,
    workout: WorkoutBuildDraft | WorkoutLogDraft
  ) => WorkoutExercise[]
): WorkoutBuildDraft | WorkoutLogDraft {
  return {
    ...workout,
    workout_data: {
      exercises: exercisesUpdater(exerciseID, workout),
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
    updatedExercise?: WorkoutExercise
  ) => WorkoutExercise[]
): WorkoutBuildDraft | WorkoutLogDraft {
  if (updatedExercise && index) {
    return {
      ...workout,
      workout_data: {
        exercises: exercisesUpdater(index, workout, updatedExercise),
      },
    };
  }
  if (index) {
    return {
      ...workout,
      workout_data: {
        exercises: exercisesUpdater(index, workout),
      },
    };
  }
  return {
    ...workout,
  };
}
