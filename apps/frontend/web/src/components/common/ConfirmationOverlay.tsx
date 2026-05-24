import { Group, Modal, Button, Stack, Text } from '@mantine/core';

import { useWorkoutDraftStore } from '@cwt/state/stores';

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
  const setExerciseID = useWorkoutDraftStore(
    (state) => state.setExerciseIDToMod,
  );
  const setSupersetID = useWorkoutDraftStore(
    (state) => state.setSupersetIDToMod,
  );
  const setSectionID = useWorkoutDraftStore((state) => state.setSectionIDToMod);

  const handleConfirmClick = () => {
    handler.close();
    onConfirmationClick();
  };

  const handleClose = () => {
    setExerciseID(null);
    setSupersetID(null);
    setSectionID(null);
    handler.close();
  };

  return (
    <Modal
      opened={opened}
      onClose={() => handleClose()}
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
      <Group mt="lg" justify="flex-end">
        <Button color="gray" variant="outline" onClick={() => handleClose()}>
          Cancel
        </Button>
        <Button
          color="orange"
          onClick={() => handleConfirmClick()}
          w="max-content"
        >
          {confirmButtonLabel}
        </Button>
      </Group>
    </Modal>
  );
}
