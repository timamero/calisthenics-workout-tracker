import { createFileRoute } from '@tanstack/react-router';
import AddExercise from '../../../components/views/workout/add-exercise/AddExercise';
import DefaultLoader from '../../../components/common/feedback/DefaultLoader';
import { Stack } from '@mantine/core';

export const Route = createFileRoute('/_auth/workout/add-exercise')({
  component: RouteComponent,
  pendingComponent: Loader,
});

function Loader() {
  return (
    <Stack w="100%" h="100vh" justify="center">
      <DefaultLoader />
    </Stack>
  );
}

function RouteComponent() {
  return <AddExercise />;
}
