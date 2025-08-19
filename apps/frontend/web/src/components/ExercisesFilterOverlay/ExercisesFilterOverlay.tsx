import { Group, Modal, Button, Stack } from '@mantine/core';

import { useStore } from '@cwt/state/store';
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
  const refreshDisplayedExercises = useStore(
    (state) => state.refreshDisplayedExercises,
  );
  // const filterDisplayedExercises = useStore(
  //   (state) => state.filterDisplayedExercises,
  // );
  // const filterDisplayedExercisesBySearch = useStore(
  //   (state) => state.filterDisplayedExercisesBySearch,
  // );
  // const resetDisplayedExercises = useStore(
  //   (state) => state.resetDisplayedExercises,
  // );

  const handleApplyFiltersClick = () => {
    setAppliedFilterSelections();
    // filterDisplayedExercises();
    refreshDisplayedExercises();
    handler.close();
  };

  const handleClearFiltersClick = () => {
    clearFilterCheckboxSelections();
    clearAppliedFilterCheckboxSelections();
    // resetDisplayedExercises();
    // if (isFilterBySearchApplied) {
    //   filterDisplayedExercisesBySearch();
    // }
    refreshDisplayedExercises();
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
