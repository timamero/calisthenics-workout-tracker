import { useAddExercise } from '@cwt/hooks';
import { useWorkoutContextWeb } from '@cwt/hooks';

import AddExerciseOverlayUI from './AddExerciseOverlayUI';

export default function AddExerciseOverlay() {
  const { selectedExerciseIDToAdd, handleAddExerciseClick } = useAddExercise();

  const opened =
    useWorkoutContextWeb().webOverlayHandlers?.addExerciseOverlayOpened;
  const handler =
    useWorkoutContextWeb().webOverlayHandlers?.addExerciseOverlayHandler;

  return (
    <AddExerciseOverlayUI
      opened={opened!}
      selectedExerciseIDToAdd={selectedExerciseIDToAdd}
      handler={handler!}
      handleAddExerciseClick={handleAddExerciseClick}
    />
  );
}
