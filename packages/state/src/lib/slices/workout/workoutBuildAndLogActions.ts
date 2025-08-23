import { Set, WorkoutExercise } from "@cwt/schema/workouts";

import { WorkoutBuildDraft, WorkoutLogDraft } from "./workoutBuildAndLogSlice";

export function exerciseAtIndex(
  index: number,
  workout: WorkoutBuildDraft | WorkoutLogDraft
) {
  return workout.workout_data.exercises[index];
}

export function addExercise(
  id: number,
  workout: WorkoutBuildDraft | WorkoutLogDraft
) {
  const INITIALIZED_EXERCISE: WorkoutExercise = {
    exercise_id: id,
    tracked: ["reps"], // TODO: Get default tracking field from exercise object
    sets: [
      {
        fields: { reps: 0, rest: "30S" },
        completed: false,
        completed_at: null,
      },
    ],
  };

  return [
    ...(workout.workout_data.exercises as WorkoutExercise[]),
    INITIALIZED_EXERCISE,
  ];
}

export function addSetToExercise(
  exerciseToUpdate: WorkoutExercise
): WorkoutExercise {
  const INITIALIZED_SET: Set = {
    fields: { reps: 0, rest: "30S" },
    completed: false,
    completed_at: null,
  };

  return {
    ...exerciseToUpdate,
    sets: [...exerciseToUpdate.sets, INITIALIZED_SET],
  };
}

export function deleteSetInExercise(
  index: number,
  exerciseToUpdate: WorkoutExercise
): WorkoutExercise {
  return {
    ...exerciseToUpdate,
    sets: [...exerciseToUpdate.sets.filter((set, ind) => ind !== index)],
  };
}

export function updateSetInExercise(
  index: number,
  exerciseToUpdate: WorkoutExercise,
  updatedSet: Set
) {
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

export function updateWorkoutAtExerciseIndex(
  index: number | null,
  workout: WorkoutBuildDraft | WorkoutLogDraft,
  updatedExercise: WorkoutExercise | null,
  exercisesUpdater: (
    index: number,
    workout: WorkoutBuildDraft | WorkoutLogDraft,
    updatedExercise?: WorkoutExercise
  ) => WorkoutExercise[],
  exerciseID?: number
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
  if (exerciseID) {
    return {
      ...workout,
      workout_data: {
        exercises: exercisesUpdater(exerciseID, workout),
      },
    };
  }
  return {
    ...workout,
  };
}
