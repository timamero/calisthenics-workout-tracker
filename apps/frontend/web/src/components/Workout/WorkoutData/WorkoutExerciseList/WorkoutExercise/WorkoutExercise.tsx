import { Stack, Text, Button, Group } from '@mantine/core';

import type { Mode } from '@cwt/schema/workouts';
import SetList from './SetList';

interface WorkoutExerciseProps {
  mode: Mode;
  name: string;
  exerciseIndex: number;
  handleAddSetClick: (exerciseIndex: number) => void;
  handleDeleteExerciseClick: () => void;
}

export default function WorkoutExercise({
  mode,
  name,
  exerciseIndex,
  handleAddSetClick,
  handleDeleteExerciseClick,
}: WorkoutExerciseProps) {
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
      <SetList exerciseIndex={exerciseIndex} />
      {/* <Sets
        tracked={workoutExercise.tracked}
        sets={workoutExercise.sets}
        exerciseIndex={exerciseIndex}
      /> */}
      {mode !== 'log' && (
        <Button
          variant="outline"
          color="dark"
          onClick={() => handleAddSetClick(exerciseIndex)}
        >
          Add Set
        </Button>
      )}
    </Stack>
  );
}
