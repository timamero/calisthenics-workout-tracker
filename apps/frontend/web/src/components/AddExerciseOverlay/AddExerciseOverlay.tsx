import { Group, Modal, Button, Stack } from '@mantine/core';

interface AddExerciseOverlayProps {
  opened: boolean;
  handler: { close: () => void };
}

export default function AddExerciseOverlay({
  opened,
  handler,
}: AddExerciseOverlayProps) {
  const handleAddExerciseClick = () => {
    // Logic to add exercise here
    handler.close();
  };

  return (
    <Modal
      opened={opened}
      onClose={() => handler.close()}
      title="Filter Exercises"
      fullScreen
      styles={{
        title: {
          fontFamily: 'var(--mantine-font-family-headings)',
          fontWeight: 700,
        },
      }}
    >
      <Stack gap="lg">List of exercises here</Stack>
      <Group mt="lg">
        <Button color="gray" variant="outline" onClick={() => handler.close()}>
          Cancel
        </Button>
        <Button color="orange" onClick={() => handleAddExerciseClick()}>
          Add Exercise
        </Button>
      </Group>
    </Modal>
  );
}
