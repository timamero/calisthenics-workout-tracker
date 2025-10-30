import { useContext } from 'react';
import { Group } from '@mantine/core';

import type { Exercise } from '@cwt/schema/workouts';

import { WorkoutDataItemContext } from '../../../../../../../contexts/WorkoutDataItemContext';
import { SetContext } from '../../../../../../../contexts/SetContextUpdated';
import NumeralInput from './NumeralInput';
import { useLeveragesAssistsStore } from '@cwt/state/stores';
import SelectInput from './SelectInput';

export default function LeverageAssistFieldsList() {
  const exercise = useContext(WorkoutDataItemContext)?.item as Exercise;
  const tracked = exercise.tracked;
  const set = useContext(SetContext)?.set;

  const getLeverageOrAssistByID = useLeveragesAssistsStore(
    (state) => state.getLeverageOrAssistByID,
  );

  let leverageFields;

  if (tracked.includes('leverages')) {
    // console.log('LeverageAssistFieldsList - adding leverages field');
    leverageFields = set?.fields.leverages!.map((leverageField) => {
      const leverage = getLeverageOrAssistByID(
        leverageField.leverages_assists_id,
      );

      if (leverage.value_type === 'int') {
        return (
          <NumeralInput
            key={leverageField.id}
            label={`${leverage.name} (${leverage.value_int_unit})`}
            fieldName="value"
            fieldID={leverageField.id}
          />
        );
      } else {
        return (
          <SelectInput
            key={leverageField.id}
            label={`${leverage.name}`}
            fieldID={leverageField.id}
          />
        );
      }
    });
  }
  // console.log('LeverageAssistFieldsList - returning leverageFields');

  // const fields = tracked.map((field, i) => {
  //   switch (field) {
  //     case 'reps':
  //       return <NumeralInput key={`${field}-${i}`} label="reps" />;
  //     case 'time':
  //       return <DurationInput key={`${field}-${i}`} label="time" />;
  //     default:
  //       return <></>;
  //   }
  // });
  return <Group align="center">{leverageFields}</Group>;
}
