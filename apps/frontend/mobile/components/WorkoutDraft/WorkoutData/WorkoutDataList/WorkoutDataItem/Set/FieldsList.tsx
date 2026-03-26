import { useContext } from 'react';
import { View } from 'react-native';

import { WorkoutDataItemContext } from '@cwt/context';
import { Exercise } from '@cwt/schema/workouts';

import NumeralInput from './NumeralInput';
import DurationInput from './DurationInput';

export default function FieldsList() {
  const exercise = useContext(WorkoutDataItemContext)?.item as Exercise;

  const tracked = exercise.tracked;

  const fields = tracked.map((field, i) => {
    switch (field) {
      case 'reps':
        return (
          <NumeralInput key={`${field}-${i}`} label="Reps" fieldName="reps" />
        );
      case 'time':
        return (
          <DurationInput key={`${field}-${i}`} label="Time" fieldName="time" />
        );
    }
  });
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 24,
        justifyContent: 'center',
      }}
    >
      {fields}
      <DurationInput label="Rest" fieldName="rest" />
    </View>
  );
}
