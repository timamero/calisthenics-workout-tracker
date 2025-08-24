import { Set, SetFields } from "@cwt/schema/workouts";

export const INITIALIZED_SET: Omit<Set, "fields"> = {
  completed: false,
  completed_at: null,
};

export const DEFAULT_REP_SET: SetFields = { reps: 0, rest: "30S" };
export const DEFAULT_DURATION_SET: SetFields = { duration: "30S", rest: "30S" };
