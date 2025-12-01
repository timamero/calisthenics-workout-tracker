import { useContext } from 'react';

import type { Section } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';
// import { WorkoutContext } from '@cwt/context';
import { WorkoutDataItemContext } from '@cwt/context';

import SectionItem from './SectionItem';
import { useDeleteItem, useReorderItem } from '@cwt/hooks';

export default function SectionItemContainer() {
  const section = useContext(WorkoutDataItemContext)!.item as Section;
  // const deleteRootItemOverlayHandler =
  //   useContext(WorkoutContext)!.deleteRootItemOverlayHandler;

  const mode = useWorkoutDraftStore((state) => state.mode);
  const rootWorkoutDataLength = useWorkoutDraftStore(
    (state) => state.workoutData.length || 0,
  );

  // const setSectionIDToMod = useWorkoutDraftStore(
  //   (state) => state.setSectionIDToMod,
  // );

  const handleUpClick = useReorderItem(section).handleUpClick;
  const handleDownClick = useReorderItem(section).handleDownClick;
  const handleDeleteSectionClick = useDeleteItem(
    'section',
    section!.id,
  ).handleDeleteItemClick;

  // const handleDeleteSectionClick = () => {
  //   setSectionIDToMod(section.id);
  //   if (deleteRootItemOverlayHandler) deleteRootItemOverlayHandler.open();
  // };
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
