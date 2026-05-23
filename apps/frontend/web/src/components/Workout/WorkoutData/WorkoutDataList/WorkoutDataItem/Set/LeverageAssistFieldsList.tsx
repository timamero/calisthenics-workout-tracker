import { useContext, type ReactNode } from 'react';
import { Stack, Group } from '@mantine/core';

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
        trackingType={
          leverageOrAssist.type === 'leverage' ? 'leverages' : 'assists'
        }
      />
    );
  } else {
    return (
      <SelectInput
        key={leverageOrAssistField.id}
        label={`${leverageOrAssist.name}`}
        fieldID={leverageOrAssistField.id}
        trackingType={
          leverageOrAssist.type === 'leverage' ? 'leverages' : 'assists'
        }
      />
    );
  }
}

function LeverageOrAssistFieldUI({ children }: { children: ReactNode }) {
  return <Group align="center">{children}</Group>;
}

export default function LeverageAssistFieldsList() {
  const exercise = useContext(WorkoutDataItemContext)?.item as Exercise;
  const tracked = exercise.tracked;

  const set = useContext(SetContext)?.set;

  if (!tracked.includes('leverages') && !tracked.includes('assists')) {
    return null;
  }

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
    <LeverageAssistFieldsListUI>
      <LeverageOrAssistFieldUI>{leverageFields}</LeverageOrAssistFieldUI>
      <LeverageOrAssistFieldUI>{assistFields}</LeverageOrAssistFieldUI>
    </LeverageAssistFieldsListUI>
  );
}

function LeverageAssistFieldsListUI({ children }: { children: ReactNode }) {
  return <Stack gap={0}>{children}</Stack>;
}
