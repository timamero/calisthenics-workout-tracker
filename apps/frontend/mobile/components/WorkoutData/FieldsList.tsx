import * as React from 'react';
import { View } from 'react-native';

import { useWorkoutDraftStore } from '@cwt/state/stores';

import { WorkoutExerciseContext } from '../../contexts/WorkoutExerciseContext';
import NumeralInput from './NumeralInput';
import DurationInput from './DurationInput';

export default function FieldsList() {
  const exerciseIndex = React.useContext(WorkoutExerciseContext)!.exerciseIndex;

  const tracked = useWorkoutDraftStore((state) => state.workoutData).exercises[
    exerciseIndex
  ].tracked;

  const fields = tracked.map((field, i) => {
    switch (field) {
      case 'reps':
        return <NumeralInput key={`${field}-${i}`} />;
      case 'time':
        return <DurationInput key={`${field}-${i}`} label="time" />;
      default:
        return <></>;
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
      <DurationInput label="rest" />
    </View>
  );
}
