import { Group, Modal, Button, Stack, Text } from '@mantine/core';

interface ConfirmationOverlayProps {
  opened: boolean;
  handler: { close: () => void };
  title: string;
  message: string;
  confirmButtonLabel: string;
  onConfirmationClick: () => void;
}

export default function ConfirmationOverlay({
  opened,
  handler,
  title,
  message,
  confirmButtonLabel,
  onConfirmationClick,
}: ConfirmationOverlayProps) {
  const handleConfirmClick = () => {
    handler.close();
    onConfirmationClick();
  };

  return (
    <Modal
      opened={opened}
      onClose={() => handler.close()}
      title={title}
      styles={{
        title: {
          fontFamily: 'var(--mantine-font-family-headings)',
          fontWeight: 700,
        },
      }}
    >
      <Stack gap="lg">
        <Text>{message}</Text>
      </Stack>
      <Group mt="lg" grow>
        <Button color="gray" variant="outline" onClick={() => handler.close()}>
          Cancel
        </Button>
        <Button color="orange" onClick={() => handleConfirmClick()}>
          {confirmButtonLabel}
        </Button>
      </Group>
    </Modal>
  );
}
