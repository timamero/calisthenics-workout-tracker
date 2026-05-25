import { useContext, ChangeEvent } from 'react';

import { WorkoutDataItemContext, SetContext } from '@cwt/context';
import type { SetFields, SetProgression } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';

/**
 * Hook to handle changes in input fields for a workout set.
 *
 * @param fieldName - The name of the field to be updated.
 * @param inputType - The type of input, either 'numeral', 'duration', or 'select'.
 * @param fieldID - Optional ID for leverage or assist fields.
 * @returns A change handler function for the specified input field.
 */
export default function useFieldInputChange(
  fieldName: 'rest' | 'time' | 'reps' | 'weight' | 'value',
  inputType: 'numeral' | 'duration' | 'select',
  fieldID?: string, // Needed for updating leverage or asssit fields
) {
  const set = useContext(SetContext)!.set;
  const parentType = useContext(WorkoutDataItemContext)?.parentType;
  const exerciseID = useContext(WorkoutDataItemContext)?.item.id;
  const handleSetFieldChange = useContext(SetContext)!.handleSetFieldChange;

  const setSetProgressionIDToMod = useWorkoutDraftStore(
    (state) => state.setSetProgressionIDToMod,
  );

  const handleUpdateField = (
    updatedField: Partial<SetFields> | Pick<SetProgression, 'value'>,
  ) => {
    if (parentType === 'superset') {
      handleSetFieldChange(set.id, updatedField, exerciseID);
    } else {
      handleSetFieldChange(set.id, updatedField);
    }
  };

  const handleChange = (
    eventOrValue: ChangeEvent<HTMLInputElement> | string | null,
  ) => {
    if (fieldID) {
      setSetProgressionIDToMod(fieldID);
    }

    const value =
      typeof eventOrValue === 'object' &&
      eventOrValue !== null &&
      'target' in eventOrValue
        ? eventOrValue.target.value
        : eventOrValue;

    if (inputType === 'select') {
      const updatedField = { value: value };
      handleUpdateField(updatedField);
    }

    // Allow empty string for controlled input
    if (value === '') {
      const updatedField: Partial<SetFields> | Pick<SetProgression, 'value'> = {
        [fieldName]: '',
      };
      handleUpdateField(updatedField);
      return;
    }
    // Validate: only numbers, no leading zeros except for '0'
    if (/^(0|[1-9][0-9]{0,2})$/.test(value!)) {
      // if (/^(0|[1-9][0-9]{0,2})(\.\d{1,2})?$/.test(value!)) {  // This validation allows decimals up to two places.
      const num = Number(value);
      if (num >= 0 && num <= 999) {
        const formattedValue =
          inputType === 'duration' ? 'PT' + value + 'S' : Number(value);
        const updatedField: Partial<SetFields> | Pick<SetProgression, 'value'> =
          {
            [fieldName]: formattedValue,
          };
        handleUpdateField(updatedField);
      }
    }
  };
  return handleChange;
}
