import { useContext } from "react";
import { Section, Superset, Exercise } from "@cwt/schema/workouts";
import { useWorkoutDraftStore } from "@cwt/state/stores";
import {
  WorkoutDataItemContext,
  WorkoutDataItemContextType,
} from "@cwt/context";

/**
 * Common logic for reordering items in a workout draft. Used by both web and mobile hooks.
 * @param item The item to reorder (Section, Superset, or Exercise)
 * @returns An object containing moveUp and moveDown functions.
 */
function useReorderItemLogic(item: Section | Superset | Exercise) {
  const workoutDataItemContext = useContext(
    WorkoutDataItemContext,
  ) as WorkoutDataItemContextType;
  const parentType = workoutDataItemContext?.parentType;
  const parentSectionID = workoutDataItemContext?.parentSectionID;
  const parentSupersetID = workoutDataItemContext?.parentSupersetID;

  const reorderRootItem = useWorkoutDraftStore(
    (state) => state.reorderRootItem,
  );
  const reorderNestedItem = useWorkoutDraftStore(
    (state) => state.reorderNestedItem,
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
    if (item.type === "exercise") {
      setExerciseIDToMod(item!.id);
    }
    if (item.type === "superset") {
      setSupersetIDToMod(item!.id);
    }

    if (parentSupersetID) {
      setSupersetIDToMod(parentSupersetID);
    }
    if (parentSectionID) {
      setSectionIDToMod(parentSectionID);
    }
  };

  return {
    moveUp: () => {
      if (!parentType) {
        reorderRootItem(item!.id, item!.order - 1);
      } else {
        setIDs();
        reorderNestedItem(item!.order - 1);
      }
    },
    moveDown: () => {
      if (!parentType) {
        reorderRootItem(item!.id, item!.order + 1);
      } else {
        setIDs();
        reorderNestedItem(item!.order + 1);
      }
    },
  };
}

/**
 * Hook to reorder an item (Section, Superset, or Exercise) in a workout draft for web.
 * @param item The item to reorder.
 * @returns An object containing handleUpClick and handleDownClick functions.
 */
export function useReorderItem(item: Section | Superset | Exercise) {
  const { moveUp, moveDown } = useReorderItemLogic(item);

  return {
    handleUpClick: moveUp,
    handleDownClick: moveDown,
  };
}

/**
 * Hook to reorder an item (Section, Superset, or Exercise) in a workout draft for mobile.
 * @param item The item to reorder.
 * @returns An object containing handleUpPress and handleDownPress functions.
 */
export function useReorderItemMobile(item: Section | Superset | Exercise) {
  const { moveUp, moveDown } = useReorderItemLogic(item);

  return {
    handleUpPress: moveUp,
    handleDownPress: moveDown,
  };
}
