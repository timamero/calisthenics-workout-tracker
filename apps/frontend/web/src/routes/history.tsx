import { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Title } from '@mantine/core';

import { useWorkoutLibraryStore, useAuthStore } from '@cwt/state/stores';
import type { WorkoutLogResponse } from '@cwt/schema/workouts';

import { getWorkoutLogs } from '../services/workoutsService';
import WorkoutLogPages from '../components/WorkoutLogPages';

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

  return (
    <div>
      <Title>Past Workouts</Title>
      <WorkoutLogPages />
    </div>
  );
}
