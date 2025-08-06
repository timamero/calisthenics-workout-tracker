import * as React from 'react';
import { Modal, Portal, Checkbox, useTheme } from 'react-native-paper';
import { View } from 'react-native';

import { Text } from '../customText';
import theme from '../theme';

export type FilterOverlayProps = {
  visible: boolean;
  handleHideModal: () => void;
};

export default function FilterOverlay({
  visible,
  handleHideModal,
}: FilterOverlayProps) {
  // const theme = useTheme()
  const [checked, setChecked] = React.useState(false);

  const containerStyle = { backgroundColor: 'white', padding: 20 };

  const checkboxBgColor = checked
    ? 'rgba(255, 99, 71, 0.1)'
    : theme.colors.background;
  const checkboxBorderColor = checked
    ? theme.colors.primary
    : 'rgb(222, 226, 230)';
  const labelFontWeight = checked ? '700' : '400';

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
          <View
            style={{
              borderWidth: 1,
              borderRadius: 40,
              borderColor: checkboxBorderColor,
              backgroundColor: checkboxBgColor,
            }}
          >
            <Checkbox.Item
              label="Chest"
              labelVariant="bodySmall"
              uncheckedColor="rgb(222, 226, 230)"
              labelStyle={{
                textTransform: 'uppercase',
                color: 'rgb(46, 46, 46)',
                fontWeight: labelFontWeight,
              }}
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
              background={{
                color: 'rgba(255, 99, 71, 0.3)',
                radius: 40,
                borderless: true,
              }}
              style={{
                paddingVertical: 2,
                paddingHorizontal: 8,
                paddingLeft: 12,
              }}
            />
          </View>
        </View>
      </Modal>
    </Portal>
  );
}
