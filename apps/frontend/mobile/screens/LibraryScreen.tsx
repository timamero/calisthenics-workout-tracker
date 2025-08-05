import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

import { useStore } from '@cwt/state/store';

import ExerciseCard from '../components/ExerciseCard';

export default function LibraryScreen() {
  const theme = useTheme();
  const exercises = useStore((state) => state.displayedExercises);
  console.log('sample exercises list', exercises[0]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <Text>Exercise Library</Text>
      <ExerciseCard />
    </View>
  );
}
