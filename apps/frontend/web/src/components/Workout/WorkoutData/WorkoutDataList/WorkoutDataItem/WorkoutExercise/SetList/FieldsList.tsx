import * as React from 'react';
import { Stack } from '@mantine/core';

// import { useWorkoutDraftStore } from '@cwt/state/stores';

import { WorkoutDataContext } from '../../../../../../../contexts/WorkoutDataContext';
import NumeralInput from './NumeralInput';
import DurationInput from './DurationInput';
import type { Exercise } from '@cwt/schema/workouts';

export default function FieldsList() {
  // const exerciseIndex = React.useContext(WorkoutExerciseContext)!.exerciseIndex;

  // const exercise = useWorkoutDraftStore(
  //   (state) => state.workoutData[exerciseIndex],
  // ) as Exercise;
  const exercise = React.useContext(WorkoutDataContext)?.item as Exercise;
  const tracked = exercise.tracked;

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
