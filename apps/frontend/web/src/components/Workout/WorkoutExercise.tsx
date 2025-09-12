import { Stack, Text, Button, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useExerciseLibraryStore } from '@cwt/state/stores';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import type { WorkoutExercise } from '@cwt/schema/workouts';

import Sets from './Sets';
import ConfirmationOverlay from '../common/ConfirmationOverlay';

interface WorkoutExerciseProps {
  exerciseIndex: number;
  workoutExercise: WorkoutExercise;
}

export default function WorkoutExercise({
  exerciseIndex,
  workoutExercise,
}: WorkoutExerciseProps) {
  const addSet = useWorkoutDraftStore((state) => state.addSet);
  const deleteExercise = useWorkoutDraftStore((state) => state.removeExercise);
  const getExerciseNameById = useExerciseLibraryStore(
    (state) => state.getExerciseNameByID,
  );
  const name = getExerciseNameById(workoutExercise.exercise_id);

  const [deleteExOverlayOpened, deleteExOverlayHandler] = useDisclosure(false);

  return (
    <Stack bd="1px solid var(--mantine-color-default-border)" p="lg">
      <Group>
        <Text>{name}</Text>
        <Button
          color="red"
          variant="white"
          onClick={() => deleteExOverlayHandler.open()}
        >
          Delete
        </Button>
      </Group>
      <Sets
        tracked={workoutExercise.tracked}
        sets={workoutExercise.sets}
        exerciseIndex={exerciseIndex}
      />
      <Button
        variant="outline"
        color="dark"
        onClick={() => addSet(exerciseIndex)}
      >
        Add Set
      </Button>
      <ConfirmationOverlay
        title="Delete Exercise"
        message="Delete exercise from this workout?"
        confirmButtonLabel="Delete exercise"
        opened={deleteExOverlayOpened}
        handler={deleteExOverlayHandler}
        onConfirmationClick={() => deleteExercise(exerciseIndex)}
      />
    </Stack>
  );
}
