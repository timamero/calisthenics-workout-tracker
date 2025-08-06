import * as React from 'react';
import { Modal, Portal, Checkbox } from 'react-native-paper';
import { View } from 'react-native';

import { Text } from '../customText';

export type FilterOverlayProps = {
  visible: boolean;
  handleHideModal: () => void;
};

export default function FilterOverlay({
  visible,
  handleHideModal,
}: FilterOverlayProps) {
  const [checked, setChecked] = React.useState(false);

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
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Checkbox.Item
            label="Chest"
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          />
        </View>
      </Modal>
    </Portal>
  );
}
