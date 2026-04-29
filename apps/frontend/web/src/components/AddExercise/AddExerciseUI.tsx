import { useContext } from 'react';
import { Group, Button, Stack, ActionIcon } from '@mantine/core';
// import { useDisclosure } from '@mantine/hooks';
import { IoFilterOutline } from 'react-icons/io5';
import { Link } from '@tanstack/react-router';

import { useWorkoutDraftStore } from '@cwt/state/stores';
import { useClearExerciseSearchAndFilters } from '@cwt/hooks';

import ExercisesList from './ExercisesList';
import ExerciseSearchBar from '../ExerciseSearchBar';
import ExercisesFilterOverlay from '../ExercisesFilterOverlay';
import WorkoutDraftContext from '../../contexts/WorkoutDraftContext';

interface AddExerciseUIProps {
  selectedExerciseIDToAdd: number | null;
  handleAddExerciseClick?: () => void;
}

export default function AddExerciseOverlayUI({
  selectedExerciseIDToAdd,
  handleAddExerciseClick,
}: AddExerciseUIProps) {
  // const [filterOpened, filterHandler] = useDisclosure(false);
  const exerciseFilterOverlayHandler =
    useContext(WorkoutDraftContext)?.exerciseFilterOverlayHandler;

  const setSupersetIDToMod = useWorkoutDraftStore(
    (state) => state.setSupersetIDToMod,
  );
  const setSectionIDToMod = useWorkoutDraftStore(
    (state) => state.setSectionIDToMod,
  );
  const setSelectedExerciseIDToAdd = useWorkoutDraftStore(
    (state) => state.setSelectedExerciseIDToAdd,
  );

  const { clearExerciseSearch, clearExerciseFilters } =
    useClearExerciseSearchAndFilters();

  // const handleClickFilter = () => {
  //   filterHandler.open();
  // };

  const handleCancelClick = () => {
    setSupersetIDToMod(null);
    setSectionIDToMod(null);
    setSelectedExerciseIDToAdd(null);

    clearExerciseFilters();
    clearExerciseSearch();
  };
  return (
    <Stack gap="xl">
      <Group>
        <ExerciseSearchBar />
        <ActionIcon
          variant="outline"
          color="gray.5"
          aria-label="Exercise filter"
          onClick={() => exerciseFilterOverlayHandler?.open()}
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
          component={Link}
          to="/workout"
          onClick={() => handleCancelClick()}
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
      <ExercisesFilterOverlay />
    </Stack>
  );
}
