import { SimpleGrid } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useStore } from '@cwt/state/store';

import ExerciseCard from './ExerciseCard';
import ExerciseDetailOverlay from './ExerciseDetailOverlay';

export default function ExercisesList() {
  const [detailOpened, detailHandler] = useDisclosure(false);
  const exercises = useStore((state) => state.displayedExercises);
  return (
    <SimpleGrid
      cols={{ base: 1, md: 2, lg: 3 }}
      spacing={{ base: 'lg' }}
      verticalSpacing={{ base: 'lg' }}
    >
      {exercises.map((exercise, i) => (
        <ExerciseCard key={i} exercise={exercise} handler={detailHandler} />
      ))}
      <ExerciseDetailOverlay opened={detailOpened} handler={detailHandler} />
    </SimpleGrid>
  );
}
