import { useContext } from 'react';
import { Group, Stack } from '@mantine/core';

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
  console.log('LeverageAssistFieldsList - tracked', tracked);

  const getLeverageOrAssistByID = useLeveragesAssistsStore(
    (state) => state.getLeverageOrAssistByID,
  );

  let leverageFields;

  if (tracked.includes('leverages')) {
    //   console.log('LeverageAssistFieldsList - adding leverages field');
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
            trackingType="leverages"
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
    console.log('leverageFields', leverageFields);
  }
  let assistFields;

  if (tracked.includes('assists')) {
    console.log('LeverageAssistFieldsList - adding assists field');
    assistFields = set?.fields.assists!.map((assistField) => {
      const assist = getLeverageOrAssistByID(assistField.leverages_assists_id);

      if (assist.value_type === 'int') {
        return (
          <NumeralInput
            key={assistField.id}
            label={`${assist.name} (${assist.value_int_unit})`}
            fieldName="value"
            fieldID={assistField.id}
            trackingType="assists"
          />
        );
      } else {
        return (
          <SelectInput
            key={assistField.id}
            label={`${assist.name}`}
            fieldID={assistField.id}
          />
        );
      }
    });
  }
  // console.log('assistAssistFieldsList - returning assistFields');

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
  return (
    <Stack>
      <Group align="center">{leverageFields}</Group>
      <Group align="center">{assistFields}</Group>
    </Stack>
  );
}
