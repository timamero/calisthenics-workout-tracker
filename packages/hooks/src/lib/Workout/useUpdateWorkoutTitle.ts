import { useState } from 'react';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import { Mode } from '@cwt/schema/workouts';

export function useUpdateWorkoutTitle() {
  const [isEditMode, setIsEditMode] = useState(false);
  const mode = useWorkoutDraftStore((state) => state.mode) as Mode;
  const workoutTitle = useWorkoutDraftStore((state) => state.workoutTitle);
  const setWorkoutTitle = useWorkoutDraftStore(
    (state) => state.setWorkoutTitle
  );

  const handleEditClick = () => setIsEditMode(true);
  const handleSaveClick = () => setIsEditMode(false);
  const handleTitleChange = (value: string) => setWorkoutTitle(value);

  return {
    mode,
    isEditMode,
    workoutTitle,
    handleEditClick,
    handleSaveClick,
    handleTitleChange,
  };
}
