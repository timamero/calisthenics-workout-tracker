import { useContext } from "react";

import {
  WorkoutDataItemContext,
  SetContext,
  WorkoutContext,
} from "@cwt/context";
import { useWorkoutDraftStore } from "@cwt/state/stores";
import type { Exercise } from "@cwt/schema/workouts";

/**
 * Hook to handle deleting a set from an exercise or superset within a workout draft.
 * It retrieves the necessary context and store functions to manage the deletion of sets,
 * ensuring that the correct exercise, superset, and section IDs are set in the draft state.
 *
 * @returns A function that, when called, initiates the deletion process for the appropriate set.
 */
export default function useDeleteSet() {
  const exercise = useContext(WorkoutDataItemContext)?.item as Exercise;
  const set = useContext(SetContext)!.set;
  const setIndex = useContext(SetContext)!.setIndex;
  const parentType = useContext(WorkoutDataItemContext)?.parentType;
  const parentSectionID = useContext(WorkoutDataItemContext)?.parentSectionID;
  const parentSupersetID = useContext(WorkoutDataItemContext)?.parentSupersetID;
  const deleteSetOverlayHandler =
    useContext(WorkoutContext)!.deleteSetOverlayHandler;
  const deleteSetInSupersetOverlayHandler =
    useContext(WorkoutContext)!.deleteSetInSupersetOverlayHandler;

  const setSetIDToMod = useWorkoutDraftStore((state) => state.setSetIDToMod);
  const setSetIndexToMod = useWorkoutDraftStore(
    (state) => state.setSetIndexToMod
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

  const handleDeleteSetClick = () => {
    if (parentSupersetID) {
      setSupersetIDToMod(parentSupersetID);
    }
    if (parentSectionID) {
      setSectionIDToMod(parentSectionID);
    }

    if (parentType !== "superset") {
      setSetIDToMod(set.id);
      setExerciseIDToMod(exercise!.id);
      if (deleteSetOverlayHandler) deleteSetOverlayHandler.open();
    } else {
      setSetIndexToMod(setIndex);
      if (deleteSetInSupersetOverlayHandler)
        deleteSetInSupersetOverlayHandler.open();
    }
  };
  return handleDeleteSetClick;
}
