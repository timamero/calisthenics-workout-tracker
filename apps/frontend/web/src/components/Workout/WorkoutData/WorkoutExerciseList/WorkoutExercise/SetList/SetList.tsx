import type { Exercise, SetFields } from '@cwt/schema/workouts';
import { useWorkoutDraftStore } from '@cwt/state/stores';

import { SetContext } from '../../../../../../contexts/SetContext';
import SetContainer from './SetContainer';

interface SetListProps {
  exerciseIndex: number;
}

export default function SetList({ exerciseIndex }: SetListProps) {
  const exercise = useWorkoutDraftStore(
    (state) => state.workoutData[exerciseIndex],
  ) as Exercise;
  const sets = exercise.sets;

  const setSelectedSetIndexToMod = useWorkoutDraftStore(
    (state) => state.setSelectedSetIndexToMod,
  );
  const updateField = useWorkoutDraftStore((state) => state.updateField);

  const handleSetFieldChange = (setIndex: number, updatedField: SetFields) => {
    setSelectedSetIndexToMod(setIndex);
    updateField(exerciseIndex, updatedField);
  };

  const setList = sets.map((set, i) => {
    return (
      <SetContext.Provider
        key={set.id}
        value={{
          setIndex: i,
          set: set,
          handleSetFieldChange: handleSetFieldChange,
        }}
      >
        <SetContainer />
      </SetContext.Provider>
    );
  });
  return <>{setList}</>;
}
