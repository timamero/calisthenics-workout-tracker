import { useContext } from 'react';
import { View } from 'react-native';

import type { Exercise } from '@cwt/schema/workouts';
import { WorkoutDataItemContext, SetContext } from '@cwt/context';

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
            trackingType="leverages"
          />
        );
      }
    });
  }

  let assistFields;

  if (tracked.includes('assists')) {
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
            trackingType="assists"
          />
        );
      }
    });
  }

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        justifyContent: 'center',
        paddingTop: 12,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 24,
          justifyContent: 'center',
        }}
      >
        {leverageFields}
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 24,
          justifyContent: 'center',
        }}
      >
        {assistFields}
      </View>
    </View>
  );
}
