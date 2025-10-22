import * as React from 'react';

import type { Section } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';

import { WorkoutDataContext } from '../../../../../../contexts/WorkoutDataContext';
import SectionItem from './SectionItem';

export default function SectionItemContainer() {
  const section = React.useContext(WorkoutDataContext)!.item as Section;
  const deleteRootItemOverlayHandler =
    React.useContext(WorkoutDataContext)!.deleteRootItemOverlayHandler;

  const mode = useWorkoutDraftStore((state) => state.mode);
  const setSectionIDToMod = useWorkoutDraftStore(
    (state) => state.setSectionIDToMod,
  );

  const handleDeleteSectionClick = () => {
    setSectionIDToMod(section.id);
    deleteRootItemOverlayHandler.open();
  };
  return (
    <SectionItem
      mode={mode!}
      section={section}
      handleDeleteSectionClick={handleDeleteSectionClick}
    />
  );
}
