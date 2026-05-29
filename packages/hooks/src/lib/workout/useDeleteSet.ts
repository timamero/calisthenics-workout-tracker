import { useContext } from "react";

import {
  SetContext,
  SetContextType,
  WorkoutDataItemContext,
  WorkoutDataItemContextType,
} from "@cwt/context";
import { useWorkoutDraftStore } from "@cwt/state/stores";
import type { Exercise } from "@cwt/schema/workouts";

import {
  useWorkoutContextWeb,
  useWorkoutContextMobile,
} from "./useWorkoutContext";

/**
 * Common logic for deleting a set from an exercise or superset within a workout draft.
 * It retrieves the necessary context and store functions to manage the deletion of sets,
 * ensuring that the correct exercise, superset, and section IDs are set in the draft state.
 *
 * @returns A function that, when called, initiates the deletion process for the appropriate set.
 */
function useDeleteSetLogic() {
  const workoutDataItemContext = useContext(
    WorkoutDataItemContext,
  ) as WorkoutDataItemContextType;
  const exercise = workoutDataItemContext?.item as Exercise;
  const parentType = workoutDataItemContext?.parentType;
  const parentSectionID = workoutDataItemContext?.parentSectionID;
  const parentSupersetID = workoutDataItemContext?.parentSupersetID;
  const setContext = useContext(SetContext) as SetContextType;
  const set = setContext!.set;
  const setIndex = setContext!.setIndex;

  const setSetIDToMod = useWorkoutDraftStore((state) => state.setSetIDToMod);
  const setSetIndexToMod = useWorkoutDraftStore(
    (state) => state.setSetIndexToMod,
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

  const setIDs = () => {
    if (parentSupersetID) {
      setSupersetIDToMod(parentSupersetID);
    }
    if (parentSectionID) {
      setSectionIDToMod(parentSectionID);
    }

    if (parentType !== "superset") {
      setSetIDToMod(set.id);
      setExerciseIDToMod(exercise!.id);
    } else {
      setSetIndexToMod(setIndex);
    }
  };

  return { parentType, setIDs };
}

/**
 * Hook to delete a set from an exercise or superset within a workout draft for web.
 * @returns An object containing handleDeleteSetClick function.
 */
export function useDeleteSet() {
  const { parentType, setIDs } = useDeleteSetLogic();

  const deleteSetOverlayHandler =
    useWorkoutContextWeb().webOverlayHandlers?.deleteSetOverlayHandler;
  const deleteSetInSupersetOverlayHandler =
    useWorkoutContextWeb().webOverlayHandlers
      ?.deleteSetInSupersetOverlayHandler;

  const handleDeleteSetClick = () => {
    setIDs();

    if (parentType !== "superset") {
      if (deleteSetOverlayHandler) deleteSetOverlayHandler.open();
    } else {
      if (deleteSetInSupersetOverlayHandler)
        deleteSetInSupersetOverlayHandler.open();
    }
  };

  return { handleDeleteSetClick };
}

/**
 * Hook to delete a set from an exercise or superset within a workout draft for mobile.
 * @returns An object containing handleDeleteSetPress function.
 */
export function useDeleteSetMobile() {
  const { parentType, setIDs } = useDeleteSetLogic();

  const setIsDeleteSetOverlayVisible =
    useWorkoutContextMobile().mobileOverlayHandlers
      .setIsDeleteSetOverlayVisible;
  const setIsDeleteSetInSupersetOverlayVisible =
    useWorkoutContextMobile().mobileOverlayHandlers
      .setIsDeleteSetInSupersetOverlayVisible;

  const handleDeleteSetPress = () => {
    setIDs();

    if (parentType !== "superset") {
      if (setIsDeleteSetOverlayVisible) setIsDeleteSetOverlayVisible(true);
    } else {
      if (setIsDeleteSetInSupersetOverlayVisible)
        setIsDeleteSetInSupersetOverlayVisible(true);
    }
  };

  return { handleDeleteSetPress };
}
