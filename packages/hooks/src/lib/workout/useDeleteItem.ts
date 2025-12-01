import { useContext } from 'react';
import { WorkoutContext, WorkoutDataItemContext } from '@cwt/context';
import { useWorkoutDraftStore } from '@cwt/state/stores';

export default function useDeleteItem(
  itemType: 'exercise' | 'superset' | 'section',
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

  const handleDeleteItemClick = () => {
    switch (itemType) {
      case 'section':
        setSectionIDToMod(itemID);
        break;
      case 'superset':
        setSupersetIDToMod(itemID);
        break;
      case 'exercise':
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

  return { handleDeleteItemClick };
}
