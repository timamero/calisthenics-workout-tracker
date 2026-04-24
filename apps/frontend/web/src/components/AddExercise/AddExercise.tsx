import { useAddExercise } from '@cwt/hooks';
// import { useWorkoutContextWeb } from '@cwt/hooks';

import AddExerciseUI from './AddExerciseUI';

export default function AddExercise() {
  const { selectedExerciseIDToAdd, handleAddExerciseClick } = useAddExercise();

  // const opened =
  //   useWorkoutContextWeb().webOverlayHandlers?.addExerciseOverlayOpened;
  // const handler =
  //   useWorkoutContextWeb().webOverlayHandlers?.addExerciseOverlayHandler;

  return (
    <AddExerciseUI
      selectedExerciseIDToAdd={selectedExerciseIDToAdd}
      handleAddExerciseClick={handleAddExerciseClick}
    />
  );
}
