import { useContext } from 'react';
import { useRouter } from '@tanstack/react-router';

import {
  useClearExerciseSearchAndFilters,
  useAddExercise,
  useResetSelectedIDs,
} from '@cwt/hooks';

import WorkoutDraftContext from '../../contexts/WorkoutDraftContext';

import AddExerciseUI from './AddExerciseUI';

export default function AddExercise() {
  // --- Logic Hooks ---
  const router = useRouter();

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
    router.history.back();
  };

  const handleAddExerciseClick = () => {
    handleAddExercise();

    clearExerciseFilters();
    clearExerciseSearch();

    router.history.back();
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
