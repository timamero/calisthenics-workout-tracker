import { Group, Modal, Button, Stack } from '@mantine/core';

import { useStore } from '@cwt/state/store';

import FilterSelections from './FilterSelections';

interface ExercisesFilterOverlayProps {
  opened: boolean;
  handler: { close: () => void };
}

export default function ExercisesFilterOverlay({
  opened,
  handler,
}: ExercisesFilterOverlayProps) {
  const isFilterApplied = useStore((state) => state.isFilterApplied);
  const isFilterBySearchApplied = useStore(
    (state) => state.isFilterBySearchApplied,
  );
  const clearFilterCheckboxSelections = useStore(
    (state) => state.clearFilterCheckboxSelections,
  );
  const setAppliedFilterSelections = useStore(
    (state) => state.setAppliedFilterSelections,
  );
  const revertFilterCheckboxSelections = useStore(
    (state) => state.revertFilterCheckboxSelections,
  );
  const filterDisplayedExercises = useStore(
    (state) => state.filterDisplayedExercises,
  );
  const filterDisplayedExercisesBySearch = useStore(
    (state) => state.filterDisplayedExercisesBySearch,
  );
  const resetDisplayedExercises = useStore(
    (state) => state.resetDisplayedExercises,
  );

  const handleApplyFiltersClick = () => {
    setAppliedFilterSelections();
    filterDisplayedExercises();
    handler.close();
  };

  const handleClearFiltersClick = () => {
    clearFilterCheckboxSelections();
    resetDisplayedExercises();
    if (isFilterBySearchApplied) {
      filterDisplayedExercisesBySearch();
    }
    handler.close();
  };

  // Called when overlay closes from clicking outside of modal
  // or clicking the close button
  const onFilterOverlayClose = () => {
    handler.close();
    if (!isFilterApplied) {
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
