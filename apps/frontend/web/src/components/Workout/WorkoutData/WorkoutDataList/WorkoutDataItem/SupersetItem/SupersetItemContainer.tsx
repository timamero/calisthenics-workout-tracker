import { useContext } from 'react';

import type { Superset } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';

// import { WorkoutDataContext } from '../../../../../../contexts/WorkoutDataContext';
import { WorkoutContext } from '../../../../../../contexts/WorkoutContext';
import { WorkoutDataItemContext } from '../../../../../../contexts/WorkoutDataItemContext';
import SupersetItem from './SupersetItem';

export default function SupersetItemContainer() {
  const superset = useContext(WorkoutDataItemContext)!.item as Superset;
  const deleteRootItemOverlayHandler =
    useContext(WorkoutContext)!.deleteRootItemOverlayHandler;

  const mode = useWorkoutDraftStore((state) => state.mode);
  const setSupersetIDToMod = useWorkoutDraftStore(
    (state) => state.setSupersetIDToMod,
  );

  const handleDeleteSupersetClick = () => {
    setSupersetIDToMod(superset.id);
    deleteRootItemOverlayHandler.open();
  };
  return (
    <SupersetItem
      mode={mode!}
      handleDeleteSupersetClick={handleDeleteSupersetClick}
    />
  );
}
