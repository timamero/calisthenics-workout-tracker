import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme, Modal, Portal, Button } from 'react-native-paper';

import { Text } from '../customText';

import ExerciseList from '../components/ExerciseList';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';

export default function LibraryScreen() {
  const theme = useTheme();

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 20 };

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
        <Filter handleShowModal={showModal} />
        <ExerciseList />
      </ScrollView>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Text>Example Modal. Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
    </View>
  );
}
