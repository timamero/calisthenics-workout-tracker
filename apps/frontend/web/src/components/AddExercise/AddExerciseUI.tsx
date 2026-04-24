import { Group, Button, Stack, ScrollArea } from '@mantine/core';

// import type { AddExerciseOverlayUIProps } from '@cwt/schema/workouts';

import ExercisesList from './ExercisesList';

interface AddExerciseUIProps {
  selectedExerciseIDToAdd: number | null;
  handleAddExerciseClick?: () => void;
}

export default function AddExerciseOverlayUI({
  // opened,
  selectedExerciseIDToAdd,
  // handler,
  handleAddExerciseClick,
}: AddExerciseUIProps) {
  return (
    // <Modal
    //   opened={opened!}
    //   onClose={() => handler!.close()}
    //   title="Add Exercise"
    //   fullScreen
    //   styles={{
    //     title: {
    //       fontFamily: 'var(--mantine-font-family-headings)',
    //       fontWeight: 700,
    //     },
    //   }}
    // >
    <div>
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
            onClick={() => console.log('clicked close')}
          >
            Cancel
          </Button>
          <Button
            color="orange"
            onClick={() => handleAddExerciseClick?.()}
            data-disabled={selectedExerciseIDToAdd === null}
          >
            Add Exercise
          </Button>
        </Group>
      </div>
    </div>
    // </Modal>
  );
}
