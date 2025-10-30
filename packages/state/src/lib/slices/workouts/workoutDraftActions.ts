import { v4 as uuidv4 } from 'uuid';

import type {
  Exercise,
  SetFields,
  Leverage,
  Assist,
} from '@cwt/schema/workouts';
import type { ExerciseResponse } from '@cwt/schema/exercises';
import type { LeveragesAssistsResponse } from '@cwt/schema/leveragesAssists';

import {
  useExerciseLibraryStore,
  useLeveragesAssistsStore,
} from '../../stores';

export function addLeveragesOrAssistsField(
  fields: SetFields,
  updatedExercise: Exercise,
  tracking: string[],
): SetFields {
  let updatedFields = fields;
  const selectedExercise: ExerciseResponse = useExerciseLibraryStore
    .getState()
    .getExerciseByID(updatedExercise.exercise_id);

  if (tracking.includes('leverages')) {
    if (!selectedExercise.default_leverage_id) {
      console.error('This exercise does not have a default_leverage_id');
    }
    const leverageID: number = selectedExercise.default_leverage_id!;
    const leverage: LeveragesAssistsResponse = useLeveragesAssistsStore
      .getState()
      .getLeverageOrAssistByID(leverageID);
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
    const assist: LeveragesAssistsResponse = useLeveragesAssistsStore
      .getState()
      .getLeverageOrAssistByID(assistID);
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
  } else {
    console.error('Invalid tracking type.');
  }

  return updatedFields;
}
