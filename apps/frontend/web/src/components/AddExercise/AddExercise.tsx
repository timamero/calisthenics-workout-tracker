import { useAddExercise } from '@cwt/hooks';
import { useNavigate } from '@tanstack/react-router';
// import { useWorkoutContextWeb } from '@cwt/hooks';

import AddExerciseUI from './AddExerciseUI';

export default function AddExercise() {
  const navigate = useNavigate();

  const { selectedExerciseIDToAdd, handleAddExercise } = useAddExercise();

  // const opened =
  //   useWorkoutContextWeb().webOverlayHandlers?.addExerciseOverlayOpened;
  // const handler =
  //   useWorkoutContextWeb().webOverlayHandlers?.addExerciseOverlayHandler;

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
    />
  );
}
