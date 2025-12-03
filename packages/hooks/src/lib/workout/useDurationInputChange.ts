import { useContext } from "react";

import { WorkoutDataItemContext, SetContext } from "@cwt/context";
import type { SetFields } from "@cwt/schema/workouts";

/**
 * Hook to handle changes in duration input fields (rest or time) for a workout set.
 *
 * @param fieldName - The name of the duration field, either 'rest' or 'time'.
 * @returns A change handler function for the duration input field.
 */
export default function useDurationInputChange(fieldName: "rest" | "time") {
  const set = useContext(SetContext)!.set;
  const parentType = useContext(WorkoutDataItemContext)?.parentType;
  const exerciseID = useContext(WorkoutDataItemContext)?.item.id;
  const handleSetFieldChange = useContext(SetContext)!.handleSetFieldChange;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Allow empty string for controlled input
    if (value === "") {
      const updatedField: Partial<SetFields> = {
        [fieldName]: "",
      };
      if (parentType === "superset") {
        handleSetFieldChange(set.id, updatedField, exerciseID);
      } else {
        handleSetFieldChange(set.id, updatedField);
      }
      return;
    }
    // Validate: only numbers, no leading zeros except for '0'
    if (/^(0|[1-9][0-9]{0,2})$/.test(value)) {
      const num = Number(value);
      if (num >= 0 && num <= 999) {
        const updatedField: Partial<SetFields> = {
          [fieldName]: "PT" + event.currentTarget.value + "S",
        };
        if (parentType === "superset") {
          handleSetFieldChange(set.id, updatedField, exerciseID);
        } else {
          handleSetFieldChange(set.id, updatedField);
        }
      }
    }
    // Otherwise, do not update
  };
  return handleChange;
}
