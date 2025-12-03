import { useContext } from 'react';
import { Select } from '@mantine/core';

import { SetContext } from '@cwt/context';
import {
  useLeveragesAssistsStore,
  // useWorkoutDraftStore,
} from '@cwt/state/stores';
import { useFieldInputChange } from '@cwt/hooks';

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
  // const parentType = useContext(WorkoutDataItemContext)?.parentType;
  // const exerciseID = useContext(WorkoutDataItemContext)?.item.id;
  const set = useContext(SetContext)!.set;
  // const handleSetFieldChange = useContext(SetContext)!.handleSetFieldChange;
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
  // const setLeverageIDToMod = useWorkoutDraftStore(
  //   (state) => state.setLeverageOrAssistIDToMod,
  // );

  const handleChange = useFieldInputChange('value', 'select', fieldID);
  // const handleChange = (value: string | null) => {
  //   setLeverageIDToMod(fieldID);
  //   const updatedField = { value: value };
  //   if (parentType === 'superset') {
  //     handleSetFieldChange(set.id, updatedField, exerciseID);
  //   } else {
  //     handleSetFieldChange(set.id, updatedField);
  //   }
  // };

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
