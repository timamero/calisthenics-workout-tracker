import * as React from 'react';
import { View } from 'react-native';
import { Modal, Portal, Button, useTheme } from 'react-native-paper';

import { Text } from '../customText';

export default function ExerciseDetailOverlay() {
  const theme = useTheme();
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const containerStyle = {
    backgroundColor: theme.colors.background,
    paddingBlock: 20,
    marginInline: 16,
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        <View>
          <Button>Go back to Exercises</Button>
          <Text>Exercise Detail Mobile Overlay</Text>
        </View>
      </Modal>
    </Portal>
  );
}
