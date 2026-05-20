import { useContext } from 'react';
import { useNavigate } from '@tanstack/react-router';

import type { Section } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import { WorkoutDataItemContext } from '@cwt/context';

import SectionItemUI from './SectionItemUI';
import { useDeleteItem, useReorderItem, useAddSuperset } from '@cwt/hooks';

export default function SectionItem() {
  const navigate = useNavigate();

  const section = useContext(WorkoutDataItemContext)!.item as Section;

  const mode = useWorkoutDraftStore((state) => state.mode);
  const rootWorkoutDataLength = useWorkoutDraftStore(
    (state) => state.workoutData.length || 0,
  );

  const setSectionIDToMod = useWorkoutDraftStore(
    (state) => state.setSectionIDToMod,
  );
  const setSectionTitle = useWorkoutDraftStore(
    (state) => state.setSectionTitle,
  );

  const { handleUpClick, handleDownClick } = useReorderItem(section);
  const handleDeleteSectionClick = useDeleteItem(
    'section',
    section!.id,
  ).handleDeleteItemClick;
  const handleAddSupersetClick = useAddSuperset(
    section.id,
  ).handleAddSupersetClick;

  const handleOpenAddExerciseClick = () => {
    setSectionIDToMod(section!.id);
  };

  const handleSetSectionTitle = (title: string) => {
    setSectionIDToMod(section!.id);
    setSectionTitle(title);
  };

  const handleAddExerciseClick = () => {
    handleOpenAddExerciseClick();
    navigate({
      to: '/workout/add-exercise',
    });
  };

  return (
    <SectionItemUI
      mode={mode!}
      title={section.name!}
      isFirst={section!.order === 0}
      isLast={section!.order === rootWorkoutDataLength - 1}
      handleUpClick={handleUpClick}
      handleDownClick={handleDownClick}
      handleDeleteSectionClick={handleDeleteSectionClick}
      handleAddExerciseClick={handleAddExerciseClick}
      handleAddSupersetClick={handleAddSupersetClick}
      handleSetSectionTitle={handleSetSectionTitle}
    />
  );
}
