import { Set, WorkoutExercise } from "@cwt/schema/workouts";

export const INITIALIZED_SET: Set = {
  fields: { reps: 0, rest: "30S" }, // TODO: Set default fields depeneding on the tracked values
  completed: false,
  completed_at: null,
};

export const INITIALIZED_EXERCISE: Omit<WorkoutExercise, "exercise_id"> = {
  tracked: ["reps"], // TODO: Get default tracking field from exercise object
  sets: [
    {
      ...INITIALIZED_SET,
    },
  ],
};
