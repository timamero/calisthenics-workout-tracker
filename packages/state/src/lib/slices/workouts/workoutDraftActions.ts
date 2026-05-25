import { v4 as uuidv4 } from 'uuid';

import type { SetFields, SetProgression, Set } from '@cwt/schema/workouts';
import type { ExerciseResponse } from '@cwt/schema/exercises';
import type { SetProgressionResponse } from '@cwt/schema/setProgressions';

import {
  DEFAULT_FIELDS,
  DEFAULT_REP_SET,
  DEFAULT_TIME_SET,
  DEFAULT_REST_SET,
} from './workoutDefaults';

export function addSetProgressionField(
  fields: SetFields,
  selectedExerciseID: number,
  tracking: string[],
  selectedExercise: ExerciseResponse,
  getSetProgression: (id: number) => SetProgressionResponse,
): SetFields {
  let updatedFields = fields;

  if (!selectedExercise.default_set_progression_id) {
    console.error('This exercise does not have a default_set_progression_id');
  }
  const setProgressionID: number = selectedExercise.default_set_progression_id!;
  const setProgression: SetProgressionResponse =
    getSetProgression(setProgressionID);
  const valueType = setProgression.value_type;

  let SetProgressionField: SetProgression;
  if (valueType === 'int') {
    SetProgressionField = {
      id: uuidv4(),
      set_progression_id: setProgressionID,
      value: null,
    };
  } else {
    const firstOption = setProgression.value_options[0];
    SetProgressionField = {
      id: uuidv4(),
      set_progression_id: setProgressionID,
      value: firstOption,
    };
  }

  updatedFields = { ...fields, setProgressions: [SetProgressionField] };

  if (!tracking.includes('set progressions')) {
    console.error('Invalid tracking type.');
  }

  return updatedFields;
}

export function updateSetProgressionFieldInSets(
  sets: Set[],
  updatedField: Pick<SetProgression, 'value'>,
  setID: string | null,
  setProgressionID: string | null,
): Set[] {
  if (!setID || !setProgressionID) {
    console.error('setID and setProgressionID are required');
    return sets;
  }

  let trackingTypeUpdated: 'set progressions';

  const updatedSets = sets.map((set) => {
    if (set.id === setID) {
      const setProgressionFields = set.fields.setProgressions;

      let fieldToUpdate = null;

      if (setProgressionFields) {
        fieldToUpdate = setProgressionFields.find(
          (field) => field.id === setProgressionID,
        );
        if (fieldToUpdate) {
          trackingTypeUpdated = 'set progressions';
        }
      }

      const updatedSetProgressionField = {
        ...fieldToUpdate,
        ...updatedField,
      };

      if (
        trackingTypeUpdated === 'set progressions' &&
        setProgressionFields &&
        setProgressionFields.length > 0
      ) {
        const updatedSetProgressionFields = setProgressionFields.map(
          (field) => {
            if (field.id === setProgressionID) {
              return updatedSetProgressionField;
            }
            return field;
          },
        ) as SetProgression[];

        return {
          ...set,
          fields: {
            ...set.fields,
            setProgressions: updatedSetProgressionFields,
          },
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
  getSetProgression: (id: number) => SetProgressionResponse,
) {
  let fields = DEFAULT_FIELDS;
  if (tracking.includes('reps')) {
    fields = { ...fields, ...DEFAULT_REP_SET };
  }
  if (tracking.includes('time')) {
    fields = { ...fields, ...DEFAULT_TIME_SET };
  }

  if (tracking.includes('set progressions')) {
    fields = addSetProgressionField(
      fields,
      exerciseID,
      tracking,
      selectedExercise,
      getSetProgression,
    );
  }

  fields = { ...fields, ...DEFAULT_REST_SET };

  return fields;
}
