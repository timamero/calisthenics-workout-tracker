import { v4 as uuidv4 } from 'uuid';

import type {
  Exercise,
  SetFields,
  Leverage,
  Assist,
  Set,
} from '@cwt/schema/workouts';
import type { ExerciseResponse } from '@cwt/schema/exercises';
import type { LeveragesAssistsResponse } from '@cwt/schema/leveragesAssists';

import {
  DEFAULT_FIELDS,
  DEFAULT_REP_SET,
  DEFAULT_TIME_SET,
  DEFAULT_REST_SET,
} from './workoutDefaults';

export function addLeveragesOrAssistsField(
  fields: SetFields,
  selectedExerciseID: number,
  tracking: string[],
  selectedExercise: ExerciseResponse,
  getLeverageOrAssist: (id: number) => LeveragesAssistsResponse,
): SetFields {
  let updatedFields = fields;

  if (tracking.includes('leverages')) {
    if (!selectedExercise.default_leverage_id) {
      console.error('This exercise does not have a default_leverage_id');
    }
    const leverageID: number = selectedExercise.default_leverage_id!;
    const leverage: LeveragesAssistsResponse = getLeverageOrAssist(leverageID);
    const valueType = leverage.value_type;

    let leverageField: Leverage;
    if (valueType === 'int') {
      leverageField = {
        id: uuidv4(),
        leverages_assists_id: leverageID,
        value: null,
      };
    } else {
      const firstOption = leverage.value_options[0];
      leverageField = {
        id: uuidv4(),
        leverages_assists_id: leverageID,
        value: firstOption,
      };
    }

    updatedFields = { ...fields, leverages: [leverageField] };
  }

  if (tracking.includes('assists')) {
    if (!selectedExercise.default_assist_id) {
      console.error('This exercise does not have a default_assist_id');
    }
    const assistID: number = selectedExercise.default_assist_id!;
    const assist: LeveragesAssistsResponse = getLeverageOrAssist(assistID);
    const valueType = assist.value_type;

    let assistField: Assist;
    if (valueType === 'int') {
      assistField = {
        id: uuidv4(),
        leverages_assists_id: assistID,
        value: null,
      };
    } else {
      const firstOption = assist.value_options[0];
      assistField = {
        id: uuidv4(),
        leverages_assists_id: assistID,
        value: firstOption,
      };
    }

    updatedFields = { ...fields, assists: [assistField] };
  }

  if (!tracking.includes('leverages') && !tracking.includes('assists')) {
    console.error('Invalid tracking type.');
  }

  return updatedFields;
}

export function updateLeverageOrAssistFieldInSets(
  sets: Set[],
  updatedField: Pick<Leverage, 'value'> | Pick<Assist, 'value'>,
  setID: string | null,
  leverageOrAssistID: string | null,
): Set[] {
  if (!setID || !leverageOrAssistID) {
    console.error('setID and leverageOrAssistID are required');
    return sets;
  }

  let trackingTypeUpdated: 'leverages' | 'assists';

  const updatedSets = sets.map((set) => {
    if (set.id === setID) {
      const leverageFields = set.fields.leverages;
      const assistFields = set.fields.assists;

      let fieldToUpdate = null;

      if (leverageFields) {
        fieldToUpdate = leverageFields.find(
          (field) => field.id === leverageOrAssistID,
        );
        if (fieldToUpdate) {
          trackingTypeUpdated = 'leverages';
        }
      } else if (assistFields && !fieldToUpdate) {
        fieldToUpdate = assistFields.find(
          (field) => field.id === leverageOrAssistID,
        );
        trackingTypeUpdated = 'assists';
      }

      const updatedAssistOrLeverageField = {
        ...fieldToUpdate,
        ...updatedField,
      };

      if (
        trackingTypeUpdated === 'leverages' &&
        leverageFields &&
        leverageFields.length > 0
      ) {
        const updatedLeverageFields = leverageFields.map((field) => {
          if (field.id === leverageOrAssistID) {
            return updatedAssistOrLeverageField;
          }
          return field;
        }) as Leverage[];

        return {
          ...set,
          fields: { ...set.fields, leverages: updatedLeverageFields },
        };
      } else if (
        trackingTypeUpdated === 'assists' &&
        assistFields &&
        assistFields.length > 0
      ) {
        const updatedAssistFields = assistFields.map((field) => {
          if (field.id === leverageOrAssistID) {
            return updatedAssistOrLeverageField;
          }
          return field;
        }) as Assist[];

        return {
          ...set,
          fields: { ...set.fields, assists: updatedAssistFields },
        };
      }
    }

    return set;
  });
  return updatedSets;
}

export function createFields(
  tracking: string[],
  exerciseID: number,
  selectedExercise: ExerciseResponse,
  getLeverageOrAssist: (id: number) => LeveragesAssistsResponse,
) {
  let fields = DEFAULT_FIELDS;
  if (tracking.includes('reps')) {
    fields = { ...fields, ...DEFAULT_REP_SET };
  }
  if (tracking.includes('time')) {
    fields = { ...fields, ...DEFAULT_TIME_SET };
  }

  if (tracking.includes('leverages') || tracking.includes('assists')) {
    fields = addLeveragesOrAssistsField(
      fields,
      exerciseID,
      tracking,
      selectedExercise,
      getLeverageOrAssist,
    );
  }

  fields = { ...fields, ...DEFAULT_REST_SET };

  return fields;
}
