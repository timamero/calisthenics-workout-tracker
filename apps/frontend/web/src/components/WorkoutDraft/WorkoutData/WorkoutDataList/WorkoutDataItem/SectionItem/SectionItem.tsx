import { useContext } from 'react';

import type { Section } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import { WorkoutDataItemContext } from '@cwt/context';

import SectionItemUI from './SectionItemUI';
import {
  useDeleteItem,
  useReorderItem,
  // useAddExerciseOverlay,
  useAddSuperset,
} from '@cwt/hooks';

export default function SectionItem() {
  const section = useContext(WorkoutDataItemContext)!.item as Section;

  const mode = useWorkoutDraftStore((state) => state.mode);
  const rootWorkoutDataLength = useWorkoutDraftStore(
    (state) => state.workoutData.length || 0,
  );

  const setSectionIDToMod = useWorkoutDraftStore(
    (state) => state.setSectionIDToMod,
  );

  const { handleUpClick, handleDownClick } = useReorderItem(section);
  const handleDeleteSectionClick = useDeleteItem(
    'section',
    section!.id,
  ).handleDeleteItemClick;
  // const handleOpenAddExerciseClick =
  //   useAddExerciseOverlay('section').handleOpenAddExerciseOverlayClick;
  const handleAddSupersetClick = useAddSuperset(
    section.id,
  ).handleAddSupersetClick;

  const handleOpenAddExerciseClick = () => {
    setSectionIDToMod(section!.id);
  };

  return (
    <SectionItemUI
      mode={mode!}
      isFirst={section!.order === 0}
      isLast={section!.order === rootWorkoutDataLength - 1}
      handleUpClick={handleUpClick}
      handleDownClick={handleDownClick}
      handleDeleteSectionClick={handleDeleteSectionClick}
      handleOpenAddExerciseClick={handleOpenAddExerciseClick}
      handleAddSupersetClick={handleAddSupersetClick}
    />
  );
}
