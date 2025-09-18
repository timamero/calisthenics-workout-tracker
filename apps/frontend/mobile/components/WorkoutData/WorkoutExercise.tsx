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
  handleOpenDialog: () => void;
}

export default function WorkoutExercise({
  exerciseIndex,
  workoutExercise,
  handleOpenDialog,
}: WorkoutExerciseProps) {
  const theme = useTheme() as CustomTheme;

  // const deleteExercise = useWorkoutDraftStore((state) => state.removeExercise);
  const setSelectedExerciseIndexToDel = useWorkoutDraftStore(
    (state) => state.setSelectedExerciseIndexToDel,
  );
  const getExerciseNameById = useExerciseLibraryStore(
    (state) => state.getExerciseNameByID,
  );
  const name = getExerciseNameById(workoutExercise.exercise_id);

  const handleDeleteExercisePress = () => {
    setSelectedExerciseIndexToDel(exerciseIndex);
    handleOpenDialog();
  };

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
          onPress={() => handleDeleteExercisePress()}
          style={{
            marginRight: 24,
          }}
        >
          Delete
        </Button>
      </View>
      <Divider />
    </View>
  );
}
