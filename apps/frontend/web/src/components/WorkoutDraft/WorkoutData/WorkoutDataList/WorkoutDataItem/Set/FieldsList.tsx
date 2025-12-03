import { useContext } from 'react';

import type { Exercise } from '@cwt/schema/workouts';
import { WorkoutDataItemContext } from '@cwt/context';

import NumeralInput from './NumeralInput';
import DurationInput from './DurationInput';
import FieldsListUI from './FieldsListUI';

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
          <DurationInput
            key={`${field}-${i}`}
            label="Time (sec)"
            fieldName="time"
          />
        );
    }
  });
  return (
    <FieldsListUI>
      {fields}
      <DurationInput label="Rest (sec)" fieldName="rest" />
    </FieldsListUI>
  );
}
