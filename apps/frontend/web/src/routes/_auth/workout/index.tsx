import { createFileRoute } from '@tanstack/react-router';
import { Stack } from '@mantine/core';

import WorkoutLog from '../../../components/views/workout/workout-log/WorkoutLog';
import DefaultLoader from '../../../components/common/feedback/DefaultLoader';

export const Route = createFileRoute('/_auth/workout/')({
  component: WorkoutLogView,
  pendingComponent: Loader,
});

function Loader() {
  return (
    <Stack w="100%" h="100vh" justify="center">
      <DefaultLoader />
    </Stack>
  );
}

function WorkoutLogView() {
  return <WorkoutLog />;
}
