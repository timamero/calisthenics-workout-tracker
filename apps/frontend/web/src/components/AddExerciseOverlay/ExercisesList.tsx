import { SimpleGrid } from '@mantine/core';

import { useStore } from '@cwt/state/store';

import ExerciseCard from './ExerciseCard';

interface ExercisesListProps {
  selected: string | null;
  setSelected: (id: string | null) => void;
}

export default function ExercisesList({
  selected,
  setSelected,
}: ExercisesListProps) {
  const exercises = useStore((state) => state.displayedExercises);
  const handleExerciseClick = (e: React.MouseEvent<HTMLElement>) => {
    setSelected(e.currentTarget.getAttribute('data-exercise-id'));
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
          isSelected={exercise.id.toString() === selected ? 'true' : 'false'}
          key={i}
        />
      ))}
    </SimpleGrid>
  );
}
