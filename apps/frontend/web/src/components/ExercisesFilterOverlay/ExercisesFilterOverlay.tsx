import { useContext } from 'react';
import { Group, Modal, Button, Stack } from '@mantine/core';

import { useExercisesFilterStore } from '@cwt/state/stores';
import { useExercisesSearchStore } from '@cwt/state/stores';
import { useExerciseLibraryStore } from '@cwt/state/stores';
import { useFilterSelectors } from '@cwt/hooks';

import WorkoutDraftContext from '../../contexts/WorkoutDraftContext';
import FilterSelections from './FilterSelections';

// interface ExercisesFilterOverlayProps {
//   opened: boolean;
//   handler: { close: () => void };
// }

export default function ExercisesFilterOverlay() {
  const exerciseFilterOverlayOpened =
    useContext(WorkoutDraftContext)?.exerciseFilterOverlayOpened;
  const exerciseFilterOverlayHandler =
    useContext(WorkoutDraftContext)?.exerciseFilterOverlayHandler;

  const { hasFilters } = useFilterSelectors();
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
      title="Filter Exercises"
      styles={{
        title: {
          fontFamily: 'var(--mantine-font-family-headings)',
          fontWeight: 700,
        },
      }}
    >
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
    </Modal>
  );
}
