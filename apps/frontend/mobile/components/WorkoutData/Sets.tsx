import { View } from 'react-native';
import { useTheme, TextInput, Button } from 'react-native-paper';

import type { WorkoutExercise, SetFields } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';

import { Text } from '../../customText';
import { CustomTheme } from '../../theme';

// interface SetsProps {
//   tracked: Pick<WorkoutExercise, 'tracked'>;
//   sets: Pick<WorkoutExercise, 'sets'>;
//   exerciseIndex: number;
//   handleOpenDeleteSetDialog: () => void;
// }
type SetsProps = Pick<WorkoutExercise, 'sets' | 'tracked'> & {
  exerciseIndex: number;
  handleOpenDeleteSetDialog: () => void;
};

export default function Sets({
  tracked,
  sets,
  exerciseIndex,
  handleOpenDeleteSetDialog,
}: SetsProps) {
  const theme = useTheme() as CustomTheme;

  const setSelectedSetIndexToMod = useWorkoutDraftStore(
    (state) => state.setSelectedSetIndexToMod,
  );
  const setSelectedExerciseIndexToMod = useWorkoutDraftStore(
    (state) => state.setSelectedExerciseIndexToMod,
  );
  // const deleteSet = useWorkoutDraftStore((state) => state.deleteSet);
  const updateField = useWorkoutDraftStore((state) => state.updateField);

  const handleSetFieldChange = (
    setIndex: number,
    updatedField: Partial<SetFields>,
  ) => {
    setSelectedSetIndexToMod(setIndex);
    updateField(exerciseIndex, updatedField);
  };

  const setList = sets.map((set, i) => {
    const fields = tracked.map((field) => {
      if (field === 'reps') {
        return (
          <View key={set.id}>
            <TextInput
              keyboardType="number-pad"
              label="Reps"
              value={set.fields.reps!.toString()}
              onChangeText={(text) =>
                handleSetFieldChange(i, { reps: Number(text) })
              }
            />
          </View>
        );
      }
    });

    const onDeleteSetPress = () => {
      setSelectedSetIndexToMod(i);
      setSelectedExerciseIndexToMod(exerciseIndex);
      handleOpenDeleteSetDialog();
    };

    return (
      <View key={`set-${i}`}>
        <View>
          <Text style={{ color: theme.colors.light }}>{`Set ${i + 1}`}</Text>
          <Button mode="outlined" onPress={() => onDeleteSetPress()}>
            Delete
          </Button>
        </View>
        {fields}
      </View>
    );
  });
  return <View>{setList}</View>;
}
