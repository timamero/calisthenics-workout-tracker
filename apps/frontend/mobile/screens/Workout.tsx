import { View } from 'react-native';

import { useTheme } from 'react-native-paper';

import { useExerciseLibraryStore } from '@cwt/state/stores';

// import { useFetchExercises } from '../hooks/useFetchExercises';
import { Text } from '../customText';
import { CustomTheme } from '../theme';

import WorkoutDraft from '../components/WorkoutDraft';

export default function WorkoutScreen() {
  const theme = useTheme() as CustomTheme;

  const loading = useExerciseLibraryStore((state) => state.loading);
  const isExercisesSet = useExerciseLibraryStore((state) =>
    state.displayedExercises === null ? false : true,
  );

  // useFetchExercises();

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
