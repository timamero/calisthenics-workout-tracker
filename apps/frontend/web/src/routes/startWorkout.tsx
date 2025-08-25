import { createFileRoute } from '@tanstack/react-router';
import { Title, Stack, Group } from '@mantine/core';

import { useStore } from '@cwt/state/store';

import CardButton from '../components/common/CardButton';


export const Route = createFileRoute('/startWorkout')({
  component: StartWorkoutView,
});

function StartWorkoutView() {
  const workoutBuilds = useStore((state) => state.masterWorkoutBuilds)
  console.log('workout builds in workout page', workoutBuilds)

  const workoutBuildCards = workoutBuilds.map((wo, i) => {
    const workoutTitle = wo.title ? wo.title : `Workout Template ${i + 1}`
    return (
      <CardButton key={i}>
        <Title>{workoutTitle}</Title>
      </CardButton>
    )
  })
  return (
     <Stack gap="xl">
        <Title size="h6">Start Workout</Title>
        <Group>
          {workoutBuildCards}
        </Group>
      </Stack>
  );
}
