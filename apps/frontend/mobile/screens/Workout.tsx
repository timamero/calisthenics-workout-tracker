import { useEffect } from 'react';
import { View } from 'react-native';

import { useTheme } from 'react-native-paper';

import {
  useExerciseLibraryStore,
  useAuthStore,
  useLeveragesAssistsStore,
} from '@cwt/state/stores';

import { getExercises } from '../services/exercisesService';
import { getLeveragesAssists } from '../services/leveragesAssistsService';

import { Text } from '../customText';
import { CustomTheme } from '../theme';

import WorkoutDraft from '../components/WorkoutDraft';

export default function WorkoutScreen() {
  const theme = useTheme() as CustomTheme;

  const supabaseSession = useAuthStore((state) => state.session);
  const loading = useExerciseLibraryStore((state) => state.loading);
  const setLoading = useExerciseLibraryStore((state) => state.setLoading);
  const setExercises = useExerciseLibraryStore((state) => state.setExercises);
  const isExercisesSet = useExerciseLibraryStore((state) =>
    state.displayedExercises === null ? false : true,
  );
  const setLeveragesAssists = useLeveragesAssistsStore(
    (state) => state.setLeveragesAssists,
  );
  useEffect(() => {
    const asyncFetchData = async () => {
      if (supabaseSession?.access_token && !isExercisesSet) {
        const leveragesAssists = await getLeveragesAssists(
          supabaseSession.access_token,
        );
        if (leveragesAssists) {
          setLeveragesAssists(leveragesAssists);
        }
        const exercises = await getExercises(supabaseSession.access_token);
        if (exercises) {
          setExercises(exercises);
          setLoading(false);
        }
      }
    };

    if (!isExercisesSet) {
      console.log('fetching and setting the data');
      asyncFetchData();
    }
  }, [
    setExercises,
    supabaseSession,
    setLeveragesAssists,
    isExercisesSet,
    setLoading,
  ]);

  if (!isExercisesSet || loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
        }}
      >
        <Text variant="headlineMedium" style={{ color: theme.colors.light }}>
          Loading
        </Text>
      </View>
    );
  }

  return <WorkoutDraft />;
}
