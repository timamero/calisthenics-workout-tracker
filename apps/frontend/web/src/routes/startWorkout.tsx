import { createFileRoute } from '@tanstack/react-router';
import { Title } from '@mantine/core';

export const Route = createFileRoute('/startWorkout')({
  component: StartWorkoutView,
});

function StartWorkoutView() {
  return (
    <div>
      <Title>Start Workout Page</Title>
      <p>
        This page is the starting point for a workout. The user will be able to
        start from a blank slate or start a workout from a template.
      </p>
    </div>
  );
}
