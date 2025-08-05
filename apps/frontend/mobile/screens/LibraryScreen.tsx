import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

import { useStore } from '@cwt/state/store';

export default function LibraryScreen() {
  const theme = useTheme();
  const exercises = useStore((state) => state.displayedExercises);
  console.log('sample exercises list', exercises);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.background,
      }}
    >
      <Text>Library Screen</Text>
      <Text>
        This page will be the hub for exercises, progressions and progression
        exercises.
      </Text>
    </View>
  );
}
