import { WorkoutExercise } from "@cwt/schema/workouts";
import { WorkoutBuildDraft, WorkoutLogDraft } from "./workoutBuildAndLogSlice";

export function exerciseAtIndex(
  index: number,
  workout: WorkoutBuildDraft | WorkoutLogDraft
) {
  return workout.workout_data.exercises[index];
}
