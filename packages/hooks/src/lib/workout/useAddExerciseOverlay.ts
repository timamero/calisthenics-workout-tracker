import { useContext } from "react";

import type { Section, Superset } from "@cwt/schema/workouts";
import { useWorkoutDraftStore } from "@cwt/state/stores";
import { WorkoutDataItemContext } from "@cwt/context";

import {
  useWorkoutContextWeb,
  useWorkoutContextMobile,
} from "./useWorkoutContext";

/**
 * Common logic for adding an exercise to a workout draft when the add exercise overlay is opened.
 * It retrieves the necessary context and store functions to manage the addition of exercises,
 * ensuring that the correct section or superset IDs are set in the draft state.
 *
 * @param itemToAddExerciseToType The type of item to which the exercise will be added ("superset" or "section").
 * @returns An object containing a function to set the appropriate IDs in the draft state.
 */
function useAddExerciseOverlayLogic(
  itemToAddExerciseToType?: "superset" | "section"
) {
  const item = useContext(WorkoutDataItemContext)?.item as Superset | Section;
  const supersetParentsSectionID = useContext(
    WorkoutDataItemContext
  )?.parentSectionID;

  const setSupersetIDToMod = useWorkoutDraftStore(
    (state) => state.setSupersetIDToMod
  );
  const setSectionIDToMod = useWorkoutDraftStore(
    (state) => state.setSectionIDToMod
  );

  const setIDs = () => {
    if (itemToAddExerciseToType === "superset") {
      setSupersetIDToMod(item.id);
      if (supersetParentsSectionID) {
        setSectionIDToMod(supersetParentsSectionID);
      }
    }

    if (itemToAddExerciseToType === "section") {
      setSectionIDToMod(item.id);
    }
  };

  return {
    setIDs,
  };
}

/**
 * Hook for adding an exercise to a workout draft overlay in a web context.
 * @param itemToAddExerciseToType The type of item to which the exercise will be added ("superset" or "section").
 * @returns An object containing a function to handle opening the add exercise overlay.
 */
export function useAddExerciseOverlay(
  itemToAddExerciseToType?: "superset" | "section"
) {
  const { setIDs } = useAddExerciseOverlayLogic(itemToAddExerciseToType);

  const addExerciseOverlayHandler =
    useWorkoutContextWeb().webOverlayHandlers.addExerciseOverlayHandler;

  const handleOpenAddExerciseOverlayClick = () => {
    setIDs();

    addExerciseOverlayHandler!.open();
  };

  return { handleOpenAddExerciseOverlayClick };
}

/**
 * Hook for adding an exercise to a workout draft overlay in a mobile context.
 * @param itemToAddExerciseToType The type of item to which the exercise will be added ("superset" or "section").
 * @returns An object containing a function to handle opening the add exercise overlay.
 */
export function useAddExerciseOverlayMobile(
  itemToAddExerciseToType?: "superset" | "section"
) {
  const { setIDs } = useAddExerciseOverlayLogic(itemToAddExerciseToType);

  const setIsAddExerciseOverlayVisible =
    useWorkoutContextMobile().mobileOverlayHandlers
      .setIsAddExerciseOverlayVisible!;

  const handleOpenAddExerciseOverlayPress = () => {
    setIDs();

    setIsAddExerciseOverlayVisible(true);
  };

  return { handleOpenAddExerciseOverlayPress };
}
