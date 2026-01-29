import { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Title, Text, Stack } from '@mantine/core';

import { useWorkoutLibraryStore, useAuthStore } from '@cwt/state/stores';
import type { WorkoutLogResponse } from '@cwt/schema/workouts';

import { getWorkoutLogs } from '../services/workoutsService';
import CardButton from '../components/common/CardButton';

export const Route = createFileRoute('/history')({
  loader: async () => {
    const displayedWorkoutLogs =
      useWorkoutLibraryStore.getState().displayedWorkoutLogs;
    if (displayedWorkoutLogs && displayedWorkoutLogs.length > 0) {
      return { logs: displayedWorkoutLogs };
    }
    const supabaseSession = useAuthStore.getState().session;
    if (supabaseSession?.access_token) {
      const workoutLogs = await getWorkoutLogs(supabaseSession.access_token);
      return { logs: workoutLogs };
    }
    return [];
  },
  component: HistoryView,
});

function HistoryView() {
  const workoutLogs: { logs: WorkoutLogResponse[] } = Route.useLoaderData();

  const setWorkouts = useWorkoutLibraryStore((state) => state.setWorkouts);

  useEffect(() => {
    setWorkouts(workoutLogs.logs, []);
  }, [workoutLogs, setWorkouts]);

  const workoutLogCards = workoutLogs.logs.map((wo, i) => {
    const workoutTitle = wo.title ? wo.title : `Workout Log ${i + 1}`;
    const date = new Date(wo.date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    return (
      <CardButton key={i}>
        <Title order={3} size="h5">
          {workoutTitle}
        </Title>
        <Text>{date}</Text>
        <Text>{wo.goal}</Text>
        <Text>{wo.description}</Text>
        <Text>{wo.duration}</Text>
      </CardButton>
    );
  });

  console.log('workoutLogs: ', workoutLogs.logs);
  return (
    <div>
      <Title>Past Workouts</Title>
      <Stack gap="lg">{workoutLogCards}</Stack>
    </div>
  );
}
