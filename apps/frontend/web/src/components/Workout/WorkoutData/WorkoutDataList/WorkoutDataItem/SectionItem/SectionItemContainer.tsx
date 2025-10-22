import { useContext } from 'react';

import type { Section } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';

import { WorkoutDataContext } from '../../../../../../contexts/WorkoutDataContext';
import SectionItem from './SectionItem';

export default function SectionItemContainer() {
  const section = useContext(WorkoutDataContext)!.item as Section;
  const deleteRootItemOverlayHandler =
    useContext(WorkoutDataContext)!.deleteRootItemOverlayHandler;

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
