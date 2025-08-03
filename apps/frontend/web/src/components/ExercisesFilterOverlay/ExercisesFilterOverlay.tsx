import { Group, Modal, Button } from '@mantine/core';
import FilterSelections from './FilterSelections';

interface ExercisesFilterOverlayProps {
  opened: boolean;
  handler: { close: () => void };
}

export default function ExercisesFilterOverlay({
  opened,
  handler,
}: ExercisesFilterOverlayProps) {
  const handleApplyFiltersClick = () => {
    console.log('clicked on apply filters');
  };
  return (
    <Modal
      opened={opened}
      onClose={() => handler.close()}
      title="Filter Exercises"
      styles={{
        title: {
          fontFamily: 'var(--mantine-font-family-headings)',
          fontWeight: 700,
        },
      }}
    >
      <FilterSelections />
      <Group mt="lg" grow>
        <Button color="gray" variant="outline">
          Clear All
        </Button>
        <Button color="orange" onClick={() => handleApplyFiltersClick()}>
          Apply Filters
        </Button>
      </Group>
    </Modal>
  );
}
