import { useContext } from 'react';
import { Select } from '@mantine/core';

import { SetContext } from '@cwt/context';
import { useLeveragesAssistsStore } from '@cwt/state/stores';
import { useFieldInputChange } from '@cwt/hooks';

interface NumeralInputProps {
  label: string;
  fieldID: string;
  trackingType?: string | null;
}

export default function SelectInput({
  label,
  fieldID,
  trackingType = null,
}: NumeralInputProps) {
  const set = useContext(SetContext)!.set;
  const leverageOrAssistID =
    trackingType === 'leverages'
      ? (set.fields.leverages?.find((field) => field.id === fieldID)!
          .leverages_assists_id as number)
      : (set.fields.assists?.find((field) => field.id === fieldID)!
          .leverages_assists_id as number);

  const leverageOrAssist = useLeveragesAssistsStore((state) =>
    state.getLeverageOrAssistByID(leverageOrAssistID),
  );

  const handleChange = useFieldInputChange('value', 'select', fieldID);

  const options = leverageOrAssist.value_options;
  if (trackingType === 'leverages') {
    return (
      <Select
        label={label}
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
