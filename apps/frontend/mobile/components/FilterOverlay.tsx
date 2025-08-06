import * as React from 'react';
import { Modal, Portal } from 'react-native-paper';

import { Text } from '../customText';

export type FilterOverlayProps = {
  visible: boolean;
  handleHideModal: () => void;
};

export default function FilterOverlay({
  visible,
  handleHideModal,
}: FilterOverlayProps) {
  const containerStyle = { backgroundColor: 'white', padding: 20 };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={handleHideModal}
        contentContainerStyle={containerStyle}
      >
        <Text>Example Modal. Click outside this area to dismiss.</Text>
      </Modal>
    </Portal>
  );
}
