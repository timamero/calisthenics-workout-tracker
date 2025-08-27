import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Title, Stack, Button, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useStore } from '@cwt/state/store';

import ConfirmationOverlay from '../components/common/ConfirmationOverlay';

export const Route = createFileRoute('/workout')({
  component: WorkoutView,
});

function WorkoutView() {
  const navigate = useNavigate();
  const [cancelOverlayOpened, cancelOverlayHandler] = useDisclosure(false);

  const mode = useStore((state) => state.mode);
  const workout = useStore((state) => state.workout);
  const resetWorkout = useStore((state) => state.resetWorkout);
  console.log('mode set to: ', mode);
  console.log('workout state: ', workout);

  const onCancelWorkoutClick = () => {
    navigate({
      to: '/workoutDashboard',
    });
    resetWorkout();
  };

  const EmptyWorkoutPlaceholder = () => {
    if (workout!.workout_data.exercises.length === 0) {
      return (
        <Stack align="center" bd="2px dashed gray.6" w="max-content" p="lg">
          <Text size="lg" fw={800}>
            Ready to start building your workout?
          </Text>
          <Text c="gray.8">Add your first exercise to begin</Text>
        </Stack>
      );
    }
    // return <div></div>;
  };

  return (
    <Stack gap="xl">
      <Title size="h6">{workout!.title}</Title>
      <Stack gap="xl" align="center">
        <EmptyWorkoutPlaceholder />
        <Group justify="center">
          <Button
            variant="subtle"
            color="gray"
            onClick={() => cancelOverlayHandler.open()}
          >
            Cancel workout building
          </Button>
        </Group>
      </Stack>
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
