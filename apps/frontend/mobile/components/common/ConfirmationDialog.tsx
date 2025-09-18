import * as React from 'react';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

interface ConfirmationDialogProps {
  isVisible: boolean;
  message: string;
  title: string;
  confirmButtonLabel: string;
  handleHideDialog: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirmationPress: () => void;
}

export default function ConfirmationDialog({
  isVisible,
  message,
  title,
  confirmButtonLabel,
  handleHideDialog,
  onConfirmationPress,
}: ConfirmationDialogProps) {
  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={() => handleHideDialog(false)}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => handleHideDialog(false)}>Cancel</Button>
          <Button onPress={() => onConfirmationPress()}>
            {confirmButtonLabel}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
