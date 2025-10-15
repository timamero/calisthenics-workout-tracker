import { Group, Modal, Button, Stack, ScrollArea } from '@mantine/core';

// import { useStore } from '@cwt/state/store';
import {
  useWorkoutDraftStore,
  useExerciseLibraryStore,
} from '@cwt/state/stores';

import ExercisesList from './ExercisesList';

interface AddExerciseOverlayProps {
  opened: boolean;
  handler: { close: () => void };
}

export default function AddExerciseOverlay({
  opened,
  handler,
}: AddExerciseOverlayProps) {
  const selectedExerciseIDToAdd = useWorkoutDraftStore(
    (state) => state.selectedExerciseIDToAdd,
  );
  const setSelectedExerciseIDToAdd = useWorkoutDraftStore(
    (state) => state.setSelectedExerciseIDToAdd,
  );
  const addExercise = useWorkoutDraftStore((state) => state.addExercise);
  const getExerciseById = useExerciseLibraryStore(
    (state) => state.getExerciseByID,
  );

  const handleAddExerciseClick = () => {
    console.log('handleAddExerciseClick called');
    addExercise(
      getExerciseById(selectedExerciseIDToAdd as number).default_tracking_type,
    );
    console.log('addExercise function completed');
    setSelectedExerciseIDToAdd(null);
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
      <div style={{ position: 'relative', minHeight: '90vh' }}>
        <ScrollArea h="90vh" style={{ paddingBottom: 40 }}>
          <Stack gap="lg" align="center">
            <ExercisesList />
          </Stack>
        </ScrollArea>
        <Group
          mt="lg"
          justify="center"
          bg="gray.0"
          style={{
            position: 'sticky',
            bottom: 0,
            background: 'var(--mantine-color-body)',
            zIndex: 2,
            padding: '16px 0',
            boxShadow: '0 -2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <Button
            color="gray"
            variant="outline"
            onClick={() => handler.close()}
          >
            Cancel
          </Button>
          <Button
            color="orange"
            onClick={() => handleAddExerciseClick()}
            data-disabled={selectedExerciseIDToAdd === null}
          >
            Add Exercise
          </Button>
        </Group>
      </div>
    </Modal>
  );
}
