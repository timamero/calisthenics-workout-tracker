import { useUpdateWorkoutTitle } from '@cwt/hooks';

import WorkoutTitle from './WorkoutTitle';

export default function TextInputWithEdit() {
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
      mode={mode!}
      isEditMode={isEditMode}
      workoutTitle={workoutTitle || ''}
      onEditClick={handleEditClick}
      onSaveClick={handleSaveClick}
      onTitleChange={handleTitleChange}
    />
  );
}
