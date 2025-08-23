import { Set, WorkoutExercise } from "@cwt/schema/workouts";

import { WorkoutBuildDraft, WorkoutLogDraft } from "./workoutBuildAndLogSlice";

export function exerciseAtIndex(
  index: number,
  workout: WorkoutBuildDraft | WorkoutLogDraft
) {
  return workout.workout_data.exercises[index];
}

export function addSetToExercise(exerciseToUpdate: WorkoutExercise) {
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

export function updateExercisesAtIndex(
  index: number,
  workout: WorkoutBuildDraft | WorkoutLogDraft,
  updatedExercise: WorkoutExercise
): WorkoutExercise[] {
  return [
    ...workout.workout_data.exercises.map((ex, ind) => {
      if (ind === index) {
        return updatedExercise;
      }
      return ex;
    }),
  ];
}

export function removeExerciseAtIndex(
  index: number,
  workout: WorkoutBuildDraft | WorkoutLogDraft
): WorkoutExercise[] {
  return [...workout.workout_data.exercises.filter((ex, ind) => ind !== index)];
}

export function updateWorkoutAtExerciseIndex(
  index: number,
  workout: WorkoutBuildDraft | WorkoutLogDraft,
  updatedExercise: WorkoutExercise,
  exercisesUpdater: (
    index: number,
    workout: WorkoutBuildDraft | WorkoutLogDraft,
    updatedExercise: WorkoutExercise
  ) => WorkoutExercise[]
): WorkoutBuildDraft | WorkoutLogDraft {
  return {
    ...workout,
    workout_data: {
      exercises: exercisesUpdater(index, workout, updatedExercise),
    },
  };
  // } as WorkoutBuildDraft | WorkoutLogDraft;
}
