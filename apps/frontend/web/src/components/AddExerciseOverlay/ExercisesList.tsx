import { SimpleGrid } from '@mantine/core';

import { useStore } from '@cwt/state/store';

import ExerciseCard from './ExerciseCard';

export default function AddExercisesList() {
  const exercises = useStore((state) => state.displayedExercises);
  return (
    <SimpleGrid
      cols={{ base: 1, md: 2, lg: 3 }}
      spacing={{ base: 'lg' }}
      verticalSpacing={{ base: 'lg' }}
    >
      {exercises.map((exercise, i) => (
        <ExerciseCard exercise={exercise} key={i} />
      ))}
    </SimpleGrid>
  );
}
