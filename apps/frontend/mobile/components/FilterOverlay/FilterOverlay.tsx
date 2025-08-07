import * as React from 'react';
import { View } from 'react-native';
import { Modal, Portal, Button, useTheme } from 'react-native-paper';

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
  const theme = useTheme();
  console.log('primaryContainer', theme.colors.primaryContainer);
  const containerStyle = {
    backgroundColor: theme.colors.background,
    paddingBlock: 20,
    marginInline: 16,
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={handleHideModal}
        contentContainerStyle={containerStyle}
      >
        <View style={{ paddingLeft: 20 }}>
          <Text variant="headlineMedium">Filter Exercises</Text>
        </View>
        <FilterSelections />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            paddingTop: 20,
          }}
        >
          <Button
            mode="outlined"
            textColor="rgb(134, 142, 150)"
            style={{
              borderColor: 'rgb(134, 142, 150)',
              borderRadius: 4,
            }}
          >
            Clear All
          </Button>
          <Button
            mode="contained"
            style={{
              borderRadius: 4,
            }}
          >
            Apply Filters
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}
