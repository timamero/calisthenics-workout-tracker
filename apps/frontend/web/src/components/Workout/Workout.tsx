import { Stack, Text } from '@mantine/core';

import { useStore } from '@cwt/state/store';
import WorkoutExercise from './WorkoutExercise';

export default function Workout() {
  const workout = useStore((state) => state.workout);

  const EmptyWorkoutPlaceholder = () => {
    if (workout!.workout_data.exercises.length === 0) {
      return (
        <Stack align="center" bd="2px dashed gray.6" w="max-content" p="lg">
          <Text size="lg" fw={800}>
            Ready to start building your workout?
          </Text>
          <Text c="gray.8">Add your first exercise to begin</Text>
        </Stack>
      );
    }
  };

  const workoutExercises = workout!.workout_data.exercises.map((ex, i) => {
    return <WorkoutExercise key={i} workoutExercise={ex} />;
  });
  return (
    <Stack gap="xl" align="center">
      <EmptyWorkoutPlaceholder />
      {workoutExercises}
    </Stack>
  );
}
