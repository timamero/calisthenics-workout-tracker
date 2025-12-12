import { useContext } from "react";

import type { Section, Superset } from "@cwt/schema/workouts";
import { useWorkoutDraftStore } from "@cwt/state/stores";
import { WorkoutDataItemContext } from "@cwt/context";

import { useWorkoutContextWeb } from "./useWorkoutContext";

export default function useAddExerciseOverlay(
  itemToAddExerciseToType?: "superset" | "section"
) {
  const item = useContext(WorkoutDataItemContext)?.item as Superset | Section;
  const addExerciseOverlayHandler =
    useWorkoutContextWeb().webOverlayHandlers?.addExerciseOverlayHandler;
  const supersetParentsSectionID = useContext(
    WorkoutDataItemContext
  )?.parentSectionID;

  const setSupersetIDToMod = useWorkoutDraftStore(
    (state) => state.setSupersetIDToMod
  );
  const setSectionIDToMod = useWorkoutDraftStore(
    (state) => state.setSectionIDToMod
  );

  const handleOpenAddExerciseOverlay = () => {
    if (itemToAddExerciseToType === "superset") {
      setSupersetIDToMod(item.id);
      if (supersetParentsSectionID) {
        setSectionIDToMod(supersetParentsSectionID);
      }
    }

    if (itemToAddExerciseToType === "section") {
      setSectionIDToMod(item.id);
    }

    addExerciseOverlayHandler!.open();
  };

  return handleOpenAddExerciseOverlay;
}
