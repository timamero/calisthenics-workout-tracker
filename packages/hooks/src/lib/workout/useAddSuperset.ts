import { useWorkoutDraftStore } from "@cwt/state/stores";

export default function useAddSuperset(parentSectionID: string | null = null) {
  const addSuperset = useWorkoutDraftStore((state) => state.addSuperset);
  const setSectionIDToMod = useWorkoutDraftStore(
    (state) => state.setSectionIDToMod
  );

  const handleAddSupersetClick = () => {
    setSectionIDToMod(parentSectionID);
    addSuperset(parentSectionID);
  };

  return handleAddSupersetClick;
}
