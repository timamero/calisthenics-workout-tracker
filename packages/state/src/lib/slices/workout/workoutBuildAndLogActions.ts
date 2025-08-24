import { Set, WorkoutExercise } from "@cwt/schema/workouts";

import { WorkoutBuildDraft, WorkoutLogDraft } from "./workoutBuildAndLogSlice";

const INITIALIZED_SET: Set = {
  fields: { reps: 0, rest: "30S" }, // TODO: Set default fields depeneding on the tracked values
  completed: false,
  completed_at: null,
};

const INITIALIZED_EXERCISE: Omit<WorkoutExercise, "exercise_id"> = {
  // exercise_id: null,
  tracked: ["reps"], // TODO: Get default tracking field from exercise object
  sets: [
    {
      ...INITIALIZED_SET,
    },
  ],
};

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
  return [
    ...(workout.workout_data.exercises as WorkoutExercise[]),
    { ...INITIALIZED_EXERCISE, exercise_id: id },
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
) {
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
