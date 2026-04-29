import { useContext } from 'react';
import { useAddExercise } from '@cwt/hooks';
import { useNavigate } from '@tanstack/react-router';

import { useWorkoutDraftStore } from '@cwt/state/stores';
import { useClearExerciseSearchAndFilters } from '@cwt/hooks';

import WorkoutDraftContext from '../../contexts/WorkoutDraftContext';
import AddExerciseUI from './AddExerciseUI';

export default function AddExercise() {
  const navigate = useNavigate();

  const { selectedExerciseIDToAdd, handleAddExercise } = useAddExercise();

  const exerciseFilterOverlayHandler =
    useContext(WorkoutDraftContext)?.exerciseFilterOverlayHandler;

  const setSupersetIDToMod = useWorkoutDraftStore(
    (state) => state.setSupersetIDToMod,
  );
  const setSectionIDToMod = useWorkoutDraftStore(
    (state) => state.setSectionIDToMod,
  );
  const setSelectedExerciseIDToAdd = useWorkoutDraftStore(
    (state) => state.setSelectedExerciseIDToAdd,
  );

  const { clearExerciseSearch, clearExerciseFilters } =
    useClearExerciseSearchAndFilters();

  const handleOpenFilterOverlayClick = () => {
    exerciseFilterOverlayHandler?.open();
  };

  const handleCancelClick = () => {
    setSupersetIDToMod(null);
    setSectionIDToMod(null);
    setSelectedExerciseIDToAdd(null);

    clearExerciseFilters();
    clearExerciseSearch();
  };

  const handleAddExerciseClick = () => {
    handleAddExercise();
    navigate({
      to: '/workout',
    });
  };

  return (
    <AddExerciseUI
      selectedExerciseIDToAdd={selectedExerciseIDToAdd}
      handleAddExerciseClick={handleAddExerciseClick}
      handleOpenFilterOverlayClick={handleOpenFilterOverlayClick}
      handleCancelClick={handleCancelClick}
    />
  );
}
