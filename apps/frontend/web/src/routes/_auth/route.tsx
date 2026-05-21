import { useEffect } from 'react';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { useNavigate } from '@tanstack/react-router';

import {
  useAuthStore,
  useExerciseLibraryStore,
  useLeveragesAssistsStore,
  useWorkoutLibraryStore,
} from '@cwt/state/stores';
import { type ExerciseResponse } from '@cwt/schema/exercises';
import { type LeveragesAssistsResponse } from '@cwt/schema/leveragesAssists';
import type {
  WorkoutBuildResponse,
  WorkoutLogResponse,
} from '@cwt/schema/workouts';

import { getExercises } from '../../services/exercisesService';
import { getLeveragesAssists } from '../../services/leveragesAssistsService';
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
    let leveragesAssists: LeveragesAssistsResponse[] | null = null;
    let logs: WorkoutLogResponse[] | null = null;
    let builds: WorkoutBuildResponse[] | null = null;
    let exercises: ExerciseResponse[] | null = null;

    const leveragesAssistsState =
      useLeveragesAssistsStore.getState().leveragesAssists;
    if (leveragesAssistsState) {
      leveragesAssists = leveragesAssistsState;
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

    if (exercises && leveragesAssists && logs && builds) {
      return { exercises, leveragesAssists, logs, builds };
    }

    const supabaseSession = useAuthStore.getState().session;
    if (supabaseSession?.access_token) {
      if (!leveragesAssists) {
        console.time('fetching LeveragesAssists');
        const fetchedLeveragesAssists = await getLeveragesAssists(
          supabaseSession.access_token,
        );
        console.timeEnd('fetching LeveragesAssists');
        leveragesAssists = fetchedLeveragesAssists;
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
    return { exercises, leveragesAssists, logs, builds };
  },
  component: AuthLayout,
});

function AuthLayout() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const data: {
    exercises: ExerciseResponse[];
    leveragesAssists: LeveragesAssistsResponse[];
    logs: WorkoutLogResponse[];
    builds: WorkoutBuildResponse[];
  } = Route.useLoaderData();

  const setLeveragesAssists = useLeveragesAssistsStore(
    (state) => state.setLeveragesAssists,
  );
  const setWorkouts = useWorkoutLibraryStore((state) => state.setWorkouts);
  const setExercises = useExerciseLibraryStore((state) => state.setExercises);
  const setLoading = useExerciseLibraryStore((state) => state.setLoading);
  const loading = useExerciseLibraryStore((state) => state.loading);
  const isExercisesSet = useExerciseLibraryStore((state) =>
    state.displayedExercises === null ? false : true,
  );

  useEffect(() => {
    if (!user) {
      navigate({
        to: '/login',
      });
    }
  }, [user, navigate]);

  useEffect(() => {
    setLeveragesAssists(data.leveragesAssists);
    setWorkouts(data.logs, data.builds);
    setExercises(data.exercises);
    setLoading(false);
  }, [
    data.exercises,
    data.leveragesAssists,
    data.logs,
    data.builds,
    setExercises,
    setLoading,
    setLeveragesAssists,
    setWorkouts,
  ]);

  if (!isExercisesSet || loading) {
    return <DefaultLoader />;
  }
  return <Outlet />;
}
