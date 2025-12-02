import { useContext } from 'react';

import type { Section } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import { WorkoutDataItemContext } from '@cwt/context';

import SectionItemUI from './SectionItemUI';
import {
  useDeleteItem,
  useReorderItem,
  useAddExerciseOverlay,
  useAddSuperset,
} from '@cwt/hooks';

export default function SectionItem() {
  const section = useContext(WorkoutDataItemContext)!.item as Section;

  const mode = useWorkoutDraftStore((state) => state.mode);
  const rootWorkoutDataLength = useWorkoutDraftStore(
    (state) => state.workoutData.length || 0,
  );

  const handleUpClick = useReorderItem(section).handleUpClick;
  const handleDownClick = useReorderItem(section).handleDownClick;
  const handleDeleteSectionClick = useDeleteItem(
    'section',
    section!.id,
  ).handleDeleteItemClick;
  const handleOpenAddExerciseOverlay = useAddExerciseOverlay('section');
  const handleAddSupersetClick = useAddSuperset(section.id);

  return (
    <SectionItemUI
      mode={mode!}
      isFirst={section!.order === 0}
      isLast={section!.order === rootWorkoutDataLength - 1}
      handleUpClick={handleUpClick}
      handleDownClick={handleDownClick}
      handleDeleteSectionClick={handleDeleteSectionClick}
      handleOpenAddExerciseOverlay={handleOpenAddExerciseOverlay}
      handleAddSupersetClick={handleAddSupersetClick}
    />
  );
}
