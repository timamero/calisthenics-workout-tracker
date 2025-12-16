import { useContext } from 'react';

import type { Superset } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import {
  // useWorkoutContextMobile,
  useReorderItemMobile,
  useDeleteItemMobile,
  useParentItemsLength,
} from '@cwt/hooks';
import { WorkoutDataItemContext } from '@cwt/context';

import SupersetItem from './SupersetItem';

export default function SupersetItemContainer() {
  const superset = useContext(WorkoutDataItemContext)!.item as Superset;
  const mode = useWorkoutDraftStore((state) => state.mode);
  const { handleUpPress, handleDownPress } = useReorderItemMobile(superset);
  const handleDeleteSupersetPress = useDeleteItemMobile(
    'superset',
    superset.id,
  ).handleDeleteItemPress;

  return (
    <SupersetItem
      mode={mode!}
      superset={superset}
      isFirst={superset!.order === 0}
      isLast={superset!.order === useParentItemsLength() - 1}
      handleUpPress={handleUpPress}
      handleDownPress={handleDownPress}
      handleDeleteSupersetPress={handleDeleteSupersetPress}
    />
  );
}
