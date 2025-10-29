import { useContext } from 'react';
import { Group } from '@mantine/core';

import type { Exercise } from '@cwt/schema/workouts';

import { WorkoutDataItemContext } from '../../../../../../../contexts/WorkoutDataItemContext';
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
        return <DurationInput key={`${field}-${i}`} label="time" />;
      default:
        return <></>;
    }
  });
  return (
    <Group align="center">
      {fields}
      <DurationInput label="rest" />
    </Group>
  );
}
