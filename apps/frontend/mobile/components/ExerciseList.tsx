import { ScrollView } from 'react-native';

import { useExerciseLibraryStore } from '@cwt/state/stores';

import ExerciseCard from './ExerciseCard';

export default function ExerciseList() {
  const exercises = useExerciseLibraryStore(
    (state) => state.displayedExercises,
  );

  return (
    <ScrollView
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {exercises!.map((exercise) => (
        <ExerciseCard exercise={exercise} key={exercise.id} />
      ))}
    </ScrollView>
  );
}
