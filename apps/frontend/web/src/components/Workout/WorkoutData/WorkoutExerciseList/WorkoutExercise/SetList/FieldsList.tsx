import * as React from 'react';
import { Stack } from '@mantine/core';

import { useWorkoutDraftStore } from '@cwt/state/stores';

import { WorkoutExerciseContext } from '../../../../../../contexts/WorkoutExerciseContext';
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
        return <NumeralInput key={`${field}-${i}`} label="reps" />;
      case 'time':
        return <DurationInput key={`${field}-${i}`} label="time" />;
      default:
        return <></>;
    }
  });
  return (
    <Stack>
      {fields}
      <DurationInput label="rest" />
    </Stack>
  );
}
