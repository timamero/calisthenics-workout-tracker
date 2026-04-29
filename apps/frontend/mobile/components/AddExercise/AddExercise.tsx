import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  useAddExerciseMobile,
  useClearExerciseSearchAndFilters,
  useResetSelectedIDs,
} from '@cwt/hooks';

import WorkoutDraftContext from '../../contexts/WorkoutDraftContext';

import AddExerciseUI from './AddExerciseUI';

export default function AddExercise() {
  const navigation = useNavigation<any>();

  // --- Hooks ---
  const { selectedExerciseIDToAdd, handleAddExercisePress } =
    useAddExerciseMobile();

  const { clearExerciseSearch, clearExerciseFilters } =
    useClearExerciseSearchAndFilters();

  const resetSelectedIDs = useResetSelectedIDs();

  // --- Context ---
  const setIsAddWorkoutItemButtonsVisible =
    useContext(WorkoutDraftContext)?.setIsAddWorkoutItemButtonsVisible!;
  const workoutDataScrollViewRef =
    useContext(WorkoutDraftContext)?.workoutDataScrollViewRef!;

  // --- Handlers ---
  const handleAddExercise = () => {
    handleAddExercisePress(workoutDataScrollViewRef!);
    setIsAddWorkoutItemButtonsVisible(true);

    clearExerciseFilters();
    clearExerciseSearch();

    navigation.goBack();
  };

  const handleCancelPress = () => {
    setIsAddWorkoutItemButtonsVisible(true);

    resetSelectedIDs();

    clearExerciseFilters();
    clearExerciseSearch();

    navigation.goBack();
  };

  return (
    <AddExerciseUI
      selectedExerciseIDToAdd={selectedExerciseIDToAdd}
      handleAddExercisePress={handleAddExercise}
      handleCancelPress={handleCancelPress}
    />
  );
}
