import { useContext } from 'react';

import type { Superset } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import { useParentItemsLength } from '@cwt/hooks';
import { WorkoutContext } from '@cwt/context';
import { WorkoutDataItemContext } from '@cwt/context';

import SupersetItem from './SupersetItem';

export default function SupersetItemContainer() {
  const superset = useContext(WorkoutDataItemContext)!.item as Superset;
  const parentSectionID = useContext(WorkoutDataItemContext)?.parentSectionID;
  const deleteRootItemOverlayHandler =
    useContext(WorkoutContext)!.deleteRootItemOverlayHandler;
  const deleteNestedItemOverlayHandler =
    useContext(WorkoutContext)!.deleteNestedItemOverlayHandler;

  const mode = useWorkoutDraftStore((state) => state.mode);
  const reorderRootItem = useWorkoutDraftStore(
    (state) => state.reorderRootItem,
  );
  const reorderNestedItem = useWorkoutDraftStore(
    (state) => state.reorderNestedItem,
  );
  const setSupersetIDToMod = useWorkoutDraftStore(
    (state) => state.setSupersetIDToMod,
  );
  const setSectionIDToMod = useWorkoutDraftStore(
    (state) => state.setSectionIDToMod,
  );

  const handleUpClick = () => {
    if (!parentSectionID) {
      reorderRootItem(superset!.id, superset!.order - 1);
    } else {
      setSupersetIDToMod(superset.id);
      if (parentSectionID) {
        setSectionIDToMod(parentSectionID);
      }
      reorderNestedItem(superset!.order - 1);
    }
  };
  const handleDownClick = () => {
    if (!parentSectionID) {
      reorderRootItem(superset!.id, superset!.order + 1);
    } else {
      setSupersetIDToMod(superset.id);
      if (parentSectionID) {
        setSectionIDToMod(parentSectionID);
      }
      reorderNestedItem(superset!.order + 1);
    }
  };

  const handleDeleteSupersetClick = () => {
    setSupersetIDToMod(superset.id);
    if (parentSectionID) {
      setSectionIDToMod(parentSectionID);
    }

    if (parentSectionID) {
      if (deleteNestedItemOverlayHandler) deleteNestedItemOverlayHandler.open();
    } else {
      if (deleteRootItemOverlayHandler) deleteRootItemOverlayHandler.open();
    }
  };

  return (
    <SupersetItem
      mode={mode!}
      superset={superset}
      isFirst={superset!.order === 0}
      isLast={superset!.order === useParentItemsLength() - 1}
      handleUpClick={handleUpClick}
      handleDownClick={handleDownClick}
      handleDeleteSupersetClick={handleDeleteSupersetClick}
    />
  );
}
