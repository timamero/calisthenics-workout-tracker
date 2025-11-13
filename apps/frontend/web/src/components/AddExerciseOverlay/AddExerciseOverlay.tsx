// import { useContext } from 'react';
// import {
//   useWorkoutDraftStore,
//   useExerciseLibraryStore,
// } from '@cwt/state/stores';
// import { OverlayContext } from '@cwt/context';
import { useAddExercise, type UseAddExerciseWebResult } from '@cwt/hooks';

import AddExerciseOverlayUI from './AddExerciseOverlayUI';

export default function AddExerciseOverlay() {
  const { opened, handler, selectedExerciseIDToAdd, handleAddExerciseClick } =
    useAddExercise('web') as UseAddExerciseWebResult;
  // const opened = useContext(OverlayContext)?.addExerciseOverlayOpened;
  // const handler = useContext(OverlayContext)?.addExerciseOverlayHandler;

  // const selectedExerciseIDToAdd = useWorkoutDraftStore(
  //   (state) => state.selectedExerciseIDToAdd,
  // );
  // const setSelectedExerciseIDToAdd = useWorkoutDraftStore(
  //   (state) => state.setSelectedExerciseIDToAdd,
  // );
  // const addExercise = useWorkoutDraftStore((state) => state.addExerciseUpdated);
  // const getExerciseById = useExerciseLibraryStore(
  //   (state) => state.getExerciseByID,
  // );
  // const handleAddExerciseClick = () => {
  //   addExercise(
  //     getExerciseById(selectedExerciseIDToAdd as number).default_tracking_type,
  //   );
  //   setSelectedExerciseIDToAdd(null);
  //   handler!.close();
  // };

  return (
    <AddExerciseOverlayUI
      opened={opened!}
      selectedExerciseIDToAdd={selectedExerciseIDToAdd}
      handler={handler!}
      handleAddExerciseClick={handleAddExerciseClick}
    />
  );
}
