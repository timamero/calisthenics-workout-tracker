import { useEffect } from 'react';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { useNavigate } from '@tanstack/react-router';
import { Stack } from '@mantine/core';

import {
  useAuthStore,
  useExerciseLibraryStore,
  useSetProgressionsStore,
  useWorkoutLibraryStore,
} from '@cwt/state/stores';
import { type ExerciseResponse } from '@cwt/schema/exercises';
import { type SetProgressionResponse } from '@cwt/schema/setProgressions';
import type {
  WorkoutBuildResponse,
  WorkoutLogResponse,
} from '@cwt/schema/workouts';

import { getExercises } from '../../services/exercisesService';
import { getSetProgressions } from '../../services/setProgressionsService';
import {
  getWorkoutLogs,
  getWorkoutBuilds,
} from '../../services/workoutsService';

import DefaultLoader from '../../components/common/DefaultLoader';

export const Route = createFileRoute('/_auth')({
  beforeLoad: () => {
    const user = useAuthStore.getState().user;
    if (!user) {
      throw redirect({
        to: '/login',
      });
    }
  },
  loader: async () => {
    let setProgressions: SetProgressionResponse[] | null = null;
    let logs: WorkoutLogResponse[] | null = null;
    let builds: WorkoutBuildResponse[] | null = null;
    let exercises: ExerciseResponse[] | null = null;

    const setProgressionsState =
      useSetProgressionsStore.getState().setProgressions;
    if (setProgressionsState) {
      setProgressions = setProgressionsState;
    }
    const displayedWorkoutLogs =
      useWorkoutLibraryStore.getState().displayedWorkoutLogs;
    if (displayedWorkoutLogs && displayedWorkoutLogs.length > 0) {
      logs = displayedWorkoutLogs as WorkoutLogResponse[];
    }
    const displayedWorkoutBuilds =
      useWorkoutLibraryStore.getState().displayedWorkoutBuilds;
    if (displayedWorkoutBuilds && displayedWorkoutBuilds.length > 0) {
      builds = displayedWorkoutBuilds as WorkoutBuildResponse[];
    }
    const displayedExercises =
      useExerciseLibraryStore.getState().displayedExercises;
    if (displayedExercises) {
      exercises = displayedExercises;
    }

    if (exercises && setProgressions && logs && builds) {
      return { exercises, setProgressions, logs, builds };
    }

    const supabaseSession = useAuthStore.getState().session;
    if (supabaseSession?.access_token) {
      if (!setProgressions) {
        console.time('fetching SetProgressions');
        const fetchedSetProgressions = await getSetProgressions(
          supabaseSession.access_token,
        );
        console.timeEnd('fetching SetProgressions');
        setProgressions = fetchedSetProgressions;
      }
      if (!logs) {
        console.time('fetching workout logs');
        const fetchedLogs = await getWorkoutLogs(supabaseSession.access_token);
        console.timeEnd('fetching workout logs');
        logs = fetchedLogs;
      }
      if (!builds) {
        console.time('fetching workout builds');
        const fetchedBuilds = await getWorkoutBuilds(
          supabaseSession.access_token,
        );
        console.timeEnd('fetching workout builds');
        builds = fetchedBuilds;
      }
      if (!exercises) {
        console.time('fetch exercises in auth');
        const fetchedExercises = await getExercises(
          supabaseSession.access_token,
        );
        console.timeEnd('fetch exercises in auth');
        exercises = fetchedExercises;
      }
    }
    return { exercises, setProgressions, logs, builds };
  },
  component: AuthLayout,
});

function AuthLayout() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const data: {
    exercises: ExerciseResponse[];
    setProgressions: SetProgressionResponse[];
    logs: WorkoutLogResponse[];
    builds: WorkoutBuildResponse[];
  } = Route.useLoaderData();

  const setSetProgressions = useSetProgressionsStore(
    (state) => state.setSetProgression,
  );
  const setWorkouts = useWorkoutLibraryStore((state) => state.setWorkouts);
  const setExercises = useExerciseLibraryStore((state) => state.setExercises);
  const setExerciseLoading = useExerciseLibraryStore(
    (state) => state.setLoading,
  );
  const exerciseLoading = useExerciseLibraryStore((state) => state.loading);
  const setWorkoutLibraryLoading = useWorkoutLibraryStore(
    (state) => state.setLoading,
  );
  const workoutLibraryLoading = useWorkoutLibraryStore(
    (state) => state.loading,
  );
  const setSetProgressionsLoading = useSetProgressionsStore(
    (state) => state.setLoading,
  );
  const setProgressionsLoading = useSetProgressionsStore(
    (state) => state.loading,
  );

  useEffect(() => {
    if (!user) {
      navigate({
        to: '/login',
      });
    }
  }, [user, navigate]);

  useEffect(() => {
    setSetProgressions(data.setProgressions);
    setWorkouts(data.logs, data.builds);
    setExercises(data.exercises);
    setExerciseLoading(false);
    setWorkoutLibraryLoading(false);
    setSetProgressionsLoading(false);
  }, [
    data.exercises,
    data.setProgressions,
    data.logs,
    data.builds,
    setExercises,
    setExerciseLoading,
    setSetProgressions,
    setWorkouts,
    setWorkoutLibraryLoading,
    setSetProgressionsLoading,
  ]);

  if (exerciseLoading || workoutLibraryLoading || setProgressionsLoading) {
    return (
      <Stack h="100vh" justify="center">
        <DefaultLoader />
      </Stack>
    );
  }
  return <Outlet />;
}
