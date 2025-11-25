import * as React from 'react';
import { Select } from '@mantine/core';

import { SetContext } from '@cwt/context';
import {
  useLeveragesAssistsStore,
  useWorkoutDraftStore,
} from '@cwt/state/stores';

interface NumeralInputProps {
  label: string;
  // fieldName: 'value';
  fieldID: string;
  trackingType?: string | null;
}

export default function SelectInput({
  label,
  fieldID,
  trackingType = null,
}: NumeralInputProps) {
  const set = React.useContext(SetContext)!.set;
  const handleSetFieldChange =
    React.useContext(SetContext)!.handleSetFieldChange;
  // console.log('tracking type: ', trackingType);
  const leverageOrAssistID =
    trackingType === 'leverages'
      ? (set.fields.leverages?.find((field) => field.id === fieldID)!
          .leverages_assists_id as number)
      : (set.fields.assists?.find((field) => field.id === fieldID)!
          .leverages_assists_id as number);

  // console.log('leverageOrAssistID', leverageOrAssistID);
  const leverageOrAssist = useLeveragesAssistsStore((state) =>
    state.getLeverageOrAssistByID(leverageOrAssistID),
  );
  const setLeverageIDToMod = useWorkoutDraftStore(
    (state) => state.setLeverageOrAssistIDToMod,
  );

  const handleChange = (value: string | null) => {
    setLeverageIDToMod(fieldID);
    const updatedField = { value: value };
    handleSetFieldChange(set.id, updatedField);
  };

  const options = leverageOrAssist.value_options;
  if (trackingType === 'leverages') {
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
  } else if (trackingType === 'assists') {
    return (
      <Select
        label={label}
        // placeholder="Pick value"
        data={options}
        value={
          set.fields.assists?.find((field) => field.id === fieldID)?.value
            ? (set.fields.assists.find((field) => field.id === fieldID)!
                .value as string)
            : null
        }
        onChange={handleChange}
      />
    );
  }
}
