import { createFileRoute } from '@tanstack/react-router';
import { Stack } from '@mantine/core';

import WorkoutDraft from '../../../components/Workout';
import DefaultLoader from '../../../components/common/DefaultLoader';

export const Route = createFileRoute('/_auth/workout/')({
  component: WorkoutView,
  pendingComponent: Loader,
});

function Loader() {
  return (
    <Stack w="100%" h="100vh" justify="center">
      <DefaultLoader />
    </Stack>
  );
}

function WorkoutView() {
  return <WorkoutDraft />;
}
