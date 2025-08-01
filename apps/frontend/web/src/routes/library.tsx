import { createFileRoute } from '@tanstack/react-router';
import { Title, Stack } from '@mantine/core';
import { Exercise } from '@cwt/schema/exerciseSchema';

import ExerciseCard from '../components/ExerciseCard';



export const Route = createFileRoute('/library')({
  component: LibraryView,
});

function LibraryView() {
  return (
    <div>
      <Title>Library Page</Title>
      <Stack align="stretch" justify="center" gap="lg">
        {sampleExercises.map((exercise, i) => (
          <ExerciseCard key={i} exercise={exercise} />
        ))}
      </Stack>
    </div>
  );
}
