import { Stack, Text } from '@mantine/core';

// import { useStore } from '@cwt/state/store';
import { useWorkoutDraftStore } from '@cwt/state/stores';

import WorkoutExercise from './WorkoutExercise';

export default function Workout() {
  const workoutData = useWorkoutDraftStore((state) => state.workoutData);

  if (!workoutData) {
    return <Text>Loading</Text>;
  }

  const EmptyWorkoutPlaceholder = () => {
    if (workoutData.exercises.length === 0) {
      return (
        <Stack align="center" bd="2px dashed gray.6" p="lg">
          <Text size="lg" fw={800}>
            Ready to start building your workout?
          </Text>
          <Text c="gray.8">Add your first exercise to begin</Text>
        </Stack>
      );
    }
  };

  const workoutExercises = workoutData.exercises.map((ex, i) => {
    return (
      <WorkoutExercise key={ex.id} workoutExercise={ex} exerciseIndex={i} />
    );
  });
  return (
    <Stack gap="xl" align="center">
      <EmptyWorkoutPlaceholder />
      {workoutExercises}
    </Stack>
  );
}
