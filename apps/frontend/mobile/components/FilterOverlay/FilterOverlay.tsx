import * as React from 'react';
import { Modal, Portal } from 'react-native-paper';

import { Text } from '../../customText';

import FilterSelections from './FilterSelections';

export type FilterOverlayProps = {
  visible: boolean;
  handleHideModal: () => void;
};

export default function FilterOverlay({
  visible,
  handleHideModal,
}: FilterOverlayProps) {
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    marginInline: 16,
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={handleHideModal}
        contentContainerStyle={containerStyle}
      >
        <Text variant="headlineMedium">Filter Exercises</Text>
        <FilterSelections />
      </Modal>
    </Portal>
  );
}
