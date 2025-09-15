import { useState } from 'react';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import WorkoutTitle from './WorkoutTitle';

export default function WorkoutTitleContainer() {
  const [isEditMode, setIsEditMode] = useState(false);
  const workoutTitle = useWorkoutDraftStore((state) => state.workoutTitle);
  const setWorkoutTitle = useWorkoutDraftStore(
    (state) => state.setWorkoutTitle,
  );

  const handleEditClick = () => setIsEditMode(true);
  const handleSaveClick = () => setIsEditMode(false);
  const handleTitleChange = (value: string) => setWorkoutTitle(value);

  return (
    <WorkoutTitle
      isEditMode={isEditMode}
      workoutTitle={workoutTitle || ''}
      onEditClick={handleEditClick}
      onSaveClick={handleSaveClick}
      onTitleChange={handleTitleChange}
    />
  );
}
