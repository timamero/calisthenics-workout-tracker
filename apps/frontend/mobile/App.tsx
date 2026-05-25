import { useEffect } from 'react';
import 'react-native-get-random-values';
import { PaperProvider } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import {
  useAuthStore,
  useWorkoutLibraryStore,
  useExerciseLibraryStore,
  useSetProgressionsStore,
} from '@cwt/state/stores';
import {
  WorkoutContextProvider,
  WorkoutLogDetailContextProvider,
} from '@cwt/context';
import { useSupabaseAuth } from '@cwt/hooks';

import theme from './theme';
import { supabase } from './services/supabaseClient';
import Navigation from './navigation';
import { getExercises } from './services/exercisesService';
import { getWorkoutBuilds, getWorkoutLogs } from './services/workoutsService';
import { getSetProgressions } from './services/setProgressionsService';

import DefaultLoaderScreen from './screens/DefaultLoaderScreen';
import WorkoutDraftProvider from './providers/WorkoutDraftProvider';

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 200,
  fade: true,
});

export default function App() {
  const authLoading = useAuthStore((state) => state.loading);
  const supabaseSession = useAuthStore((state) => state.session);

  const setExercises = useExerciseLibraryStore((state) => state.setExercises);
  const exerciseLoading = useExerciseLibraryStore((state) => state.loading);
  const setExerciseLoading = useExerciseLibraryStore(
    (state) => state.setLoading,
  );

  const setWorkouts = useWorkoutLibraryStore((state) => state.setWorkouts);
  const workoutLibraryLoading = useWorkoutLibraryStore(
    (state) => state.loading,
  );
  const setWorkoutLibraryLoading = useWorkoutLibraryStore(
    (state) => state.setLoading,
  );

  const setSetProgressions = useSetProgressionsStore(
    (state) => state.setSetProgression,
  );
  const setProgressionsLoading = useSetProgressionsStore(
    (state) => state.loading,
  );
  const setSetProgressionsLoading = useSetProgressionsStore(
    (state) => state.setLoading,
  );

  useSupabaseAuth(supabase);

  useEffect(() => {
    const asyncFetchData = async () => {
      if (supabaseSession?.access_token) {
        const exercises = await getExercises(supabaseSession.access_token);
        if (exercises) {
          setExercises(exercises);
        }

        const workoutBuilds = await getWorkoutBuilds(
          supabaseSession.access_token,
        );
        const workoutLogs = await getWorkoutLogs(supabaseSession.access_token);
        if (workoutBuilds) {
          setWorkouts(workoutLogs, workoutBuilds);
        }

        const setProgressions = await getSetProgressions(
          supabaseSession.access_token,
        );
        if (setProgressions) {
          setSetProgressions(setProgressions);
        }
        setExerciseLoading(false);
        setWorkoutLibraryLoading(false);
        setSetProgressionsLoading(false);
      }
    };
    asyncFetchData();
  }, [
    setExercises,
    supabaseSession,
    setWorkouts,
    setSetProgressions,
    setExerciseLoading,
    setWorkoutLibraryLoading,
    setSetProgressionsLoading,
  ]);

  useEffect(() => {
    if (!authLoading) {
      SplashScreen.hideAsync();
    }
  }, [authLoading]);

  if (
    authLoading ||
    (supabaseSession &&
      (exerciseLoading || workoutLibraryLoading || setProgressionsLoading))
  ) {
    return (
      <PaperProvider theme={theme}>
        <DefaultLoaderScreen />
      </PaperProvider>
    );
  }

  return (
    <WorkoutContextProvider appType="mobile">
      <WorkoutDraftProvider>
        <WorkoutLogDetailContextProvider>
          <PaperProvider theme={theme}>
            <Navigation />
          </PaperProvider>
        </WorkoutLogDetailContextProvider>
      </WorkoutDraftProvider>
    </WorkoutContextProvider>
  );
}
