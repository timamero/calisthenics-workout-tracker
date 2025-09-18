import { View } from 'react-native';
import { Divider } from 'react-native-paper';

import type { WorkoutExercise as WorkoutExerciseType } from '@cwt/schema/workouts';
import {
  useExerciseLibraryStore,
  // useWorkoutDraftStore,
} from '@cwt/state/stores';

import { Text } from '../../customText';

interface WorkoutExerciseProps {
  exerciseIndex: number;
  workoutExercise: WorkoutExerciseType;
}

export default function WorkoutExercise({
  exerciseIndex,
  workoutExercise,
}: WorkoutExerciseProps) {
  const getExerciseNameById = useExerciseLibraryStore(
    (state) => state.getExerciseNameByID,
  );
  const name = getExerciseNameById(workoutExercise.exercise_id);
  return (
    <View>
      <Text>{name}</Text>
      <Divider />
    </View>
  );
}
