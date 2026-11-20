import { View } from 'react-native';

import { useExerciseLibraryStore } from '@cwt/state/stores';

import ExerciseCard from './ExerciseCard';

export default function ExerciseList() {
  const exercises = useExerciseLibraryStore(
    (state) => state.displayedExercises,
  );

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      {exercises!.map((exercise) => (
        <ExerciseCard exercise={exercise} key={exercise.id} />
      ))}
    </View>
  );
}
