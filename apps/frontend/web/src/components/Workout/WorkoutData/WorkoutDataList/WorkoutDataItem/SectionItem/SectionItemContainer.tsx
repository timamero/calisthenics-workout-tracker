import { useContext } from 'react';

import type { Section } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import { WorkoutContext } from '@cwt/context';
import { WorkoutDataItemContext } from '@cwt/context';

// import { WorkoutContext } from '../../../../../../contexts/WorkoutContext';
// import { WorkoutDataItemContext } from '../../../../../../contexts/WorkoutDataItemContext';
import SectionItem from './SectionItem';

export default function SectionItemContainer() {
  const section = useContext(WorkoutDataItemContext)!.item as Section;
  // console.log('section order ', section.order);
  const deleteRootItemOverlayHandler =
    useContext(WorkoutContext)!.deleteRootItemOverlayHandler;

  const mode = useWorkoutDraftStore((state) => state.mode);
  const rootWorkoutDataLength = useWorkoutDraftStore(
    (state) => state.workoutData.length || 0,
  );
  const reorderRootItem = useWorkoutDraftStore(
    (state) => state.reorderRootItem,
  );
  const setSectionIDToMod = useWorkoutDraftStore(
    (state) => state.setSectionIDToMod,
  );

  const handleUpClick = () => {
    reorderRootItem(section!.id, section!.order - 1);
  };
  const handleDownClick = () => {
    reorderRootItem(section!.id, section!.order + 1);
  };

  const handleDeleteSectionClick = () => {
    setSectionIDToMod(section.id);
    deleteRootItemOverlayHandler.open();
  };
  return (
    <SectionItem
      mode={mode!}
      section={section}
      isFirst={section!.order === 0}
      isLast={section!.order === rootWorkoutDataLength - 1}
      handleUpClick={handleUpClick}
      handleDownClick={handleDownClick}
      handleDeleteSectionClick={handleDeleteSectionClick}
    />
  );
}
