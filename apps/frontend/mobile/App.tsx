import { useEffect } from 'react';
import 'react-native-get-random-values';
// import { View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import {
  useAuthStore,
  useWorkoutLibraryStore,
  useExerciseLibraryStore,
  useLeveragesAssistsStore,
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
import { getLeveragesAssists } from './services/leveragesAssistsService';

import AuthSplashScreen from './components/common/AuthSplashScreen';
import WorkoutDraftProvider from './providers/WorkoutDraftProvider';

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function App() {
  const loading = useAuthStore((state) => state.loading);
  const supabaseSession = useAuthStore((state) => state.session);

  const setExercises = useExerciseLibraryStore((state) => state.setExercises);
  const setWorkouts = useWorkoutLibraryStore((state) => state.setWorkouts);
  const setLeveragesAssists = useLeveragesAssistsStore(
    (state) => state.setLeveragesAssists,
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

        const leveragesAssists = await getLeveragesAssists(
          supabaseSession.access_token,
        );
        if (leveragesAssists) {
          setLeveragesAssists(leveragesAssists);
        }
      }
    };
    asyncFetchData();
  }, [setExercises, supabaseSession, setWorkouts, setLeveragesAssists]);

  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync();
    }
  }, [loading]);

  if (loading) {
    return (
      <PaperProvider theme={theme}>
        <AuthSplashScreen />
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
