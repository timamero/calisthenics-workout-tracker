import { useContext } from "react";

import {
  WorkoutDataItemContext,
  SetContext,
  WorkoutDataItemContextType,
  SetContextType,
} from "@cwt/context";
import { useWorkoutDraftStore } from "@cwt/state/stores";
import type { Exercise } from "@cwt/schema/workouts";

/**
 * Hook to handle toggling the completed status of a set within an exercise in a workout draft.
 * It retrieves the necessary context and store functions to manage the toggle action,
 * ensuring that the correct exercise, superset, and section IDs are set in the draft state.
 *
 * @returns A function that, when called with a boolean value, toggles the completed status of the set.
 */
export default function useToggleCompleted() {
  const workoutDataItemContext = useContext(
    WorkoutDataItemContext,
  ) as WorkoutDataItemContextType;
  const exercise = workoutDataItemContext?.item as Exercise;
  const parentSectionID = workoutDataItemContext?.parentSectionID;
  const parentSupersetID = workoutDataItemContext?.parentSupersetID;
  const setContext = useContext(SetContext) as SetContextType;
  const set = setContext!.set;

  const toggleCompleted = useWorkoutDraftStore(
    (state) => state.toggleCompleted,
  );
  const setSetIDToMod = useWorkoutDraftStore((state) => state.setSetIDToMod);
  const setExerciseIDToMod = useWorkoutDraftStore(
    (state) => state.setExerciseIDToMod,
  );
  const setSupersetIDToMod = useWorkoutDraftStore(
    (state) => state.setSupersetIDToMod,
  );
  const setSectionIDToMod = useWorkoutDraftStore(
    (state) => state.setSectionIDToMod,
  );

  const handleToggleCompleted = (value: boolean) => {
    setSetIDToMod(set.id);
    setExerciseIDToMod(exercise.id);

    if (parentSupersetID) {
      setSupersetIDToMod(parentSupersetID);
    }
    if (parentSectionID) {
      setSectionIDToMod(parentSectionID);
    }
    toggleCompleted(value);
  };
  return handleToggleCompleted;
}
