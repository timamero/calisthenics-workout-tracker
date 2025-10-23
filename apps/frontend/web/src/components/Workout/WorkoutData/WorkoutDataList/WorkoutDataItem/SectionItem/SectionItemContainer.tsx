import { useContext } from 'react';

import type { Section } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';

import { WorkoutContext } from '../../../../../../contexts/WorkoutContext';
import { WorkoutDataItemContext } from '../../../../../../contexts/WorkoutDataItemContext';
import SectionItem from './SectionItem';

export default function SectionItemContainer() {
  const section = useContext(WorkoutDataItemContext)!.item as Section;
  console.log('section order ', section.order);
  const deleteRootItemOverlayHandler =
    useContext(WorkoutContext)!.deleteRootItemOverlayHandler;

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
