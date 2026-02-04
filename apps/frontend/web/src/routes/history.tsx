import { useEffect, useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Title, Text, Stack, Pagination } from '@mantine/core';

import { useWorkoutLibraryStore, useAuthStore } from '@cwt/state/stores';
import type { WorkoutLogResponse } from '@cwt/schema/workouts';
import { formatDuration, chunk } from '@cwt/utils';

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

  const [activePage, setPage] = useState(1);

  const setWorkouts = useWorkoutLibraryStore((state) => state.setWorkouts);

  useEffect(() => {
    setWorkouts(workoutLogs.logs, []);
  }, [workoutLogs, setWorkouts]);

  const data = chunk(workoutLogs.logs, 4);

  const items = data[activePage - 1].map((wo, i) => {
    const workoutTitle = wo.title ? wo.title : `Workout Log ${i + 1}`;
    const date = new Date(wo.date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const duration = formatDuration(wo.duration!);
    return (
      <CardButton key={i}>
        <Title order={3} size="h5">
          {workoutTitle}
        </Title>
        <Text>{date}</Text>
        <Text>{wo.goal}</Text>
        <Text>{wo.description}</Text>
        <Text>{duration}</Text>
      </CardButton>
    );
  });

  console.log('workoutLogs: ', workoutLogs.logs);
  return (
    <div>
      <Title>Past Workouts</Title>
      <Stack gap="xs">{items}</Stack>
      <Pagination
        total={data.length}
        value={activePage}
        onChange={setPage}
        mt="sm"
      />
    </div>
  );
}
