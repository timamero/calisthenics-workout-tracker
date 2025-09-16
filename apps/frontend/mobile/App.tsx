import * as React from 'react';
import { View } from 'react-native';
import { PaperProvider, ActivityIndicator, Text } from 'react-native-paper';

import {
  useExerciseLibraryStore,
  useAuthStore,
  useWorkoutLibraryStore,
} from '@cwt/state/stores';
import { useSupabaseAuth } from '@cwt/hooks';

import theme from './theme';
import { supabase } from './services/supabaseClient';
import Navigation from './navigation';
import { getExercises } from './services/exercisesService';
import { getWorkoutBuilds } from './services/workoutsService';

export default function App() {
  const loading = useAuthStore((state) => state.loading);
  const supabaseSession = useAuthStore((state) => state.session);

  const setSession = useAuthStore((state) => state.setSession);
  const setLoading = useAuthStore((state) => state.setLoading);
  const setExercises = useExerciseLibraryStore((state) => state.setExercises);
  const setWorkouts = useWorkoutLibraryStore((state) => state.setWorkouts);

  useSupabaseAuth(supabase, setSession, setLoading);

  React.useEffect(() => {
    const asyncFetchData = async () => {
      if (supabaseSession?.access_token) {
        const exercises = await getExercises(supabaseSession.access_token);
        const workoutBuilds = await getWorkoutBuilds(
          supabaseSession.access_token,
        );
        if (exercises) {
          setExercises(exercises);
        }
        if (workoutBuilds) {
          setWorkouts([], workoutBuilds);
        }
      }
    };
    asyncFetchData();
  }, [setExercises, supabaseSession, setWorkouts]);

  if (loading) {
    return (
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
    );
  }

  return (
    <PaperProvider theme={theme}>
      <Navigation />
    </PaperProvider>
  );
}
