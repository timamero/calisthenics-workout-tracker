import { Stack, Button } from '@mantine/core';
import { useAddExerciseOverlay, useAddSuperset } from '@cwt/hooks';
import { useWorkoutDraftStore } from '@cwt/state/stores';

export default function AddWorkoutItemButtons() {
  const handleOpenAddExerciseOverlay = useAddExerciseOverlay();
  const addSection = useWorkoutDraftStore((state) => state.addSection);
  const { handleAddSupersetClick } = useAddSuperset();
  return (
    <Stack>
      <Button
        variant="filled"
        color="orange.9"
        onClick={() => handleOpenAddExerciseOverlay()}
      >
        Add Exercise
      </Button>
      <Button variant="filled" color="orange.9" onClick={() => addSection()}>
        Add Section
      </Button>
      <Button
        variant="filled"
        color="orange.9"
        onClick={() => handleAddSupersetClick()}
      >
        Add Superset
      </Button>
    </Stack>
  );
}
