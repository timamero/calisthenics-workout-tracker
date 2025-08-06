import { ScrollView } from 'react-native';

import { useStore } from '@cwt/state/store';

import ExerciseCard from './ExerciseCard';

export default function ExerciseList() {
  const exercises = useStore((state) => state.displayedExercises);

  return (
    <ScrollView
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {exercises.map((exercise) => (
        <ExerciseCard exercise={exercise} key={exercise.id} />
      ))}
    </ScrollView>
  );
}
