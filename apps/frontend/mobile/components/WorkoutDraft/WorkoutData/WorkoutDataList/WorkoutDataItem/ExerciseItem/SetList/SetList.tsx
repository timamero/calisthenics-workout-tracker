import { useContext } from 'react';
import { View } from 'react-native';

import { Assist, Exercise, Leverage, SetFields } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';

import { SetContext, WorkoutDataItemContext } from '@cwt/context';
import SetContainer from './SetContainer';

export default function SetList() {
  const exercise = useContext(WorkoutDataItemContext)?.item as Exercise;
  const parentSectionID = useContext(WorkoutDataItemContext)?.parentSectionID;
  const parentSupersetID = useContext(WorkoutDataItemContext)?.parentSupersetID;

  const setSetIDToMod = useWorkoutDraftStore((state) => state.setSetIDToMod);
  const setExerciseIDToMod = useWorkoutDraftStore(
    (state) => state.setExerciseIDToMod,
  );
  const setSupersetIDToMod = useWorkoutDraftStore(
    (state) => state.setSupersetIDToMod,
  );
  const setSectionIDToMod = useWorkoutDraftStore(
    (state) => state.setSectionIDToMod,
  );
  const updateField = useWorkoutDraftStore((state) => state.updateField);
  const updateLeverageOrAssistField = useWorkoutDraftStore(
    (state) => state.updateLeverageOrAssistField,
  );

  const handleSetFieldChange = (
    setID: string,
    updatedField:
      | Partial<SetFields>
      | Pick<Leverage, 'value'>
      | Pick<Assist, 'value'>,
  ) => {
    setSetIDToMod(setID);
    setExerciseIDToMod(exercise.id);
    if (parentSupersetID) {
      setSupersetIDToMod(parentSupersetID);
    }
    if (parentSectionID) {
      setSectionIDToMod(parentSectionID);
    }
    if (useWorkoutDraftStore.getState().leverageOrAssistIDToMod) {
      updateLeverageOrAssistField(
        updatedField as Pick<Leverage, 'value'> | Pick<Assist, 'value'>,
      );
    } else {
      updateField(updatedField as Partial<SetFields>);
    }
  };

  const setList = exercise.sets.map((set, i) => {
    return (
      <SetContext.Provider
        key={set.id}
        value={{
          setIndex: i,
          set: set,
          handleSetFieldChange: handleSetFieldChange,
        }}
      >
        <SetContainer key={set.id} />
      </SetContext.Provider>
    );
  });
  return <View>{setList}</View>;
}
