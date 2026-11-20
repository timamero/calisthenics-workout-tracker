import { useContext } from 'react';
import { View } from 'react-native';

import type { Exercise } from '@cwt/schema/workouts';
import { WorkoutDataItemContext, SetContext } from '@cwt/context';

import NumeralInput from './NumeralInput';
import { useSetProgressionsStore } from '@cwt/state/stores';
import SelectInput from './SelectInput';

export default function SetProgressionFieldsList() {
  const exercise = useContext(WorkoutDataItemContext)?.item as Exercise;
  const tracked = exercise.tracked;
  const set = useContext(SetContext)?.set;

  const getSetProgressionByID = useSetProgressionsStore(
    (state) => state.getSetProgressionByID,
  );

  if (!tracked.includes('set progressions')) {
    return null;
  }

  const setProgressionFields = set?.fields.setProgressions!.map(
    (setProgressionsField) => {
      const setProgression = getSetProgressionByID(
        setProgressionsField.set_progression_id,
      );
      if (setProgression.value_type === 'int') {
        return (
          <NumeralInput
            key={setProgressionsField.id}
            label={`${setProgression.name} (${setProgression.value_int_unit})`}
            fieldName="value"
            fieldID={setProgressionsField.id}
            trackingType="setProgressions"
          />
        );
      } else {
        return (
          <SelectInput
            key={setProgressionsField.id}
            label={`${setProgression.name}`}
            fieldID={setProgressionsField.id}
            trackingType="setProgressions"
          />
        );
      }
    },
  );

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        justifyContent: 'flex-start',
        position: 'relative',
      }}
    >
      {setProgressionFields}
    </View>
  );
}
