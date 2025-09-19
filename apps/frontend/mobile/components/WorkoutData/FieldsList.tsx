import * as React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';

import { SetFields } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';
import { getSecondsInDuration } from '@cwt/utils';

import { SetContext } from '../../contexts/SetContext';
import { WorkoutExerciseContext } from '../../contexts/WorkoutExerciseContext';

export default function FieldsList() {
  const exerciseIndex = React.useContext(WorkoutExerciseContext)!.exerciseIndex;
  const set = React.useContext(SetContext)!.set;
  const setIndex = React.useContext(SetContext)!.setIndex;
  const handleSetFieldChange =
    React.useContext(SetContext)!.handleSetFieldChange;

  const tracked = useWorkoutDraftStore((state) => state.workoutData).exercises[
    exerciseIndex
  ].tracked;

  const handleRestFieldChange = (text: string) => {
    // Allow empty string for controlled input
    if (text === '') {
      const updatedField: Partial<SetFields> = {
        rest: '',
      };
      handleSetFieldChange(setIndex, updatedField);
      return;
    }
    // Validate: only numbers, no leading zeros except for '0'
    if (/^(0|[1-9][0-9]{0,2})$/.test(text)) {
      const num = Number(text);
      if (num >= 0 && num <= 300) {
        const updatedField: Partial<SetFields> = {
          rest: 'PT' + text + 'S',
        };
        handleSetFieldChange(setIndex, updatedField);
      }
    }
    // Otherwise, do not update
  };

  const fields = tracked.map((field, i) => {
    switch (field) {
      case 'reps':
        return (
          <TextInput
            key={`${set.id}-${i}`}
            keyboardType="number-pad"
            label="Reps"
            value={set.fields.reps!.toString()}
            onChangeText={(text) =>
              handleSetFieldChange(setIndex, { reps: Number(text) })
            }
          />
        );
      case 'time':
        return (
          <TextInput
            key={`${set.id}-${i}`}
            keyboardType="number-pad"
            label="Time"
            value={getSecondsInDuration(set.fields.time!.toString())}
            onChangeText={(text) => handleRestFieldChange(text)}
          />
        );
      default:
        return <></>;
      // }
    }
  });
  return (
    <View>
      {fields}
      <TextInput
        keyboardType="number-pad"
        label="Rest"
        value={getSecondsInDuration(set.fields.rest!.toString())}
        onChangeText={(text) => handleRestFieldChange(text)}
      />
    </View>
  );
}
