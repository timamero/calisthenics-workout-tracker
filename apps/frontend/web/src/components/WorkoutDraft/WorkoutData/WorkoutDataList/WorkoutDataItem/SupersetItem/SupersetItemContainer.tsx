import { useContext } from 'react';

import type { Superset } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import {
  useDeleteItem,
  useParentItemsLength,
  useReorderItem,
  useAddExerciseOverlay,
} from '@cwt/hooks';
import { WorkoutDataItemContext } from '@cwt/context';

import SupersetItem from './SupersetItem';

export default function SupersetItemContainer() {
  const superset = useContext(WorkoutDataItemContext)!.item as Superset;

  const mode = useWorkoutDraftStore((state) => state.mode);

  const { handleUpClick, handleDownClick } = useReorderItem(superset);
  const handleDeleteSupersetClick = useDeleteItem(
    'superset',
    superset!.id,
  ).handleDeleteItemClick;
  const handleOpenAddExerciseOverlay = useAddExerciseOverlay('superset');

  return (
    <SupersetItem
      mode={mode!}
      superset={superset}
      isFirst={superset!.order === 0}
      isLast={superset!.order === useParentItemsLength() - 1}
      handleUpClick={handleUpClick}
      handleDownClick={handleDownClick}
      handleDeleteSupersetClick={handleDeleteSupersetClick}
      handleOpenAddExerciseOverlay={handleOpenAddExerciseOverlay}
    />
  );
}
