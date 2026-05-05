import * as React from 'react';
import { View } from 'react-native';
import { Modal, Portal, useTheme } from 'react-native-paper';

import { Text } from '../../customText';
import { CustomTheme } from '../../theme';

interface FullScreenModalProps {
  visible: boolean;
  title: string;
  handleHideModal?: () => void;
  setIsVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export default function FullScreenModal({
  visible,
  handleHideModal,
  setIsVisible,
  title,
  children,
}: FullScreenModalProps) {
  const theme = useTheme() as CustomTheme;
  const containerStyle = {
    backgroundColor: theme.colors.background,
    paddingBlock: 16,
    marginBlock: 40,
    marginInline: 16,
    borderWidth: 2,
    borderRadius: 16,
    borderColor: theme.colors.outline,
  };
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => setIsVisible?.(false)}
        contentContainerStyle={containerStyle}
      >
        <View
          style={{
            paddingLeft: 20,
            paddingBottom: 16,
            borderBottomWidth: 2,
            borderBottomColor: theme.colors.outline,
          }}
        >
          <Text
            variant="headlineMedium"
            style={{ color: theme.colors.onBackground, opacity: 0.9 }}
          >
            {title}
          </Text>
        </View>
        {children}
      </Modal>
    </Portal>
  );
}
