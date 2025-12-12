import { useWorkoutDraftStore } from "@cwt/state/stores";

/**
 * Common logic for adding a superset to a workout draft. Used by both web and mobile hooks.
 *
 * @param parentSectionID The ID of the parent section to which the superset will be added.
 * @returns A function that, when called, adds a new superset to the workout draft.
 */
function useAddSupersetLogic(parentSectionID: string | null = null) {
  const addSuperset = useWorkoutDraftStore((state) => state.addSuperset);
  const setSectionIDToMod = useWorkoutDraftStore(
    (state) => state.setSectionIDToMod
  );

  return () => {
    setSectionIDToMod(parentSectionID);
    addSuperset(parentSectionID);
  };
}

/**
 * Hook to add a superset to a workout draft for web.
 *
 * @param parentSectionID The ID of the parent section to which the superset will be added.
 * @returns An object containing handleAddSupersetClick function.
 */
export function useAddSuperset(parentSectionID: string | null = null) {
  const handleAddSupersetClick = useAddSupersetLogic(parentSectionID);

  return { handleAddSupersetClick };
}

/**
 * Hook to add a superset to a workout draft for mobile.
 *
 * @param parentSectionID The ID of the parent section to which the superset will be added.
 * @returns An object containing handleAddSupersetPress function.
 */
export function useAddSupersetMobile(parentSectionID: string | null = null) {
  const handleAddSupersetPress = useAddSupersetLogic(parentSectionID);

  return { handleAddSupersetPress };
}
