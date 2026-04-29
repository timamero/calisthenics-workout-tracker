import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  useAddExerciseMobile,
  useClearExerciseSearchAndFilters,
} from '@cwt/hooks';
import { useWorkoutDraftStore } from '@cwt/state/stores';

import WorkoutDraftContext from '../../contexts/WorkoutDraftContext';

import AddExerciseUI from './AddExerciseUI';

export default function AddExercise() {
  const navigation = useNavigation<any>();

  // --- Hooks ---
  const { selectedExerciseIDToAdd, handleAddExercisePress } =
    useAddExerciseMobile();

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
  const setIsAddWorkoutItemButtonsVisible =
    useContext(WorkoutDraftContext)?.setIsAddWorkoutItemButtonsVisible!;
  const workoutDataScrollViewRef =
    useContext(WorkoutDraftContext)?.workoutDataScrollViewRef!;

  // --- Handlers ---
  const handleAddExercise = () => {
    handleAddExercisePress(workoutDataScrollViewRef!);
    setIsAddWorkoutItemButtonsVisible(true);

    navigation.goBack();
  };

  const handleCancelPress = () => {
    setIsAddWorkoutItemButtonsVisible(true);

    setSupersetIDToMod(null);
    setSectionIDToMod(null);
    setSelectedExerciseIDToAdd(null);

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
