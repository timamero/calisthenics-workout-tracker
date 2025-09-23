import * as React from 'react';
import { Stack } from '@mantine/core';

import { useWorkoutDraftStore } from '@cwt/state/stores';

import { WorkoutExerciseContext } from '../../../../../../contexts/WorkoutExerciseContext';
import NumeralInput from './NumeralInput';
import DurationInput from './DurationInput';
// import RepField from './RepField';
// import DurationField from './DurationField';

export default function FieldsList() {
  const exerciseIndex = React.useContext(WorkoutExerciseContext)!.exerciseIndex;

  const tracked = useWorkoutDraftStore((state) => state.workoutData).exercises[
    exerciseIndex
  ].tracked;

  const fields = tracked.map((field, i) => {
    switch (field) {
      case 'reps':
        return <NumeralInput key={`${field}-${i}`} label="reps" />;
      // return <RepField key={`${field}-${i}`} />;
      case 'time':
        return (
          <DurationInput key={`${field}-${i}`} label="time" />
          // <DurationField key={`${field}-${i}`} label="Time" fieldName="time" />
        );
      default:
        return <></>;
    }
  });
  return (
    <Stack>
      {fields}
      <DurationInput label="rest" />
      {/* <DurationField label="Rest" fieldName="rest" /> */}
    </Stack>
  );
}
