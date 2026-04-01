import { useUpdateWorkoutTitle } from '@cwt/hooks';

import WorkoutTitleUI from './WorkoutTitleUI';

export default function WorkoutTitle() {
  const {
    mode,
    isEditMode,
    workoutTitle,
    handleEditClick,
    handleSaveClick,
    handleTitleChange,
  } = useUpdateWorkoutTitle();

  return (
    <WorkoutTitleUI
      mode={mode}
      isEditMode={isEditMode}
      workoutTitle={workoutTitle || ''}
      onEditClick={handleEditClick}
      onSaveClick={handleSaveClick}
      onTitleChange={handleTitleChange}
    />
  );
}
