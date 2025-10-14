import { useState } from 'react';

import { useWorkoutDraftStore } from '@cwt/state/stores';
import { Mode } from '@cwt/schema/workouts';
import { useUpdateWorkoutTitle } from '@cwt/hooks';

import WorkoutTitle from './WorkoutTitle';

export default function WorkoutTitleContainer() {
  const {
    mode,
    isEditMode,
    workoutTitle,
    handleEditClick,
    handleSaveClick,
    handleTitleChange,
  } = useUpdateWorkoutTitle();

  return (
    <WorkoutTitle
      mode={mode}
      isEditMode={isEditMode}
      workoutTitle={workoutTitle || ''}
      onEditClick={handleEditClick}
      onSaveClick={handleSaveClick}
      onTitleChange={handleTitleChange}
    />
  );
}
