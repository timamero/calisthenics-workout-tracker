import { View } from 'react-native';
import { Divider, useTheme, Button } from 'react-native-paper';

import type { WorkoutExercise as WorkoutExerciseType } from '@cwt/schema/workouts';
import {
  useExerciseLibraryStore,
  useWorkoutDraftStore,
} from '@cwt/state/stores';

import { Text } from '../../customText';
import { CustomTheme } from '../../theme';
// import Sets from './Sets';
import SetList from './SetList';

interface WorkoutExerciseProps {
  exerciseIndex: number;
  workoutExercise: WorkoutExerciseType;
  handleOpenDialog: () => void;
  handleDeleteSetDialog: () => void;
}

export default function WorkoutExercise({
  exerciseIndex,
  workoutExercise,
  handleOpenDialog,
  handleDeleteSetDialog,
}: WorkoutExerciseProps) {
  const theme = useTheme() as CustomTheme;

  const addSet = useWorkoutDraftStore((state) => state.addSet);
  const setSelectedExerciseIndexToDel = useWorkoutDraftStore(
    (state) => state.setSelectedExerciseIndexToMod,
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
    <View style={{ marginInline: 16 }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
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
        <Button mode="outlined" onPress={() => handleDeleteExercisePress()}>
          Delete
        </Button>
      </View>
      <SetList
        exerciseIndex={exerciseIndex}
        handleOpenDeleteSetDialog={handleDeleteSetDialog}
      />
      <View style={{ display: 'flex', alignItems: 'flex-end' }}>
        <Button mode="contained" onPress={() => addSet(exerciseIndex)}>
          Add Set
        </Button>
      </View>
      <Divider style={{ marginTop: 24 }} />
    </View>
  );
}
