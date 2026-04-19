// import { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Title, Stack } from '@mantine/core';

// import { useWorkoutLibraryStore } from '@cwt/state/stores';
import { WorkoutLogDetailContextProvider } from '@cwt/context';
// import type { WorkoutLogResponse } from '@cwt/schema/workouts';

// import { getWorkoutLogs } from '../../../services/workoutsService';

import WorkoutLogPages from '../../../components/WorkoutLogPages';

export const Route = createFileRoute('/_auth/dashboard/history')({
  // loader: async () => {
  //   let logs: WorkoutLogResponse[] | null = null;

  //   const displayedWorkoutLogs =
  //     useWorkoutLibraryStore.getState().displayedWorkoutLogs;

  //   if (displayedWorkoutLogs && displayedWorkoutLogs.length > 0) {
  //     logs = displayedWorkoutLogs as WorkoutLogResponse[];
  //   }
  //   const supabaseSession = useAuthStore.getState().session;
  //   if (supabaseSession?.access_token) {
  //     if (!logs) {
  //       console.time('fetch workout logs in history');
  //       const fetchedWorkoutLogs = await getWorkoutLogs(
  //         supabaseSession.access_token,
  //       );
  //       console.timeEnd('fetch workout logs in history');
  //       logs = fetchedWorkoutLogs;
  //     }
  //   }
  //   return { logs };
  // },
  component: HistoryView,
});

function HistoryView() {
  // const data: {
  //   logs: WorkoutLogResponse[];
  // } = Route.useLoaderData();

  // const setWorkouts = useWorkoutLibraryStore((state) => state.setWorkouts);

  // useEffect(() => {
  //   setWorkouts(data.logs, []);
  // }, [data, setWorkouts]);

  return (
    <WorkoutLogDetailContextProvider>
      <Stack
        h="100%"
        flex={1}
        display="flex"
        style={{ flexDirection: 'column' }}
      >
        <Title>Past Workouts</Title>
        <WorkoutLogPages />
      </Stack>
    </WorkoutLogDetailContextProvider>
  );
}
