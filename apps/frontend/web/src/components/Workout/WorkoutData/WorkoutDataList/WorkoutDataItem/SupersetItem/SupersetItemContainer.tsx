import * as React from 'react';

import type { Superset } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';

import { WorkoutDataContext } from '../../../../../../contexts/WorkoutDataContext';
import SupersetItem from './SupersetItem';

export default function SupersetItemContainer() {
  const superset = React.useContext(WorkoutDataContext)!.item as Superset;
  const deleteRootItemOverlayHandler =
    React.useContext(WorkoutDataContext)!.deleteRootItemOverlayHandler;

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
