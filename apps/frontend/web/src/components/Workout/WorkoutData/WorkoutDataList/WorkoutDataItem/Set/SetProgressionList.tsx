import { useContext, type ReactNode } from 'react';
import { Stack } from '@mantine/core';

import type { Exercise, SetProgression } from '@cwt/schema/workouts';
import { WorkoutDataItemContext } from '@cwt/context';
import { SetContext } from '@cwt/context';

import NumeralInput from './NumeralInput';
import { useSetProgressionsStore } from '@cwt/state/stores';
import SelectInput from './SelectInput';

function SetProgressionField({
  setProgressionField,
}: {
  setProgressionField: SetProgression;
}) {
  const getSetProgressionByID = useSetProgressionsStore(
    (state) => state.getSetProgressionByID,
  );
  const setProgression = getSetProgressionByID(
    setProgressionField.set_progression_id,
  );

  if (setProgression.value_type === 'int') {
    return (
      <NumeralInput
        key={setProgressionField.id}
        label={`${setProgression.name} (${setProgression.value_int_unit})`}
        fieldName="value"
        fieldID={setProgressionField.id}
        trackingType="set progressions"
      />
    );
  } else {
    return (
      <SelectInput
        key={setProgressionField.id}
        label={`${setProgression.name}`}
        fieldID={setProgressionField.id}
      />
    );
  }
}

// function SetProgressionFieldUI({ children }: { children: ReactNode }) {
//   return <Group align="center">{children}</Group>;
// }

export default function SetProgressionFieldsList() {
  const exercise = useContext(WorkoutDataItemContext)?.item as Exercise;
  const tracked = exercise.tracked;

  const set = useContext(SetContext)?.set;

  if (!tracked.includes('set progressions')) {
    return null;
  }

  const setProgressionFields = set?.fields.setProgressions!.map(
    (setProgressionField) => {
      return (
        <SetProgressionField
          key={setProgressionField.id}
          setProgressionField={setProgressionField}
        />
      );
    },
  );

  return (
    <LeverageAssistFieldsListUI>
      {setProgressionFields}
    </LeverageAssistFieldsListUI>
  );
}

function LeverageAssistFieldsListUI({ children }: { children: ReactNode }) {
  return <Stack gap={0}>{children}</Stack>;
}
