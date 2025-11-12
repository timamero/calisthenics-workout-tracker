import { useContext } from 'react';

import {
  useWorkoutDraftStore,
  useExerciseLibraryStore,
} from '@cwt/state/stores';
import { AddExerciseOverlayProps } from '@cwt/schema/ui';

import AddExerciseOverlayUI from './AddExerciseOverlayUI';
import { OverlayContext } from '@cwt/context';

export default function AddExerciseOverlay({
  // isVisible,
  // handleHideModal,
  workoutDataScrollViewRef,
}: AddExerciseOverlayProps) {
  const isVisible = useContext(OverlayContext)?.isAddExerciseOverlayVisible;
  const setIsVisible =
    useContext(OverlayContext)?.setIsAddExerciseOverlayVisible;

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
    setIsVisible?.(false);
    workoutDataScrollViewRef!.current?.scrollToEnd({ animated: true });
  };
  return (
    <AddExerciseOverlayUI
      isVisible={isVisible!}
      selectedExerciseIDToAdd={selectedExerciseIDToAdd}
      setIsVisible={setIsVisible!}
      handleAddExercisePress={handleAddExercisePress}
    />
  );
}
