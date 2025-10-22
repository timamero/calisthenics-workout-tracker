import { useContext } from 'react';
import { Stack, Group, Text, Button } from '@mantine/core';

import { useWorkoutDraftStore } from '@cwt/state/stores';
import type { Mode, Superset } from '@cwt/schema/workouts';

import { WorkoutContext } from '../../../../../../contexts/WorkoutContext';
import { WorkoutDataItemContext } from '../../../../../../contexts/WorkoutDataItemContext';
import { ExerciseItemContainer } from '../ExerciseItem';

interface SupersetItemProps {
  mode: Mode;
  superset: Superset;
  handleDeleteSupersetClick: () => void;
}

export default function SupersetItem({
  mode,
  superset,
  handleDeleteSupersetClick,
}: SupersetItemProps) {
  const addExerciseOverlayHandler =
    useContext(WorkoutContext)?.addExerciseOverlayHandler;
  const setSupersetIDToMod = useWorkoutDraftStore(
    (state) => state.setSupersetIDToMod,
  );

  const handleOpenAddExerciseOverlay = () => {
    setSupersetIDToMod(superset.id);
    addExerciseOverlayHandler!.open();
  };
  return (
    <Stack bd="1px solid var(--mantine-color-default-border)" p="lg">
      <Group>
        <Text>Superset</Text>
        {mode !== 'log' && (
          <Button
            color="red"
            variant="white"
            onClick={() => handleDeleteSupersetClick()}
          >
            Delete
          </Button>
        )}
      </Group>
      {superset.exercises.map((exercise) => {
        return (
          <WorkoutDataItemContext.Provider
            key={exercise.id}
            value={{
              item: exercise,
              parentType: 'superset',
              parentSectionID: null,
              parentSupersetID: superset.id,
            }}
          >
            <ExerciseItemContainer />
          </WorkoutDataItemContext.Provider>
        );
      })}
      <Button
        variant="filled"
        color="orange.9"
        onClick={() => handleOpenAddExerciseOverlay()}
      >
        Add Exercise
      </Button>
    </Stack>
  );
}
