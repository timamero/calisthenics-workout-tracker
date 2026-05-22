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

  const setLeveragesAssists = useLeveragesAssistsStore(
    (state) => state.setLeveragesAssists,
  );
  const leveragesAssistsLoading = useLeveragesAssistsStore(
    (state) => state.loading,
  );
  const setLeveragesAssistsLoading = useLeveragesAssistsStore(
    (state) => state.setLoading,
  );

  useSupabaseAuth(supabase);

  useEffect(() => {
    const asyncFetchData = async () => {
      console.log('calling asyncFetchData', supabaseSession?.access_token);
      if (supabaseSession?.access_token) {
        console.log('fetching data');
        // setExerciseLoading(true);
        // setWorkoutLibraryLoading(true);
        // setLeveragesAssistsLoading(true);
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
        console.log('setting loading states to false');
        setExerciseLoading(false);
        setWorkoutLibraryLoading(false);
        setLeveragesAssistsLoading(false);
      }
    };
    asyncFetchData();
    // console.log(
    //   'authLoading and supabaseSession',
    //   authLoading,
    //   supabaseSession,
    // );
    // if (!authLoading && supabaseSession === null) {
    //   console.log('auth comleted loading and no supabase session');
    //   setExerciseLoading(false);
    //   setWorkoutLibraryLoading(false);
    //   setLeveragesAssistsLoading(false);
    // }
  }, [
    setExercises,
    supabaseSession,
    setWorkouts,
    setLeveragesAssists,
    setExerciseLoading,
    setWorkoutLibraryLoading,
    setLeveragesAssistsLoading,
  ]);

  useEffect(() => {
    if (
      !authLoading
      // !exerciseLoading &&
      // !workoutLibraryLoading &&
      // !leveragesAssistsLoading
    ) {
      SplashScreen.hideAsync();
    }
    // else {
    //   setExerciseLoading(false);
    //   setWorkoutLibraryLoading(false);
    //   setLeveragesAssistsLoading(false);
    // }
  }, [
    authLoading,
    // exerciseLoading,
    // workoutLibraryLoading,
    // leveragesAssistsLoading,
  ]);

  console.log(
    'loading states',
    authLoading,
    exerciseLoading,
    workoutLibraryLoading,
    leveragesAssistsLoading,
  );

  console.log('supabaseSession', supabaseSession);

  if (
    authLoading ||
    (supabaseSession &&
      (exerciseLoading || workoutLibraryLoading || leveragesAssistsLoading))
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
