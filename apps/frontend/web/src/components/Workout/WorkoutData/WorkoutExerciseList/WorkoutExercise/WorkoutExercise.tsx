import { Stack, Text, Button, Group } from '@mantine/core';

import type { WorkoutExercise } from '@cwt/schema/workouts';

interface WorkoutExerciseProps {
  name: string;
  exerciseIndex: number;
  handleAddSetClick: (exerciseIndex: number) => void;
  handleDeleteExerciseClick: () => void;
}

export default function WorkoutExercise({
  name,
  exerciseIndex,
  handleAddSetClick,
  handleDeleteExerciseClick,
}: WorkoutExerciseProps) {
  return (
    <Stack bd="1px solid var(--mantine-color-default-border)" p="lg">
      <Group>
        <Text>{name}</Text>
        <Button
          color="red"
          variant="white"
          onClick={() => handleDeleteExerciseClick()}
        >
          Delete
        </Button>
      </Group>
      {/* <Sets
        tracked={workoutExercise.tracked}
        sets={workoutExercise.sets}
        exerciseIndex={exerciseIndex}
      /> */}
      <Button
        variant="outline"
        color="dark"
        onClick={() => handleAddSetClick(exerciseIndex)}
      >
        Add Set
      </Button>
    </Stack>
  );
}
