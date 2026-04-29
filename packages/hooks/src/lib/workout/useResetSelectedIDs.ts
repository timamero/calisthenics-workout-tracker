import { useWorkoutDraftStore } from "@cwt/state/stores";
export default function useResetSelectedIDs() {
  const setSupersetIDToMod = useWorkoutDraftStore(
    (state) => state.setSupersetIDToMod,
  );
  const setSectionIDToMod = useWorkoutDraftStore(
    (state) => state.setSectionIDToMod,
  );
  const setSelectedExerciseIDToAdd = useWorkoutDraftStore(
    (state) => state.setSelectedExerciseIDToAdd,
  );

  const resetSelectedIDs = () => {
    setSupersetIDToMod(null);
    setSectionIDToMod(null);
    setSelectedExerciseIDToAdd(null);
  };

  return resetSelectedIDs;
}
