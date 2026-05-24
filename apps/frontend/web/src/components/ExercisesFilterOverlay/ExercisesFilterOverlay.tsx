import { useContext } from 'react';
import { Group, Modal, Button, Stack, Title } from '@mantine/core';

import {
  useExercisesFilterStore,
  useExerciseLibraryStore,
  useExercisesSearchStore,
} from '@cwt/state/stores';
import { useFilterSelectors } from '@cwt/hooks';

import WorkoutDraftContext from '../../contexts/WorkoutDraftContext';

import FilterSelections from './FilterSelections';

export default function ExercisesFilterOverlay() {
  // --- Hooks ---
  const { hasFilters } = useFilterSelectors();

  // --- State ---
  const clearFilterCheckboxSelections = useExercisesFilterStore(
    (state) => state.clearFilterCheckboxSelections,
  );
  const clearAppliedFilterCheckboxSelections = useExercisesFilterStore(
    (state) => state.clearAppliedFilterCheckboxSelections,
  );
  const setAppliedFilterSelections = useExercisesFilterStore(
    (state) => state.setAppliedFilterSelections,
  );
  const revertFilterCheckboxSelections = useExercisesFilterStore(
    (state) => state.revertFilterCheckboxSelections,
  );
  const refreshDisplayedExercises = useExerciseLibraryStore(
    (state) => state.refreshDisplayedExercises,
  );

  // --- Context ---
  const exerciseFilterOverlayOpened =
    useContext(WorkoutDraftContext)?.exerciseFilterOverlayOpened;
  const exerciseFilterOverlayHandler =
    useContext(WorkoutDraftContext)?.exerciseFilterOverlayHandler;

  // --- Handlers ---
  const handleApplyFiltersClick = () => {
    setAppliedFilterSelections();
    refreshDisplayedExercises(
      useExercisesFilterStore.getState().appliedFilterSelections,
      useExercisesSearchStore.getState().appliedExerciseSearch,
      useExercisesSearchStore.getState().exerciseSearch,
    );

    exerciseFilterOverlayHandler?.close();
  };

  const handleClearFiltersClick = () => {
    clearFilterCheckboxSelections();
    clearAppliedFilterCheckboxSelections();
    refreshDisplayedExercises(
      useExercisesFilterStore.getState().appliedFilterSelections,
      useExercisesSearchStore.getState().appliedExerciseSearch,
      useExercisesSearchStore.getState().exerciseSearch,
    );

    exerciseFilterOverlayHandler?.close();
  };

  // Called when overlay closes from clicking outside of modal
  // or clicking the close button
  const onFilterOverlayClose = () => {
    exerciseFilterOverlayHandler?.close();

    if (!hasFilters) {
      // Do not clear the filter selection if there are currently filters applied
      clearFilterCheckboxSelections();
    } else {
      // Revert the state of filterCheckboxSelections when changes are cancelled
      revertFilterCheckboxSelections();
    }
  };

  return (
    <Modal
      opened={exerciseFilterOverlayOpened!}
      onClose={onFilterOverlayClose}
      withCloseButton={false}
      size="xl"
    >
      <Stack p="xxs" miw={300}>
        <Stack align="flex-end">
          <Button color="gray" variant="outline" onClick={onFilterOverlayClose}>
            Close
          </Button>
        </Stack>
        <Title
          order={2}
          fz={{ base: 'h3', md: 'h2' }}
          fw={800}
          lh="xss"
          lts="var(--mantine-letter-spacing-tight)"
        >
          Filter Exercises
        </Title>
        <Stack gap="lg">
          <FilterSelections />
        </Stack>
        <Group mt="lg" grow>
          <Button
            color="gray"
            variant="outline"
            onClick={() => handleClearFiltersClick()}
          >
            Clear All
          </Button>
          <Button color="orange" onClick={() => handleApplyFiltersClick()}>
            Apply Filters
          </Button>
        </Group>
      </Stack>
      {/* </Group> */}
    </Modal>
  );
}
