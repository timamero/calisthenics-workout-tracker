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
  const clearFilterCheckboxSelections = useStore(
    (state) => state.clearFilterCheckboxSelections,
  );
  const setAppliedFilterSelections = useStore(
    (state) => state.setAppliedFilterSelections,
  );
  const filterDisplayedExercises = useStore(
    (state) => state.filterDisplayedExercises,
  );
  const isFilterApplied = useStore((state) => state.isFilterApplied);
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
    handler.close();
  };

  const onFilterOverlayClose = () => {
    handler.close();
    if (!isFilterApplied) {
      console.log('clearing filters');
      // Do not clear the filter selection if there are currently filters applied
      clearFilterCheckboxSelections();
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
