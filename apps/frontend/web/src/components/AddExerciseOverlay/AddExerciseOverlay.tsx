import { useState } from 'react';
import { Group, Modal, Button, Stack, ScrollArea } from '@mantine/core';
import ExercisesList from './ExercisesList';

interface AddExerciseOverlayProps {
  opened: boolean;
  handler: { close: () => void };
}

export default function AddExerciseOverlay({
  opened,
  handler,
}: AddExerciseOverlayProps) {
  const [selectedExerciseID, setSelectedExerciseID] = useState<string | null>(
    null,
  );

  const handleAddExerciseClick = () => {
    // Logic to add exercise here
    handler.close();
  };

  return (
    <Modal
      opened={opened}
      onClose={() => handler.close()}
      title="Add Exercise"
      fullScreen
      styles={{
        title: {
          fontFamily: 'var(--mantine-font-family-headings)',
          fontWeight: 700,
        },
      }}
    >
      <ScrollArea h="80vh">
        <Stack gap="lg">
          <ExercisesList
            selected={selectedExerciseID}
            setSelected={setSelectedExerciseID}
          />
        </Stack>
      </ScrollArea>
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
