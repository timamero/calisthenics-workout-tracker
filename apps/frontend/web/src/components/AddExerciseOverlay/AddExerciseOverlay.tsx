import { useAddExercise, type UseAddExerciseWebResult } from '@cwt/hooks';

import AddExerciseOverlayUI from './AddExerciseOverlayUI';

export default function AddExerciseOverlay() {
  const { opened, handler, selectedExerciseIDToAdd, handleAddExerciseClick } =
    useAddExercise('web') as UseAddExerciseWebResult;

  return (
    <AddExerciseOverlayUI
      opened={opened!}
      selectedExerciseIDToAdd={selectedExerciseIDToAdd}
      handler={handler!}
      handleAddExerciseClick={handleAddExerciseClick}
    />
  );
}
