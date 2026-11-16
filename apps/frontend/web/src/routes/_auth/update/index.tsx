import { createFileRoute } from '@tanstack/react-router';
import { Stack } from '@mantine/core';

import WorkoutUpdate from '../../../components/WorkoutUpdate';
import DefaultLoader from '../../../components/common/feedback/DefaultLoader';

export const Route = createFileRoute('/_auth/update/')({
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
  return <WorkoutUpdate />;
}
