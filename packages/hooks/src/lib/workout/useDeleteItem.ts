import { useContext } from "react";
import { WorkoutContext, WorkoutDataItemContext } from "@cwt/context";
import { useWorkoutDraftStore } from "@cwt/state/stores";

/**
 * Common logic for deleting an item (Section, Superset, or Exercise) from a workout draft.
 * It retrieves the necessary context and store functions to manage the deletion of items,
 * ensuring that the correct exercise, superset, and section IDs are set in the draft state.
 *
 * @param itemType The type of item to delete ("exercise", "superset", or "section").
 * @param itemID The ID of the item to delete.
 * @returns A function that, when called, initiates the deletion process for the appropriate item.
 */
function useDeleteItemLogic(
  itemType: "exercise" | "superset" | "section",
  itemID: string
) {
  const parentType = useContext(WorkoutDataItemContext)?.parentType;
  const parentSectionID = useContext(WorkoutDataItemContext)?.parentSectionID;
  const parentSupersetID = useContext(WorkoutDataItemContext)?.parentSupersetID;
  const deleteRootItemOverlayHandler =
    useContext(WorkoutContext)!.deleteRootItemOverlayHandler;
  const deleteNestedItemOverlayHandler =
    useContext(WorkoutContext)!.deleteNestedItemOverlayHandler;
  const setSectionIDToMod = useWorkoutDraftStore(
    (state) => state.setSectionIDToMod
  );
  const setSupersetIDToMod = useWorkoutDraftStore(
    (state) => state.setSupersetIDToMod
  );
  const setExerciseIDToMod = useWorkoutDraftStore(
    (state) => state.setExerciseIDToMod
  );

  return () => {
    switch (itemType) {
      case "section":
        setSectionIDToMod(itemID);
        break;
      case "superset":
        setSupersetIDToMod(itemID);
        break;
      case "exercise":
        setExerciseIDToMod(itemID);
        break;
    }

    if (parentSupersetID) {
      setSupersetIDToMod(parentSupersetID);
    }
    if (parentSectionID) {
      setSectionIDToMod(parentSectionID);
    }

    if (parentType) {
      if (deleteNestedItemOverlayHandler) deleteNestedItemOverlayHandler.open();
    } else {
      if (deleteRootItemOverlayHandler) deleteRootItemOverlayHandler.open();
    }
  };
}

/**
 * Hook to delete an item (Section, Superset, or Exercise) from a workout draft for web.
 *
 * @param itemType The type of item to delete ("exercise", "superset", or "section").
 * @param itemID The ID of the item to delete.
 * @returns An object containing handleDeleteItemClick function.
 */
export function useDeleteItem(
  itemType: "exercise" | "superset" | "section",
  itemID: string
) {
  const handleDeleteItemClick = useDeleteItemLogic(itemType, itemID);

  return { handleDeleteItemClick };
}

/**
 * Hook to delete an item (Section, Superset, or Exercise) from a workout draft for mobile.
 *
 * @param itemType The type of item to delete ("exercise", "superset", or "section").
 * @param itemID The ID of the item to delete.
 * @returns An object containing handleDeleteItemPress function.
 */
export function useDeleteItemMobile(
  itemType: "exercise" | "superset" | "section",
  itemID: string
) {
  const handleDeleteItemPress = useDeleteItemLogic(itemType, itemID);

  return { handleDeleteItemPress };
}
