import * as React from 'react';
import { ScrollView } from 'react-native';

import {
  useWorkoutDraftStore,
  useExerciseLibraryStore,
} from '@cwt/state/stores';

import AddExerciseOverlayUI from './AddExerciseOverlayUI';

interface AddExerciseOverlayProps {
  isVisible: boolean;
  handleHideModal: () => void;
  workoutDataScrollViewRef: React.RefObject<ScrollView | null>;
}

export default function AddExerciseOverlay({
  isVisible,
  handleHideModal,
  workoutDataScrollViewRef,
}: AddExerciseOverlayProps) {
  const selectedExerciseIDToAdd = useWorkoutDraftStore(
    (state) => state.selectedExerciseIDToAdd,
  );
  const setSelectedExerciseIDToAdd = useWorkoutDraftStore(
    (state) => state.setSelectedExerciseIDToAdd,
  );
  const addExercise = useWorkoutDraftStore((state) => state.addExerciseUpdated);
  const getExerciseById = useExerciseLibraryStore(
    (state) => state.getExerciseByID,
  );

  const handleAddExercisePress = () => {
    addExercise(
      getExerciseById(selectedExerciseIDToAdd as number).default_tracking_type,
    );
    setSelectedExerciseIDToAdd(null);
    handleHideModal();
    workoutDataScrollViewRef.current?.scrollToEnd({ animated: true });
  };
  return (
    <AddExerciseOverlayUI
      isVisible={isVisible}
      selectedExerciseIDToAdd={selectedExerciseIDToAdd}
      handleHideModal={handleHideModal}
      handleAddExercisePress={handleAddExercisePress}
    />
  );
}
