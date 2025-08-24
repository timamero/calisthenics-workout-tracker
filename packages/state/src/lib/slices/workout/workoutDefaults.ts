import { Set, SetFields } from "@cwt/schema/workouts";

export const INITIALIZED_SET: Omit<Set, "fields"> = {
  // fields: { reps: 0, rest: "30S" }, // TODO: Set default fields depeneding on the tracked values
  completed: false,
  completed_at: null,
};

export const DEFAULT_REP_SET: SetFields = { reps: 0, rest: "30S" };
export const DEFAULT_DURATION_SET: SetFields = { duration: "30S", rest: "30S" };

// export const INITIALIZED_EXERCISE: Pick<WorkoutExercise, "sets"> = {
//   // tracked: ["reps"], // TODO: Get default tracking field from exercise object
//   sets: [
//     {
//       ...INITIALIZED_SET,
//     },
//   ],
// };
