import { useContext } from 'react';

import { Stack, Button } from '@mantine/core';
import { WorkoutContext } from '@cwt/context';
import { useAddExerciseOverlay } from '@cwt/hooks';

export default function AddWorkoutItemButtons() {
  const { handleOpenAddExerciseOverlay } = useAddExerciseOverlay();
  const addSectionOverlayHandler =
    useContext(WorkoutContext)?.addSectionOverlayHandler;
  const addSupersetOverlayHandler =
    useContext(WorkoutContext)?.addSupersetOverlayHandler;
  return (
    <Stack>
      <Button
        variant="filled"
        color="orange.9"
        onClick={() => handleOpenAddExerciseOverlay()}
      >
        Add Exercise
      </Button>
      <Button
        variant="filled"
        color="orange.9"
        onClick={() => addSectionOverlayHandler?.open()}
      >
        Add Section
      </Button>
      <Button
        variant="filled"
        color="orange.9"
        onClick={() => addSupersetOverlayHandler?.open()}
      >
        Add Superset
      </Button>
    </Stack>
  );
}
