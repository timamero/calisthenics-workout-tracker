import {
  useWorkoutDraftStore,
  useExerciseLibraryStore,
} from '@cwt/state/stores';

import AddExerciseOverlayUI from './AddExerciseOverlayUI';

interface AddExerciseOverlayProps {
  opened: boolean;
  handler: { close: () => void };
}

export default function AddExerciseOverlay({
  opened,
  handler,
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

  const handleAddExerciseClick = () => {
    addExercise(
      getExerciseById(selectedExerciseIDToAdd as number).default_tracking_type,
    );
    setSelectedExerciseIDToAdd(null);
    handler.close();
  };

  return (
    <AddExerciseOverlayUI
      opened={opened}
      selectedExerciseIDToAdd={selectedExerciseIDToAdd}
      handler={handler}
      handleAddExerciseClick={handleAddExerciseClick}
    />
  );
}
