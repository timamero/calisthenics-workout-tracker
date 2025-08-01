import { createFileRoute } from '@tanstack/react-router';
import { Title, Stack, SimpleGrid } from '@mantine/core';
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
      {/* <Stack align="stretch" justify="center" gap="lg"> */}
      <Stack align="center">
        <SimpleGrid
          cols={{ base: 1, md: 2, lg: 3 }}
          spacing={{ base: 'lg' }}
          verticalSpacing={{ base: 'lg' }}
          // w="max-content"
        >
          {exercises.map((exercise, i) => (
            <ExerciseCard key={i} exercise={exercise} />
          ))}
        </SimpleGrid>
      </Stack>
      {/* </Stack> */}
    </Stack>
  );
}
