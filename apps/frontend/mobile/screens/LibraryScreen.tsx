import { ScrollView, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { Text } from '../customText';

import ExerciseList from '../components/ExerciseList';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';

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
      <ScrollView>
        <SearchBar />
        <Filter />
        <ExerciseList />
      </ScrollView>
    </View>
  );
}
