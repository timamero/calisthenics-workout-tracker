import * as React from 'react';
import { View } from 'react-native';
import { Modal, Portal, Button, useTheme } from 'react-native-paper';

import { Text } from '../customText';
import { ExerciseDetailContext } from '../contexts/ExerciseDetailContext';

export default function ExerciseDetailOverlay() {
  const hideModal = React.useContext(ExerciseDetailContext)?.hideModal;
  const visible = React.useContext(ExerciseDetailContext)?.visible;
  const exercise = React.useContext(ExerciseDetailContext)?.exercise;
  const theme = useTheme();

  const containerStyle = {
    backgroundColor: theme.colors.background,
    paddingBlock: 20,
    marginInline: 16,
  };

  return (
    <Portal>
      <Modal
        visible={visible || false}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        <View>
          <Button>Go back to Exercises</Button>
          <Text>{exercise?.name}</Text>
        </View>
      </Modal>
    </Portal>
  );
}
