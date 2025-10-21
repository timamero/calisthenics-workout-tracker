import { Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useWorkoutDraftStore } from '@cwt/state/stores';
import type { Mode } from '@cwt/schema/workouts';

import EmptyWorkoutPlaceholder from './EmptyWorkoutPlaceholder';
import WorkoutExerciseList from './WorkoutExerciseList';
import ConfirmationOverlay from '../../common/ConfirmationOverlay';

export default function WorkoutData() {
  const [deleteExOverlayOpened, deleteExOverlayHandler] = useDisclosure(false);
  const [deleteSetOverlayOpened, deleteSetOverlayHandler] =
    useDisclosure(false);

  const workoutData = useWorkoutDraftStore((state) => state.workoutData);
  const mode = useWorkoutDraftStore((state) => state.mode) as Mode;

  const workoutExercisesLength = useWorkoutDraftStore(
    (state) => state.workoutData,
  ).length;
  const selectedExerciseIndexToMod = useWorkoutDraftStore(
    (state) => state.selectedExerciseIndexToMod,
  );

  const deleteExercise = useWorkoutDraftStore((state) => state.removeExercise);
  const deleteSet = useWorkoutDraftStore((state) => state.deleteSet);

  if (!workoutData) {
    return <Text>Loading</Text>;
  }

  return (
    <Stack gap="xl" align="center">
      {workoutExercisesLength === 0 && <EmptyWorkoutPlaceholder mode={mode} />}
      <WorkoutExerciseList
        deleteExOverlayHandler={deleteExOverlayHandler}
        deleteSetOverlayHandler={deleteSetOverlayHandler}
      />
      <ConfirmationOverlay
        title="Delete Exercise"
        message="Delete exercise from this workout?"
        confirmButtonLabel="Delete exercise"
        opened={deleteExOverlayOpened}
        handler={deleteExOverlayHandler}
        onConfirmationClick={() => deleteExercise(selectedExerciseIndexToMod!)}
      />
      <ConfirmationOverlay
        title="Delete Set"
        message="Delete set from this exercise?"
        confirmButtonLabel="Delete"
        opened={deleteSetOverlayOpened}
        handler={deleteSetOverlayHandler}
        onConfirmationClick={() => deleteSet(selectedExerciseIndexToMod!)}
      />
    </Stack>
  );
}
