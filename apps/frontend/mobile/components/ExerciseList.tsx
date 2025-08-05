import { ScrollView } from 'react-native';

import { useStore } from '@cwt/state/store';

import ExerciseCard from './ExerciseCard';

export default function ExerciseList() {
  // const theme = useTheme();
  const exercises = useStore((state) => state.displayedExercises);
  console.log('sample exercises list', exercises[0]);

  return (
    <ScrollView
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {exercises.map((exercise) => (
        <ExerciseCard key={exercise.id} />
      ))}
    </ScrollView>
  );
}
