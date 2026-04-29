import { useContext } from 'react';

import type { Superset } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import {
  useDeleteItem,
  useParentItemsLength,
  useReorderItem,
} from '@cwt/hooks';
import { WorkoutDataItemContext } from '@cwt/context';

import SupersetItemUI from './SupersetItemUI';

export default function SupersetItem() {
  const superset = useContext(WorkoutDataItemContext)!.item as Superset;
  const supersetParentsSectionID = useContext(
    WorkoutDataItemContext,
  )?.parentSectionID;

  const mode = useWorkoutDraftStore((state) => state.mode);
  const setSupersetIDToMod = useWorkoutDraftStore(
    (state) => state.setSupersetIDToMod,
  );
  const setSectionIDToMod = useWorkoutDraftStore(
    (state) => state.setSectionIDToMod,
  );

  const { handleUpClick, handleDownClick } = useReorderItem(superset);
  const handleDeleteSupersetClick = useDeleteItem(
    'superset',
    superset!.id,
  ).handleDeleteItemClick;
  const handleOpenAddExerciseClick = () => {
    setSupersetIDToMod(superset!.id);
    if (supersetParentsSectionID) {
      setSectionIDToMod(supersetParentsSectionID);
    }
  };

  return (
    <SupersetItemUI
      mode={mode!}
      superset={superset}
      isFirst={superset!.order === 0}
      isLast={superset!.order === useParentItemsLength() - 1}
      handleUpClick={handleUpClick}
      handleDownClick={handleDownClick}
      handleDeleteSupersetClick={handleDeleteSupersetClick}
      handleOpenAddExerciseClick={handleOpenAddExerciseClick}
    />
  );
}
