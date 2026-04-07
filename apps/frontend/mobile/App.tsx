import { useEffect } from 'react';
import 'react-native-get-random-values';
// import { View } from 'react-native';
import { PaperProvider } from 'react-native-paper';

import {
  useAuthStore,
  useWorkoutLibraryStore,
  useExerciseLibraryStore,
  useLeveragesAssistsStore,
} from '@cwt/state/stores';
import { WorkoutContextProvider } from '@cwt/context';
import { useSupabaseAuth } from '@cwt/hooks';

import theme from './theme';
import { supabase } from './services/supabaseClient';
import Navigation from './navigation';
import { getExercises } from './services/exercisesService';
import { getWorkoutBuilds, getWorkoutLogs } from './services/workoutsService';
import { getLeveragesAssists } from './services/leveragesAssistsService';

export default function App() {
  // const loading = useAuthStore((state) => state.loading);
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
  // const loading = useAuthStore((state) => state.loading);
  // const supabaseSession = useAuthStore((state) => state.session);

  // const setWorkouts = useWorkoutLibraryStore((state) => state.setWorkouts);

  // useSupabaseAuth(supabase);

  // console.log(
  //   'App.tsx || supabaseSession.access_token: ',
  //   supabaseSession?.access_token,
  // );

  // useEffect(() => {
  //   console.log('App.tsx || useEffect called');
  //   const asyncFetchData = async () => {
  //     if (supabaseSession?.access_token) {
  //       console.time('fetch workout builds');
  //       const workoutBuilds = await getWorkoutBuilds(
  //         supabaseSession.access_token,
  //       );
  //       console.timeEnd('fetch workout builds');

  //       console.time('fetch workout logs');
  //       const workoutLogs = await getWorkoutLogs(supabaseSession.access_token);
  //       console.timeEnd('fetch workout logs');
  //       if (workoutBuilds) {
  //         setWorkouts(workoutLogs, workoutBuilds);
  //       }
  //     }
  //   };
  //   asyncFetchData();
  // }, [supabaseSession, setWorkouts]);

  // if (loading) {
  //   return (
  //     <WorkoutContextProvider appType="mobile">
  //       <PaperProvider theme={theme}>
  //         <View
  //           style={{
  //             display: 'flex',
  //             flexDirection: 'column',
  //             flex: 1,
  //             gap: 16,
  //             paddingHorizontal: 16,
  //             alignItems: 'stretch',
  //             justifyContent: 'center',
  //             backgroundColor: theme.colors.background,
  //           }}
  //         >
  //           <ActivityIndicator size="large" color="#0000ff" />
  //           <Text style={{ textAlign: 'center', marginTop: 10 }}>
  //             Loading authentication state...
  //           </Text>
  //         </View>
  //       </PaperProvider>
  //     </WorkoutContextProvider>
  //   );
  // }

  return (
    <WorkoutContextProvider appType="mobile">
      <PaperProvider theme={theme}>
        <Navigation />
      </PaperProvider>
    </WorkoutContextProvider>
  );
}
