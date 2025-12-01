import { useContext } from 'react';

import type { Superset } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import {
  useDeleteItem,
  useParentItemsLength,
  useReorderItem,
} from '@cwt/hooks';
// import { WorkoutContext } from '@cwt/context';
import { WorkoutDataItemContext } from '@cwt/context';

import SupersetItem from './SupersetItem';

export default function SupersetItemContainer() {
  const superset = useContext(WorkoutDataItemContext)!.item as Superset;
  // const parentSectionID = useContext(WorkoutDataItemContext)?.parentSectionID;
  // const deleteRootItemOverlayHandler =
  //   useContext(WorkoutContext)!.deleteRootItemOverlayHandler;
  // const deleteNestedItemOverlayHandler =
  //   useContext(WorkoutContext)!.deleteNestedItemOverlayHandler;

  const mode = useWorkoutDraftStore((state) => state.mode);

  // const setSupersetIDToMod = useWorkoutDraftStore(
  //   (state) => state.setSupersetIDToMod,
  // );
  // const setSectionIDToMod = useWorkoutDraftStore(
  //   (state) => state.setSectionIDToMod,
  // );

  const handleUpClick = useReorderItem(superset).handleUpClick;
  const handleDownClick = useReorderItem(superset).handleDownClick;
  const handleDeleteSupersetClick = useDeleteItem(
    'superset',
    superset!.id,
  ).handleDeleteItemClick;

  // const handleDeleteSupersetClick = () => {
  //   setSupersetIDToMod(superset.id);
  //   if (parentSectionID) {
  //     setSectionIDToMod(parentSectionID);
  //   }

  //   if (parentSectionID) {
  //     if (deleteNestedItemOverlayHandler) deleteNestedItemOverlayHandler.open();
  //   } else {
  //     if (deleteRootItemOverlayHandler) deleteRootItemOverlayHandler.open();
  //   }
  // };

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
