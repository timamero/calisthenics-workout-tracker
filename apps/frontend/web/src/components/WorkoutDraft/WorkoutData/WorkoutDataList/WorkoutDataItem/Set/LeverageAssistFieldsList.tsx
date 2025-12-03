import { useContext } from 'react';
import { Group, Stack } from '@mantine/core';

import type { Exercise, Leverage, Assist } from '@cwt/schema/workouts';
import { WorkoutDataItemContext } from '@cwt/context';
import { SetContext } from '@cwt/context';

import NumeralInput from './NumeralInput';
import { useLeveragesAssistsStore } from '@cwt/state/stores';
import SelectInput from './SelectInput';

function LeverageOrAssistField({
  leverageOrAssistField,
}: {
  leverageOrAssistField: Leverage | Assist;
}) {
  const getLeverageOrAssistByID = useLeveragesAssistsStore(
    (state) => state.getLeverageOrAssistByID,
  );
  const leverageOrAssist = getLeverageOrAssistByID(
    leverageOrAssistField.leverages_assists_id,
  );

  if (leverageOrAssist.value_type === 'int') {
    return (
      <NumeralInput
        key={leverageOrAssistField.id}
        label={`${leverageOrAssist.name} (${leverageOrAssist.value_int_unit})`}
        fieldName="value"
        fieldID={leverageOrAssistField.id}
        trackingType="leverages"
      />
    );
  } else {
    return (
      <SelectInput
        key={leverageOrAssistField.id}
        label={`${leverageOrAssist.name}`}
        fieldID={leverageOrAssistField.id}
        trackingType="leverages"
      />
    );
  }
}

export default function LeverageAssistFieldsList() {
  const exercise = useContext(WorkoutDataItemContext)?.item as Exercise;
  const tracked = exercise.tracked;

  const set = useContext(SetContext)?.set;

  let leverageFields;

  if (tracked.includes('leverages')) {
    leverageFields = set?.fields.leverages!.map((leverageField) => {
      return (
        <LeverageOrAssistField
          key={leverageField.id}
          leverageOrAssistField={leverageField}
        />
      );
    });
  }
  let assistFields;

  if (tracked.includes('assists')) {
    assistFields = set?.fields.assists!.map((assistField) => {
      return (
        <LeverageOrAssistField
          key={assistField.id}
          leverageOrAssistField={assistField}
        />
      );
    });
  }

  return (
    <Stack>
      <Group align="center">{leverageFields}</Group>
      <Group align="center">{assistFields}</Group>
    </Stack>
  );
}
