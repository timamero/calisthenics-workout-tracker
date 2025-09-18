import * as React from 'react';
import { View } from 'react-native';
import { Modal, Portal, Button, useTheme } from 'react-native-paper';

import { Text } from '../../customText';
import { CustomTheme } from '../../theme';

interface FullScreenModalProps {
  visible: boolean;
  title: string;
  handleHideModal: () => void;
  children: React.ReactNode;
}

export default function FullScreenModal({
  visible,
  handleHideModal,
  title,
  children,
}: FullScreenModalProps) {
  const theme = useTheme() as CustomTheme;
  const containerStyle = {
    backgroundColor: theme.colors.background,
    paddingBlock: 20,
    marginInline: 16,
    borderWidth: 2,
    borderColor: theme.colors.orange1,
  };
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={handleHideModal}
        contentContainerStyle={containerStyle}
      >
        <View
          style={{
            paddingLeft: 20,
            paddingBottom: 16,
            borderBottomWidth: 2,
            borderBottomColor: theme.colors.orange1,
          }}
        >
          <Text
            variant="headlineMedium"
            style={{ color: theme.colors.light, opacity: 0.9 }}
          >
            {title}
          </Text>
        </View>
        {children}
      </Modal>
    </Portal>
  );
}
