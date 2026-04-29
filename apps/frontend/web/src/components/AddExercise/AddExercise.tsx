import { useContext } from 'react';
import { useNavigate } from '@tanstack/react-router';

import { useClearExerciseSearchAndFilters, useAddExercise } from '@cwt/hooks';
import { useWorkoutDraftStore } from '@cwt/state/stores';

import WorkoutDraftContext from '../../contexts/WorkoutDraftContext';

import AddExerciseUI from './AddExerciseUI';

export default function AddExercise() {
  const navigate = useNavigate();

  // --- Hooks ---
  const { selectedExerciseIDToAdd, handleAddExercise } = useAddExercise();

  const { clearExerciseSearch, clearExerciseFilters } =
    useClearExerciseSearchAndFilters();

  // --- State ---
  const setSupersetIDToMod = useWorkoutDraftStore(
    (state) => state.setSupersetIDToMod,
  );
  const setSectionIDToMod = useWorkoutDraftStore(
    (state) => state.setSectionIDToMod,
  );
  const setSelectedExerciseIDToAdd = useWorkoutDraftStore(
    (state) => state.setSelectedExerciseIDToAdd,
  );

  // --- Context ---
  const exerciseFilterOverlayHandler =
    useContext(WorkoutDraftContext)?.exerciseFilterOverlayHandler;

  // --- Handlers ---
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
