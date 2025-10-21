import { Stack, Text, Button, Group } from '@mantine/core';

import type { Mode } from '@cwt/schema/workouts';
import SetList from './SetList';

interface ExerciseItemProps {
  mode: Mode;
  name: string;
  exerciseID: string;
  handleAddSetClick: (
    sectionID: string | null,
    supersetID: string | null,
    exerciseID: string,
  ) => void;
  handleDeleteExerciseClick: () => void;
}

export default function ExerciseItem({
  mode,
  name,
  exerciseID,
  handleAddSetClick,
  handleDeleteExerciseClick,
}: ExerciseItemProps) {
  return (
    <Stack bd="1px solid var(--mantine-color-default-border)" p="lg">
      <Group>
        <Text>{name}</Text>
        {mode !== 'log' && (
          <Button
            color="red"
            variant="white"
            onClick={() => handleDeleteExerciseClick()}
          >
            Delete
          </Button>
        )}
      </Group>
      <SetList />
      {/* <Sets
        tracked={workoutExercise.tracked}
        sets={workoutExercise.sets}
        exerciseIndex={exerciseIndex}
      /> */}
      {mode !== 'log' && (
        <Button
          variant="outline"
          color="dark"
          onClick={() => handleAddSetClick(null, null, exerciseID)}
        >
          Add Set
        </Button>
      )}
    </Stack>
  );
}
