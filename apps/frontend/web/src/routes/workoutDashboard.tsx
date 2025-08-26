import { createFileRoute } from '@tanstack/react-router';
import { Title, Stack, Group, ScrollArea, Text } from '@mantine/core';

import { useStore } from '@cwt/state/store';

import CardButton from '../components/common/CardButton';
import LargeButton from '../components/common/LargeButton';


export const Route = createFileRoute('/workoutDashboard')({
  component: WorkoutDashboardView,
});

function WorkoutDashboardView() {
  const workoutBuilds = useStore((state) => state.masterWorkoutBuilds)
  console.log('workout builds in workout page', workoutBuilds)

  const workoutBuildCards = workoutBuilds.map((wo, i) => {
    const workoutTitle = wo.title ? wo.title : `Workout Template ${i + 1}`
    return (
      <CardButton key={i}>
        <Title  order={3} size="h5">{workoutTitle}</Title>
      </CardButton>
    )
  })
  return (
     <Stack gap="xl">
        <Title size="h6">Start Workout</Title>
          <LargeButton><Text>Build Workout Template</Text></LargeButton>
          <ScrollArea>
            <Group wrap="nowrap">
              {workoutBuildCards}
            </Group>
          </ScrollArea>
      </Stack>
  );
}
