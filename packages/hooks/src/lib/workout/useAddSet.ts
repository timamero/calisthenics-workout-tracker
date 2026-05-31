import { useContext } from "react";

import {
  WorkoutDataItemContext,
  WorkoutDataItemContextType,
} from "@cwt/context";
import { useWorkoutDraftStore } from "@cwt/state/stores";
import type { Exercise } from "@cwt/schema/workouts";

/**
 * Common logic for adding a new set to an exercise or superset within a workout draft.
 * It retrieves the necessary context and store functions to manage the addition of sets,
 * ensuring that the correct exercise, superset, and section IDs are set in the draft state.
 *
 * @returns A function that, when called, adds a new set to the appropriate exercise or superset.
 */
function useAddSetLogic() {
  const context = useContext(
    WorkoutDataItemContext,
  ) as WorkoutDataItemContextType;
  const exercise = context?.item as Exercise;
  const parentType = context?.parentType;
  const parentSectionID = context?.parentSectionID;
  const parentSupersetID = context?.parentSupersetID;

  const addSet = useWorkoutDraftStore((state) => state.addSet);
  const addSetToSuperset = useWorkoutDraftStore(
    (state) => state.addSetToSuperset,
  );
  const setExerciseIDToMod = useWorkoutDraftStore(
    (state) => state.setExerciseIDToMod,
  );
  const setSupersetIDToMod = useWorkoutDraftStore(
    (state) => state.setSupersetIDToMod,
  );
  const setSectionIDToMod = useWorkoutDraftStore(
    (state) => state.setSectionIDToMod,
  );

  return () => {
    if (parentSupersetID) {
      setSupersetIDToMod(parentSupersetID);
    }
    if (parentSectionID) {
      setSectionIDToMod(parentSectionID);
    }

    if (parentType === "superset") {
      addSetToSuperset();
    } else {
      setExerciseIDToMod(exercise!.id);
      addSet();
    }
  };
}

/**
 * Hook to add a new set to an exercise or superset within a workout draft for web.
 * @returns An object containing handleAddSetClick function.
 */
export function useAddSet() {
  const handleAddSetClick = useAddSetLogic();

  return { handleAddSetClick };
}

/**
 * Hook to add a new set to an exercise or superset within a workout draft for mobile.
 * @returns An object containing handleAddSetPress function.
 */
export function useAddSetMobile() {
  const handleAddSetPress = useAddSetLogic();

  return { handleAddSetPress };
}
