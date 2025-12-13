import { useContext } from "react";

import type { Section, Superset } from "@cwt/schema/workouts";
import { useWorkoutDraftStore } from "@cwt/state/stores";
import { WorkoutDataItemContext } from "@cwt/context";

import {
  useWorkoutContextWeb,
  useWorkoutContextMobile,
} from "./useWorkoutContext";

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
