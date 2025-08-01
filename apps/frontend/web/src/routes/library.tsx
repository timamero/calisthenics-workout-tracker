import { createFileRoute } from '@tanstack/react-router';
import { Title, Stack } from '@mantine/core';
import { useExercisesStore } from '@cwt/state/exercises';

import ExerciseCard from '../components/ExerciseCard';

export const Route = createFileRoute('/library')({
  component: LibraryView,
});

function LibraryView() {
  const exercises = useExercisesStore((state) => state.displayedExercises);
  return (
    <Stack gap="xl">
      <Title size="h6">Exercise Library</Title>
      <Stack align="stretch" justify="center" gap="lg">
        {exercises.map((exercise, i) => (
          <ExerciseCard key={i} exercise={exercise} />
        ))}
      </Stack>
    </Stack>
  );
}
