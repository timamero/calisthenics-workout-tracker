import { Stack, Text, Button, Group } from '@mantine/core';

import { useStore } from '@cwt/state/store';
import type { WorkoutExercise } from '@cwt/schema/workouts';

// import RepField from './RepField';
// import TimeField from './TimeField';
import Sets from './Sets';

interface WorkoutExerciseProps {
  exerciseIndex: number;
  workoutExercise: WorkoutExercise;
}

export default function WorkoutExercise({
  exerciseIndex,
  workoutExercise,
}: WorkoutExerciseProps) {
  const addSet = useStore((state) => state.addSet);
  const getExerciseNameById = useStore((state) => state.getExerciseNameByID);
  const name = getExerciseNameById(workoutExercise.exercise_id);

  return (
    <Stack bd="1px solid var(--mantine-color-default-border)" p="lg">
      <Group>
        <Text>{name}</Text>
        <Button
          color="red"
          variant="white"
          onClick={() => console.log('clicked delete exercise')}
        >
          Delete
        </Button>
      </Group>
      <Sets tracked={workoutExercise.tracked} sets={workoutExercise.sets} />
      <Button
        variant="outline"
        color="dark"
        onClick={() => addSet(exerciseIndex)} // TODO: fix, set is not added
      >
        Add Set
      </Button>
    </Stack>
  );
}
