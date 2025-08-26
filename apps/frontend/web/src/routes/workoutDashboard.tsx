import { createFileRoute } from '@tanstack/react-router';
import { Title, Stack, Group, ScrollArea, Text } from '@mantine/core';

import { useAuthStore } from '@cwt/state/auth';
import { useStore } from '@cwt/state/store';

import { getWorkoutBuilds } from '../services/workoutsService';

import CardButton from '../components/common/CardButton';
import LargeButton from '../components/common/LargeButton';

export const Route = createFileRoute('/workoutDashboard')({
  loader: async () => {
    const supabaseSession = useAuthStore.getState().session;
    if (supabaseSession?.access_token) {
      const workoutBuilds = await getWorkoutBuilds(
        supabaseSession.access_token,
      );
      useStore.getState().setWorkouts([], workoutBuilds);
      return workoutBuilds;
    }
    return [];
  },
  component: WorkoutDashboardView,
});

function WorkoutDashboardView() {
  const workoutBuilds = Route.useLoaderData();
  console.log('workout builds in workout page', workoutBuilds);

  const setMode = useStore((state) => state.setMode);
  const mode = useStore((state) => state.mode);
  console.log('in workout Dashboard, mode is: ', mode);

  const handleCreateWorkoutBuildClick = () => {
    setMode('build');
  };

  const workoutBuildCards = workoutBuilds.map((wo, i) => {
    const workoutTitle = wo.title ? wo.title : `Workout Template ${i + 1}`;
    return (
      <CardButton key={i}>
        <Title order={3} size="h5">
          {workoutTitle}
        </Title>
      </CardButton>
    );
  });
  return (
    <Stack gap="xl">
      <Title size="h6">Start Workout</Title>
      <LargeButton to="/workout" onButtonClick={handleCreateWorkoutBuildClick}>
        <Text>Build Workout Template</Text>
      </LargeButton>
      <ScrollArea>
        <Group wrap="nowrap">{workoutBuildCards}</Group>
      </ScrollArea>
    </Stack>
  );
}
