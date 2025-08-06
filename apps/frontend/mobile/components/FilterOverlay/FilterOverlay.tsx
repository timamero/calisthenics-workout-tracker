import * as React from 'react';
import { Modal, Portal } from 'react-native-paper';
import { View } from 'react-native';

import { Text } from '../../customText';

import FilterCheckbox from './FilterCheckbox';

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
        <Text variant="headlineMedium">Filter Overlay</Text>
        <Text
          style={{ textTransform: 'uppercase', fontWeight: 400 }}
          variant="headlineMedium"
        >
          Muscles
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <FilterCheckbox />
        </View>
      </Modal>
    </Portal>
  );
}
