import * as React from 'react';
import { Select } from '@mantine/core';
// import type { ComboboxItem } from '@mantine/core';

// import type { Leverage } from '@cwt/schema/workouts';

import { SetContext } from '../../../../../../../contexts/SetContextUpdated';
import {
  useLeveragesAssistsStore,
  useWorkoutDraftStore,
} from '@cwt/state/stores';

interface NumeralInputProps {
  label: string;
  // fieldName: 'value';
  fieldID: string;
}

export default function SelectInput({ label, fieldID }: NumeralInputProps) {
  const set = React.useContext(SetContext)!.set;
  const handleSetFieldChange =
    React.useContext(SetContext)!.handleSetFieldChange;

  const leverage = useLeveragesAssistsStore((state) =>
    state.getLeverageOrAssistByID(
      set.fields.leverages?.find((field) => field.id === fieldID)!
        .leverages_assists_id as number,
    ),
  );
  const setLeverageIDToMod = useWorkoutDraftStore(
    (state) => state.setLeverageIDToMod,
  );

  const options = leverage.value_options;

  const handleChange = (value: string | null) => {
    setLeverageIDToMod(fieldID);
    const updatedField = { value: value };
    handleSetFieldChange(set.id, updatedField);
  };

  return (
    <Select
      label={label}
      // placeholder="Pick value"
      data={options}
      value={
        set.fields.leverages?.find((field) => field.id === fieldID)?.value
          ? (set.fields.leverages.find((field) => field.id === fieldID)!
              .value as string)
          : null
      }
      onChange={handleChange}
    />
  );
}
