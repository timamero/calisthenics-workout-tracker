import { useEffect } from 'react';
import 'react-native-get-random-values';
import { View } from 'react-native';
import { PaperProvider, ActivityIndicator, Text } from 'react-native-paper';

import { useAuthStore, useWorkoutLibraryStore } from '@cwt/state/stores';
import { WorkoutContextProvider } from '@cwt/context';
import { useSupabaseAuth } from '@cwt/hooks';

import theme from './theme';
import { supabase } from './services/supabaseClient';
import Navigation from './navigation';
import { getWorkoutBuilds, getWorkoutLogs } from './services/workoutsService';

export default function App() {
  const loading = useAuthStore((state) => state.loading);
  const supabaseSession = useAuthStore((state) => state.session);

  const setWorkouts = useWorkoutLibraryStore((state) => state.setWorkouts);

  useSupabaseAuth(supabase);

  useEffect(() => {
    const asyncFetchData = async () => {
      if (supabaseSession?.access_token) {
        const workoutBuilds = await getWorkoutBuilds(
          supabaseSession.access_token,
        );
        const workoutLogs = await getWorkoutLogs(supabaseSession.access_token);
        if (workoutBuilds) {
          setWorkouts(workoutLogs, workoutBuilds);
        }
      }
    };
    asyncFetchData();
  }, [supabaseSession, setWorkouts]);

  if (loading) {
    return (
      <WorkoutContextProvider appType="mobile">
        <PaperProvider theme={theme}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              gap: 16,
              paddingHorizontal: 16,
              alignItems: 'stretch',
              justifyContent: 'center',
              backgroundColor: theme.colors.background,
            }}
          >
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={{ textAlign: 'center', marginTop: 10 }}>
              Loading authentication state...
            </Text>
          </View>
        </PaperProvider>
      </WorkoutContextProvider>
    );
  }

  return (
    <WorkoutContextProvider appType="mobile">
      <PaperProvider theme={theme}>
        <Navigation />
      </PaperProvider>
    </WorkoutContextProvider>
  );
}
