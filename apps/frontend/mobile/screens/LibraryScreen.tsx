import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import ExerciseList from '../components/ExerciseList';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import FilterOverlay from '../components/FilterOverlay';

export default function LibraryScreen() {
  const theme = useTheme();

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <ScrollView>
        <SearchBar />
        <Filter handleShowModal={showModal} />
        <ExerciseList />
      </ScrollView>
      <FilterOverlay visible={visible} handleHideModal={hideModal} />
    </View>
  );
}
