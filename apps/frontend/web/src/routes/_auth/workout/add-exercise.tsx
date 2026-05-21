import { createFileRoute } from '@tanstack/react-router';
import AddExercise from '../../../components/Workout/AddExercise';
import DefaultLoader from '../../../components/common/DefaultLoader';
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
  console.log('add-exercise || add-exercise page mounted');
  return <AddExercise />;
}
