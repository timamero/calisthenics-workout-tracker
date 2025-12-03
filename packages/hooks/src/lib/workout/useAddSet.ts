import { useContext } from "react";

import { WorkoutDataItemContext } from "@cwt/context";
import { useWorkoutDraftStore } from "@cwt/state/stores";
import type { Exercise } from "@cwt/schema/workouts";

/**
 * Hook to handle adding a new set to an exercise or superset within a workout draft.
 * It retrieves the necessary context and store functions to manage the addition of sets,
 * ensuring that the correct exercise, superset, and section IDs are set in the draft state.
 *
 * @returns A function that, when called, adds a new set to the appropriate exercise or superset.
 */
export default function useAddSet() {
  const exercise = useContext(WorkoutDataItemContext)?.item as Exercise;
  const parentType = useContext(WorkoutDataItemContext)?.parentType;
  const parentSectionID = useContext(WorkoutDataItemContext)?.parentSectionID;
  const parentSupersetID = useContext(WorkoutDataItemContext)?.parentSupersetID;

  const addSet = useWorkoutDraftStore((state) => state.addSet);
  const addSetToSuperset = useWorkoutDraftStore(
    (state) => state.addSetToSuperset
  );
  const setExerciseIDToMod = useWorkoutDraftStore(
    (state) => state.setExerciseIDToMod
  );
  const setSupersetIDToMod = useWorkoutDraftStore(
    (state) => state.setSupersetIDToMod
  );
  const setSectionIDToMod = useWorkoutDraftStore(
    (state) => state.setSectionIDToMod
  );

  const handleAddSetClick = () => {
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
  return handleAddSetClick;
}
