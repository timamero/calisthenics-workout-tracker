import * as React from 'react';
import { View } from 'react-native';
import { useTheme, Button } from 'react-native-paper';

import type { Set, SetFields, WorkoutExercise } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';

import { WorkoutExerciseContext } from '../../contexts/WorkoutExerciseContext';
import { Text } from '../../customText';
import { CustomTheme } from '../../theme';
import FieldsList from './FieldsList';

interface SetProps {
  setIndex: number;
  showDeleteButton: boolean;
  tracked: Pick<WorkoutExercise, 'tracked'>;
  set: Set;
  onDeleteSetPress: () => void;
  handleSetFieldChange: (
    // setIndex: number,
    updatedField: Partial<SetFields>,
  ) => void;
}

export default function Set({
  setIndex,
  showDeleteButton,
  tracked,
  set,
  onDeleteSetPress,
  handleSetFieldChange,
}: SetProps) {
  const theme = useTheme() as CustomTheme;
  // const setIsDeleteSetDialogVisible = React.useContext(
  //   WorkoutExerciseContext,
  // )!.setIsDeleteSetDialogVisible;

  // const sets = useWorkoutDraftStore((state) => state.workoutData).exercises[
  //   exerciseIndex
  // ].sets;
  // const tracked = useWorkoutDraftStore((state) => state.workoutData).exercises[
  //   exerciseIndex
  // ].tracked;

  // const setSelectedSetIndexToMod = useWorkoutDraftStore(
  //   (state) => state.setSelectedSetIndexToMod,
  // );
  // const setSelectedExerciseIndexToMod = useWorkoutDraftStore(
  //   (state) => state.setSelectedExerciseIndexToMod,
  // );
  // const updateField = useWorkoutDraftStore((state) => state.updateField);

  // const handleSetFieldChange = (
  //   setIndex: number,
  //   updatedField: Partial<SetFields>,
  // ) => {
  //   setSelectedSetIndexToMod(setIndex);
  //   updateField(exerciseIndex, updatedField);
  // };

  return (
    <View key={`set-${setIndex}`}>
      <View>
        <Text
          style={{ color: theme.colors.light }}
        >{`Set ${setIndex + 1}`}</Text>
        {showDeleteButton && (
          <Button mode="outlined" onPress={() => onDeleteSetPress()}>
            Delete
          </Button>
        )}
      </View>
      <FieldsList
        tracked={tracked}
        set={set}
        // setIndex={setIndex}
        handleSetFieldChange={handleSetFieldChange}
      />
    </View>
  );
}
