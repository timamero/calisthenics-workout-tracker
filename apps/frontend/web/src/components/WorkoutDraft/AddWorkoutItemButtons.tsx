import { useContext } from 'react';

import { Stack, Button } from '@mantine/core';
import { WorkoutContext } from '@cwt/context';

export default function AddWorkoutItemButtons() {
  const addExerciseOverlayHandler =
    useContext(WorkoutContext)?.addExerciseOverlayHandler;
  const addSectionOverlayHandler =
    useContext(WorkoutContext)?.addSectionOverlayHandler;
  const addSupersetOverlayHandler =
    useContext(WorkoutContext)?.addSupersetOverlayHandler;
  return (
    <Stack>
      <Button
        variant="filled"
        color="orange.9"
        onClick={() => addExerciseOverlayHandler?.open()}
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
