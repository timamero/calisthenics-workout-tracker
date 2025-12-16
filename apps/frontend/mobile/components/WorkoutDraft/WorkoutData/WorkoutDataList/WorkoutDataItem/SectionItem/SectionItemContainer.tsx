import { useContext } from 'react';

import type { Section } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import {
  useDeleteItemMobile,
  // useWorkoutContextMobile,
  useReorderItemMobile,
} from '@cwt/hooks';
import { WorkoutDataItemContext } from '@cwt/context';

import SectionItem from './SectionItem';

export default function SectionItemContainer() {
  const section = useContext(WorkoutDataItemContext)!.item as Section;
  // const setIsDeleteRootItemOverlayVisible =
  //   useWorkoutContextMobile().mobileOverlayHandlers
  //     .setIsDeleteRootItemOverlayVisible;
  // useContext(WorkoutContext)!.setIsDeleteRootItemOverlayVisible;

  const mode = useWorkoutDraftStore((state) => state.mode);
  const rootWorkoutDataLength = useWorkoutDraftStore(
    (state) => state.workoutData.length || 0,
  );
  // const reorderRootItem = useWorkoutDraftStore(
  //   (state) => state.reorderRootItem,
  // );
  // const setSectionIDToMod = useWorkoutDraftStore(
  //   (state) => state.setSectionIDToMod,
  // );

  const { handleUpPress, handleDownPress } = useReorderItemMobile(section);
  // const handleUpPress = () => {
  //   reorderRootItem(section!.id, section!.order - 1);
  // };
  // const handleDownPress = () => {
  //   reorderRootItem(section!.id, section!.order + 1);
  // };

  const handleDeleteSectionPress = useDeleteItemMobile(
    'section',
    section.id,
  ).handleDeleteItemPress;
  // const handleDeleteSectionPress = () => {
  //   setSectionIDToMod(section.id);
  //   if (setIsDeleteRootItemOverlayVisible)
  //     setIsDeleteRootItemOverlayVisible(true);
  // };
  return (
    <SectionItem
      mode={mode!}
      section={section}
      isFirst={section!.order === 0}
      isLast={section!.order === rootWorkoutDataLength - 1}
      handleUpPress={handleUpPress}
      handleDownPress={handleDownPress}
      handleDeleteSectionPress={handleDeleteSectionPress}
    />
  );
}
