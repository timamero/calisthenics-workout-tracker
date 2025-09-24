import { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Title, Stack, Group, ScrollArea, Text } from '@mantine/core';

import {
  useWorkoutDraftStore,
  useWorkoutLibraryStore,
  useAuthStore,
} from '@cwt/state/stores';
import type {
  WorkoutBuildResponse,
  WorkoutLogResponse,
} from '@cwt/schema/workouts';

import { getWorkoutBuilds, getWorkoutLogs } from '../services/workoutsService';

import CardButton from '../components/common/CardButton';
import LargeButton from '../components/common/LargeButton';

export const Route = createFileRoute('/workoutDashboard')({
  loader: async () => {
    const displayedWorkoutBuilds =
      useWorkoutLibraryStore.getState().displayedWorkoutBuilds;
    const displayedWorkoutLogs =
      useWorkoutLibraryStore.getState().displayedWorkoutLogs;
    if (
      displayedWorkoutBuilds &&
      displayedWorkoutBuilds.length > 0 &&
      displayedWorkoutLogs &&
      displayedWorkoutLogs.length > 0
    ) {
      return { logs: displayedWorkoutLogs, builds: displayedWorkoutBuilds };
    }
    const supabaseSession = useAuthStore.getState().session;
    if (supabaseSession?.access_token) {
      const workoutBuilds = await getWorkoutBuilds(
        supabaseSession.access_token,
      );
      const workoutLogs = await getWorkoutLogs(supabaseSession.access_token);
      return { logs: workoutLogs, builds: workoutBuilds };
    }
    return [];
  },
  component: WorkoutDashboardView,
});

function WorkoutDashboardView() {
  const workouts: {
    logs: WorkoutLogResponse[];
    builds: WorkoutBuildResponse[];
  } = Route.useLoaderData();

  const setWorkouts = useWorkoutLibraryStore((state) => state.setWorkouts);

  // On initial load, set the workout builds in the store
  useEffect(() => {
    setWorkouts(workouts.logs, workouts.builds);
  }, [workouts, setWorkouts]);

  const initializeWorkout = useWorkoutDraftStore(
    (state) => state.initializeWorkout,
  );

  const handleCreateWorkoutBuildClick = () => {
    initializeWorkout('build');
  };
  const handleCreateWorkoutLogClick = () => {
    initializeWorkout('edit');
  };

  const workoutBuildCards = workouts.builds.map((wo, i) => {
    const workoutTitle = wo.title ? wo.title : `Workout Template ${i + 1}`;
    return (
      <CardButton key={i}>
        <Title order={3} size="h5">
          {workoutTitle}
        </Title>
      </CardButton>
    );
  });
  const workoutLogCards = workouts.logs.map((wo, i) => {
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
        <Text>Build New Workout</Text>
      </LargeButton>
      <LargeButton to="/workout" onButtonClick={handleCreateWorkoutLogClick}>
        <Text>Start Blank Workout</Text>
      </LargeButton>
      <Text>Start Workout From Template</Text>
      <ScrollArea>
        <Group wrap="nowrap">{workoutBuildCards}</Group>
      </ScrollArea>
      <Text>Start Workout From Recent Workout</Text>
      <ScrollArea>
        <Group wrap="nowrap">{workoutLogCards}</Group>
      </ScrollArea>
    </Stack>
  );
}
