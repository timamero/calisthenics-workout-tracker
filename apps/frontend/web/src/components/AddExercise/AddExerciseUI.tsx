import { Group, Button, Stack, ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IoFilterOutline } from 'react-icons/io5';

// import type { AddExerciseOverlayUIProps } from '@cwt/schema/workouts';

import ExercisesList from './ExercisesList';
import ExerciseSearchBar from '../ExerciseSearchBar';
import ExercisesFilterOverlay from '../ExercisesFilterOverlay';

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
  const [filterOpened, filterHandler] = useDisclosure(false);

  const handleClickFilter = () => {
    filterHandler.open();
  };
  return (
    <Stack gap="xl">
      {/* <ScrollArea h="90vh" style={{ paddingBottom: 40 }}> */}
      <Group>
        <ExerciseSearchBar />
        <ActionIcon
          variant="outline"
          color="gray.5"
          aria-label="Exercise filter"
          onClick={handleClickFilter}
        >
          <IoFilterOutline />
        </ActionIcon>
      </Group>
      <Stack gap="lg" align="center">
        <ExercisesList />
      </Stack>
      {/* </ScrollArea> */}
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
      <ExercisesFilterOverlay opened={filterOpened} handler={filterHandler} />
    </Stack>
  );
}
