import { View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

import ExerciseList from '../components/ExerciseList';

export default function LibraryScreen() {
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <Text>Exercise Library</Text>
      <ExerciseList />
    </View>
  );
}
