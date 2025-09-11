import { Group, Modal, Button, Stack } from '@mantine/core';

import { useStore } from '@cwt/state/store';
import { useExerciseLibraryStore } from '@cwt/state/stores';
import { useFiltersAndSearchStatus } from '@cwt/hooks/useFiltersAndSearchStatus';

import FilterSelections from './FilterSelections';

interface ExercisesFilterOverlayProps {
  opened: boolean;
  handler: { close: () => void };
}

export default function ExercisesFilterOverlay({
  opened,
  handler,
}: ExercisesFilterOverlayProps) {
  const { hasFilters } = useFiltersAndSearchStatus();
  const clearFilterCheckboxSelections = useStore(
    (state) => state.clearFilterCheckboxSelections,
  );
  const clearAppliedFilterCheckboxSelections = useStore(
    (state) => state.clearAppliedFilterCheckboxSelections,
  );
  const setAppliedFilterSelections = useStore(
    (state) => state.setAppliedFilterSelections,
  );
  const revertFilterCheckboxSelections = useStore(
    (state) => state.revertFilterCheckboxSelections,
  );
  const appliedFilterSelections = useStore(
    (state) => state.appliedFilterSelections,
  );
  const appliedExerciseSearch = useStore(
    (state) => state.appliedExerciseSearch,
  );
  const exerciseSearch = useStore((state) => state.exerciseSearch);
  const refreshDisplayedExercises = useExerciseLibraryStore(
    (state) => state.refreshDisplayedExercises,
  );

  const handleApplyFiltersClick = () => {
    setAppliedFilterSelections();
    refreshDisplayedExercises(
      appliedFilterSelections,
      appliedExerciseSearch,
      exerciseSearch,
    );
    handler.close();
  };

  const handleClearFiltersClick = () => {
    clearFilterCheckboxSelections();
    clearAppliedFilterCheckboxSelections();
    refreshDisplayedExercises(
      appliedFilterSelections,
      appliedExerciseSearch,
      exerciseSearch,
    );
    handler.close();
  };

  // Called when overlay closes from clicking outside of modal
  // or clicking the close button
  const onFilterOverlayClose = () => {
    handler.close();
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
      opened={opened}
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
