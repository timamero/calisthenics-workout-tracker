import { SimpleGrid } from '@mantine/core';

import { useStore } from '@cwt/state/store';

import ExerciseCard from './ExerciseCard';

export default function ExercisesList() {
  const exercises = useStore((state) => state.displayedExercises);
  const selectedExerciseIDToAdd = useStore(
    (state) => state.selectedExerciseIDToAdd,
  );
  const setSelectedExerciseIDToAdd = useStore(
    (state) => state.setSelectedExerciseIDToAdd,
  );

  const handleExerciseClick = (e: React.MouseEvent<HTMLElement>) => {
    setSelectedExerciseIDToAdd(
      Number(e.currentTarget.getAttribute('data-exercise-id')),
    );
  };
  return (
    <SimpleGrid
      cols={{ base: 1, md: 2, lg: 3 }}
      spacing={{ base: 'lg' }}
      verticalSpacing={{ base: 'lg' }}
    >
      {exercises.map((exercise, i) => (
        <ExerciseCard
          exercise={exercise}
          onExerciseClick={handleExerciseClick}
          isSelected={
            exercise.id === selectedExerciseIDToAdd ? 'true' : 'false'
          }
          key={i}
        />
      ))}
    </SimpleGrid>
  );
}
