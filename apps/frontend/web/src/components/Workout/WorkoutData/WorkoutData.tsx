import { Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useWorkoutDraftStore } from '@cwt/state/stores';

import EmptyWorkoutPlaceholder from './EmptyWorkoutPlaceholder';
import WorkoutExerciseList from './WorkoutExerciseList';
import ConfirmationOverlay from '../../common/ConfirmationOverlay';

export default function WorkoutData() {
  const [deleteExOverlayOpened, deleteExOverlayHandler] = useDisclosure(false);

  const workoutData = useWorkoutDraftStore((state) => state.workoutData);

  const workoutExercisesLength = useWorkoutDraftStore(
    (state) => state.workoutData,
  ).exercises.length;
  const selectedExerciseIndexToMod = useWorkoutDraftStore(
    (state) => state.selectedExerciseIndexToMod,
  );

  // const deleteSet = useWorkoutDraftStore((state) => state.deleteSet);
  const deleteExercise = useWorkoutDraftStore((state) => state.removeExercise);

  if (!workoutData) {
    return <Text>Loading</Text>;
  }

  // const workoutExercises = workoutData.exercises.map((ex, i) => {
  //   return (
  //     <WorkoutExercise key={ex.id} workoutExercise={ex} exerciseIndex={i} />
  //   );
  // });
  return (
    <Stack gap="xl" align="center">
      {workoutExercisesLength === 0 && <EmptyWorkoutPlaceholder />}
      {/* {workoutExercises} */}
      <WorkoutExerciseList deleteExOverlayHandler={deleteExOverlayHandler} />
      <ConfirmationOverlay
        title="Delete Exercise"
        message="Delete exercise from this workout?"
        confirmButtonLabel="Delete exercise"
        opened={deleteExOverlayOpened}
        handler={deleteExOverlayHandler}
        onConfirmationClick={() => deleteExercise(selectedExerciseIndexToMod!)}
      />
    </Stack>
  );
}
