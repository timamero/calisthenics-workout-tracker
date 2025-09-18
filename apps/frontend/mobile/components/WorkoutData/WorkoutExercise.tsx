import { View } from 'react-native';
import { Divider, useTheme, Button } from 'react-native-paper';

import type { WorkoutExercise as WorkoutExerciseType } from '@cwt/schema/workouts';
import {
  useExerciseLibraryStore,
  useWorkoutDraftStore,
} from '@cwt/state/stores';

import { Text } from '../../customText';
import { CustomTheme } from '../../theme';

interface WorkoutExerciseProps {
  exerciseIndex: number;
  workoutExercise: WorkoutExerciseType;
}

export default function WorkoutExercise({
  exerciseIndex,
  workoutExercise,
}: WorkoutExerciseProps) {
  const theme = useTheme() as CustomTheme;

  const deleteExercise = useWorkoutDraftStore((state) => state.removeExercise);
  const getExerciseNameById = useExerciseLibraryStore(
    (state) => state.getExerciseNameByID,
  );
  const name = getExerciseNameById(workoutExercise.exercise_id);
  return (
    <View>
      <View>
        <Text
          variant="bodyLarge"
          style={{
            color: theme.colors.light,
            fontWeight: 800,
            textAlign: 'center',
          }}
        >
          {name}
        </Text>
        <Button
          mode="text"
          onPress={() => deleteExercise(exerciseIndex)}
          style={{
            marginRight: 24,
          }}
        >
          Cancel
        </Button>
      </View>
      <Divider />
    </View>
  );
}
