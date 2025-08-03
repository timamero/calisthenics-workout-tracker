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

  const handleApplyFiltersClick = () => {
    console.log('clicked on apply filters');
    setAppliedFilterSelections();
    filterDisplayedExercises();
  };

  const onFilterOverlayClose = () => {
    console.log('onFilterOverlayClose called');
    handler.close();
    if (!isFilterApplied) {
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
          onClick={clearFilterCheckboxSelections}
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
