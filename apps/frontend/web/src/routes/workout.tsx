import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Title, Stack, Button, Group } from '@mantine/core';
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
  const resetWorkout = useStore((state) => state.resetWorkout);
  console.log('mode set to: ', mode);

  const onCancelWorkoutClick = () => {
    navigate({
      to: '/workoutDashboard',
    });
    resetWorkout();
  };

  return (
    <Stack gap="xl">
      <Title size="h6">Build Workout</Title>
      <Group justify="center">
        <Button
          variant="subtle"
          color="gray"
          onClick={() => cancelOverlayHandler.open()}
        >
          Cancel workout building
        </Button>
      </Group>
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
