import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Title, Stack, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useStore } from '@cwt/state/store';

import ConfirmationOverlay from '../components/common/ConfirmationOverlay';
import AddExerciseOverlay from '../components/AddExerciseOverlay';
import Workout from '../components/Workout';

export const Route = createFileRoute('/workout')({
  component: WorkoutView,
});

function WorkoutView() {
  const navigate = useNavigate();
  const [cancelOverlayOpened, cancelOverlayHandler] = useDisclosure(false);
  const [addExerciseOverlayOpened, addExerciseOverlayHandler] =
    useDisclosure(false);

  const workout = useStore((state) => state.workout);
  const resetWorkout = useStore((state) => state.resetWorkout);

  const onCancelWorkoutClick = () => {
    navigate({
      to: '/workoutDashboard',
    });
    resetWorkout();
  };

  return (
    <Stack gap="xl">
      <Title size="h6">{workout!.title}</Title>
      <Stack gap="xl" align="center">
        <Workout />
        <Stack justify="center">
          <Button
            variant="filled"
            color="orange.9"
            onClick={() => addExerciseOverlayHandler.open()}
          >
            Add Exercise
          </Button>
          <Button
            variant="filled"
            color="orange"
            onClick={() => console.log('clicked save workout build')}
          >
            Save Workout
          </Button>
          <Button
            variant="subtle"
            color="gray"
            onClick={() => cancelOverlayHandler.open()}
          >
            Cancel Workout Building
          </Button>
        </Stack>
      </Stack>
      <AddExerciseOverlay
        opened={addExerciseOverlayOpened}
        handler={addExerciseOverlayHandler}
      />
      <ConfirmationOverlay
        title="Cancel Workout Building"
        message="Confirm cancelling workout building. This will discard the current workout."
        opened={cancelOverlayOpened}
        handler={cancelOverlayHandler}
        onConfirmationClick={onCancelWorkoutClick}
      />
    </Stack>
  );
}
