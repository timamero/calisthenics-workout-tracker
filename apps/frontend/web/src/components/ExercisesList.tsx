import { SimpleGrid } from '@mantine/core';

import { useExerciseLibraryStore } from '@cwt/state/stores';

import ExerciseCard from './ExerciseCard';

export default function ExercisesList() {
  const exercises = useExerciseLibraryStore(
    (state) => state.displayedExercises,
  );
  return (
    <SimpleGrid
      cols={{ base: 1, md: 2, lg: 3 }}
      spacing={{ base: 'sm' }}
      verticalSpacing={{ base: 'sm' }}
      w="100%"
    >
      {exercises!.map((exercise, i) => (
        <ExerciseCard exercise={exercise} key={i} />
      ))}
    </SimpleGrid>
  );
}
