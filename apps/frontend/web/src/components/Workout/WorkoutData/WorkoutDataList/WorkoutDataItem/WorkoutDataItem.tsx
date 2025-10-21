import { Stack, Text, Button, Group } from '@mantine/core';

import type { Mode } from '@cwt/schema/workouts';
// import SetList from './SetList';

interface WorkoutDataItemProps {
  mode: Mode;
  itemType: string;
  // name: string;
  // exerciseIndex: number;
  // handleAddSetClick: (exerciseIndex: number) => void;
  handleDeleteItemClick: () => void;
}

export default function WorkoutDataItem({
  itemType,
  mode,
  handleDeleteItemClick,
}: WorkoutDataItemProps) {
  return (
    <Stack bd="1px solid var(--mantine-color-default-border)" p="lg">
      <Group>
        <Text>workout data item: {itemType}</Text>
        {mode !== 'log' && (
          <Button
            color="red"
            variant="white"
            onClick={() => handleDeleteItemClick()}
          >
            Delete
          </Button>
        )}
      </Group>
      {/* <SetList exerciseIndex={exerciseIndex} />
      {mode !== 'log' && (
        <Button
          variant="outline"
          color="dark"
          onClick={() => handleAddSetClick(exerciseIndex)}
        >
          Add Set
        </Button>
      )} */}
    </Stack>
  );
}
