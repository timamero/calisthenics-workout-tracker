import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { Text } from '../customText';

import ExerciseList from '../components/ExerciseList';
import SearchBar from '../components/SearchBar';

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
      <SearchBar />
      <ExerciseList />
    </View>
  );
}
