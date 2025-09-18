import * as React from 'react';
import { View } from 'react-native';
import { useTheme, Button } from 'react-native-paper';

import type { SetFields } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';

import { Text } from '../../customText';
import { CustomTheme } from '../../theme';
import FieldsList from './FieldsList';
import { WorkoutExerciseContext } from '../../contexts/WorkoutExerciseContext';

interface SetListProps {
  exerciseIndex: number;
}

export default function SetList({ exerciseIndex }: SetListProps) {
  const theme = useTheme() as CustomTheme;

  const setIsDeleteSetDialogVisible = React.useContext(
    WorkoutExerciseContext,
  )!.setIsDeleteSetDialogVisible;

  const sets = useWorkoutDraftStore((state) => state.workoutData).exercises[
    exerciseIndex
  ].sets;
  const tracked = useWorkoutDraftStore((state) => state.workoutData).exercises[
    exerciseIndex
  ].tracked;

  const setSelectedSetIndexToMod = useWorkoutDraftStore(
    (state) => state.setSelectedSetIndexToMod,
  );
  const setSelectedExerciseIndexToMod = useWorkoutDraftStore(
    (state) => state.setSelectedExerciseIndexToMod,
  );
  const updateField = useWorkoutDraftStore((state) => state.updateField);

  const handleSetFieldChange = (
    setIndex: number,
    updatedField: Partial<SetFields>,
  ) => {
    setSelectedSetIndexToMod(setIndex);
    updateField(exerciseIndex, updatedField);
  };

  const setList = sets.map((set, i) => {
    const onDeleteSetPress = () => {
      setSelectedSetIndexToMod(i);
      setSelectedExerciseIndexToMod(exerciseIndex);
      setIsDeleteSetDialogVisible(true);
    };

    return (
      <View key={`set-${i}`}>
        <View>
          <Text style={{ color: theme.colors.light }}>{`Set ${i + 1}`}</Text>
          {sets.length > 1 && (
            <Button mode="outlined" onPress={() => onDeleteSetPress()}>
              Delete
            </Button>
          )}
        </View>
        <FieldsList
          tracked={{ tracked }}
          set={set}
          setIndex={i}
          handleSetFieldChange={handleSetFieldChange}
        />
      </View>
    );
  });
  return <View>{setList}</View>;
}
