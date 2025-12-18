import { useContext } from 'react';

import type { Section } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import { useDeleteItemMobile, useReorderItemMobile } from '@cwt/hooks';
import { WorkoutDataItemContext } from '@cwt/context';

import SectionItemUI from './SectionItemUI';

export default function SectionItem() {
  const section = useContext(WorkoutDataItemContext)!.item as Section;
  const mode = useWorkoutDraftStore((state) => state.mode);
  const rootWorkoutDataLength = useWorkoutDraftStore(
    (state) => state.workoutData.length || 0,
  );
  const { handleUpPress, handleDownPress } = useReorderItemMobile(section);
  const handleDeleteSectionPress = useDeleteItemMobile(
    'section',
    section.id,
  ).handleDeleteItemPress;
  return (
    <SectionItemUI
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
