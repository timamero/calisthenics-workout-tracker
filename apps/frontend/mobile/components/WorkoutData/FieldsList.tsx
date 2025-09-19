import * as React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';

import type { SetFields, Set, WorkoutExercise } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';

import { SetContext } from '../../contexts/SetContext';
import { WorkoutExerciseContext } from '../../contexts/WorkoutExerciseContext';

interface FieldsListProps {
  // tracked: Pick<WorkoutExercise, 'tracked'>;
  // set: Set;
  // handleSetFieldChange: (updatedField: Partial<SetFields>) => void;
}

export default function FieldsList(
  {
    // tracked,
    // set,
    // handleSetFieldChange,
  }: FieldsListProps,
) {
  const exerciseIndex = React.useContext(WorkoutExerciseContext)!.exerciseIndex;
  const set = React.useContext(SetContext)!.set;
  const setIndex = React.useContext(SetContext)!.setIndex;
  const handleSetFieldChange =
    React.useContext(SetContext)!.handleSetFieldChange;

  const tracked = useWorkoutDraftStore((state) => state.workoutData).exercises[
    exerciseIndex
  ].tracked;

  const fields = tracked.map((field, i) => {
    if (field === 'reps') {
      return (
        <View key={`${set.id}-${i}`}>
          <TextInput
            keyboardType="number-pad"
            label="Reps"
            value={set.fields.reps!.toString()}
            onChangeText={(text) =>
              handleSetFieldChange(setIndex, { reps: Number(text) })
            }
          />
        </View>
      );
    }
  });
  return <View>{fields}</View>;
}
