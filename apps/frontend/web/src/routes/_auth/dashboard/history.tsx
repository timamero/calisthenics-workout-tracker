import { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Title, Stack } from '@mantine/core';

import {
  useWorkoutLibraryStore,
  useAuthStore,
  useExerciseLibraryStore,
} from '@cwt/state/stores';
import { WorkoutLogDetailContextProvider } from '@cwt/context';
import type { WorkoutLogResponse } from '@cwt/schema/workouts';
import type { ExerciseResponse } from '@cwt/schema/exercises';

import { getWorkoutLogs } from '../../../services/workoutsService';
import { getExercises } from '../../../services/exercisesService';

import WorkoutLogPages from '../../../components/WorkoutLogPages';
import { useSetExercisesData } from '../../../hooks/useSetExercisesData';

export const Route = createFileRoute('/_auth/dashboard/history')({
  loader: async () => {
    let logs: WorkoutLogResponse[] | null = null;
    let exercises: ExerciseResponse[] | null = null;

    const displayedExercises =
      useExerciseLibraryStore.getState().displayedExercises;
    if (displayedExercises) {
      console.log('history :: setting exercises to displayedExercises');
      exercises = displayedExercises;
    }

    const displayedWorkoutLogs =
      useWorkoutLibraryStore.getState().displayedWorkoutLogs;

    if (displayedWorkoutLogs && displayedWorkoutLogs.length > 0) {
      logs = displayedWorkoutLogs as WorkoutLogResponse[];
    }
    const supabaseSession = useAuthStore.getState().session;
    if (supabaseSession?.access_token) {
      if (!logs) {
        console.time('fetch workout logs in history');
        const fetchedWorkoutLogs = await getWorkoutLogs(
          supabaseSession.access_token,
        );
        console.timeEnd('fetch workout logs in history');
        logs = fetchedWorkoutLogs;
      }
      if (!exercises) {
        console.time('fetch exercises in history');
        const fetchedExercises = await getExercises(
          supabaseSession.access_token,
        );
        console.timeEnd('fetch exercises in history');
        exercises = fetchedExercises;
      }
    }
    return { logs, exercises };
  },
  component: HistoryView,
});

function HistoryView() {
  const data: {
    logs: WorkoutLogResponse[];
    exercises: ExerciseResponse[];
  } = Route.useLoaderData();

  const setWorkouts = useWorkoutLibraryStore((state) => state.setWorkouts);

  useSetExercisesData(data.exercises);

  useEffect(() => {
    setWorkouts(data.logs, []);
  }, [data, setWorkouts]);

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
