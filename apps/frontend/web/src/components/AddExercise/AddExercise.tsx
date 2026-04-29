import { useContext } from 'react';
import { useNavigate } from '@tanstack/react-router';

import {
  useClearExerciseSearchAndFilters,
  useAddExercise,
  useResetSelectedIDs,
} from '@cwt/hooks';

import WorkoutDraftContext from '../../contexts/WorkoutDraftContext';

import AddExerciseUI from './AddExerciseUI';

export default function AddExercise() {
  const navigate = useNavigate();

  // --- Hooks ---
  const { selectedExerciseIDToAdd, handleAddExercise } = useAddExercise();

  const { clearExerciseSearch, clearExerciseFilters } =
    useClearExerciseSearchAndFilters();

  const resetSelectedIDs = useResetSelectedIDs();

  // --- Context ---
  const exerciseFilterOverlayHandler =
    useContext(WorkoutDraftContext)?.exerciseFilterOverlayHandler;

  // --- Handlers ---
  const handleOpenFilterOverlayClick = () => {
    exerciseFilterOverlayHandler?.open();
  };

  const handleCancelClick = () => {
    resetSelectedIDs();
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
