import { Group, Button, Stack, ActionIcon } from '@mantine/core';
import { IoFilterOutline } from 'react-icons/io5';

import ExercisesList from './ExercisesList';
import ExerciseSearchBar from '../../ExerciseSearchBar';
import ExercisesFilterOverlay from '../../ExercisesFilterOverlay';

interface AddExerciseUIProps {
  selectedExerciseIDToAdd: number | null;
  handleAddExerciseClick: () => void;
  handleOpenFilterOverlayClick: () => void;
  handleCancelClick: () => void;
}

export default function AddExerciseOverlayUI({
  selectedExerciseIDToAdd,
  handleAddExerciseClick,
  handleOpenFilterOverlayClick,
  handleCancelClick,
}: AddExerciseUIProps) {
  return (
    <Stack gap="xl" w="100%" p="md">
      <Group>
        <ExerciseSearchBar />
        <ActionIcon
          variant="outline"
          color="gray.5"
          aria-label="Exercise filter"
          onClick={() => handleOpenFilterOverlayClick()}
        >
          <IoFilterOutline />
        </ActionIcon>
      </Group>
      <Stack gap="lg" align="center">
        <ExercisesList />
      </Stack>
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
          onClick={() => handleCancelClick()}
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
      <ExercisesFilterOverlay />
    </Stack>
  );
}
